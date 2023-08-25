import './Footer.css';
import logo from '../../assets/react.svg';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import { Container } from '@mui/material';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const Footer = () => {
  const [pages, setPages] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/informacao', {
        headers,
      });
      const res = await data.json();
      setPages({
        siteTitle: res.data.attributes.siteTitle,
        addressText: res.data.attributes.addressText,
        addressLink: res.data.attributes.addressLink,
        facebook: res.data.attributes.facebookLink,
        instagram: res.data.attributes.instagramLink,
        youtube: res.data.attributes.youtubeLink,
        linkedin: res.data.attributes.linkedinLink,
        whatsappText: res.data.attributes.whatsappText,
        whatsappLink: res.data.attributes.whatsappLink,
        telephone: res.data.attributes.telephone,
        email: res.data.attributes.email,
      });
    };
    fetchData();
  }, []);

  return (
    <footer>
      <Container fixed>
        <div className="container-md">
          <Grid className="footer-items" container spacing={0}>
            <Grid item xs={12} md={4} className="footer-logo">
              <a href={window.location.origin}>
                <img src={logo} alt="logo" />
              </a>
            </Grid>

            <Grid item xs={12} md={4} className="footer-info">
              <p>{pages.siteTitle}</p>
              <a
                href={pages.addressLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pages.addressText}
              </a>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              direction="column"
              className="footer-contact"
            >
              <div className="footer-numbers">
                <a
                  href={pages.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i> {pages.whatsappText}
                </a>
                <a
                  href={`tel:${pages.telephone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-phone"></i> {pages.telephone}
                </a>
              </div>
              <div className="footer-social-network">
                <a
                  href={pages.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook />
                </a>
                <a
                  href={pages.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </a>
                <a
                  href={pages.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTube />
                </a>
                <a
                  href={pages.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
