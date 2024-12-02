import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Maps from './pages/Maps';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Layout from './components/Layout';
import Bookmark from './pages/Bookmark';
import ProtectedRoute from './components/ProtectedRoute';
import Map2 from './pages/Map2';
import SharePreview from './pages/SharePreview'; // 공용컴포넌트 미리보는 페이지

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/share" element={<SharePreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<Maps />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/bookmark" element={<Bookmark />} />
          </Route>
        </Route>
        <Route path="/map2" element={<Map2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
