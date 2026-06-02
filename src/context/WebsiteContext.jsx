import { createContext, useContext, useState, useEffect } from 'react';

const initialWebsites = [
    {
        id: 1,
        title: "Resume Kaka",
        desc: "A professional online resume builder application. Helps users fill out details, choose styles, and download highly structured resume PDFs instantly. Hosted and live.",
        link: "https://resumekaka.online/",
        tags: ["React.js", "TailwindCSS", "PDF Engine", "Hostinger"],
        iconName: "Layout"
    },
    {
        id: 2,
        title: "Sunday Trekkers",
        desc: "A custom tour booking and routing portal designed for outdoor trek communities. Features route maps, registration flows, and scheduling interfaces.",
        link: "https://sundaytrekkers.vytrixtech.com/",
        tags: ["React.js", "Responsive Grid", "CSS Modules", "Netlify"],
        iconName: "Globe"
    },
    {
        id: 3,
        title: "Vytrix Photography",
        desc: "A premium responsive photography showcase portfolio. Features masonry grid galleries, full-screen asset views, and liquid transitions.",
        link: "https://vytrixphotography.netlify.app/",
        tags: ["HTML5", "Vanilla CSS", "JavaScript"],
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
];

const WebsiteContext = createContext();
export const useWebsites = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState(initialWebsites);
    return (
        <WebsiteContext.Provider value={{ websites, setWebsites }}>
            {children}
        </WebsiteContext.Provider>
    );
};
