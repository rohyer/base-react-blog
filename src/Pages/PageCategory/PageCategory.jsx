import './PageCategory.css';
import Card2 from '../../Components/Card2/Card2';
import React from 'react';
import { Container, Button } from '@mui/material';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PageCategory = () => {
  const [page, setPage] = React.useState({});
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  const { slug } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/categorias?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data);
    };

    const fetchPostsData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/noticias?filters[categoria][slug][$eq]=${slug}&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPartnersPosts(res.data);
    };

    fetchData();
    fetchPostsData();
  }, [slug]);

  page && console.log(page);

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
        </Container>
      )}

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
