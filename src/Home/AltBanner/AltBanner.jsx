import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '@mui/material';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import './AltBanner.css';

// import 'swiper/css/swiper.css';
// import Swiper from 'react-id-swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/parallax';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const HeroSliderConfigs = {
  containerClass: 'swiper-container hero-slider',
  parallax: true,
  centeredSlides: true,
  speed: 500,
  spaceBetween: 0,
  effect: 'slide',
};

const AltBanner = () => {
  const [banners, setBanners] = React.useState([]);
  const [parallaxSwiper, setParallaxSwiper] = React.useState(null);
  const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0;
  const parallaxOpacity = 0.5;

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/banners?populate=*', {
        headers,
      });
      const res = await data.json();
      setBanners(res.data);
    };
    fetchData();
  }, []);

  const getLink = (attributes) => {
    const link = attributes.homeButtonLink;
    const buttonText = attributes.homeButtonText;

    if (link) {
      const targetLink = attributes.homeTab ? '_blank' : '_self';

      return (
        <a href={link} target={targetLink}>
          {buttonText}
        </a>
      );
    } else {
      if (buttonText)
        return (
          <a href={attributes.slug} target="_self">
            {buttonText}
          </a>
        );
    }
  };

  return (
    <section className="banner">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Parallax]}
          navigation
          autoplay
          parallax
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          getSwiper={setParallaxSwiper}
        >
          {banners &&
            banners.map(({ attributes, id }) => (
              <SwiperSlide key={id}>
                <div
                  className="image"
                  data-swiper-parallax-opacity={parallaxOpacity}
                  style={{
                    backgroundImage:
                      'url(' +
                      `${import.meta.env.VITE_APP_API_URL}${
                        attributes.homeImage.data.attributes.url
                      }` +
                      ')',
                  }}
                  data-swiper-parallax="-23%"
                >
                  {/* <img
                    src={`${import.meta.env.VITE_APP_API_URL}${
                      attributes.homeImage.data.attributes.url
                    }`}
                    alt=""
                  /> */}
                  <div
                    className="content"
                    data-swiper-parallax="-300"
                    data-swiper-parallax-duration="600"
                  >
                    <h2>{attributes.homeTitle}</h2>
                    <p>{attributes.homeContent}</p>
                    {getLink(attributes)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default AltBanner;
