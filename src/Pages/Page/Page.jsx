import './Page.css';
import React from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Page = ({ id }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  let navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const data = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/paginas/${id}?populate[0]=innerImage`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="page animateLeft">
      <Container fixed>
        <h1 className="inner-title inner-title--single">{page.innerTitle}</h1>

        {image && (
          <img
            className="inner-img"
            src={`${import.meta.env.VITE_APP_API_URL}${image.attributes.url}`}
            alt="Imagem"
          />
        )}

        <div className="inner-text">
          <ReactMarkdown>{page.innerContent}</ReactMarkdown>
        </div>
      </Container>

      <Container className="center-items" fixed>
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
