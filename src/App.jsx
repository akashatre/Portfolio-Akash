import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { WebsiteProvider } from './context/WebsiteContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';


function App() {
  return (
    <ProjectProvider>
      <WebsiteProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </WebsiteProvider>
    </ProjectProvider>
  );
}

export default App;
