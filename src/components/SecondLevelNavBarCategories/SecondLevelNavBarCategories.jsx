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
              <Link
                to={`${import.meta.env.VITE_APP_ORIGIN_URL}/categoria/${
                  category.attributes.slug
                }`}
              >
                {category.attributes.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SecondLevelNavBarCategories;
