import React from 'react';
import './App.css';
import Header from './Pages/Home/Header/Header';
import Footer from './Pages/Home/Footer/Footer';
import Home from './Pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Pages/Page/Page';
import Post from './Pages/Post/Post';
import PageContact from './Pages/PageContact/PageContact';
import Loading from './Components/Loading/Loading';
import PageNews from './Pages/PageNews/PageNews';
import PageServices from './Pages/PageServices/PageServices';
import PagePartners from './Pages/PagePartners/PagePartners';
import PostNews from './Pages/PostNews/PostNews';
import PageCategory from './Pages/PageCategory/PageCategory';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (loading) {
      document.querySelector('body').classList.add('overflow-hidden');
    }
    function handleLoad() {
      setLoading(false);
      document.querySelector('body').classList.remove('overflow-hidden');
    }

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <BrowserRouter>
      <Loading loading={loading} />
      <Header />

      <Routes>
        <Route path="/" element={<Home loading={loading} />} />
        <Route path="quem-somos" element={<Page id={1} />} />
        <Route path="noticias" element={<PageNews />} />
        <Route path="cta" element={<Page id={3} />} />
        <Route path="servicos" element={<PageServices />} />
        <Route path="parceiros" element={<PagePartners />} />
        <Route path="contato" element={<PageContact />} />
        <Route path="categoria/:slug" element={<PageCategory />} />
        <Route
          path="noticias/:slug"
          element={<PostNews collectionType="noticias" />}
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
