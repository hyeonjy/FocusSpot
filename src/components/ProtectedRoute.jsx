import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const { isAuthenticated } = useUserStore();
  // 임시 사용자 로그인 여부
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
