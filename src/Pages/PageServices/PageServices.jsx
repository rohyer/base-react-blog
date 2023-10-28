import './PageServices.css';
import Card1 from '../../Components/Card1/Card1';
import React from 'react';
import { Container, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PageServices = ({ id, slug, posts }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(null);
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

    const initialFetchPosts = async () => {
      const response = await fetch(
        `http://localhost:1337/api/${slug}?pagination[page]=${currentPage}&pagination[pageSize]=8&populate=*`,
        {
          headers,
        },
      );
      const data = await response.json();

      setPartnersPosts((prevPosts) => [...prevPosts, ...data.data]);
      setCurrentPage((currentPage) => currentPage + 1);
    };

    const fetchPageCount = async () => {
      const data = await fetch(
        `http://localhost:1337/api/${slug}?pagination[page]=1&pagination[pageSize]=6`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPageCount(res.meta.pagination.pageCount);
    };

    fetchData();
    initialFetchPosts();
    fetchPageCount();
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:1337/api/${slug}?pagination[page]=${currentPage}&pagination[pageSize]=8&populate=*`,
        {
          headers,
        },
      );
      const data = await response.json();

      setPartnersPosts((prevPosts) => [...prevPosts, ...data.data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

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

      <Container fixed>
        <div className="posts">
          {partnersPosts.map((data) => (
            <div key={data.id}>
              <Card1 data={data} api="servicos" />
            </div>
          ))}
        </div>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {error && <p>Error: {error.message}</p>}
      </Container>

      <Container fixed className="center-items">
        {currentPage <= pageCount && (
          <Button
            className="pagination-btn"
            variant="contained"
            color="inherit"
            onClick={handleClick}
          >
            Ver mais
          </Button>
        )}
      </Container>

      <Container fixed className="center-items">
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

export default PageServices;
