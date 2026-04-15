import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home     from './pages/Home.jsx';
import About    from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact  from './pages/Contact.jsx';

function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function App() {
  return (
    <div className="app">
      <CursorGlow />
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
