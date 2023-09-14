import './Card3.css';
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
        <a
          key={data.id}
          href={`${window.location.origin}/${api}/${data.attributes.slug}`}
          target="_self"
          className="post-partner"
        >
          {getPostCard(data)}
        </a>
      );
    } else {
      return (
        <div key={data.id} className="post-partner">
          {getPostCard(data)}
        </div>
      );
    }
  };

  return getPostLink(data);
};

export default Card3;
