import styles from './Partners.module.css';
import Card3 from '../../../Components/Card3/Card3.jsx';
import React from 'react';
import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Partners = () => {
  const [partners, setPartners] = React.useState({});
  const [partnersPosts, setPartnersPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/paginas/5`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPartners(res.data.attributes);
    };

    const fetchPostsData = async () => {
      const data = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/parceiros?pagination[page]=1&pagination[pageSize]=6&populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPartnersPosts(res.data);
    };

    fetchData();
    fetchPostsData();
  }, []);

  const getLink = () => {
    const link = partners.homeButtonLink;
    const buttonText = partners.homeButtonText;

    if (link) {
      const buttonTarget = partners.homeTab ? '_blank' : '_self';

      return (
        <Link to={link} target={buttonTarget}>
          {buttonText}
        </Link>
      );
    }
  };

  return (
    <div className={styles.partners}>
      <Container fixed>
        <div className={styles.topContent}>
          <h2 className="hidden-bottom-element">{partners.homeTitle}</h2>
          <p className="hidden-bottom-element">{partners.homeContent}</p>
        </div>

        <div className={`${styles.posts} hidden-bottom-element`}>
          {partnersPosts &&
            partnersPosts.map((data, index) => (
              <Card3 data={data} key={index} api="parceiros" />
            ))}
        </div>

        <div className={`${styles.bottomContent} hidden-bottom-element`}>
          {getLink()}
        </div>
      </Container>
    </div>
  );
};

export default Partners;
