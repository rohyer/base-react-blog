import React from 'react';
import Banner from './Banner/Banner';
import About from './About/About';
import AltAbout from './AltAbout/AltAbout';
import Services from './Services/Services';
import Partners from './Partners/Partners';
import News from './News/News';
import AltPartners from './AltPartners/AltPartners';
import AltBanner from './AltBanner/AltBanner';

const Home = () => {
  return (
    <>
      <AltBanner />
      <About />
      <Services />
      <AltAbout />
      <Partners />
      <News />
      <AltPartners />
    </>
  );
};

export default Home;
