import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./Redux/slices/user-slice"; // Updated path
import Home from "./pages/Home";
import Header from "./components/Header";
import Search from "./pages/Search";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Authenticated Routes */}
          <Route
            path="/upload"
            element={<PrivateRoute element={<Upload />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute element={<Search />} />}
          />

          {!isAuthenticated && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <ToastContainer />
      <LoadingScreen />
    </Router>
  );
};

export default App;
