import { createContext, useContext, useState, useEffect } from 'react';

const WebsiteContext = createContext();

export const useWebsites = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState(() => {
        const saved = localStorage.getItem('portfolio_websites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('portfolio_websites', JSON.stringify(websites));
    }, [websites]);

    const addWebsite = (website) => {
        setWebsites(prev => [...prev, { ...website, id: Date.now() }]);
    };

    const deleteWebsite = (id) => {
        setWebsites(prev => prev.filter(w => w.id !== id));
    };

    const updateWebsite = (id, updatedData) => {
        setWebsites(prev => prev.map(w => w.id === id ? { ...w, ...updatedData } : w));
    };

    return (
        <WebsiteContext.Provider value={{ websites, addWebsite, deleteWebsite, updateWebsite }}>
            {children}
        </WebsiteContext.Provider>
    );
};
