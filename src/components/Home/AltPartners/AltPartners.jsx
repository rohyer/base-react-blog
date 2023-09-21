import styles from './AltPartners.module.css';
import Card3 from '../../Card3/Card3';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Partners = () => {
  const [partners, setPartners] = React.useState({});
  const [partnersPosts, setPartnersPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/paginas/5', {
        headers,
      });
      const res = await data.json();
      setPartners(res.data.attributes);
    };

    const fetchPostsData = async () => {
      const data = await fetch(
        'http://localhost:1337/api/parceiros?populate=*',
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
    <div className={styles.altPartners}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            direction="column"
            className={styles.leftContent}
          >
            <h2>{partners.homeTitle}</h2>
            <p>{partners.homeContent}</p>
            {getLink()}
          </Grid>

          <Grid item xs={12} md={8} className={styles.posts}>
            {partnersPosts &&
              partnersPosts.map((data, index) => (
                <Card3 data={data} key={index} api="parceiros" />
              ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Partners;
