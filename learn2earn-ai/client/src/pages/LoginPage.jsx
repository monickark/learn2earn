import LoginButtons from '../components/LoginButtons';
import logo from '../assets/vidgenz-logo.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Info */}

      <div className="flex flex-col justify-center items-center p-10 bg-gradient-to-br from-primary to-mint text-white">
        <div className="max-w-md text-center">

          <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-brightblue">Vidgenz</span></h1>
          <p className="text-lg mb-6">
            The learning platform where AI-generated educational content meets blockchain-backed credentials and rewards.
          </p>
          <ul className="text-left space-y-2 text-sm md:text-base">
            <li>✅ AI-Powered Learning Content Generation</li>
            <li>✅ Supabase-backed social login</li>
            <li>✅ Blockchain-issued certificates</li>
            <li>✅ Earn SBTs and learn tokens</li>
          </ul>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="flex justify-center items-center p-10 bg-white shadow-xl rounded-none">
        <div className="w-full max-w-md p-8 rounded-lg border border-lightblue shadow-md">
            <img src={logo} alt="Vidgenz Logo" className="h-fit mb-8 text-center " />
     
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">Sign in to Vidgenz</h2>
          <LoginButtons />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don’t have an account? Signing in will auto-create one.
          </p>
        </div>
      </div>
    </div>
  );
}
