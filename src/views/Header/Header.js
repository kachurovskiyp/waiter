import styles from './Header.module.scss';

import React from 'react'
import NavBar from '../NavBar/NavBar';

const Header = () => {
  return (
    <header className={styles.header}>
      <p>Waiter.app</p>
      <NavBar />
    </header>
  )
}

export default Header