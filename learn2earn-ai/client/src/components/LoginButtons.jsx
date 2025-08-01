// src/components/LoginButtons.jsx
import { LockKeyhole, Chrome } from 'lucide-react';

export default function LoginButtons() {
  const redirectToSupabaseProvider = (provider) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={login}
        className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
      >
        <LockKeyhole className="w-5 h-5 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">Sign in</span>
      </button>

      <hr className="border-t border-gray-200" />

      <button
        onClick={() => redirectToSupabaseProvider('google')}
        className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
        <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
      </button>
    </div>
  );
}
