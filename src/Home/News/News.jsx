import { Container } from '@mui/material';
import React from 'react';
import './News.css';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const News = () => {
  const [news, setNews] = React.useState({});
  const [newsPosts, setNewsPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        import.meta.env.VITE_APP_API_URL + '/api/paginas/2',
        {
          headers,
        },
      );
      const json = await response.json();
      setNews(json.data.attributes);
    };
    const fetchPostsData = async () => {
      const response = await fetch(
        import.meta.env.VITE_APP_API_URL + '/api/noticias?populate=*',
        {
          headers,
        },
      );
      const json = await response.json();
      setNewsPosts(json.data);
    };
    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    if (news.homeButtonLink && news.homeButtonText) {
      return (
        <a
          href={news.homeButtonLink}
          target={news.homeTab ? '_blank' : '_self'}
        >
          {news.homeButtonText}
        </a>
      );
    }
  };

  if (news) {
    return (
      <div className="news">
        <Container fixed>
          <div className="top-content">
            <h2>{news.homeTitle}</h2>
            <p>{news.homeContent}</p>
          </div>

          <div className="posts">
            {newsPosts &&
              newsPosts.map((item, index) => (
                <a key={index} className="post" href="">
                  <img
                    src={`${import.meta.env.VITE_APP_API_URL}${
                      item.attributes.cardImage.data.attributes.url
                    }`}
                    alt="Imagem"
                  />
                  <div className="post-content">
                    <p>{item.attributes.cardTitle}</p>
                  </div>
                </a>
              ))}
          </div>

          <div className="bottom-content">{getLink()}</div>
        </Container>
      </div>
    );
  }
};

export default News;
