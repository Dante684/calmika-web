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
  return new Date(dateStr).toLocaleDateString('en-GB', {
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
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [genSuccess, setGenSuccess] = useState('');

  // Codes list
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [codesLoading, setCodesLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      setAuthError('Access denied: not an admin account.');
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
      setAuthError('Access denied.');
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
    const { error } = await supabase.from('promo_codes').insert({
      code,
      type: codeType,
      max_uses: maxUses,
      used_count: 0,
      expires_at: new Date(expiresAt).toISOString(),
      is_active: true,
      note: note.trim() || null,
      created_by: ADMIN_EMAIL,
    });

    setGenerating(false);
    if (error) {
      setGenError(error.message);
    } else {
      setGenSuccess(`✅ Code generated: ${code}`);
      setNote('');
      fetchCodes();
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🔐</span>
            <h1 className="text-xl font-bold text-gray-900">Calmika Admin</h1>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            {authError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔐</span>
            <h1 className="text-lg font-bold text-gray-900">Calmika Admin</h1>
            <span className="text-xs text-gray-400 ml-2">Promo Codes</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Generate form */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">Generate Promo Code</h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={codeType}
                  onChange={(e) => setCodeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="therapist_pro">therapist_pro</option>
                  <option value="trial_7d">trial_7d</option>
                  <option value="trial_30d">trial_30d</option>
                  <option value="lifetime">lifetime</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Conference batch, Terapeuták 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {genError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{genError}</p>
            )}
            {genSuccess && (
              <p className="text-sm text-teal-700 bg-teal-50 rounded-lg px-3 py-2 font-mono font-semibold">
                {genSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={generating}
              className="px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {generating ? 'Generating…' : '✨ Generate Code'}
            </button>
          </form>
        </section>

        {/* Codes table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Promo Codes{' '}
              {codes.length > 0 && (
                <span className="text-gray-400 font-normal text-sm">({codes.length})</span>
              )}
            </h2>
            <button
              onClick={fetchCodes}
              className="text-xs text-teal-600 hover:text-teal-700 transition-colors"
            >
              ↻ Refresh
            </button>
          </div>

          {codesLoading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : codes.length === 0 ? (
            <p className="text-sm text-gray-400">No promo codes yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">Code</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">Type</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">Uses</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">Expires</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {codes.map((c) => {
                    const expired = new Date(c.expires_at) < new Date();
                    const exhausted = c.used_count >= c.max_uses;
                    const active = c.is_active && !expired && !exhausted;

                    return (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-gray-900 tracking-widest">
                              {c.code}
                            </span>
                            <button
                              onClick={() => handleCopy(c.code, c.id)}
                              className="text-gray-400 hover:text-teal-600 transition-colors text-xs"
                              title="Copy code"
                            >
                              {copiedId === c.id ? '✅' : '📋'}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                            {c.type}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          <span className={exhausted ? 'text-red-500 font-semibold' : ''}>
                            {c.used_count}
                          </span>
                          <span className="text-gray-400">/{c.max_uses}</span>
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          <span className={expired ? 'text-red-500' : ''}>
                            {formatDate(c.expires_at)}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {active ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                              Active
                            </span>
                          ) : expired ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                              Expired
                            </span>
                          ) : exhausted ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                              Exhausted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-gray-500 text-xs max-w-[160px] truncate">
                          {c.note || <span className="text-gray-300">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
