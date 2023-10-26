import React from 'react';
import Styles from './SecondLevelNavBarPages.module.css';
import { Link } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
};

const SecondLevelNavBarPages = ({ pages, handleClick }) => {
  return (
    <ul>
      {pages &&
        pages.map((page) => (
          <li key={page.id}>
            <Link onClick={handleClick}>{page.attributes.homeTitle}</Link>
          </li>
        ))}
    </ul>
  );
};

export default SecondLevelNavBarPages;
