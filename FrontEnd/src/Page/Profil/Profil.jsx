import "./Profil.css";
// img
import NutritionStats from "../../composant/NutritionStats/NutritionStats";
import caloriesImg from "../../assets/calories-icon.png";
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";
// api
import useFetchData from "../../Data/Api";
// id
import {sharedUserID}  from "../Home/Home"

export default function Profil() {
  // Utilisation des hooks pour récupérer les données
  const { data: userData, error: userError } = useFetchData(" " , sharedUserID );
  const { data: activitéData, error: activitéError } = useFetchData("/activity" , sharedUserID );
  const {data: SessionDurationData, error : SessionDurationError }= useFetchData("/average-sessions" , sharedUserID );
  const {data: UserPerfomanceData, error : UserPerfomanceError }= useFetchData("/performance" , sharedUserID );

  // Gestion des erreurs
  if (userError || activitéError || SessionDurationError ||UserPerfomanceError) {
    return <p>Erreur lors du chargement des données</p>;
  }

  // Gestion du chargement
  if (!userData || !activitéData || !SessionDurationData || !UserPerfomanceData) {
    return <p>Chargement des données...</p>;
  }

  // Accès aux données une fois qu'elles sont chargées
  const { firstName } = userData.data.userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.data.keyData;

  // console.log(activitéData);
  // console.log(userData);
// console.log(SessionDurationData);
// console.log(UserPerfomanceData);

  return (
    <section>
      <div className='container-titre-profil'>
        <h1 className='titre-profil'>
          Bonjour <span className='spam-profil'>{firstName}</span>
        </h1>
        <p className='texte-titre-profil'>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      {/* Section des stats */}
      <div className='container-NutritionStats-profil'>
        <NutritionStats
          img={caloriesImg}
          stats={`${calorieCount}kCal`}
          nutri='Calories'
        />
        <NutritionStats
          img={proteinesImg}
          stats={`${proteinCount}g`}
          nutri='Proteines'
        />
        <NutritionStats
          img={glucidesImg}
          stats={`${carbohydrateCount}g`}
          nutri='Glucides'
        />
        <NutritionStats
          img={lipidesImg}
          stats={`${lipidCount}g`}
          nutri='Lipides'
        />
      </div>
    </section>
  );
}
