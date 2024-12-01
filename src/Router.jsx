import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Layout from './components/Layout';
import Bookmark from './pages/Bookmark';
import ProtectedRoute from './components/ProtectedRoute';
import Map2 from './pages/Map2';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<Map />} />

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
