import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ loading }) => {
  React.useEffect(() => {
    if (!loading)
      setTimeout(
        () =>
          document
            .querySelector(`.${styles.whiteScreen}`)
            .classList.add('hidden'),
        200,
      );
  }, [loading]);

  return (
    <div className={styles.whiteScreen}>
      <span className={styles.loading}></span>
    </div>
  );
};

export default Loading;
