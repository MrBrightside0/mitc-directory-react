import { MOCK_DATA } from '../data/mockData';

const DEFAULT_API_BASE_URL = '';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
const API_SUFFIX = '/api';

const stripApiPrefix = (path) => {
  if (!path.startsWith('/api')) return path;
  const stripped = path.slice(API_SUFFIX.length);
  return stripped || '';
};

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseEndsWithApi = API_BASE_URL.endsWith(API_SUFFIX);
  const finalPath = baseEndsWithApi ? stripApiPrefix(normalizedPath) : normalizedPath;
  return `${API_BASE_URL}${finalPath}`;
};

const resolveAssetUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads/')) {
    if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
      try {
        return `${new URL(API_BASE_URL).origin}${path}`;
      } catch {
        return path;
      }
    }
    return path;
  }
  return getApiUrl(path);
};

const normalize = (value) => (value || '').toString().trim().toLowerCase();
const stripAccents = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const normalizeText = (value) => stripAccents((value || '').toString().trim().toLowerCase().replace(/\.+$/, ''));
const isPlaceholderText = (value) => normalizeText(value) === 'no se menciono';
const sanitizeText = (value) => {
  const text = (value || '').toString().trim();
  if (!text || isPlaceholderText(text)) return '';
  return text;
};
const sanitizeList = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => sanitizeText(item))
    .filter(Boolean);
};
const isLikelyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizeText(value));
const isLikelyPhone = (value) => sanitizeText(value).replace(/\D/g, '').length >= 7;
const sanitizeDomain = (value) => {
  const text = sanitizeText(value).replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  if (!text || isLikelyEmail(text) || text.includes(' ')) return '';
  if (!text.includes('.')) return '';
  return text.toLowerCase();
};
const normalizePublicContactValue = (value) => {
  const normalized = normalizeText(value);
  if (!normalized) return '';
  if (['email', 'correo', 'mail'].includes(normalized)) return 'email';
  if (['telefono', 'tel', 'phone'].includes(normalized)) return 'phone';
  if (['nombre', 'name'].includes(normalized)) return 'name';
  return '';
};
const inferPublicContactChannel = ({ value, publicLead, contact, publicContact }) => {
  const explicit =
    normalizePublicContactValue(value) ||
    normalizePublicContactValue(publicLead) ||
    normalizePublicContactValue(contact);
  if (explicit) return explicit;

  const rawValue = sanitizeText(value);
  if (isLikelyEmail(rawValue)) return 'email';
  if (isLikelyPhone(rawValue)) return 'phone';

  const safeContact = publicContact || {};
  const publicEmail = sanitizeText(safeContact.email);
  const publicPhone = sanitizeText(safeContact.phone);
  const publicName = sanitizeText(safeContact.name);
  const normalizedRawValue = normalizeText(rawValue);
  const normalizedEmail = normalizeText(publicEmail);
  const normalizedName = normalizeText(publicName);
  const rawDigits = rawValue.replace(/\D/g, '');
  const phoneDigits = publicPhone.replace(/\D/g, '');

  if (normalizedRawValue && normalizedRawValue === normalizedEmail) return 'email';
  if (rawDigits && rawDigits === phoneDigits) return 'phone';
  if (normalizedRawValue && normalizedRawValue === normalizedName) return 'name';

  return '';
};
const sanitizePublicContact = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return {
    role: sanitizeText(value.role),
    name: sanitizeText(value.name),
    email: sanitizeText(value.email),
    phone: sanitizeText(value.phone),
    value: sanitizeText(value.value)
  };
};

const mockByDomain = new Map(MOCK_DATA.map((company) => [normalize(company.domain), company]));
const mockByName = new Map(MOCK_DATA.map((company) => [normalize(company.name), company]));

const findMockFallback = (company) => {
  const byDomain = mockByDomain.get(normalize(company.domain));
  if (byDomain) return byDomain;
  return mockByName.get(normalize(company.name)) || null;
};

