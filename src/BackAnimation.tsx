import React, {useState} from 'react';

import styles from './BackAnimation.module.css';
import gif from './images/police_car.gif';

const BackAnimation: React.FC = () => {

  const [sun, setSun] = useState(true);

  const toggle = () => {
    sun ? setSun(false) : setSun(true);
  };

  return (
    <div className={sun ? styles.body : styles.dark}>
      <section className={styles.scene}>
        <div className={styles.sun} onClick={toggle}></div>
        <div className={styles.bg}>
          <img src={gif} alt="car1" className={styles.car1} />
          <img src={gif} alt="car1" className={styles.car2} />
        </div>
      </section>
    </div>
  );
};

export default BackAnimation;
