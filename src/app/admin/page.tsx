'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, PromoCode } from '@/lib/supabase';

const ADMIN_EMAIL = 'admin@calmika.com';

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function defaultExpiry(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

function buildMailtoLink(code: PromoCode): string {
  const recipientName = code.recipient_name || 'Kedves Felhasználó';
  const expiresFormatted = formatDate(code.expires_at);

  const body = `Kedves ${recipientName}!

Örömmel értesítjük, hogy Calmika Pro hozzáférést biztosítunk Önnek a terápiás munkájához.

Promo kód: ${code.code}
Érvényes: ${expiresFormatted}
Felhasználható: ${code.max_uses} eszközön

Beváltás: Calmika app → Szülői Zóna → Előfizetés → "Kód beváltása"

Kérdés esetén írjon: info@calmika.com

Üdvözlettel,
Calmika csapat`;

  const subject = encodeURIComponent('Calmika Pro kód az Ön számára');
  const encodedBody = encodeURIComponent(body);
  const to = encodeURIComponent(code.recipient_email || '');

  return `mailto:${to}?subject=${subject}&body=${encodedBody}`;
}

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form state
  const [codeType, setCodeType] = useState('therapist_pro');
  const [maxUses, setMaxUses] = useState(10);
  const [expiresAt, setExpiresAt] = useState(defaultExpiry());
  const [note, setNote] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [genSuccess, setGenSuccess] = useState('');

  // Codes list
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [codesLoading, setCodesLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    setCodesLoading(true);
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setCodes(data as PromoCode[]);
    }
    setCodesLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s && s.user.email === ADMIN_EMAIL) {
        setSession(s);
        fetchCodes();
      } else if (s) {
        supabase.auth.signOut();
      }
      setCheckingAuth(false);
    });
  }, [fetchCodes]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (email !== ADMIN_EMAIL) {
      setAuthError('Hozzáférés megtagadva: nem admin fiók.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    if (data.session?.user.email !== ADMIN_EMAIL) {
      setAuthError('Hozzáférés megtagadva.');
      await supabase.auth.signOut();
      return;
    }
    setSession(data.session);
    fetchCodes();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setCodes([]);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenError('');
    setGenSuccess('');
    setGenerating(true);

    const code = generateCode();
    const userEmail = session?.user?.email ?? ADMIN_EMAIL;

    const { error } = await supabase.from('promo_codes').insert({
      code,
      type: codeType,
      max_uses: maxUses,
      used_count: 0,
      expires_at: new Date(expiresAt).toISOString(),
      is_active: true,
      note: note.trim() || null,
      created_by: userEmail,
      recipient_name: recipientName.trim() || null,
      recipient_email: recipientEmail.trim() || null,
      email_sent_at: null,
    });

    setGenerating(false);
    if (error) {
      setGenError(error.message);
    } else {
      setGenSuccess(`✅ Kód generálva: ${code}`);
      setNote('');
      setRecipientName('');
      setRecipientEmail('');
      fetchCodes();
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendEmail = async (code: PromoCode) => {
    if (!code.recipient_email) return;
    setSendingEmailId(code.id);

    // Open mailto link
    window.location.href = buildMailtoLink(code);

    // Mark as sent in the database
    const { error } = await supabase
      .from('promo_codes')
      .update({ email_sent_at: new Date().toISOString() })
      .eq('id', code.id);

    if (!error) {
      setCodes((prev) =>
        prev.map((c) =>
          c.id === code.id ? { ...c, email_sent_at: new Date().toISOString() } : c
        )
      );
    }

    setSendingEmailId(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Betöltés…</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
          {/* Login header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Calmika Admin</h1>
              <p className="text-xs text-gray-400">Promo kód kezelő</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@calmika.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jelszó</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            {authError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Bejelentkezés…' : 'Bejelentkezés'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-500 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-base">
              C
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Calmika Admin</h1>
              <p className="text-teal-100 text-xs">Promo kód kezelő</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-teal-100 text-xs hidden sm:block">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
            >
              Kilépés
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Generate form card */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
            <h2 className="text-base font-semibold text-gray-900">Promo kód generálás</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Row 1: Type, Max uses, Expires */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Típus</label>
                  <select
                    value={codeType}
                    onChange={(e) => setCodeType(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="therapist_pro">therapist_pro</option>
                    <option value="trial_7d">trial_7d</option>
                    <option value="trial_30d">trial_30d</option>
                    <option value="lifetime">lifetime</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Max. felhasználás</label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Lejárat</label>
                  <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Row 2: Recipient name, email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Címzett neve{' '}
                    <span className="text-gray-400 font-normal">(opcionális)</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="pl. Dr. Nagy Éva"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Címzett emailje{' '}
                    <span className="text-gray-400 font-normal">(opcionális)</span>
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="pl. terapeuta@klinika.hu"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Row 3: Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Megjegyzés{' '}
                  <span className="text-gray-400 font-normal">(opcionális)</span>
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="pl. Konferenciai csomag, Terapeuták 2026"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {genError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{genError}</p>
              )}
              {genSuccess && (
                <p className="text-sm text-teal-700 bg-teal-50 rounded-lg px-3 py-2 font-mono font-semibold">
                  {genSuccess}
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={generating}
                  className="px-6 py-2.5 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors"
                >
                  {generating ? 'Generálás…' : '✨ Kód generálása'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Codes list card */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
              <h2 className="text-base font-semibold text-gray-900">
                Promo kódok
                {codes.length > 0 && (
                  <span className="text-gray-400 font-normal text-sm ml-2">({codes.length})</span>
                )}
              </h2>
            </div>
            <button
              onClick={fetchCodes}
              className="text-xs text-teal-600 hover:text-teal-700 transition-colors font-medium"
            >
              ↻ Frissítés
            </button>
          </div>

          <div className="p-6">
            {codesLoading ? (
              <p className="text-sm text-gray-400 py-4 text-center">Betöltés…</p>
            ) : codes.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">Még nincsenek promo kódok.</p>
            ) : (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Kód</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Típus</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Felhasználás</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Lejárat</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Státusz</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Címzett</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {codes.map((c) => {
                      const expired = new Date(c.expires_at) < new Date();
                      const exhausted = c.used_count >= c.max_uses;
                      const active = c.is_active && !expired && !exhausted;

                      return (
                        <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                          {/* Code */}
                          <td className="py-3.5 px-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-gray-900 tracking-widest text-sm">
                                {c.code}
                              </span>
                              <button
                                onClick={() => handleCopy(c.code, c.id)}
                                className="text-gray-300 hover:text-teal-500 transition-colors"
                                title="Másolás"
                              >
                                {copiedId === c.id ? '✅' : '📋'}
                              </button>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="py-3.5 px-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                              {c.type}
                            </span>
                          </td>

                          {/* Uses */}
                          <td className="py-3.5 px-2 text-gray-600">
                            <span className={exhausted ? 'text-orange-500 font-semibold' : ''}>
                              {c.used_count}
                            </span>
                            <span className="text-gray-400">/{c.max_uses}</span>
                          </td>

                          {/* Expires */}
                          <td className="py-3.5 px-2">
                            <span className={expired ? 'text-gray-400' : 'text-gray-600'}>
                              {formatDate(c.expires_at)}
                            </span>
                          </td>

                          {/* Status badge */}
                          <td className="py-3.5 px-2">
                            {active ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                Aktív
                              </span>
                            ) : expired ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                                Lejárt
                              </span>
                            ) : exhausted ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                                Kimerült
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                                Inaktív
                              </span>
                            )}
                          </td>

                          {/* Recipient */}
                          <td className="py-3.5 px-2">
                            {c.recipient_name || c.recipient_email ? (
                              <div className="text-xs">
                                {c.recipient_name && (
                                  <div className="font-medium text-gray-800">{c.recipient_name}</div>
                                )}
                                {c.recipient_email && (
                                  <div className="text-gray-400">{c.recipient_email}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>

                          {/* Email action */}
                          <td className="py-3.5 px-2">
                            {c.email_sent_at ? (
                              <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                                ✅ Elküldve
                              </span>
                            ) : c.recipient_email ? (
                              <button
                                onClick={() => handleSendEmail(c)}
                                disabled={sendingEmailId === c.id}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                {sendingEmailId === c.id ? '…' : '✉️ Email küldés'}
                              </button>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
