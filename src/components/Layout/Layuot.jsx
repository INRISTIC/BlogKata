import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

import LayoutStyles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={LayoutStyles.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
