// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

type User = {
  uid: string;
  email: string;
  name?: string;
  role?: string;
  teamId?: string;
};

type AuthContextType = {
  currentUser: User | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const payload = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          };

          await axios.post('http://localhost:5174/api/users', payload);
          const res = await axios.get(`http://localhost:5174/api/users/${firebaseUser.uid}`);

          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            ...res.data,
          });
        } catch (err) {
          console.error('❌ Backend user fetch failed:', err);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
