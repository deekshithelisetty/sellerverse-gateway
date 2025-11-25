import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Structure: { [userEmail]: { [categoryId::subcategoryId]: boolean } }
// NOTE: This is temporarily stored in localStorage for testing purposes.
// Later, this will be replaced with database integration.
type UserCategoryPermissions = Record<string, Record<string, boolean>>;

const STORAGE_KEY = 'userCategoryPermissions';

interface CategoryContextType {
  getUserSubcategoryStatus: (userEmail: string, categoryId: string, subcategoryId: string) => boolean;
  setUserSubcategoryStatus: (userEmail: string, categoryId: string, subcategoryId: string, enabled: boolean) => void;
  getUserEnabledCategories: (userEmail: string) => Array<{ categoryId: string; subcategories: Array<{ id: string; name: string }> }>;
  // Helper functions for testing/debugging
  getAllPermissions: () => UserCategoryPermissions;
  clearAllPermissions: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<UserCategoryPermissions>({});

  // Load from localStorage on mount (for testing - will be replaced with database)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPermissions(parsed);
        console.log('Loaded category permissions from localStorage:', parsed);
      } catch (e) {
        console.error('Failed to parse stored permissions', e);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever permissions change (for testing - will be replaced with database)
  useEffect(() => {
    if (Object.keys(permissions).length > 0 || localStorage.getItem(STORAGE_KEY)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
        console.log('Saved category permissions to localStorage:', permissions);
      } catch (e) {
        console.error('Failed to save permissions to localStorage', e);
      }
    }
  }, [permissions]);

  const getUserSubcategoryStatus = (userEmail: string, categoryId: string, subcategoryId: string): boolean => {
    return permissions[userEmail]?.[`${categoryId}::${subcategoryId}`] || false;
  };

  const setUserSubcategoryStatus = (userEmail: string, categoryId: string, subcategoryId: string, enabled: boolean) => {
    setPermissions(prev => {
      const newPermissions = { ...prev };
      if (!newPermissions[userEmail]) {
        newPermissions[userEmail] = {};
      }
      newPermissions[userEmail][`${categoryId}::${subcategoryId}`] = enabled;
      return newPermissions;
    });
  };

  const getUserEnabledCategories = (userEmail: string) => {
    // This function is not used anymore - we handle it in the component
    // Keeping for backward compatibility
    return [];
  };

  // Helper function to get all permissions (for testing/debugging)
  const getAllPermissions = () => {
    return permissions;
  };

  // Helper function to clear all permissions (for testing/debugging)
  const clearAllPermissions = () => {
    setPermissions({});
    localStorage.removeItem(STORAGE_KEY);
    console.log('Cleared all category permissions');
  };

  return (
    <CategoryContext.Provider value={{ 
      getUserSubcategoryStatus, 
      setUserSubcategoryStatus, 
      getUserEnabledCategories,
      getAllPermissions,
      clearAllPermissions
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryPermissions = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryPermissions must be used within a CategoryProvider');
  }
  return context;
};

