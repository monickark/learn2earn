import { useEffect, useState } from 'react';

export default function AuthScreen({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check existing session from server
    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL || window.location.origin;
        const url = `${base.replace(/\/$/, '')}/api/auth/session`;
        const res = await fetch(url, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data?.user) {
          localStorage.removeItem('guest');
          onAuthenticated(data.user);
        }
      } catch (_) {}
    })();
  }, [onAuthenticated]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const endpoint = mode === 'signin' ? 'login' : 'signup';
      const url = `${base.replace(/\/$/, '')}/api/auth/${endpoint}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name: mode === 'signup' ? name : undefined })
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Failed to reach auth service'); }
      if (!res.ok) throw new Error(data?.error || 'Authentication failed');
      localStorage.removeItem('guest');
      if (data?.requiresVerification) {
        // Show message and do not auto-auth
        setError('Check your email to verify your account, then sign in.');
        return;
      }
      onAuthenticated(data.user);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('guest', 'true');
    onAuthenticated({ guest: true });
  };

  const loginAsDemo = async () => {
    setError('');
    setLoading(true);
    try {
      const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
      const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
      if (!demoEmail || !demoPassword) {
        localStorage.setItem('guest', 'true');
        localStorage.setItem('demo', 'true');
        onAuthenticated({ guest: true, demo: true });
        return;
      }
      // Try login first, if fails then signup
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const loginUrl = `${base.replace(/\/$/, '')}/api/auth/login`;
      let res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: demoEmail, password: demoPassword })
      });
      let data;
      if (!res.ok) {
        const signupUrl = `${base.replace(/\/$/, '')}/api/auth/signup`;
        res = await fetch(signupUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: demoEmail, password: demoPassword })
        });
        const text = await res.text();
        try { data = JSON.parse(text); } catch { throw new Error('Failed to reach auth service'); }
        if (!res.ok) throw new Error(data?.error || 'Demo signup failed');
      } else {
        const text = await res.text();
        try { data = JSON.parse(text); } catch { throw new Error('Failed to reach auth service'); }
      }
      localStorage.removeItem('guest');
      localStorage.setItem('demo', 'true');
      onAuthenticated(data.user);
    } catch (err) {
      setError(err.message || 'Demo login failed');
      localStorage.setItem('guest', 'true');
      localStorage.setItem('demo', 'true');
      onAuthenticated({ guest: true, demo: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">Welcome to Vidgenz</h1>
        <p className="text-gray-600 text-center mb-6">Sign in or continue as guest</p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-md text-sm font-medium"
          >
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-indigo-700 hover:underline"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Have an account? Sign in'}
          </button>
          <button
            type="button"
            onClick={continueAsGuest}
            className="text-gray-700 hover:underline"
          >
            Continue as Guest
          </button>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={loginAsDemo}
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-md text-sm font-medium"
          >
            {loading ? 'Please wait…' : 'Login as Demo User'}
          </button>
        </div>
      </div>
    </div>
  );
}


