import React from 'react';
import { Link } from 'react-router-dom';

import UserAuth from '../UserAuth/UserAuth';

import HeaderStyles from './Header.module.scss';

const Header = () => {
  return (
    <header className={HeaderStyles.head}>
      <Link to="/" className={HeaderStyles.link}>
        <span className={HeaderStyles.txt}>Realworld Blog</span>
      </Link>
      <UserAuth />
    </header>
  );
};

export default Header;
