import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

const ProtectedRoute = () => {
  const { isAuthenticated } = useUserStore();
  // 임시 사용자 로그인 여부
  // let isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default ProtectedRoute;
