import './PageCategory.css';
import Card2 from '../../Components/Card2/Card2';
import React from 'react';
import { Container, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PageCategory = () => {
  const [page, setPage] = React.useState({});
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const { slug } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);

    const fetchData = async () => {
      const data = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/categorias?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data);
    };

    const initialFetchPosts = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/noticias?filters[categoria][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=6&populate=*`,
        {
          headers,
        },
      );
      const data = await response.json();

      setPartnersPosts(data.data);
    };

    const fetchPageCount = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/noticias?filters[categoria][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=6`,
        {
          headers,
        },
      );
      const data = await response.json();
      setPageCount(data.meta.pagination.pageCount);
      setCurrentPage((currentPage) => currentPage + 1);
    };

    fetchData();
    initialFetchPosts();
    fetchPageCount();
  }, [slug]);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/noticias?filters[categoria][slug][$eq]=${slug}&pagination[page]=${currentPage}&pagination[pageSize]=6&populate=*`,
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
        {page[0] && (
          <h1 className="inner-title inner-title--single">
            {page[0].attributes.title}
          </h1>
        )}
      </Container>

      {partnersPosts && (
        <Container fixed>
          <div className="posts">
            {partnersPosts.map((data) => (
              <div key={data.id}>
                <Card2 data={data} api="noticias" />
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
      )}

      <Container fixed className="center-items">
        {pageCount > 1 && currentPage <= pageCount && (
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

export default PageCategory;
