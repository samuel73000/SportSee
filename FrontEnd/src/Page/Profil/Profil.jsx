import React, { useState, useEffect } from "react";  // Importation de React et des hooks `useState` et `useEffect`
import "./Profil.css"; // Importation du fichier CSS pour la page de profil
import NutritionStats from "../../composant/NutritionStats/NutritionStatsComponent"; // Importation du composant NutritionStats
import caloriesImg from "../../assets/calories-icon.png"; // Importation des images des icônes pour les nutriments
import proteinesImg from "../../assets/protein-icon.png";
import glucidesImg from "../../assets/carbs-icon.png";
import lipidesImg from "../../assets/fat-icon.png";
import useFetchData from "../../Data/Api"; // Importation du hook personnalisé pour récupérer les données via API ou données mockées
import { useParams } from "react-router-dom"; // Importation de `useParams` pour récupérer les paramètres d'URL
import { userDataList } from "../../Data/Mock/mockData"; // Importation des données mockées de l'utilisateur

// Importation des composants de graphiques
import RadialBarChart from "../../composant/RadialBarChart/RadialBarChartComponent";
import RadarChart from "../../composant/RadarChart/RadarChartComponent";
import LineChart from "../../composant/LineChart/LineChartComponent";
import BarChart from "../../composant/BarChart/BarChartComponent";

// Composant Profil
export default function Profil() {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL

  // Recherche de l'utilisateur dans la liste des données mockées selon l'ID
  const user = userDataList.find((user) => user.id === parseInt(id)); 

  // Initialisation des états avec les données de l'utilisateur ou des valeurs par défaut
  const [userData, setUserData] = useState(user ? user.data.userInfos : {});
  const [activitéData, setActivitéData] = useState(user ? user.data.activity : []);
  const [sessionDurationData, setSessionDurationData] = useState(user ? user.data.averageSessions : []);
  const [performanceData, setPerformanceData] = useState(user ? user.data.performance : []);

  // Appels à l'API pour récupérer les données
  const { data: userDataAPI, error: userError } = useFetchData(" ", id); // Données utilisateur
  const { data: activitéDataAPI, error: activitéError } = useFetchData("/activity", id); // Données d'activité
  const { data: sessionDurationDataAPI, error: sessionDurationError } = useFetchData("/average-sessions", id); // Données de durée de session
  const { data: performanceDataAPI, error: performanceError } = useFetchData("/performance", id); // Données de performance

  // Utilisation de `useEffect` pour mettre à jour les états avec les données de l'API ou mockées lorsque les données arrivent
  useEffect(() => {
    if (userDataAPI && !userError) {
      setUserData(userDataAPI); // Met à jour les données utilisateur
    }
    if (activitéDataAPI && !activitéError) {
      setActivitéData(activitéDataAPI); // Met à jour les données d'activité
    }
    if (sessionDurationDataAPI && !sessionDurationError) {
      setSessionDurationData(sessionDurationDataAPI); // Met à jour les données de session
    }
    if (performanceDataAPI && !performanceError) {
      setPerformanceData(performanceDataAPI); // Met à jour les données de performance
    }
  }, [
    userDataAPI,
    activitéDataAPI,
    sessionDurationDataAPI,
    performanceDataAPI,
  ]);

  // Gestion des erreurs pour chaque appel API
  if (userError || activitéError || sessionDurationError || performanceError) {
    console.log("Erreur lors du chargement des données API :", {
      userError,
      activitéError,
      sessionDurationError,
      performanceError,
    });
  }

  return (
    <section className='section-page-profil'> {/* Section principale de la page de profil */}
      <div className='container-allconposant-Profil'>
        <div className='container-allCompoantSaufNutri'>
          <div className='container-titre-profil'>
            {/* Titre de la page avec le nom de l'utilisateur */}
            <h1 className='titre-profil'>
              Bonjour <span className='spam-profil'>{userData.firstName}</span>
            </h1>
            <p className='texte-titre-profil'>
              Félicitation ! Vous avez explosé vos objectifs hier 👏
            </p>
          </div>

          {/* Graphiques de la page de profil */}
          <div className='container-BarChart-Profil'>
            <BarChart data={activitéData} /> {/* Graphique en barres de l'activité */}
          </div>
          <div className='container-composant-stats-Perf'>
            <LineChart data={sessionDurationData} /> {/* Graphique linéaire de la durée des sessions */}
            <RadarChart data={performanceData} /> {/* Graphique radar des performances */}
            <RadialBarChart value={userData.todayScore} /> {/* Graphique radial du score aujourd'hui */}
          </div>
        </div>

        {/* Section des statistiques nutritionnelles */}
        <div className='container-NutritionStats-profil'>
          {/* Composants NutritionStats pour afficher les données nutritionnelles */}
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
