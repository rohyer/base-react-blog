import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '@mui/material';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import styles from './AltBanner.module.css';

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

const AltBanner = () => {
  const [banners, setBanners] = React.useState([]);
  const [bannerImage, setBannerImage] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/banners', {
        headers,
      });
      const res = await data.json();
      setBanners(res.data);
    };

    const fetchImage = async () => {
      const response = await fetch(
        'http://localhost:1337/api/informacao?populate=*',
        {
          headers,
        },
      );
      const json = await response.json();
      setBannerImage(json.data.attributes.bannerImage.data);
    };
    fetchData();
    fetchImage();
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
    <section className={styles.banner}>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Parallax]}
          navigation
          autoplay
          speed={2000}
          parallax={true}
          watchSlidesProgress={true}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          // onSlideChange={() => console.log(watchSlidesProgress)}
          // onSwiper={(swiper) => console.log(swiper.width)}
        >
          {bannerImage.attributes && (
            <div
              data-swiper-parallax="-23%"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}${
                  bannerImage.attributes.url
                })`,
              }}
              className={styles.image}
            ></div>
          )}

          {banners &&
            banners.map(({ attributes, id }) => (
              <SwiperSlide key={id}>
                <div className={styles.content}>
                  <h2>{attributes.homeTitle}</h2>
                  <p>{attributes.homeContent}</p>
                  {getLink(attributes)}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default AltBanner;
