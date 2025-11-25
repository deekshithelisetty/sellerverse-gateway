import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  phone?: string;
  role: 'seller' | 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, phone: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithOTP: (emailOrPhone: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const getRoleFromEmail = (email: string): 'admin' | 'user' | 'seller' => {
    if (email === 'admin@tabhi.com') {
      return 'admin';
    } else if (email === 'user@tabhi.com') {
      return 'user';
    }
    return 'seller';
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock authentication - in real app this would call backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email,
      role: getRoleFromEmail(email)
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signUp = async (email: string, phone: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email,
      phone,
      role: getRoleFromEmail(email)
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email: 'seller@example.com',
      role: 'seller'
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signInWithOTP = async (emailOrPhone: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const email = emailOrPhone.includes('@') ? emailOrPhone : undefined;
    const mockUser: User = {
      id: '1',
      email,
      phone: !email ? emailOrPhone : undefined,
      role: email ? getRoleFromEmail(email) : 'seller'
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signInWithGoogle, signInWithOTP, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};