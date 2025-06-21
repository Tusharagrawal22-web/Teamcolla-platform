import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{};:,<.>]).{8,}$/;

  const isPasswordStrong = passwordRegex.test(password);
  const isFormValid = email.trim() !== '' && isPasswordStrong;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <label className="block text-sm text-white">
            Email <span className="text-red-500">*</span>
            <input
              className="w-full mt-1 p-3 border border-gray-50 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block text-sm text-white relative">
            Password <span className="text-red-500">*</span>
            <input
              className="w-full mt-1 p-3 border border-gray-50 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Must be 8+ chars with A-Z, a-z, 0-9, and special char"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-9 text-sm text-white"
            >
              {showPassword ? '🚫' : '👁'}
            </button>
          </label>

          {!isPasswordStrong && password && (
            <p className="text-red-400 text-sm">Weak password! Use uppercase, number & special character.</p>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full text-white p-3 rounded-lg font-semibold transition ${
              isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Already have an account?{' '}
          <Link to="/" className="text-green-400 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
