import './App.css';
import Header from './Home/Header/Header';
import Footer from './Home/Footer/Footer';
import Banner from './Home/Banner/Banner';
import About from './Home/About/About';
import AltAbout from './Home/AltAbout/AltAbout';
import Services from './Home/Services/Services';
import Partners from './Home/Partners/Partners';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <About />
      <Services />
      <AltAbout />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;
