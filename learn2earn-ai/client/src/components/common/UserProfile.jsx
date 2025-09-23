import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({ display_name: '', avatar_url: '', email: '' });

  useEffect(() => {
    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL || window.location.origin;
        const url = `${base.replace(/\/$/, '')}/api/profile`;
        const res = await fetch(url, { credentials: 'include' });
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch {
          throw new Error('Unexpected response while loading profile');
        }
        if (!res.ok) throw new Error(data?.error || 'Failed to load profile');
        setProfile(data.profile || {});
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const url = `${base.replace(/\/$/, '')}/api/profile`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ display_name: profile.display_name, avatar_url: profile.avatar_url })
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Unexpected response while saving profile'); }
      if (!res.ok) throw new Error(data?.error || 'Failed to update profile');
      setProfile(data.profile || profile);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-600">Loading profile…</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-5 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">User Profile</h2>
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <input
            type="text"
            value={profile.email || ''}
            disabled
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Display Name</label>
          <input
            type="text"
            value={profile.display_name || ''}
            onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Avatar URL</label>
          <input
            type="text"
            value={profile.avatar_url || ''}
            onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