const toUiCompany = (company) => {
  const fallback = findMockFallback(company);
  const coverUrl = resolveAssetUrl(sanitizeText(company.cover));
  const logoUrl = resolveAssetUrl(sanitizeText(company.logo));
  const domain = sanitizeDomain(company.domain) || sanitizeDomain(fallback?.domain) || '';
  const name = sanitizeText(company.name) || sanitizeText(fallback?.name) || 'Empresa MITC';
  const industry = sanitizeText(company.industry) || sanitizeText(fallback?.industry) || 'General';
  const commercialName = sanitizeText(fallback?.commercialName) || sanitizeText(company.commercialName);
  const differentiator = sanitizeText(fallback?.differentiator) || sanitizeText(company.differentiator);
  const location = sanitizeText(company.location) || sanitizeText(fallback?.location) || '';
  const tier = sanitizeText(company.tier) || sanitizeText(fallback?.tier) || 'Partner';
  const desc =
    sanitizeText(company.publicSummary) ||
    sanitizeText(fallback?.desc) ||
    `${name} forma parte del ecosistema MITC.`;
  const products = sanitizeText(fallback?.products) || '';
  const email = sanitizeText(fallback?.email);
  const phone = sanitizeText(fallback?.phone);
  const tags = sanitizeList(company.tags).length > 0 ? sanitizeList(company.tags) : sanitizeList(fallback?.tags);
  const targetAudience = sanitizeList(fallback?.targetAudience);
  const services = sanitizeList(fallback?.services);

  return {
    id: company.id || fallback?.id || `${company.name}-${domain}`,
    name,
    industry,
    tags,
    domain,
    logo: logoUrl,
    logoUrl,
    cover: coverUrl,
    banner: coverUrl,
    location,
    verified: fallback?.verified ?? true,
    tier,
    commercialName,
    differentiator,
    targetAudience,
    desc,
    services,
    products,
    email,
    phone
  };
};

const getCompaniesList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object' && Array.isArray(payload.companies)) {
    return payload.companies;
  }
  return null;
};

const getCompanyDetail = (payload) => {
  if (payload && typeof payload === 'object' && payload.company && typeof payload.company === 'object') {
    return payload.company;
  }
  if (payload && typeof payload === 'object' && payload.partner && typeof payload.partner === 'object') {
    return payload.partner;
  }
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload;
  }
  return null;
};

