import styles from './AltHeader.module.css';
import logo from '../../../assets/react.svg';
import flagPtBR from '../../../assets/flags/br.png';
import flagEn from '../../../assets/flags/uk.png';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import {
  Menu,
  Close,
  Facebook,
  Instagram,
  YouTube,
  LinkedIn,
} from '@mui/icons-material';
import SecondLevelNavBarBox from '../../../Components/SecondLevelNavBarBox/SecondLevelNavBarBox';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: 'Vg7gzkXf6y!kqDb'
// };
// http://localhost:1337/api/menus?fields[0]=menuTitle&fields[1]=slug&fields[2]=homeButtonLink&fields[3]=homeTab

const Header = () => {
  const [pages, setPages] = useState([]);
  const [info, setInfo] = useState();
  const [state, setState] = useState({
    right: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:1337/api/menus?populate=*', {
        headers,
      });
      const res = await data.json();
      setPages(res.data);
    };

    const fetchInfoData = async () => {
      const response = await fetch('http://localhost:1337/api/informacao', {
        headers,
      });
      const json = await response.json();
      setInfo(json.data.attributes);
    };

    fetchData();
    fetchInfoData();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getLinkNavbar = (attributes, responsive) => {
    const link = attributes.link;
    const target = attributes.tab ? '_blank' : '_self';
    const classNavbar = responsive
      ? styles.responsiveNavbarLink
      : styles.desktopNavbarLink;

    if (link) {
      if (!responsive) {
        if (!attributes.secondLevel) {
          return (
            <Link
              to={link}
              target={target}
              className={classNavbar + ' ' + styles.desktopNavbarLinkBorder}
            >
              {attributes.title}
            </Link>
          );
        } else {
          return (
            <>
              <Link to={link} target={target} className={classNavbar}>
                {attributes.title}
              </Link>
              <SecondLevelNavBarBox
                slug={attributes.paginas.data[0].attributes.slug}
                pages={attributes.paginas.data}
              />
            </>
          );
        }
      } else {
        if (!attributes.secondLevel) {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={link}
                  target={target}
                  className={classNavbar + ' ' + styles.desktopNavbarLinkBorder}
                  onClick={toggleDrawer('right', false)}
                >
                  {attributes.title}
                </Link>
              </ListItemButton>
            </ListItem>
          );
        } else {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{attributes.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <SecondLevelNavBarBox
                    slug={attributes.paginas.data[0].attributes.slug}
                    pages={attributes.paginas.data}
                    handleClick={toggleDrawer('right', false)}
                    showAll={true}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        }
      }
    }
  };

  return (
    <header>
      <div className={styles.topItems}>
        <Container fixed>
          <div className={styles.contact}>
            {info && (
              <>
                <a
                  href={info.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className={styles.socialNetworksIcon} />
                </a>
                <a
                  href={info.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className={styles.socialNetworksIcon} />
                </a>
                <a
                  href={info.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTube className={styles.socialNetworksIcon} />
                </a>
                <a
                  href={info.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn className={styles.socialNetworksIcon} />
                </a>
              </>
            )}
            <Link className={styles.searchIcon} to="pesquisa">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        </Container>
      </div>
      <Container fixed>
        <div className={styles.items}>
          <div className={styles.logo}>
            <Link to={window.location.origin}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <nav>
            <ul>
              {pages.map(({ attributes, id }) => (
                <li className="nav-item" key={id}>
                  {getLinkNavbar(attributes, false)}
                </li>
              ))}
            </ul>

            <div className={styles.flags}>
              <div onClick={() => trocarIdioma('pt')}>
                <img src={flagPtBR} alt="pt-BR" />
              </div>
              <div onClick={() => trocarIdioma('en')}>
                <img src={flagEn} alt="en" />
              </div>
            </div>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              className={styles.buttonResponsiveNavbar}
              onClick={toggleDrawer('right', true)}
            >
              <Menu />
            </IconButton>
          </nav>
        </div>
      </Container>

      <Drawer
        anchor="right"
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <Close
          className={styles.responsiveMenuClose}
          onClick={toggleDrawer('right', false)}
        />

        <Box sx={{ width: 250 }} role="presentation">
          <List className={styles.listResponsiveNavbar}>
            {pages.map(({ attributes, id }) => (
              <ListItem key={id} disablePadding>
                {getLinkNavbar(attributes, true)}
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </header>
  );
};

export default Header;
