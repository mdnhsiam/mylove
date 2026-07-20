'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AppContextType {
  unlocked: boolean;
  setUnlocked: (v: boolean) => void;
  herName: string;
  herNickname: string;
  startDate: Date;
  lightMode: boolean;
  setLightMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  unlocked: false,
  setUnlocked: () => {},
  herName: 'Meri Jaan',
  herNickname: 'meri jaan',
  startDate: new Date('2025-08-21'),
  lightMode: false,
  setLightMode: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlockedState] = useState(false);
  const [lightMode, setLightModeState] = useState(false);

  // Rehydrate unlock state from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('mj_unlocked');
      if (stored === '1') setUnlockedState(true);
    } catch {}
  }, []);

  // Apply light/dark class to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (lightMode) {
      html.classList.add('light');
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
    }
  }, [lightMode]);

  const setUnlocked = useCallback((v: boolean) => {
    setUnlockedState(v);
    try {
      if (v) sessionStorage.setItem('mj_unlocked', '1');
      else sessionStorage.removeItem('mj_unlocked');
    } catch {}
  }, []);

  const setLightMode = useCallback((v: boolean) => {
    setLightModeState(v);
  }, []);

  return (
    <AppContext.Provider
      value={{
        unlocked,
        setUnlocked,
        herName: 'Meri Jaan',
        herNickname: 'meri jaan',
        startDate: new Date('2025-08-21'),
        lightMode,
        setLightMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
