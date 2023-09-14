import './App.css';
import Header from './Home/Header/Header';
import Footer from './Home/Footer/Footer';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Pages/Page/Page';
import PostsPage from './Pages/PostsPage/PostsPage';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quem-somos" element={<Page id={1} />} />
        <Route path="noticias" element={<PostsPage id={2} />} />
        <Route path="cta" element={<Page id={3} />} />
        <Route path="servios" element={<PostsPage id={4} />} />
        <Route path="parceiros" element={<PostsPage id={5} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
