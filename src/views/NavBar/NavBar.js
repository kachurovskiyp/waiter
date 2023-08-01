import styles from './NavBar.module.scss';

import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <React.Fragment>
      <Nav className={styles.navBar}>
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      </Nav>
    </React.Fragment>
  )
}

export default NavBar