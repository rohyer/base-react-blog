import React from 'react';
import styles from './Card2.module.css';
import { Link } from 'react-router-dom';

const Card2 = ({ data, api }) => {
  const getPostCard = (data) => {
    return (
      <>
        <img
          src={`${import.meta.env.VITE_APP_API_URL}${
            data.attributes.cardImage.data[0].attributes.url
          }`}
          alt="Imagem"
        />
        <img
          src={`${import.meta.env.VITE_APP_API_URL}${
            data.attributes.cardImage.data[1].attributes.url
          }`}
          alt="Imagem"
        />
        <div className={styles.content}>
          <p>{data.attributes.cardTitle}</p>
        </div>
      </>
    );
  };

  const getPostLink = (data) => {
    const content = data.attributes.innerContent;

    if (content) {
      return (
        <Link
          key={data.id}
          to={`${window.location.origin}/${api}/${data.attributes.slug}`}
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

export default Card2;
