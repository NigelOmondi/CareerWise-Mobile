import React, { createContext, useState } from 'react';

interface CompletedChaptersContextType {
  isChapterComplete: boolean;
  setIsChapterComplete: (value: boolean) => void;
}

export const CompletedChaptersContext = createContext<CompletedChaptersContextType | undefined>(undefined);

export const CompletedChaptersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChapterComplete, setIsChapterComplete] = useState(false);

  return (
    <CompletedChaptersContext.Provider value={{ isChapterComplete, setIsChapterComplete }}>
      {children}
    </CompletedChaptersContext.Provider>
  );
};
