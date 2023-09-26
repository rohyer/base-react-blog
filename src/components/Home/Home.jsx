import React from 'react';
import Banner from './Banner/Banner';
import About from './About/About';
import AltAbout from './AltAbout/AltAbout';
import Services from './Services/Services';
import Partners from './Partners/Partners';
import News from './News/News';
import AltPartners from './AltPartners/AltPartners';
import AltBanner from './AltBanner/AltBanner';
import './Home.css';

const Home = () => {
  const [scrollProsition, setScrollPosition] = React.useState(0);
  const [innerHeight, setInnerHeight] = React.useState(0);
  const [elements, setElements] = React.useState(null);

  React.useEffect(() => {
    function getElementsPositions() {
      const element = document.querySelectorAll(
        '.hidden-left-element, .hidden-right-element, .hidden-bottom-element',
      );
      setElements(element);
    }
    function getInnerHeight() {
      setInnerHeight(window.innerHeight);
    }

    getInnerHeight();
    getElementsPositions();
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      setScrollPosition(this.window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    function getElements() {
      elements.forEach((element) => {
        if (scrollProsition + innerHeight - 200 >= element.offsetTop) {
          element.classList.add('show-element');
        }
      });
    }

    elements && getElements();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollProsition]);

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
