import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@mui/material/Container';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Card1 from '../../../Components/Card1/Card1.jsx';
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

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/paginas/4`,
        {
          headers,
        },
      );
      const res = await data.json();
      setServices(res.data.attributes);
    };

    const fetchPostsData = async () => {
      const data = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/servicos?pagination[page]=1&pagination[pageSize]=8&populate=*`,
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
    <section className={styles.services}>
      <Container fixed>
        <div className={styles.topContent}>
          <h2 className="hidden-bottom-element">{services.homeTitle}</h2>
          <p className="hidden-bottom-element">{services.homeContent}</p>
        </div>

        <div className={`${styles.posts} hidden-bottom-element`}>
          <Swiper
            className="teste"
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay
            spaceBetween={30}
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

        <div className={`${styles.bottomContent} hidden-bottom-element`}>
          {getLink()}
        </div>
      </Container>
    </section>
  );
};

export default Services;
