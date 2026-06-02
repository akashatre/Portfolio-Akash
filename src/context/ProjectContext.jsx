import { createContext, useContext, useState } from 'react';
import { initialProjects } from '../data/initialProjects';

const ProjectContext = createContext();
export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        try {
            const saved = localStorage.getItem('portfolio_projects');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Schema update check: if new project id 5 is missing, force reset to show the new projects
                if (parsed.length < initialProjects.length || !parsed.some(p => p.id === 5)) {
                    localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
                    return initialProjects;
                }
                return parsed;
            }
            return initialProjects;
        } catch { return initialProjects; }
    });

    const updateProjects = (newProjects) => {
        setProjects(newProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
    };

    return (
        <ProjectContext.Provider value={{ projects, setProjects: updateProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};
