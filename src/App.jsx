import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <ParticlesBackground />
      <ScrollProgress />
      <FloatingWhatsApp />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
