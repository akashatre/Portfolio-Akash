import { createContext, useContext, useState, useEffect } from 'react';
import { initialProjects } from '../data/initialProjects';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('portfolio_projects');
        return saved ? JSON.parse(saved) : initialProjects;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }, [projects]);

    const addProject = (project) => {
        setProjects(prev => [...prev, { ...project, id: Date.now() }]);
    };

    const deleteProject = (id) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const updateProject = (id, updatedData) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
