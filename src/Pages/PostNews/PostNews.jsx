import './PostNews.css';
import React from 'react';
import { Container, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

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
      setImagesGallery(res.data[0].attributes.gallery.data);
    };

    fetchData();

    let lightbox = new PhotoSwipeLightbox({
      gallery: '#my-test-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    window.scrollTo(0, 0);

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
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
        <Container fixed>
          <h2 className="inner-title">Galeria</h2>
          <div className="pswp-gallery" id="my-test-gallery">
            {imagesGallery.map((image, index) => (
              <a
                href={`${import.meta.env.VITE_APP_API_URL}${
                  image.attributes.url
                }`}
                data-pswp-width={`${image.attributes.width}`}
                data-pswp-height={`${image.attributes.height}`}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}${
                    image.attributes.formats.small.url
                  }`}
                  alt=""
                />
              </a>
            ))}
          </div>
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
