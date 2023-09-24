import React from 'react';
import './App.css';
import Header from './Components/Home/Header/Header';
import Footer from './Components/Home/Footer/Footer';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Components/Page/Page';
import Post from './Components/Post/Post';
import PageContact from './Components/PageContact/PageContact';

function App() {
  const [scrollProsition, setScrollPosition] = React.useState(0);
  const [innerHeight, setInnerHeight] = React.useState(0);
  const [elements, setElements] = React.useState(null);

  React.useEffect(() => {
    function getElementsPositions() {
      const element = document.querySelectorAll(
        '.hidden-left-element, .hidden-right-element, .hidden-top-element',
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
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quem-somos" element={<Page id={1} posts={false} />} />
        <Route
          path="noticias"
          element={<Page id={2} slug="noticias" posts={true} />}
        />
        <Route path="cta" element={<Page id={3} />} posts={false} />
        <Route
          path="servicos"
          element={<Page id={4} slug="servicos" posts={true} />}
        />
        <Route
          path="parceiros"
          element={<Page id={5} slug="parceiros" posts={true} />}
        />
        <Route path="contato" element={<PageContact id={6} slug="contato" />} />

        <Route
          path="noticias/:slug"
          element={<Post collectionType="noticias" />}
        />
        <Route
          path="servicos/:slug"
          element={<Post collectionType="servicos" />}
        />
        <Route
          path="parceiros/:slug"
          element={<Post collectionType="parceiros" />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
