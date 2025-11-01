import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  fontSize: string;
  fontName: string;
  theme: string;
  brandLogo: string | null;
  language: string;
  setFontSize: (size: string) => void;
  setFontName: (name: string) => void;
  setTheme: (theme: string) => void;
  setBrandLogo: (logo: string | null) => void;
  setLanguage: (lang: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const themes = [
  { id: 'default', name: 'Purple Dream', primary: '245 45% 52%', secondary: '280 40% 70%' },
  { id: 'ocean', name: 'Ocean Blue', primary: '200 80% 50%', secondary: '180 60% 55%' },
  { id: 'sunset', name: 'Sunset Orange', primary: '25 85% 55%', secondary: '340 75% 60%' },
  { id: 'forest', name: 'Forest Green', primary: '140 60% 45%', secondary: '120 50% 55%' },
  { id: 'royal', name: 'Royal Gold', primary: '45 90% 55%', secondary: '30 80% 50%' },
];

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
];

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || '16');
  const [fontName, setFontName] = useState(() => localStorage.getItem('fontName') || 'Bricolage Grotesque');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');
  const [brandLogo, setBrandLogo] = useState<string | null>(() => localStorage.getItem('brandLogo'));
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('fontName', fontName);
    document.body.style.fontFamily = `'${fontName}', sans-serif`;
  }, [fontName]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const selectedTheme = themes.find(t => t.id === theme);
    if (selectedTheme) {
      document.documentElement.style.setProperty('--primary', selectedTheme.primary);
      document.documentElement.style.setProperty('--secondary', selectedTheme.secondary);
    }
  }, [theme]);

  useEffect(() => {
    if (brandLogo) {
      localStorage.setItem('brandLogo', brandLogo);
    } else {
      localStorage.removeItem('brandLogo');
    }
  }, [brandLogo]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <SettingsContext.Provider value={{
      fontSize,
      fontName,
      theme,
      brandLogo,
      language,
      setFontSize,
      setFontName,
      setTheme,
      setBrandLogo,
      setLanguage,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
