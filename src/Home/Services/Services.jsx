import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@mui/material/Container';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Services.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

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
        <a href={`${link}`} target={targetLink}>
          {buttonTitle}
        </a>
      );
    }
  };

  return (
    <div className="services">
      <Container fixed>
        <div className="top-content">
          <h2>{services.homeTitle}</h2>
          <p>{services.homeContent}</p>
        </div>

        <div className="posts">
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
                  {({ isActive }) =>
                    isActive ? setSwiper(true) : setSwiper(false)
                  }
                  <a
                    key={index}
                    to={`servicos/${item.attributes.slug}`}
                    className="post"
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_API_URL}${
                        item.attributes.cardImage.data.attributes.url
                      }`}
                      alt="Imagem"
                    />
                    <div className="post-content">
                      <p>{item.attributes.cardTitle}</p>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="bottom-content">{getLink()}</div>
      </Container>
    </div>
  );
};

export default Services;
