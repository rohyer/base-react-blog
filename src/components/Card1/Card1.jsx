import './Card1.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Card1 = ({ data, api }) => {
  const getPostCard = (data) => {
    return (
      <>
        <img
          src={`${import.meta.env.VITE_APP_API_URL}${
            data.attributes.cardImage.data.attributes.url
          }`}
          alt="Imagem"
        />
        <div className="post-content">
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
          className="post-news"
        >
          {getPostCard(data)}
        </Link>
      );
    } else {
      return (
        <div key={data.id} className="post-news">
          {getPostCard(data)}
        </div>
      );
    }
  };

  return getPostLink(data);
};

export default Card1;
