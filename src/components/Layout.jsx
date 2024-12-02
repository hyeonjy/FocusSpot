import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname === '/map';

  if (isMapPage) return <Outlet />;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
