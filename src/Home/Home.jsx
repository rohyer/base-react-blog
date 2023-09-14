import React from 'react';
import Banner from './Banner/Banner';
import About from './About/About';
import AltAbout from './AltAbout/AltAbout';
import Services from './Services/Services';
import Partners from './Partners/Partners';
import News from './News/News';
import AltPartners from './AltPartners/AltPartners';

const Home = () => {
  return (
    <>
      <Banner />
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
