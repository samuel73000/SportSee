import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profil from "./Page/Profil/Profil.jsx";
import Header from "./Components/Header/Header.jsx";
import Home from "./Page/Home/Home.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Header />
    <main>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Profil/:id' element={<Profil />} />
      </Routes>
    </main>
  </Router>
);
