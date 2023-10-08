import React from 'react';
import styles from './SecondLevelNavBarCategories.module.css';
import { Link } from 'react-router-dom';
import Card2 from '../Card2/Card2';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const SecondLevelNavBarCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [newsPosts, setNewsPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:1337/api/categorias', {
        headers,
      });
      const json = await response.json();
      setCategories(json.data);
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

  return (
    <>
      <ul>
        {categories &&
          categories.map((category) => (
            <li key={category.id}>
              <Link to={`${import.meta.env.VITE_APP_ORIGIN_URL}/categoria/${category.attributes.slug}`}>{category.attributes.title}</Link>
            </li>
          ))}
      </ul>
      <div className={styles.posts}>
        {newsPosts &&
          newsPosts.slice(0, 2).map((item) => (
            <Link
              to={`${window.location.origin}/noticias/${item.attributes.slug}`}
              className={styles.post}
              key={item.id}
            >
              <img
                src={`${import.meta.env.VITE_APP_API_URL}${
                  item.attributes.cardImage.data[0].attributes.url
                }`}
                alt="Imagem"
              />
              <div className={styles.content}>
                <p>{item.attributes.cardTitle}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default SecondLevelNavBarCategories;
