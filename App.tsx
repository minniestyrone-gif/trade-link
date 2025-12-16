import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-neutral-950 text-white min-h-screen selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;