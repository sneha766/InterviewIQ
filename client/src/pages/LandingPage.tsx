import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Companies from "../components/landing/Companies";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Companies />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;