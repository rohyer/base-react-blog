import './PostNews.css';
import React from 'react';
import { Container, Button } from '@mui/material';
// import { useNavigate, useLoaderData } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PostNews = ({ collectionType }) => {
  const [post, setPost] = React.useState({});
  const [postImage, setPostImage] = React.useState({});
  const [imagesGallery, setImagesGallery] = React.useState([]);
  const { slug } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/${collectionType}?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPost(res.data[0]);
      setPostImage(res.data[0].attributes.innerImage.data);
      setImagesGallery(res.data[0].attributes.cardImage.data);
    };

    fetchData();

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page animateLeft">
      {post.attributes && (
        <Container fixed>
          <h1 className="inner-title inner-title--responsive">
            {post.attributes.innerTitle}
          </h1>

          {postImage && (
            <img
              className="inner-img"
              src={`${import.meta.env.VITE_APP_API_URL}${
                postImage.attributes.url
              }`}
              alt="Imagem"
            />
          )}

          <div className="inner-text">
            <h1 className="inner-title inner-title--desktop">
              {post.attributes.innerTitle}
            </h1>
            <ReactMarkdown>{post.attributes.innerContent}</ReactMarkdown>
          </div>
        </Container>
      )}

      {imagesGallery && (
        <Container maxWidth="xl" disableGutters>
          <Swiper
            className="gallery-images"
            freeMode
            autoplay
            modules={[FreeMode, Autoplay]}
            spaceBetween={0}
            // onSlideChange={() => console.log('slide change')}
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
            }}
          >
            {imagesGallery.map((item, index) => (
              <SwiperSlide key={index}>
                <a href="#">
                  <img
                    src={`${import.meta.env.VITE_APP_API_URL}${
                      item.attributes.formats.small.url
                    }`}
                    alt=""
                  />
                </a>
                {/* <Card1 data={item} api="servicos" /> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}

      <Container fixed>
        <Button
          className="back-btn"
          variant="contained"
          color="inherit"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Container>
    </div>
  );
};

export default PostNews;
