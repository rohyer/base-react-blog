import React from 'react';
import styles from './SecondLevelNavBar.module.css';

const SecondLevelNavBar = () => {
  return (
    <div className="second-level-navbar">
      Segundo nível
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default SecondLevelNavBar;
