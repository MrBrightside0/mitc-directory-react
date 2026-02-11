import { MOCK_DATA } from '../data/mockData';

const DEFAULT_API_BASE_URL = '';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const resolveAssetUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
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
  const domain = sanitizeText(company.domain) || sanitizeText(fallback?.domain) || '';
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
  const email = sanitizeText(company.email) || sanitizeText(baseCompany.email);
  const phone = sanitizeText(company.phone) || sanitizeText(baseCompany.phone);
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
    domain: sanitizeText(company.domain) || sanitizeText(baseCompany.domain) || '',
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
    targetAudience,
    desc
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
    .filter((company) => company.logo && company.cover);
};

export const fetchCompanyById = async (id, baseCompany = {}) => {
  const response = await fetch(getApiUrl(`/api/companies/${id}`), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`company_fetch_failed_${response.status}`);
  }

  const payload = await response.json();
  const company = getCompanyDetail(payload);
  if (!company) {
    throw new Error('company_invalid_payload');
  }

  return toUiCompanyDetail(company, baseCompany);
};

export const submitLead = async (formData) => {
  const payload = {
    name: formData.nombre.trim(),
    role: formData.cargo.trim(),
    email: formData.email.trim(),
    phone: formData.telefono.trim(),
    size: formData.tamano,
    location: formData.ubicacion,
    objective: formData.objetivo
  };

  const response = await fetch(getApiUrl('/api/leads'), {
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
