import { Link } from 'react-router-dom';
import styles from './Card3.module.css';
import React from 'react';

const Card3 = ({ data, api }) => {
  const getPostCard = (data) => {
    return (
      <img
        src={`${import.meta.env.VITE_APP_API_URL}${
          data.attributes.cardImage.data.attributes.url
        }`}
        alt="Imagem"
      />
    );
  };

  const getPostLink = (data) => {
    const content = data.attributes.innerContent;

    if (content) {
      return (
        <Link
          key={data.id}
          to={`${window.location.origin}/${api}/${data.attributes.slug}`}
          target="_self"
          className={styles.post}
        >
          {getPostCard(data)}
        </Link>
      );
    } else {
      return (
        <div key={data.id} className={styles.post}>
          {getPostCard(data)}
        </div>
      );
    }
  };

  return getPostLink(data);
};

export default Card3;
