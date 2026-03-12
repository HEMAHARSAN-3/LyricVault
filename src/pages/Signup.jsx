import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
    }
    setLoading(true);
    try {
      await authService.signup(email, password, name);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
       toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const user = await authService.loginWithGoogle();
      toast.success(`Welcome, ${user.displayName || 'User'}!`);
      navigate('/');
    } catch (error) {
      toast.error('Google signup failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="card-base w-full max-w-md p-8 sm:p-10 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-border-subtle/50 mb-6">
          <Music className="h-8 w-8 text-interactive" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-text-primary mb-2">Create Account</h1>
        <p className="text-interactive/80 mb-8">Join LyricVault to save your lyrics</p>

        <form onSubmit={handleSignup} className="space-y-5 text-left">
           <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border-2 border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary focus-ring transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary focus-ring transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary focus-ring transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-interactive px-4 py-3 font-semibold text-bg-primary transition-colors hover:bg-interactive-hover disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border-subtle after:mt-0.5 after:flex-1 after:border-t after:border-border-subtle">
          <p className="mx-4 mb-0 text-center text-sm font-semibold text-interactive/60">OR</p>
        </div>

        <button
          onClick={handleGoogleSignup}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-border-subtle bg-bg-primary px-4 py-3 font-semibold text-text-primary transition-colors hover:bg-border-subtle/30"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Sign up with Google
        </button>

        <p className="mt-8 text-sm text-interactive/80">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-text-primary hover:underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
