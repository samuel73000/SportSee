// Profil.jsx
import "./Profil.css";
import NutritionStats from "../../composant/NutritionStats/NutritionStatsComponent";
import caloriesImg from "../../assets/calories-icon.png";
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";
import useFetchData from "../../Data/Api";
import { useParams } from "react-router-dom";

// composant
import RadialBarChart from "../../composant/RadialBarChart/RadialBarChartComponent";
import RadarChart from "../../composant/RadarChart/RadarChartComponent";
import LineChart from "../../composant/LineChart/LineChartComponent";
import BarChart from "../../composant/BarChart/BarChartComponent";
export default function Profil() {
  const { id } = useParams(); // Récupère le paramètre `id` de l'URL

  // on fait les call api 
  const { data: userData, error: userError } = useFetchData(" ", id);

  const { data: activitéData, error: activitéError } = useFetchData(
    "/activity",
    id
  );
  const { data: sessionDurationData, error: sessionDurationError } =
    useFetchData("/average-sessions", id);

  const { data: performanceData, error: performanceError } = useFetchData(
    "/performance",
    id
  );
// on gere les erreurs 
  if (userError || activitéError || sessionDurationError || performanceError) {
    return <p>Erreur lors du chargement des données</p>;
  }

  if (!userData || !activitéData || !sessionDurationData || !performanceData) {
    return <p>Chargement des données...</p>;
  }
  // console.log(userData);
  // console.log(activitéData);
  // console.log(sessionDurationData);
  // console.log(performanceData);

  return (
    <section className='section-page-profil'>
      <div className='container-allconposant-Profil'>
        <div className='container-allCompoantSaufNutri'>
          <div className='container-titre-profil'>
            <h1 className='titre-profil'>
              Bonjour <span className='spam-profil'>{userData.firstName}</span>
            </h1>
            <p className='texte-titre-profil'>
              Félicitation ! Vous avez explosé vos objectifs hier 👏
            </p>
          </div>

          <div className='container-BarChart-Profil'>
            <BarChart data={activitéData} />
          </div>
          <div className='container-composant-stats-Perf'>
            <LineChart data={sessionDurationData} />
            <RadarChart data={performanceData} />
            <RadialBarChart value={userData.todayScore} />
          </div>
        </div>

        <div className='container-NutritionStats-profil'>
          <NutritionStats
            img={caloriesImg}
            stats={`${userData.calorieCount}kCal`}
            nutri='Calories'
          />
          <NutritionStats
            img={proteinesImg}
            stats={`${userData.proteinCount}g`}
            nutri='Proteines'
          />
          <NutritionStats
            img={glucidesImg}
            stats={`${userData.carbohydrateCount}g`}
            nutri='Glucides'
          />
          <NutritionStats
            img={lipidesImg}
            stats={`${userData.lipidCount}g`}
            nutri='Lipides'
          />
        </div>
      </div>
    </section>
  );
}
