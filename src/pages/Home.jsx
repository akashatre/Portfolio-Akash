import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Websites from '../components/Websites';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="app-container">
            <CustomCursor />
            <ScrollProgress />
            <FloatingWhatsApp />
            <Navbar />
            <main>
                <Hero />
                <TechMarquee />
                <About />
                <Services />
                <Skills />
                <Experience />
                <Projects />
                <Websites />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
