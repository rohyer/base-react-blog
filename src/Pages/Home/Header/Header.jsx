import styles from './Header.module.css';
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
import SecondLevelNavBar from '../../../Components/SecondLevelNavBar/SecondLevelNavBar';

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
    const link = attributes.link;
    const target = attributes.tab ? '_blank' : '_self';
    const classNavbar = responsive
      ? styles.responsiveNavbarLink
      : styles.desktopNavbarLink;

    if (link) {
      if (!attributes.secondLevel) {
        return (
          <Link to={link} target={target} className={classNavbar}>
            {attributes.title}
          </Link>
        );
      } else {
        return (
          <>
            <Link to="#" target={target} className={classNavbar}>
              {attributes.title}
            </Link>
            <SecondLevelNavBar />
          </>
        );
      }
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
              <li className="nav-item" key={id}>
                {getLinkNavbar(attributes, false)}
              </li>
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

export default Header;
