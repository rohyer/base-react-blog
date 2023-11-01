import styles from './Search.module.css';
import Card2 from '../../Components/Card2/Card2';
import React from 'react';
import { Container, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Search = () => {
  const [pageCount, setPageCount] = React.useState(null);
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  let navigate = useNavigate();

  const handleSubmit = async ({ target }) => {
    event.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);
    setError(null);

    try {
      const responsePosts = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/noticias?filters[$or][0][innerContent][$contains]=${
          target[0].value
        }&filters[$or][1][cardTitle][$contains]=${
          target[0].value
        }&filters[$or][2][innerTitle][$contains]=${target[0].value}&populate=*`,
        {
          headers,
        },
      );
      // const responsePosts = await fetch(
      //   `${
      //     import.meta.env.VITE_APP_API_URL
      //   }/api/noticias?pagination[page]=${currentPage}&pagination[pageSize]=6&filters[innerContent][$contains]=${
      //     target[0].value
      //   }&populate=*`,
      //   {
      //     headers,
      //   },
      // );
      const jsonPosts = await responsePosts.json();

      setPartnersPosts(jsonPosts.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setCurrentPage((currentPage) => currentPage + 1);
    }

    // const responsePageCount = await fetch(
    //   `${
    //     import.meta.env.VITE_APP_API_URL
    //   }/api/noticias?pagination[page]=1&pagination[pageSize]=6&filters[innerContent][$contains]=${formContent}`,
    //   {
    //     headers,
    //   },
    // );
    // const jsonPageCount = await responsePageCount.json();
    // setPageCount(jsonPageCount.meta.pagination.pageCount);
  };

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/noticias?pagination[page]=${currentPage}&pagination[pageSize]=6&populate=*`,
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
        <form action="" onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="" id="" />

          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </Container>

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

export default Search;
