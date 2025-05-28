
import { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  isVerified?: boolean;
  registrationDate?: string;
  password?: string; // Add password to User interface
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, studentId?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sti_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call your API
      // Priority 1: Check mock users (e.g., predefined admin)
      const mockUsers = [
        { id: '1', name: 'Admin User', email: 'admin@sti.edu', role: 'admin' as const, isVerified: true, password: 'password' }, // Added password for clarity
        { id: '2', name: 'John Doe', email: 'john@sti.edu', role: 'student' as const, studentId: 'STI2024001', isVerified: true, password: 'password' },
        // Jane Smith is initially unverified in mockUsers, to test the pending flow if she tries to log in before approval.
        { id: '3', name: 'Jane Smith', email: 'jane@sti.edu', role: 'student' as const, studentId: 'STI2024002', isVerified: false, password: 'password' }
      ];
      
      let foundUser = mockUsers.find(u => u.email === email);

      if (foundUser) {
        if (password === foundUser.password) { // Use the password from the user object
          if (foundUser.role === 'student' && !foundUser.isVerified) {
            // This case handles pre-defined students who are marked as not verified in mockUsers
            setIsLoading(false);
            return false; // Account not verified
          }
          setUser(foundUser);
          localStorage.setItem('sti_user', JSON.stringify(foundUser));
          setIsLoading(false);
          return true;
        }
      }

      // Priority 2: Check verified users from localStorage (for dynamically registered and approved users)
      const verifiedUsers: User[] = JSON.parse(localStorage.getItem('verified_users') || '[]');
      // In a real app, passwords would be hashed and stored securely.
      // For this mock, we assume registered users also use 'password' or that the password was stored during registration.
      // Let's assume the password was part of the registration and stored with the pending user, then carried to verified_users.
      // If not, we'll need to adjust the registration process to store a (mock) password.
      // For now, we'll stick to the global 'password' for simplicity in this mock.
      const foundVerifiedUser = verifiedUsers.find(u => u.email === email);

      if (foundVerifiedUser && password === foundVerifiedUser.password) { // Use stored password
        if (!foundVerifiedUser.isVerified) {
          // This should ideally not happen if they are in 'verified_users', but as a safeguard:
          setIsLoading(false);
          return false; // Account not verified
        }
        setUser(foundVerifiedUser);
        localStorage.setItem('sti_user', JSON.stringify(foundVerifiedUser));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, studentId?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration - account starts as unverified
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'student',
        studentId,
        isVerified: false,
        registrationDate: new Date().toISOString(),
        password: password // Store the password
      };
      
      // Store in pending users (in real app, this would be in database)
      const pendingUsers = JSON.parse(localStorage.getItem('pending_users') || '[]');
      pendingUsers.push(newUser);
      localStorage.setItem('pending_users', JSON.stringify(pendingUsers));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sti_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
