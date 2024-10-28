import "./Profil.css";
import NutritionStats from "../../composant/NutritionStats/NutritionStats";
import caloriesImg from "../../assets/calories-icon.png";
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";

import useFetchData from "../../Data/Api";

export default function Profil() {
  const userId = 12;
  // Utilisation des hooks pour récupérer les données
  const { data: userData, error: userError } = useFetchData(" " , userId);
  const { data: activitéData, error: activitéError } = useFetchData("/activity" , userId);
  const {data: SessionDurationData, error : SessionDurationError }= useFetchData("/average-sessions" , userId);
  const {data: UserPerfomanceData, error : UserPerfomanceError }= useFetchData("/performance" , userId);

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
      <div className='container-titre-home'>
        <h1 className='titre-home'>
          Bonjour <span className='spam-home'>{firstName}</span>
        </h1>
        <p className='texte-titre-home'>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      {/* Section des stats */}
      <div className='container-NutritionStats-home'>
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
