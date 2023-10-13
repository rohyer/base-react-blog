import './PageNews.css';
import Card2 from '../../Components/Card2/Card2';
import React from 'react';
import { Container, Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PageNews = ({ id, slug }) => {
  const [pageCount, setPageCount] = React.useState(null);
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [p, setP] = React.useState(1);
  let navigate = useNavigate();
  let wait = false;

  const fetchDataInitial = async () => {
    wait = true;
    setIsLoading(true);
    setError(null);
    console.log(p);

    try {
      const response = await fetch(
        `http://localhost:1337/api/${slug}?pagination[page]=${p}&pagination[pageSize]=3&populate=*`,
        {
          headers,
        },
      );
      const data = await response.json();

      setPartnersPosts((prevPosts) => [...prevPosts, ...data.data]);
      setP(p + 1);
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => {
        wait = false
        setIsLoading(false)
      }, 1000);
    }
    
  };

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight - 200 < document.querySelector('.posts').offsetHeight + document.querySelector('.posts').offsetTop || isLoading
      // window.innerHeight + document.documentElement.scrollTop !==
      //   document.documentElement.offsetHeight ||
      // isLoading
    ) {
      return;
    } else if (!isLoading) {
      fetchDataInitial();
    }
    
  };

  React.useEffect(() => {
    // window.scrollTo(0, 0);

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

    const fetchPageCount = async () => {
      const data = await fetch(
        `http://localhost:1337/api/${slug}?pagination[page]=1&pagination[pageSize]=3&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPageCount(res.meta.pagination.pageCount);
    };
    fetchData();
    fetchPageCount();
    // fetchDataInitial();

    // const fetchPostsData = async () => {
    //   const data = await fetch(
    //     `http://localhost:1337/api/${slug}?pagination[page]=1&pagination[pageSize]=6&populate=*`,
    //     {
    //       headers,
    //     },
    //   );
    //   const res = await data.json();
    //   setPartnersPosts(res.data);
    // };

    // fetchPostsData();
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

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
              <Card2 data={data} api="noticias" />
            </div>
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
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

export default PageNews;
