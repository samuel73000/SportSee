import { useState, useEffect } from "react";
import "./Home.css";
import NutritionStats from "../../composant/NutritionStats/NutritionStats";
import caloriesImg from "../../assets/calories-icon.png";
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";

export default function Home() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [proteines, setProteines] = useState("");
  const [glucides, setGlucides] = useState("");
  const [lipides, setLipides] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/user/12")// on peut mettre 18 a la place du 12
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.data.userInfos.firstName);
        setCalories(data.data.keyData.calorieCount);
        setProteines(data.data.keyData.proteinCount);
        setGlucides(data.data.keyData.carbohydrateCount);
        setLipides(data.data.keyData.lipidCount);
        console.log(data);
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
      <div className="container-NutritionStats-home">
        <NutritionStats img={caloriesImg} stats={`${calories}kCal`} nutri="Calories" />
        <NutritionStats img={proteinesImg} stats={`${proteines}g`} nutri="Proteines" />
        <NutritionStats img={glucidesImg} stats={`${glucides}g`} nutri="Glucides" />
        <NutritionStats img={lipidesImg} stats={`${lipides}g`} nutri="Lipides" />
      </div>
    </section>
  );
}
