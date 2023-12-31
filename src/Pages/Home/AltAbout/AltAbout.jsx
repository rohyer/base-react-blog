import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './AltAbout.module.css';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const AltAbout = () => {
  const [altAboutContent, setAltAboutContent] = React.useState({});
  const [altAboutImage, setAltAboutImage] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/paginas/1?populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setAltAboutContent(res.data.attributes);
      setAltAboutImage(res.data.attributes.homeImage.data);
    };

    fetchData();
  }, []);

  const getLink = () => {
    const link = altAboutContent.homeButtonLink;
    const buttonText = altAboutContent.homeButtonText;

    if (link) {
      const targetLink = altAboutContent.homeTab ? '_blank' : '_self';

      return (
        <Link to={link} target={targetLink}>
          {buttonText}
        </Link>
      );
    }
  };

  return (
    <section className={styles.about}>
      <Container fixed>
        <div className={styles.content}>
          <div className={`${styles.img} hidden-left-element`}>
            {altAboutImage && (
              <img
                src={`${import.meta.env.VITE_APP_API_URL}${
                  altAboutImage.attributes.formats.small.url
                }`}
                alt="Imagem"
              />
            )}
          </div>
          <div className={styles.text}>
            <h2 className="hidden-right-element">
              {altAboutContent.homeTitle}
            </h2>
            <p className="hidden-right-element">
              {altAboutContent.homeContent}
            </p>
            <div className="hidden-right-element">{getLink()}</div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AltAbout;
