import "./Header.css";
import logo from "../../assets/logo.png"
import nav from '../../assets/nav.png'
import { Link } from "react-router-dom";
export default function Header() {
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
