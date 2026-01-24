import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TargetAudience from './components/TargetAudience';
import AdvantagesSwitcher from './components/AdvantagesSwitcher';
import Differentiators from './components/Differentiators';
import ProofGrid from './components/ProofGrid';
import Pricing from './components/Pricing';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TargetAudience />
      <AdvantagesSwitcher />
      <Differentiators />
      <ProofGrid />
      <Pricing />
      <AboutUs />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
