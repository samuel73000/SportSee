import { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/user/18")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.data.userInfos.firstName);
        console.log(data)
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError(error.message); 
      });
  }, []); 
  if (error) {
    return <div>Erreur : {error}</div>;
  }
  return (
    <section>
      <div className="container-titre-home">
        <h1 className="titre-home">
          Bonjour <span className="spam-home">{name}</span>
        </h1>
        <p className="texte-titre-home">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      {/* section stats */}
      <div>

      </div>
    </section>
  );
}
