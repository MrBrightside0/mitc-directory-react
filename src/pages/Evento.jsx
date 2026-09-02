import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  Mail,
  Plus,
  Trash2,
  User,
  Users
} from 'lucide-react';

import { fetchPublicEvent, submitEventRegistration } from '../services/api';

const emptyAttendee = () => ({ key: `a-${Math.random().toString(36).slice(2, 10)}`, name: '', email: '', role: '' });

const resolveErrorMessage = (error) => {
  const code = String(error?.code || error?.message || '').trim();
  const detail = String(error?.detail || '').trim();

  const messages = {
    company_required: 'Escribe el nombre de la empresa.',
    contact_name_required: 'Escribe el nombre de quien registra.',
    invalid_contact_email: 'El correo de contacto no es válido.',
    attendees_required: 'Agrega al menos un asistente.',
    attendee_name_required: 'Cada asistente necesita nombre.',
    event_full: 'El cupo del evento se agotó.',
    survey_not_published: 'El registro para este evento no está abierto.',
    survey_not_open: 'Este enlace no corresponde a un registro de evento.',
    not_found: 'No encontramos este evento.',
    too_many_attempts: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
    invalid_payload: 'Revisa los datos del formulario.'
  };

  if (messages[code]) return messages[code];
  if (code === 'invalid_attendee_email') return `El correo de ${detail || 'un asistente'} no es válido.`;
  if (code === 'duplicate_attendee_email') return `El correo ${detail} está repetido en tu lista.`;
  if (code === 'attendee_already_registered') return `Ya hay un registro con este correo: ${detail}.`;
  if (code === 'too_many_attendees') return `Puedes registrar máximo ${detail} asistentes por empresa.`;
  if (code === 'not_enough_spots') return `Solo quedan ${detail} lugares disponibles.`;
  if (code === 'missing_answer') return `Falta responder: ${detail}`;
  if (code === 'invalid_option') return `Respuesta inválida en: ${detail}`;
  if (code === 'invalid_scale') return `Valor fuera de rango en: ${detail}`;
  return 'No pudimos completar tu registro. Inténtalo de nuevo.';
};

const Eyebrow = ({ children }) => (
  <span className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-widest">
    {children}
  </span>
);

const MetaItem = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 border border-slate-200 bg-white p-4">
      <Icon className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

const Field = ({ label, required, children, hint }) => (
  <label className="block">
    <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
      {label}
      {required ? <span className="text-indigo-600"> *</span> : null}
    </span>
    {children}
    {hint ? <span className="block text-xs text-slate-400 mt-1.5">{hint}</span> : null}
  </label>
);

const inputClass =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all';

