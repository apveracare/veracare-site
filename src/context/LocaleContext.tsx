import { createContext, useContext, useState, type ReactNode } from 'react';
import { DICT, type Dict, type Locale } from '../lib/site';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  d: Dict;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  d: DICT.en,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const value: LocaleContextValue = { locale, setLocale, d: DICT[locale] };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
