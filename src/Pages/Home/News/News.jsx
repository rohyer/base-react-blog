import React from 'react';
import { Container } from '@mui/material';
import Card2 from '../../../Components/Card2/Card2.jsx';
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
        import.meta.env.VITE_APP_API_URL +
          '/api/noticias?pagination[page]=1&pagination[pageSize]=6&populate=*',
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
            <h2 className="hidden-bottom-element">{news.homeTitle}</h2>
            <p className="hidden-bottom-element">{news.homeContent}</p>
          </div>

          <div className="posts hidden-bottom-element">
            {newsPosts &&
              newsPosts.map((item) => (
                <Card2 data={item} api="noticias" key={item.id} />
              ))}
          </div>

          <div className={`${styles.bottomContent} hidden-bottom-element`}>
            {getLink()}
          </div>
        </Container>
      </div>
    );
  }
};

export default News;
