import React from 'react';
import styles from './SecondLevelNavBarBox.module.css';
import { Link } from 'react-router-dom';
import SecondLevelNavBarPages from '../SecondLevelNavBarPages/SecondLevelNavBarPages';
import SecondLevelNavBarCategories from '../SecondLevelNavBarCategories/SecondLevelNavBarCategories';

const SecondLevelNavBarBox = ({ slug, pages }) => {
  return (
    <div className="second-level-navbar">
      {slug === 'noticias' ? (
        <SecondLevelNavBarCategories />
      ) : (
        <SecondLevelNavBarPages pages={pages} />
      )}
    </div>
  );
};

export default SecondLevelNavBarBox;
