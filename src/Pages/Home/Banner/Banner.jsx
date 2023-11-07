import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '@mui/material';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './Banner.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Banner = () => {
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/banners?populate=*`,
        {
          headers,
        },
      );
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
    <section className={styles.banner}>
      <Container fixed>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay
          speed={1000}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {banners &&
            banners.map(({ attributes, id }) => (
              <SwiperSlide key={id} className={styles.card}>
                <div className={styles.image}>
                  <img
                    src={`${import.meta.env.VITE_APP_API_URL}${
                      attributes.homeImage.data.attributes.url
                    }`}
                    alt=""
                  />
                </div>
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

export default Banner;
