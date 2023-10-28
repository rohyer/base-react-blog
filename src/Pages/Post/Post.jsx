import './Post.css';
import React from 'react';
import { Container, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Post = ({ collectionType }) => {
  const [post, setPost] = React.useState({});
  const [postImage, setPostImage] = React.useState({});
  const { slug } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/${collectionType}?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPost(res.data[0]);
      setPostImage(res.data[0].attributes.innerImage.data);
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

export default Post;
