import "./Home.css";
import fermer from "../../assets/fermer.png"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const Karl = 12;
  const Cecilia = 18;

  const [Modal, setModal] = useState(false)

  return (
    <section className='section-home'>
      <div className='container-btn-home'>
        <Link to={`Profil/${Karl}`} className='btn-home'>
          Karl
        </Link>
        <Link to={`Profil/${Cecilia}`} className='btn-home'>
          Cecilia
        </Link>
        <button className='btn-home' onClick={() => setModal(!Modal)}>Mock</button>
      </div>
      {Modal && (
        <div className='modal'>
          <img src={fermer}  onClick={() => setModal(false)} className="fermer" alt="lofo fermer modal" />
          <Link className='btn-home-mock' > Karl mocker</Link>
          <Link className='btn-home-mock' >Cecilia mocker</Link>
        </div>
      )}
    </section>
  );
}
