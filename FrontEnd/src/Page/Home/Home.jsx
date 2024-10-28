import "./Home.css";
import { useState } from "react";

export let sharedUserID;

export default function Home() {
  const [userID, setUserID] = useState(sharedUserID);

  function ChangeUserIdKarl() {
    setUserID(12);
    sharedUserID = 12;
  }
  function ChangeUserIdCecilia() {
    setUserID(18);
    sharedUserID = 18;
  }

  return (
    <section className='section-home'>
      <button className='btn-home' onClick={ChangeUserIdKarl}>
        Karl
      </button>
      <button className='btn-home' onClick={ChangeUserIdCecilia}>
        Cecilia
      </button>
    </section>
  );
}
