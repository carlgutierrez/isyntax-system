import React from 'react';
import { Container } from 'react-bootstrap';

import MainSection from './landingSections/MainSection';
import ImproveSection from './landingSections/ImproveSection';
import NoviceSection from './landingSections/NoviceSection';
import DesignSection from './landingSections/DesignSection';
import ContactSection from './landingSections/ContactSection';
import ScrollToTop from './../components/ScrollToTop';
import Footer from './../components/Footer';

function LandingPage() {
  return (
    <>
      <Container>
        <ScrollToTop />
        <MainSection />
        <ImproveSection />
        <NoviceSection />
        <DesignSection />
        <ContactSection />
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;
