import React from 'react';
import styles from './SecondLevelNavBarCategories.module.css';
import { Link } from 'react-router-dom';
import Card2 from '../Card2/Card2';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const SecondLevelNavBarCategories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:1337/api/categorias', {
        headers,
      });
      const json = await response.json();
      setCategories(json.data);
    };

    fetchData();
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
