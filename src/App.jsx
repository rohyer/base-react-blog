import './App.css';
import Header from './Components/Home/Header/Header';
import Footer from './Components/Home/Footer/Footer';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Components/Pages/Page/Page';
import PostsPage from './Components/Pages/PostsPage/PostsPage';
import Post from './Components/Pages/Post/Post';
import PageContact from './Components/Pages/PageContact/PageContact';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quem-somos" element={<Page id={1} />} />
        <Route path="noticias" element={<PostsPage id={2} slug="noticias" />} />
        <Route
          path="noticias/:slug"
          element={<Post collectionType="noticias" />}
        />
        <Route path="cta" element={<Page id={3} />} />
        <Route path="servicos" element={<PostsPage id={4} slug="servicos" />} />
        <Route
          path="servicos/:slug"
          element={<Post collectionType="servicos" />}
        />
        <Route
          path="parceiros"
          element={<PostsPage id={5} slug="parceiros" />}
        />
        <Route
          path="parceiros/:slug"
          element={<Post collectionType="parceiros" />}
        />
        <Route path="contato" element={<PageContact id={6} slug="contato" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
