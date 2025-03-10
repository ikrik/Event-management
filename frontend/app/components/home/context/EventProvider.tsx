import { createContext, ReactNode, useMemo, useState } from 'react';

export interface EventContextType {
  newRow: boolean;
  setNewRow: (newRow: boolean) => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [newRow, setNewRow] = useState<boolean>(false);

  const ctx = useMemo(
    () => ({
      newRow,
      setNewRow,
    }),
    [newRow],
  );

  return <EventContext.Provider value={ctx}>{children}</EventContext.Provider>;
};
