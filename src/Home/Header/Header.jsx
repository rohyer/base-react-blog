import './Header.css';
import logo from '../../assets/react.svg';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  List,
  ListItem,
  Drawer,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import { Menu, Close } from '@mui/icons-material';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};
// const loginData = {
//   identifier: 'guilhermerl.dev@gmail.com',
//   password: 'Vg7gzkXf6y!kqDb'
// };

const Header = () => {
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

    if (link) {
      const target = attributes.homeTab ? '_blank' : '_self';

      return (
        <a href={link} target={target}>
          {attributes.menuTitle}
        </a>
      );
    } else {
      return (
        <a href={attributes.slug} target="_self">
          {attributes.menuTitle}
        </a>
      );
    }
  };

  return (
    <header>
      <Container fixed>
        <div className="items">
          <div className="logo">
            <a href={window.location.origin}>
              <img src={logo} alt="" />
            </a>
          </div>

          <ul>
            {pages.map(({ attributes, id }) => (
              <li key={id}>{getLinkNavbar(attributes)}</li>
            ))}
          </ul>

          <Button
            className="header-menu-button"
            onClick={toggleDrawer('right', true)}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ pr: 0 }}
            >
              <Menu />
            </IconButton>
          </Button>
        </div>
      </Container>

      <Drawer
        anchor="right"
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <Close
          className="responsive-menu-close"
          onClick={toggleDrawer('right', false)}
        />

        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer('right', false)}
          onKeyDown={toggleDrawer('right', false)}
        >
          <List>
            {pages.map(({ attributes, id }) => (
              <ListItem key={id} disablePadding>
                {getLinkNavbar(attributes)}
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
