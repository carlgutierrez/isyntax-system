import React from 'react';
import { Container } from 'react-bootstrap';

import NavBar from './../components/NavBar';
import MainSection from './landingSections/MainSection';
import ImproveSection from './landingSections/ImproveSection';
import NoviceSection from './landingSections/NoviceSection';
import DesignSection from './landingSections/DesignSection';
import ContactSection from './landingSections/ContactSection';
import ScrollToTop from './../components/ScrollToTop';
import Footer from './../components/Footer';

const links = [
  {
    label: 'About',
    link: '#about',
  },
  {
    label: 'Mission',
    link: '#mission',
  },
  {
    label: 'Contact',
    link: '#contact',
  },
];

function LandingPage() {
  return (
    <>
      <Container>
        <NavBar links={links} btnLabel='Login' isDropdown={false} />
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