const toUiCompanyDetail = (company, baseCompany = {}) => {
  const logoUrl = resolveAssetUrl(sanitizeText(company.logo));
  const coverUrl = resolveAssetUrl(sanitizeText(company.cover));
  const name = sanitizeText(company.name) || sanitizeText(baseCompany.name) || 'Empresa MITC';
  const products = sanitizeText(company.products) || sanitizeText(baseCompany.products);
  const location = sanitizeText(company.location) || sanitizeText(baseCompany.location);
  const legacyEmail = sanitizeText(company.email) || sanitizeText(baseCompany.email);
  const legacyPhone = sanitizeText(company.phone) || sanitizeText(baseCompany.phone);
  const contact = sanitizeText(company.contact) || sanitizeText(baseCompany.contact);
  const publicLead = sanitizeText(company.publicLead) || sanitizeText(baseCompany.publicLead);
  const publicContact = sanitizePublicContact(company.publicContact) || sanitizePublicContact(baseCompany.publicContact);
  const publicContactValue = sanitizeText(publicContact?.value);
  const publicContactChannel = inferPublicContactChannel({
    value: publicContactValue,
    publicLead,
    contact,
    publicContact
  });
  const hasPublicContact = Boolean(
    publicContactChannel ||
      publicContactValue ||
      publicContact?.name ||
      publicContact?.email ||
      publicContact?.phone ||
      publicLead ||
      contact
  );
  const showPublicName = !publicContactChannel || publicContactChannel === 'name';
  const showPublicEmail = !publicContactChannel || publicContactChannel === 'email';
  const showPublicPhone = !publicContactChannel || publicContactChannel === 'phone';

  const emailCandidates = [publicContact?.email, publicContactValue, publicLead, contact];
  const phoneCandidates = [publicContact?.phone, publicContactValue, publicLead, contact];
  const nameCandidates = [publicContact?.name, publicContactValue, publicLead, contact];
  const resolvedPublicEmail = emailCandidates.map(sanitizeText).find(isLikelyEmail) || '';
  const resolvedPublicPhone = phoneCandidates.map(sanitizeText).find(isLikelyPhone) || '';
  const resolvedPublicName = nameCandidates.map(sanitizeText).find(Boolean) || '';

  const contactName = hasPublicContact && showPublicName ? resolvedPublicName : '';
  const email = hasPublicContact ? (showPublicEmail ? (resolvedPublicEmail || legacyEmail) : '') : legacyEmail;
  const phone = hasPublicContact ? (showPublicPhone ? (resolvedPublicPhone || legacyPhone) : '') : legacyPhone;
  const services = sanitizeList(company.services).length > 0 ? sanitizeList(company.services) : sanitizeList(baseCompany.services);
  const targetAudience = sanitizeList(company.targetIndustries).length > 0 ? sanitizeList(company.targetIndustries) : sanitizeList(baseCompany.targetAudience);
  const tags = sanitizeList(company.tags).length > 0 ? sanitizeList(company.tags) : sanitizeList(baseCompany.tags);
  const desc = sanitizeText(company.publicSummary) || sanitizeText(baseCompany.desc) || `${name} forma parte del ecosistema MITC.`;

  return {
    ...baseCompany,
    id: company.id || baseCompany.id,
    name,
    industry: sanitizeText(company.industry) || sanitizeText(baseCompany.industry) || 'General',
    tags,
    domain: sanitizeDomain(company.domain) || sanitizeDomain(baseCompany.domain) || '',
    logo: logoUrl || baseCompany.logo || '',
    logoUrl: logoUrl || baseCompany.logoUrl || '',
    cover: coverUrl || baseCompany.cover || '',
    banner: coverUrl || baseCompany.banner || '',
    commercialName: sanitizeText(company.commercialName) || sanitizeText(baseCompany.commercialName),
    tier: sanitizeText(company.tier) || sanitizeText(baseCompany.tier) || 'Partner',
    differentiator: sanitizeText(company.differentiator) || sanitizeText(baseCompany.differentiator),
    services,
    products,
    location,
    email,
    phone,
    contactName,
    contact,
    publicLead,
    publicContact: publicContact
      ? {
          role: sanitizeText(publicContact.role),
          name: sanitizeText(publicContact.name),
          email: sanitizeText(publicContact.email),
          phone: sanitizeText(publicContact.phone),
          value: publicContactValue
        }
      : null,
    targetAudience,
    desc
  };
};

const toUiAssistPartner = (partner) => {
  if (!partner || typeof partner !== 'object' || Array.isArray(partner)) return null;

  const safeContact =
    partner.contact && typeof partner.contact === 'object' && !Array.isArray(partner.contact)
      ? partner.contact
      : {};
  const logoUrl = resolveAssetUrl(sanitizeText(partner.logo));
  const coverUrl = resolveAssetUrl(sanitizeText(partner.cover));
  const contactEmail = sanitizeText(safeContact.email) || sanitizeText(partner.email);
  const contactPhone = sanitizeText(safeContact.phone) || sanitizeText(partner.phone);
  const contactName = sanitizeText(safeContact.name);
  const location =
    sanitizeText(partner.location) ||
    sanitizeText(partner.address) ||
    [sanitizeText(partner.city), sanitizeText(partner.region)].filter(Boolean).join(', ');
  const summary = sanitizeText(partner.publicSummary);

  return {
    id: sanitizeText(partner.id),
    name: sanitizeText(partner.name) || 'Empresa MITC',
    industry: sanitizeText(partner.industry) || 'General',
    tags: sanitizeList(partner.tags),
    domain: sanitizeDomain(partner.domain),
    logo: logoUrl,
    logoUrl,
    cover: coverUrl,
    banner: coverUrl,
    location,
    verified: Boolean(partner.verified),
    tier: sanitizeText(partner.tier) || 'Partner',
    services: sanitizeList(partner.services),
    products: sanitizeText(partner.products),
    desc: summary || 'Socio público del ecosistema MITC.',
    contactName,
    email: contactEmail,
    phone: contactPhone,
    website: sanitizeText(partner.website)
  };
};

