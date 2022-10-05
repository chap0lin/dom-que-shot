import { createContext, ReactNode, useContext } from 'react';

interface GlobalContextValue {
  user_id: string | null;
}

const GlobalContext = createContext<GlobalContextValue>({ user_id: null });

interface GlobalProviderProps {
  children: ReactNode;
}

export default function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;

  const value = {
    user_id: 'dale',
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (typeof context === 'undefined') {
    throw new Error(`useGlobalContext must be used within a GlobalContext`);
  }

  return context;
}
