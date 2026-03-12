import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isConfigValid } from '../firebase/config';
import { Music, Loader2, AlertTriangle } from 'lucide-react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isConfigValid);

  useEffect(() => {
    if (!isConfigValid) return;

     // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading
  };

  if (!isConfigValid) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-bg-primary p-6 text-center">
        <AlertTriangle className="mb-6 h-16 w-16 text-yellow-500" />
        <h1 className="mb-2 text-2xl font-bold text-text-primary">Firebase Not Configured</h1>
        <p className="max-w-md text-interactive">
          Please set up your Firebase project and add your credentials to the <code>.env.local</code> file as described in the <code>walkthrough.md</code>.
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-bg-primary">
          <div className="flex flex-col items-center gap-4">
             <Music className="w-12 h-12 text-interactive animate-pulse" />
             <Loader2 className="w-6 h-6 animate-spin text-interactive/50" />
          </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
