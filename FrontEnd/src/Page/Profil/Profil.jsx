// Profil.jsx
import "./Profil.css";
import caloriesImg from "../../assets/calories-icon.png";
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";
import useFetchData from "../../Data/Api";
import { useParams } from "react-router-dom";

// composant
import NutritionStats from "../../Components/NutritionStats/NutritionStatsComponent";
import RadialBarChart from "../../Components/RadialBarChart/RadialBarChartComponent";
import RadarChart from "../../Components/RadarChart/RadarChartComponent";
import LineChart from "../../Components/LineChart/LineChartComponent";
import BarChart from "../../Components/BarChart/BarChartComponent";
export default function Profil() {
  const { id } = useParams(); // Récupère le paramètre `id` de l'URL
  const useMock = false; //Passer des données API aux données mockées

  // on fait les call api 
  const { data: userData, error: userError } = useFetchData(" ", id ,useMock );

  const { data: activitéData, error: activitéError } = useFetchData(
    "/activity",
    id,
    useMock
  );
  const { data: sessionDurationData, error: sessionDurationError } =
    useFetchData("/average-sessions", id ,useMock);

  const { data: performanceData, error: performanceError } = useFetchData(
    "/performance",
    id,
    useMock
  );
//// on gere les erreurs 
  if (userError || activitéError || sessionDurationError || performanceError) {
    return <p className="error-profil">Erreur lors du chargement des données</p>;
  }

  if (!userData || !activitéData || !sessionDurationData || !performanceData) {
    return <p className="error-profil">Chargement des données...</p>;
  }
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
