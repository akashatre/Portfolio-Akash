import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio_theme', 'dark');
    }, []);

    const toggleTheme = () => {};

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
