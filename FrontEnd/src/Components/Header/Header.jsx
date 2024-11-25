import "./Header.css";
import logo from "../../assets/logo.png"
import nav from '../../assets/nav.png'
import { Link , useLocation } from "react-router-dom";
import React, { useEffect } from "react";
export default function Header() {
  const location = useLocation();
  useEffect(() => {
    const link = document.querySelectorAll(".lien-header");

    // Réinitialiser les décorations de texte
    link.forEach((l) => (l.style.color = 'white'));

    if (location.pathname === "/") {
      link[0].style.color = "red";
    } else if (/^\/Profil\/\d+$/.test(location.pathname))  {
      link[1].style.color = "red"; 
    }
    
  }, [location.pathname]); // Dépendance sur location.pathname pour mettre à jour les styles à chaque changement de chemin


  return (
    <header>
      <div className="header-top">
      <img src={logo} alt="logo du site"  className="logo-header"/>
      <Link to="/" className="lien-header">Accueil</Link>
      <Link to="/Profil" className="lien-header">Profil</Link>
      <Link to="#" className="lien-header">Réglage</Link>
      <Link to="#" className="lien-header">Communauté</Link>
      </div>
      <div className="header-left">
        <img src={nav} alt="nav" className="logo-header-left" />
        <p className="p-header-left">Copiryght, SportSee 2020</p>
      </div>
      
    
    </header>
  );
}
