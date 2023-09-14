import './App.css';
import Header from './Home/Header/Header';
import Footer from './Home/Footer/Footer';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './Home/Banner/Banner';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
