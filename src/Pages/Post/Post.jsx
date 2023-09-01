import './Post.css';
import React from 'react';
import { Container, Button } from '@mui/material';
// import { useNavigate, useLoaderData } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Post = ({ id }) => {
  const pageData = useLoaderData().data[0];
  let navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getImage = () => {
    if (pageData.attributes.innerImage.data) {
      return <img className="inner-img" src={`${import.meta.env.VITE_APP_API_URL}${pageData.attributes.innerImage.data.attributes.url}`} alt="Imagem" />
    }
  }

  return (    
    <div className="page">
      <Container fixed>
        <h1 class="inner-title--responsive">{pageData.attributes.innerTitle}</h1>

        {getImage()}

        <div className="inner-text">
          <h1 class="inner-title--desktop">{pageData.attributes.innerTitle}</h1>
          <ReactMarkdown>
            {pageData.attributes.innerContent}
          </ReactMarkdown>
        </div>
      </Container>
      <Container fixed>
        <Button className="back-btn" variant="contained" color="inherit" onClick={() => navigate(-1)}>Voltar</Button>
      </Container>
    </div>
  )
}

export default Post