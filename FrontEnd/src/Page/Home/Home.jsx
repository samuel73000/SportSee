import "./Home.css";
import { useState } from "react";

export let sharedUserID;

export default function Home() {
  const [userID, setUserID] = useState(sharedUserID);
  const [texte, setTexte] = useState("");

  function ChangeUserIdKarl() {
    setUserID(12);
    sharedUserID = 12;
    setTexte ("Les données de Karl sont chargées")
  }
  function ChangeUserIdCecilia() {
    setUserID(18);
    sharedUserID = 18;
    setTexte("Les données de Cecilia sont chargées")
  }

  return (
    <section className='section-home'>
      <p className="p-home">{texte}</p>
      <div className="container-btn-home">
      <button className='btn-home' onClick={ChangeUserIdKarl}>
        Karl
      </button>
      <button className='btn-home' onClick={ChangeUserIdCecilia}>
        Cecilia
      </button>
      </div>
    </section>
  );
}
