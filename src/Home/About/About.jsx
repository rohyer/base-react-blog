import React from 'react';
import { Container } from '@mui/material';
import './About.css';

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
      setAboutImage(res.data.attributes.homeImage.data.attributes.url);
    };

    fetchData();
  }, []);

  const getLink = () => {
    const link = aboutContent.homeButtonLink;
    const buttonText = aboutContent.homeButtonText;

    if (link) {
      const targetLink = aboutContent.homeTab ? '_blank' : '_self';

      return (
        <a href={link} target={targetLink}>
          {buttonText}
        </a>
      );
    } else {
      if (buttonText) {
        return (
          <a href={aboutContent.slug} target="_self">
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
          <div className="text">
            <h2>{aboutContent.homeTitle}</h2>
            <p>{aboutContent.homeContent}</p>
            {getLink()}
          </div>
          <div className="img">
            <img
              src={`${import.meta.env.VITE_APP_API_URL}${aboutImage}`}
              alt="Imagem"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
