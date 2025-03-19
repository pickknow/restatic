import React, { createContext, useContext, useState } from 'react';
interface MyContextValue {
  theme: string;
  setTheme: (value: string) => void;
}
// 1. Create a context
// Provide a default value
const ThemeContext = React.createContext<MyContextValue>({
  theme: '', // Default state
  setTheme: (value) => {}, // Default no-op function
});
// 2. Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(){
  return useContext(ThemeContext);
}
