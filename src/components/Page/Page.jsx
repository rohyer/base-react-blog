import './Page.css';
import React from 'react';
import { Container, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Page = ({ id }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/paginas/${id}?populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data);
    };

    fetchData();

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="page">
      <Container fixed>
        <h1 className="inner-title--responsive">{page.innerTitle}</h1>

        {image && (
          <img
            className="inner-img"
            src={`${import.meta.env.VITE_APP_API_URL}${image.attributes.url}`}
            alt="Imagem"
          />
        )}

        <div className="inner-text">
          <h1 className="inner-title--desktop">{page.innerTitle}</h1>
          <ReactMarkdown>{page.innerContent}</ReactMarkdown>
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

export default Page;
