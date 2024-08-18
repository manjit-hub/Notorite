import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Search from "./pages/Search";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <Header />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router >
  );
};

export default App;
