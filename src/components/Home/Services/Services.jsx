import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@mui/material/Container';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Card1 from '../../Card1/Card1';
import styles from './Services.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const headers = {
  Authorization: 'bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Services = () => {
  const [services, setServices] = React.useState({});
  const [servicesPosts, setServicesPosts] = React.useState([]);
  const [swiper, setSwiper] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/4', {
        headers,
      });
      const res = await data.json();
      setServices(res.data.attributes);
    };

    const fetchPostsData = async () => {
      const data = await fetch(
        'http://localhost:1337/api/servicos?populate=*',
        {
          headers,
        },
      );
      const res = await data.json();
      setServicesPosts(res.data);
    };

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = services.homeButtonLink;

    if (link) {
      const buttonTitle = services.homeButtonText;
      const targetLink = services.homeTab ? '_blank' : '_self';

      return (
        <Link to={`${link}`} target={targetLink}>
          {buttonTitle}
        </Link>
      );
    }
  };

  return (
    <div className={styles.services}>
      <Container fixed>
        <div className={styles.topContent}>
          <h2>{services.homeTitle}</h2>
          <p>{services.homeContent}</p>
        </div>

        <div className={styles.posts}>
          <Swiper
            className="teste"
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay
            spaceBetween={30}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {servicesPosts &&
              servicesPosts.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card1 data={item} api="servicos" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className={styles.bottomContent}>{getLink()}</div>
      </Container>
    </div>
  );
};

export default Services;
