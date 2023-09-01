import './PostsPage.css';
import Card1 from '../../components/Card1/Card1';
import Card2 from '../../components/Card2/Card2';
import Card3 from '../../components/Card3/Card3';
import React from 'react';
import { Container, Button } from '@mui/material';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const headers = {
  'Authorization': 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN
}

const PostsPage = ({ id }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  const [partnersPosts, setPartnersPosts] = React.useState([]);
  // let navigate = useNavigate();

  const getCurrentPageAPI = () => {
    if (id === 2) return "noticias";
    else if (id === 3) return "parceiros";
    else if (id === 4) return "equipes";
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const data = await fetch(`http://localhost:1337/api/paginas/${id}?populate=*`, {
        headers
      });
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data.attributes.url);
    }

    const fetchPostsData = async () => {
      const currentPageAPI = getCurrentPageAPI();
      const data = await fetch(`http://localhost:1337/api/${currentPageAPI}?populate=*`, {
        headers
      });
      const res = await data.json();
      setPartnersPosts(res.data);
    }
    
    fetchData();
    fetchPostsData();
  }, []);

  const getImage = (image) => {
    if (image) {
      return <img className="inner-img" src={`${import.meta.env.VITE_APP_API_URL}${image}`} alt="Imagem" />
    }
  }

  const getRightCardComponent = (data) => {
    const currentPageAPI = getCurrentPageAPI();

    if (currentPageAPI === "noticias") {
      return <Card1 data={data} api="noticias" />
    } else if (currentPageAPI === "servicos") {
      return <Card2 data={data} api="servicos" />
    } else if (currentPageAPI === "parceiros") {
      return <Card3 data={data} api="parceiros" />
    }
  }

  return (
    <div className="posts-page">
      <Container fixed>
        <h1 class="inner-title--single">{page.innerTitle}</h1>

        { getImage(image) }
        
        <div className="inner-text">
          <ReactMarkdown>
            {page.innerContent}
          </ReactMarkdown>
        </div>
      </Container>

      <Container fixed>
        <div className="posts">
          { partnersPosts.map(data => getRightCardComponent(data)) }
        </div>
      </Container>

      <Container fixed>
        <Button className="back-btn" variant="contained" color="inherit" onClick={() => navigate(-1)}>Voltar</Button>
      </Container>
    </div>
  )
}

export default PostsPage