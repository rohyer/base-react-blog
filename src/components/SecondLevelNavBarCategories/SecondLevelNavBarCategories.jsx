import React from 'react';
import styles from './SecondLevelNavBarCategories.module.css';
import { Link } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const SecondLevelNavBarCategories = ({ handleClick, showAll }) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/categorias`,
        {
          headers,
        },
      );
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

        {showAll && (
          <li key="0">
            <Link
              to={`${import.meta.env.VITE_APP_ORIGIN_URL}/noticias`}
              onClick={handleClick}
            >
              Ver todos
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default SecondLevelNavBarCategories;
