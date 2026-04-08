'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'client' | 'creator';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('client');

  // Load from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('manju-role') as Role;
    if (savedRole && (savedRole === 'client' || savedRole === 'creator')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('manju-role', newRole);
  };

  const toggleRole = () => {
    const newRole = role === 'client' ? 'creator' : 'client';
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