const QuestionField = ({ question, value, onChange }) => {
  if (question.type === 'multiple') {
    return (
      <div className="grid gap-2">
        {(question.options || []).map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={`flex items-center gap-3 border px-4 py-3 text-sm cursor-pointer transition-colors ${
                selected ? 'border-indigo-500 bg-indigo-50 text-slate-900' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={option}
                checked={selected}
                onChange={(event) => onChange(event.target.value)}
                className="accent-indigo-600"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (question.type === 'scale') {
    const min = Number(question.scaleMin || 1);
    const max = Number(question.scaleMax || 5);
    const options = [];
    for (let cursor = min; cursor <= max; cursor += 1) options.push(cursor);
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`h-11 w-11 border text-sm font-bold transition-colors ${
              Number(value) === option
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  return (
    <textarea
      rows={3}
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClass} resize-y`}
      placeholder="Escribe tu respuesta"
    />
  );
};

const StateScreen = ({ title, description, children }) => (
  <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-24">
    <div className="max-w-md w-full bg-white border border-slate-200 p-10 text-center">
      <h1 className="text-2xl font-display font-bold text-slate-900">{title}</h1>
      {description ? <p className="text-sm text-slate-500 mt-3">{description}</p> : null}
      {children}
    </div>
  </div>
);

const Evento = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [attendees, setAttendees] = useState([emptyAttendee()]);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState('');
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const loadEvent = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const payload = await fetchPublicEvent(eventId);
      setEvent(payload);
    } catch (error) {
      setLoadError(resolveErrorMessage(error));
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const info = useMemo(() => event?.eventInfo || {}, [event]);
  const questions = useMemo(() => (Array.isArray(event?.questions) ? event.questions : []), [event]);
  const maxAttendees = Number(event?.maxAttendeesPerCompany || 10);
  const title = info.headline || event?.name || 'Capacitación';

  const handleAttendeeChange = (key, field, value) => {
    setAttendees((prev) => prev.map((item) => (item.key === key ? { ...item, [field]: value } : item)));
  };

  const addAttendee = () => {
    setAttendees((prev) => (prev.length >= maxAttendees ? prev : [...prev, emptyAttendee()]));
  };

  const removeAttendee = (key) => {
    setAttendees((prev) => (prev.length <= 1 ? prev : prev.filter((item) => item.key !== key)));
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setFormError('');

    const cleanAttendees = attendees
      .map((item) => ({
        name: item.name.trim(),
        email: item.email.trim(),
        role: item.role.trim()
      }))
      .filter((item) => item.name || item.email);

    if (cleanAttendees.length === 0) {
      setFormError('Agrega al menos un asistente.');
      return;
    }
    if (!acceptsPrivacy) {
      setFormError('Necesitamos tu consentimiento para tratar los datos de registro.');
      return;
    }

    setSubmitting(true);
    try {
      const registration = await submitEventRegistration(eventId, {
        company: company.trim(),
        contactName: contactName.trim(),
        contactRole: contactRole.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        attendees: cleanAttendees,
        answers,
        notes: notes.trim()
      });
      setConfirmation(registration);
    } catch (error) {
      setFormError(resolveErrorMessage(error));
      if (['event_full', 'not_enough_spots'].includes(String(error?.code || ''))) {
        loadEvent();
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <StateScreen title="Cargando evento…" description="Un momento, estamos trayendo la información.">
        <Loader2 className="h-6 w-6 text-indigo-600 animate-spin mx-auto mt-6" aria-hidden="true" />
      </StateScreen>
    );
  }

  if (loadError || !event) {
    return (
      <StateScreen title="Registro no disponible" description={loadError || 'No encontramos este evento.'}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-indigo-600 transition-colors"
        >
          Ir al inicio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </StateScreen>
    );
  }

  const spotsLeft = event.spotsLeft;
  const isFull = Boolean(event.isFull);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans">
      <Helmet>
        <title>{`${title} | Monterrey IT Cluster`}</title>
        <meta
          name="description"
          content={info.summary || event.objective || `Registro al evento ${title} del Monterrey IT Cluster.`}
        />
        <link rel="canonical" href={`https://monterreyitcluster.com/evento/${eventId}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Monterrey IT Cluster`} />
        <meta property="og:description" content={info.summary || event.objective || ''} />
      </Helmet>

      {/* Encabezado */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-14 lg:pt-36 lg:pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-indigo-600 blur-[140px] opacity-25 pointer-events-none translate-x-1/3 -translate-y-1/2" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/10 text-indigo-200 text-[11px] font-bold uppercase tracking-widest">
              Capacitación · Monterrey IT Cluster
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mt-6 leading-tight">{title}</h1>
            {info.summary || event.objective ? (
              <p className="text-slate-300 text-base md:text-lg mt-5 leading-relaxed">
                {info.summary || event.objective}
              </p>
            ) : null}
            {info.organizer ? (
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-6">{info.organizer}</p>
            ) : null}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-12 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Información del evento */}
        <section className="lg:col-span-7 space-y-10">
          <div className="grid sm:grid-cols-2 gap-3">
            <MetaItem icon={CalendarDays} label="Fecha" value={info.dateLabel} />
            <MetaItem icon={Clock} label="Horario" value={[info.timeLabel, info.durationLabel].filter(Boolean).join(' · ')} />
            <MetaItem icon={MapPin} label="Modalidad" value={[info.modality, info.location].filter(Boolean).join(' · ')} />
            <MetaItem icon={Users} label="Cupo" value={event.capacity ? `${event.capacity} lugares` : 'Cupo abierto'} />
          </div>

          {info.address ? (
            <p className="text-sm text-slate-500 -mt-6">{info.address}</p>
          ) : null}

          {info.speakerName ? (
            <div className="border border-slate-200 bg-white p-6">
              <Eyebrow>Ponente</Eyebrow>
              <p className="text-xl font-display font-bold text-slate-900 mt-4">{info.speakerName}</p>
              {info.speakerRole ? <p className="text-sm text-slate-500 mt-1">{info.speakerRole}</p> : null}
              {info.speakerEmail ? (
                <a
                  href={`mailto:${info.speakerEmail}`}
                  className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mt-3"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {info.speakerEmail}
                </a>
              ) : null}
            </div>
          ) : null}

          {(info.agenda || []).length > 0 ? (
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900">Temario</h2>
              <ol className="mt-5 border border-slate-200 bg-white divide-y divide-slate-200">
                {info.agenda.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="flex items-baseline gap-4 px-5 py-4">
                    <span className="text-xs font-mono font-bold text-indigo-600 w-6 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-slate-800 flex-1">{item.title}</span>
                    {item.detail ? (
                      <span className="text-xs uppercase tracking-widest text-slate-400 shrink-0">{item.detail}</span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {(info.audience || []).length > 0 ? (
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900">Dirigido a</h2>
              <ul className="mt-5 space-y-2">
                {info.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(info.requirements || []).length > 0 ? (
            <div className="border-l-2 border-indigo-600 pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Requisitos previos</h2>
              <ul className="mt-3 space-y-1.5">
                {info.requirements.map((item) => (
                  <li key={item} className="text-sm text-slate-600">{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {info.infoUrl ? (
            <a
              href={info.infoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Ver la página completa del taller
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </section>

        {/* Formulario de registro */}
        <section className="lg:col-span-5 lg:sticky lg:top-28">
          {confirmation ? (
            <div className="bg-white border border-slate-200 p-8">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Check className="h-6 w-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-6">Registro confirmado</h2>
              <p className="text-sm text-slate-500 mt-3">
                Registramos a {confirmation.attendeesCount} asistente
                {confirmation.attendeesCount === 1 ? '' : 's'} de {confirmation.company}. Enviamos la confirmación al
                correo de cada persona.
              </p>
              <ul className="mt-6 border border-slate-200 divide-y divide-slate-200">
                {(confirmation.attendees || []).map((attendee) => (
                  <li key={attendee.id} className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{attendee.name}</p>
                    <p className="text-xs text-slate-500">{attendee.email}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 mt-6">
                ¿No llegó el correo? Revisa la carpeta de spam o escríbenos a{' '}
                {info.contactEmail || 'contacto@monterreyitcluster.com'}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 md:p-8">
              <Eyebrow>Registro</Eyebrow>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-4">Reserva los lugares de tu empresa</h2>
              <p className="text-sm text-slate-500 mt-2">
                {isFull
                  ? 'El cupo está lleno por ahora.'
                  : spotsLeft
                    ? `Quedan ${spotsLeft} lugares disponibles.`
                    : 'Cada asistente recibe su confirmación por correo.'}
              </p>

              <fieldset disabled={isFull || submitting} className="mt-8 space-y-5 disabled:opacity-60">
                <Field label="Empresa" required>
                  <div className="relative">
                    <Building2 className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      type="text"
                      value={company}
                      onChange={(inputEvent) => setCompany(inputEvent.target.value)}
                      required
                      className={`${inputClass} pl-11`}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Quién registra" required>
                    <div className="relative">
                      <User className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <input
                        type="text"
                        value={contactName}
                        onChange={(inputEvent) => setContactName(inputEvent.target.value)}
                        required
                        className={`${inputClass} pl-11`}
                        placeholder="Nombre y apellido"
                      />
                    </div>
                  </Field>
                  <Field label="Puesto">
                    <input
                      type="text"
                      value={contactRole}
                      onChange={(inputEvent) => setContactRole(inputEvent.target.value)}
                      className={inputClass}
                      placeholder="Ej. Directora de TI"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Correo de contacto" required>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(inputEvent) => setContactEmail(inputEvent.target.value)}
                      required
                      className={inputClass}
                      placeholder="nombre@empresa.com"
                    />
                  </Field>
                  <Field label="Teléfono">
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(inputEvent) => setContactPhone(inputEvent.target.value)}
                      className={inputClass}
                      placeholder="81 1234 5678"
                    />
                  </Field>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                      Asistentes<span className="text-indigo-600"> *</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {attendees.length} / {maxAttendees}
                    </span>
                  </div>

                  <div className="mt-3 space-y-3">
                    {attendees.map((attendee, index) => (
                      <div key={attendee.key} className="border border-slate-200 p-4 bg-slate-50/60">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Asistente {index + 1}
                          </span>
                          {attendees.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => removeAttendee(attendee.key)}
                              className="text-slate-400 hover:text-red-600 transition-colors"
                              aria-label={`Quitar asistente ${index + 1}`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          ) : null}
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={attendee.name}
                            onChange={(inputEvent) => handleAttendeeChange(attendee.key, 'name', inputEvent.target.value)}
                            required
                            className={inputClass}
                            placeholder="Nombre completo"
                          />
                          <input
                            type="email"
                            value={attendee.email}
                            onChange={(inputEvent) => handleAttendeeChange(attendee.key, 'email', inputEvent.target.value)}
                            required
                            className={inputClass}
                            placeholder="Correo del asistente"
                          />
                          <input
                            type="text"
                            value={attendee.role}
                            onChange={(inputEvent) => handleAttendeeChange(attendee.key, 'role', inputEvent.target.value)}
                            className={inputClass}
                            placeholder="Puesto (opcional)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {attendees.length < maxAttendees ? (
                    <button
                      type="button"
                      onClick={addAttendee}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-sm font-bold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Agregar asistente
                    </button>
                  ) : null}
                </div>

                {questions.length > 0 ? (
                  <div className="space-y-5 pt-2">
                    {questions.map((question) => (
                      <Field key={question.id} label={question.text} required>
                        <QuestionField
                          question={question}
                          value={answers[question.id]}
                          onChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
                        />
                      </Field>
                    ))}
                  </div>
                ) : null}

                <Field label="Comentarios" hint="Opcional: cualquier cosa que debamos saber.">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(inputEvent) => setNotes(inputEvent.target.value)}
                    className={`${inputClass} resize-y`}
                    placeholder="Dudas, requerimientos especiales, etc."
                  />
                </Field>

                <label className="flex items-start gap-3 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={acceptsPrivacy}
                    onChange={(inputEvent) => setAcceptsPrivacy(inputEvent.target.checked)}
                    className="mt-0.5 accent-indigo-600"
                  />
                  <span>
                    Acepto que el Monterrey IT Cluster use estos datos para gestionar mi registro y enviarme la
                    confirmación del evento. Consulta el{' '}
                    <Link to="/privacidad" className="text-indigo-600 hover:underline">
                      aviso de privacidad
                    </Link>
                    .
                  </span>
                </label>
              </fieldset>

              {formError ? (
                <p role="alert" className="mt-5 flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting || isFull}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:hover:bg-slate-900"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Registrando…
                  </>
                ) : isFull ? (
                  'Cupo lleno'
                ) : (
                  <>
                    Confirmar registro
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default Evento;
