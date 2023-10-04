import styles from './AltHeader.module.css';
import logo from '../../../assets/react.svg';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  List,
  ListItem,
  Drawer,
  Divider,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu, Close } from '@mui/icons-material';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: 'Vg7gzkXf6y!kqDb'
// };

const AltHeader = () => {
  const [pages, setPages] = useState([]);
  const [state, setState] = useState({
    right: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'http://localhost:1337/api/paginas?fields[0]=menuTitle&fields[1]=slug&fields[2]=homeButtonLink&fields[3]=homeTab',
        {
          headers,
        },
      );
      const res = await data.json();
      setPages(res.data);
    };

    fetchData();
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
    const link = attributes.homeButtonLink;
    const classNavbar = responsive
      ? styles.responsiveNavbarLink
      : styles.desktopNavbarLink;

    if (link) {
      const target = attributes.homeTab ? '_blank' : '_self';

      return (
        <Link to={link} target={target} className={classNavbar}>
          {attributes.menuTitle}
        </Link>
      );
    } else {
      return (
        <a to={attributes.slug} target="_self" className={classNavbar}>
          {attributes.menuTitle}
        </a>
      );
    }
  };

  const handleScroll = () => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 100) {
      header.classList.add(styles.scrolled);
    } else {
      header.classList.remove(styles.scrolled);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header>
      <Container fixed>
        <div className={styles.items}>
          <div className={styles.logo}>
            <Link to={window.location.origin}>
              <img src={logo} alt="" />
            </Link>
          </div>

          <ul>
            {pages.map(({ attributes, id }) => (
              <li key={id}>{getLinkNavbar(attributes, false)}</li>
            ))}
          </ul>

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

        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer('right', false)}
          onKeyDown={toggleDrawer('right', false)}
        >
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

export default AltHeader;