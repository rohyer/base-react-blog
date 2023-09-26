import './PageContact.css';
import React from 'react';
import { Container, Button, Grid, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const PageContact = ({ id }) => {
  const [page, setPage] = React.useState({});
  const [image, setImage] = React.useState();
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://localhost:1337/api/paginas/${id}?populate=*`,
        {
          headers,
        },
      );
      const res = await data.json();
      setPage(res.data.attributes);
      setImage(res.data.attributes.innerImage.data);
    };

    fetchData();

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="page">
      <Container fixed>
        <h1 className="inner-title inner-title--single">{page.innerTitle}</h1>

        {image && (
          <img
            className="inner-img"
            src={`${import.meta.env.VITE_APP_API_URL}${image.attributes.url}`}
            alt="Imagem"
          />
        )}

        <div className="inner-text">
          <ReactMarkdown>{page.innerContent}</ReactMarkdown>
        </div>
      </Container>
      <Container fixed>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31750.653791926732!2d-35.17825545!3d-5.87925945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2f8d26fc5345d%3A0x30fb1bf11849df24!2sPonta%20Negra%2C%20Natal%20-%20RN!5e0!3m2!1spt-BR!2sbr!4v1695087841937!5m2!1spt-BR!2sbr"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
          <Grid item xs={12} md={6}>
            <form action="">
              <TextField
                id="name"
                label="Nome"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="subject"
                label="Assunto"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="subject"
                label="Mensagem"
                variant="outlined"
                margin="dense"
                multiline={true}
                fullWidth
                rows={5}
              />
              <Button variant="contained" type="submit">
                Enviar
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Container fixed>
        <Button
          className="back-btn"
          variant="contained"
          color="inherit"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Container>
    </div>
  );
};

export default PageContact;
