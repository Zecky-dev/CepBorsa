import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  signUp: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
      }
    return context;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const authContext: AuthContextType = {
    user,
    initializing,
    signIn: async (email, password) => {
      return await auth().signInWithEmailAndPassword(email, password);
    },
    signUp: async (email, password) => {
      return await auth().createUserWithEmailAndPassword(email, password);
    },
    signOut: async () => {
      await auth().signOut();
    },
    resetPassword: async email => {
      await auth().sendPasswordResetEmail(email);
    },
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);


  return (
    <AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>
  )

};

export default AuthProvider;
