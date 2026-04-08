'use client';

import React from 'react';
import { RoleProvider } from '@/context/RoleContext';
import { ToastProvider } from '@/context/ToastContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <RoleProvider>
        {children}
      </RoleProvider>
    </ToastProvider>
  );
}
