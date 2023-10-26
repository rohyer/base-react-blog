import React from 'react';
import styles from './SecondLevelNavBarCategories.module.css';
import { Link } from 'react-router-dom';
import Card2 from '../Card2/Card2';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const SecondLevelNavBarCategories = ({ handleClick }) => {
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
                onClick={handleClick}
              >
                {category.attributes.title}
              </Link>
            </li>
          ))}

        <li key="0">
          <Link
            to={`${import.meta.env.VITE_APP_ORIGIN_URL}/noticias`}
            onClick={handleClick}
          >
            Ver todos
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SecondLevelNavBarCategories;
