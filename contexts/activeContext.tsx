import { createContext, ReactNode, useContext, useState } from 'react';

interface ActiveContextType {
  active: string;
  changeActive: (_newActive: string) => void;
}

const ActiveContext = createContext<ActiveContextType | undefined>(undefined);

export const useActive = () => {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error('useActive must be used within an ActiveProvider');
  }
  return context;
};

export const ActiveProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState('Home');

  const changeActive = (newActive: string) => {
    setActive(newActive);
  };

  return (
    <ActiveContext.Provider value={{ active, changeActive }}>{children}</ActiveContext.Provider>
  );
};
