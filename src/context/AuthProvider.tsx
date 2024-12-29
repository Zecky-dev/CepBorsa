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
  signIn: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    newPasswordAgain: string,
  ) => Promise<{status: string; message: string}>;
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
};

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
    changePassword: async (
      oldPassword: string,
      newPassword: string,
      newPasswordAgain: string,
    ) => {
      if (!oldPassword || !newPassword || !newPasswordAgain) {
        return {
          status: 'warning',
          message: 'fillBlankAreas',
        };
      }

      if (newPassword !== newPasswordAgain) {
        return {
          status: 'warning',
          message: 'notSamePasswords',
        };
      }

      try {
        if (user && user.email) {
          const emailCredential = auth.EmailAuthProvider.credential(
            user.email,
            oldPassword,
          );
          await user.reauthenticateWithCredential(emailCredential);
          await user.updatePassword(newPassword);
          authContext.signOut();

          return {
            status: 'success',
            message: 'passwordChanged',
          };
        } else {
          return {
            status: 'error',
            message: 'userNotAuthenticated',
          };
        }
      } catch (error: any) {
        const errorMessage = error.code
          ? `authErrorMessages.${error.code}`
          : 'unknown';
        return {
          status: 'error',
          message: errorMessage,
        };
      }
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
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
