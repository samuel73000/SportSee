import "./Header.css";
import logo from "../../assets/logo.png"
import nav from '../../assets/nav.png'
export default function Header() {
  return (
    <header>
      <div className="header-top">
      <img src={logo} alt="logo du site"  className="logo-header"/>
      <a href="#" className="lien-header">Accueil</a>
      <a href="#" className="lien-header">Profil</a>
      <a href="#" className="lien-header">Réglage</a>
      <a href="#" className="lien-header">Communauté</a>
      </div>
      <div className="header-left">
        <img src={nav} alt="nav" className="logo-header-left" />
        <p className="p-header-left">Copiryght, SportSee 2020</p>
      </div>
    </header>
  );
}