const toUiAssistRecommendation = (recommendation, index) => {
  if (!recommendation || typeof recommendation !== 'object' || Array.isArray(recommendation)) return null;
  const partner = toUiAssistPartner(recommendation.partner);
  if (!partner?.id) return null;

  const rawScore = recommendation.score;
  const score = typeof rawScore === 'number' ? rawScore : Number(rawScore);

  return {
    id: `${partner.id}-${index}`,
    partner,
    reason: sanitizeText(recommendation.reason),
    score: Number.isFinite(score) ? score : 0,
    matchedTags: sanitizeList(recommendation.matchedTags)
  };
};

export const fetchCompanies = async () => {
  const response = await fetch(getApiUrl('/api/companies'), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`companies_fetch_failed_${response.status}`);
  }

  const payload = await response.json();
  const companies = getCompaniesList(payload);
  if (!companies) {
    throw new Error('companies_invalid_payload');
  }

  return companies
    .filter((company) => company && typeof company === 'object')
    .map(toUiCompany)
    .filter((company) => company.logo);
};

export const fetchCompanyById = async (id, baseCompany = {}) => {
  let payload = null;
  let latestStatus = 0;
  for (const path of [`/api/companies/${id}`, `/api/partners/${id}`]) {
    const response = await fetch(getApiUrl(path), {
      headers: { Accept: 'application/json' }
    });
    latestStatus = response.status;
    if (response.ok) {
      payload = await response.json();
      break;
    }
    if (response.status !== 404) {
      throw new Error(`company_fetch_failed_${response.status}`);
    }
  }

  if (!payload) {
    throw new Error(`company_fetch_failed_${latestStatus || 'unknown'}`);
  }

  const company = getCompanyDetail(payload);
  if (!company) {
    throw new Error('company_invalid_payload');
  }

  return toUiCompanyDetail(company, baseCompany);
};

export const assistPublicPartners = async ({ message, limit = 5 }) => {
  const text = sanitizeText(message);
  if (!text) {
    const err = new Error('assist_message_required');
    err.code = 'assist_message_required';
    throw err;
  }

  const parsedLimit = Number.parseInt(limit, 10);
  const safeLimit = Number.isFinite(parsedLimit) ? Math.min(8, Math.max(1, parsedLimit)) : 5;

  const response = await fetch(getApiUrl('/api/public/partners/assist'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      message: text,
      limit: safeLimit
    })
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = payload?.error || `assist_public_partners_failed_${response.status}`;
    const err = new Error(error);
    err.status = response.status;
    err.code = error;
    throw err;
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('assist_public_partners_invalid_payload');
  }

  const recommendations = Array.isArray(payload.recommendations)
    ? payload.recommendations
        .map((recommendation, index) => toUiAssistRecommendation(recommendation, index))
        .filter(Boolean)
    : [];

  return {
    reply: sanitizeText(payload.reply) || 'Encontré socios que pueden ayudarte.',
    detectedNeeds: sanitizeList(payload.detectedNeeds),
    needsClarification: Boolean(payload.needsClarification),
    followUpQuestion: sanitizeText(payload.followUpQuestion),
    recommendations,
    meta: payload.meta && typeof payload.meta === 'object' && !Array.isArray(payload.meta) ? payload.meta : null
  };
};

const buildLeadPayload = (formData) => ({
  name: formData.nombre.trim(),
  role: formData.cargo.trim(),
  email: formData.email.trim(),
  phone: formData.telefono.trim(),
  size: formData.tamano,
  location: formData.ubicacion,
  objective: formData.objetivo
});

const submitLeadRequest = async (path, formData) => {
  const payload = {
    ...buildLeadPayload(formData)
  };

  const response = await fetch(getApiUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const error = body?.error || `request_failed_${response.status}`;
    const err = new Error(error);
    err.status = response.status;
    err.code = error;
    throw err;
  }

  return body;
};

export const submitLead = async (formData) => submitLeadRequest('/api/leads', formData);

export const submitClusterLead = async (formData) => submitLeadRequest('/api/leads-cluster', formData);
