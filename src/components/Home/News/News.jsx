import React from 'react';
import { Container } from '@mui/material';
import Card1 from '../../Card1/Card1';
import styles from './News.module.css';
import { Link } from 'react-router-dom';

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
        <Link
          to={news.homeButtonLink}
          target={news.homeTab ? '_blank' : '_self'}
        >
          {news.homeButtonText}
        </Link>
      );
    }
  };

  if (news) {
    return (
      <div className={styles.news}>
        <Container fixed>
          <div className={styles.topContent}>
            <h2>{news.homeTitle}</h2>
            <p>{news.homeContent}</p>
          </div>

          <div className="posts">
            {newsPosts &&
              newsPosts.map((item, index) => (
                <Card1 data={item} api="noticias" />
              ))}
          </div>

          <div className={styles.bottomContent}>{getLink()}</div>
        </Container>
      </div>
    );
  }
};

export default News;
