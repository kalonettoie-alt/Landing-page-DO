import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import TargetAudience from './components/TargetAudience';
import AdvantagesSwitcher from './components/AdvantagesSwitcher';
import Method from './components/Method';
import Pricing from './components/Pricing';
import ProofGrid from './components/ProofGrid';
import Differentiation from './components/Differentiation';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <TargetAudience />
      <AdvantagesSwitcher />
      <Method />
      <Pricing />
      <ProofGrid />
      <Differentiation />
      <AboutUs />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
