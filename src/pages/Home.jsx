import { lazy, Suspense } from 'react';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import CalmMode from '../components/CalmMode';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import AIConsole from '../components/AIConsole';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Websites from '../components/Websites';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
    <div className="app-container">
        <CustomCursor />
        <ScrollProgress />
        <CalmMode />
        <Navbar />
        <main>
            <Hero />
            <TechMarquee />
            <About />
            <Services />
            <Skills />
            
            {/* Interactive Prompt Engineering Playground */}
            <section id="ai-playground" style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', padding: '6.5rem 1.5rem' }}>
                <div className="container">
                    <AIConsole />
                </div>
            </section>

            <Experience />
            <Projects />
            <Websites />
            <Contact />
        </main>
        <Footer />
    </div>
);

export default Home;
