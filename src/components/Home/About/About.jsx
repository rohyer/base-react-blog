import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const About = () => {
  const [aboutContent, setAboutContent] = React.useState({});
  const [aboutImage, setAboutImage] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'http://localhost:1337/api/paginas/1?populate=*',
        {
          headers,
        },
      );
      const res = await data.json();
      setAboutContent(res.data.attributes);
      setAboutImage(res.data.attributes.homeImage.data);
    };

    fetchData();
  }, []);

  const getLink = () => {
    const link = aboutContent.homeButtonLink;
    const buttonText = aboutContent.homeButtonText;

    if (link) {
      const targetLink = aboutContent.homeTab ? '_blank' : '_self';

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
          <div className={styles.text}>
            <h2>{aboutContent.homeTitle}</h2>
            <p>{aboutContent.homeContent}</p>
            {getLink()}
          </div>
          <div className={styles.img}>
            {aboutImage && (
              <img
                src={`${import.meta.env.VITE_APP_API_URL}${
                  aboutImage.attributes.url
                }`}
                alt="Imagem"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;