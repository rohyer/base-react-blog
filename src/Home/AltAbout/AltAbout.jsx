import React from 'react';
import { Container } from '@mui/material';
import './AltAbout.css';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const AltAbout = () => {
  const [altAboutContent, setAltAboutContent] = React.useState({});
  const [altAboutImage, setAltAboutImage] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'http://localhost:1337/api/paginas/1?populate=*',
        {
          headers,
        },
      );
      const res = await data.json();
      setAltAboutContent(res.data.attributes);
      setAltAboutImage(res.data.attributes.homeImage.data.attributes.url);
    };

    fetchData();
  }, []);

  const getLink = () => {
    const link = altAboutContent.homeButtonLink;
    const buttonText = altAboutContent.homeButtonText;

    if (link) {
      const targetLink = altAboutContent.homeTab ? '_blank' : '_self';

      return (
        <a href={link} target={targetLink}>
          {buttonText}
        </a>
      );
    } else {
      if (buttonText) {
        return (
          <a href={altAboutContent.slug} target="_self">
            {buttonText}
          </a>
        );
      }
    }
  };

  return (
    <section className="about">
      <Container fixed>
        <div className="content">
          <div className="img">
            <img
              src={`${import.meta.env.VITE_APP_API_URL}${altAboutImage}`}
              alt="Imagem"
            />
          </div>
          <div className="text">
            <h2>{altAboutContent.homeTitle}</h2>
            <p>{altAboutContent.homeContent}</p>
            {getLink()}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AltAbout;
