import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useToast } from '../components/ToastContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      login({
        id: 'USR-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        name: name,
        email: email,
        role: 'BUSINESS'
      });
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">person_add</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">Create Account</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Join LM Verify to manage your instruments</p>
        </div>

        <form onSubmit={handleSignup} className="neu-flat p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">Full Name or Business</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">person</span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full neu-input-container pl-12 pr-4 py-3 rounded-xl font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 bg-transparent transition-all"
                placeholder="Acme Corp"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full neu-input-container pl-12 pr-4 py-3 rounded-xl font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 bg-transparent transition-all"
                placeholder="owner@business.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full neu-input-container pl-12 pr-4 py-3 rounded-xl font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 bg-transparent transition-all"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 mt-4 neu-flat !bg-primary !text-on-primary font-label-lg font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70 transition-all shadow-[4px_4px_8px_#dce1eb,-4px_-4px_8px_#ffffff]"
          >
            {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Create Account'}
          </button>
        </form>

        <p className="text-center font-body-md text-body-md text-on-surface-variant mt-8">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
