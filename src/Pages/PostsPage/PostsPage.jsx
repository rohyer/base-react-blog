import './PostsPage.css';
import Card1 from '../../components/Card1/Card1';
import Card3 from '../../components/Card3/Card3';
import React from 'react';
import { Container, Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PostsPage = ({ id, slug }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/paginas/${id}?populate[0]=innerImage`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data);
    };

    const fetchPostsData = async () => {
      const data = await fetch(`http://localhost:1337/api/${slug}?populate=*`, {
        headers,
      });
      const res = await data.json();
      setPartnersPosts(res.data);
    };

    fetchData();
    fetchPostsData();
  }, [id, slug]);

  const getImage = () => {
    if (image) {
      return (
        <img
          className="inner-img"
          src={`${import.meta.env.VITE_APP_API_URL}${image.attributes.url}`}
          alt="Imagem"
        />
      );
    }
  };

  const getRightCardComponent = (data) => {
    if (slug === 'noticias') {
      return <Card1 data={data} api="noticias" />;
    } else if (slug === 'servicos') {
      return <Card1 data={data} api="servicos" />;
    } else if (slug === 'parceiros') {
      return <Card3 data={data} api="parceiros" />;
    }
  };

  return (
    <div className="posts-page">
      <Container fixed>
        <h1 className="inner-title--single">{page.innerTitle}</h1>

        {getImage()}

        <div className="inner-text">
          <ReactMarkdown>{page.innerContent}</ReactMarkdown>
        </div>
      </Container>

      <Container fixed>
        <div className="posts">
          {partnersPosts.map((data) => (
            <div key={data.id}>{getRightCardComponent(data)}</div>
          ))}
        </div>
      </Container>

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

export default PostsPage;
