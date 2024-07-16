import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { SearchBook } from "./components/pages/SearchBook";
import { BorrowBook } from "./components/pages/BorrowBook";
import { PatronApp } from "./components/pages/PatronApp";
import { Home } from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SearchBook" element={<SearchBook />} />
        <Route path="/BorrowBook" element={<BorrowBook user={user} />} />
        <Route path="/PatronApp" element={<PatronApp user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
