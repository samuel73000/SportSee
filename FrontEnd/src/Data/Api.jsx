import { useState, useEffect } from "react"; // Importation des hooks React nécessaires
import { useMode } from "../Data/Mock/modeContext"; // Importation du contexte pour récupérer le mode actuel (API ou Mock)

// Classe pour formater les données
class DataFormatter {
  // Méthode pour formater les données utilisateur
  static formatUserData(data) {
    return {
      firstName: data?.data?.userInfos?.firstName, // Récupération du prénom
      age: data?.data?.userInfos?.age, // Récupération de l'âge
      lastName: data?.data?.userInfos?.lastName, // Récupération du nom de famille
      calorieCount: data?.data?.keyData?.calorieCount, // Récupération des calories
      proteinCount: data?.data?.keyData?.proteinCount, // Récupération des protéines
      carbohydrateCount: data?.data?.keyData?.carbohydrateCount, // Récupération des glucides
      lipidCount: data?.data?.keyData?.lipidCount, // Récupération des lipides
      todayScore: data?.data?.todayScore || data?.data?.score, // Récupération du score de la journée
    };
  }

  // Formater les données d'activité
  static formatActivityData(data) {
    return data.data.sessions.map((session) => ({
      day: session.day, // Jour de la session
      kilogram: session.kilogram, // Poids en kilogrammes
      calories: session.calories, // Calories brûlées
    }));
  }

  // Formater les données de session
  static formatSessionData(data) {
    return data.data.sessions.map((session) => ({
      day: session.day, // Jour de la session
      sessionLength: session.sessionLength, // Durée de la session
    }));
  }

  // Formater les données de performance
  static formatPerformanceData(data) {
    const kindOrder = [
      "endurance",
      "cardio",
      "énergie",
      "intensité",
      "force",
      "vitesse",
    ];
    const kindTranslations = {
      cardio: "cardio",
      energy: "énergie",
      endurance: "endurance",
      strength: "force",
      speed: "vitesse",
      intensity: "intensité",
    };

    // Mappe les performances, traduit les types et trie par ordre spécifié
    return data.data.data
      .map((item) => ({
        value: item.value, // Valeur de la performance
        kind: kindTranslations[data.data.kind[item.kind]], // Traduction du type en français
      }))
      .sort((a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind)); // Tri selon l'ordre défini
  }
}

// Données Mock pour simuler les réponses de l'API
const mockData = {
  " ": {
    data: {
      userInfos: { firstName: "Mock", age: 25, lastName: "User" },
      keyData: {},
      todayScore: 0.8,
    },
  },
  "/activity": {
    data: { sessions: [{ day: 1, kilogram: 70, calories: 300 }] },
  },
  "/average-sessions": { data: { sessions: [{ day: 1, sessionLength: 30 }] } },
  "/performance": {
    data: { data: [{ kind: 1, value: 50 }], kind: { 1: "cardio" } },
  },
};

// Hook personnalisé pour récupérer des données via l'API ou les données Mock
export default function useFetchData(endpoint, id) {
  const { useMock } = useMode(); // Récupère le mode actuel (Mode Mock ou API réel)
  const [data, setData] = useState(null); // État pour stocker les données récupérées
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    if (!endpoint || !id) return; // Si l'endpoint ou l'id est manquant, on arrête l'exécution

    const fetchData = async () => {
      if (useMock) {
        // Mode Mock : récupération des données simulées
        const mockResponse = mockData[endpoint]; // Récupère les données mock en fonction de l'endpoint
        if (!mockResponse) {
          setError("Endpoint non trouvé dans les données mock"); // Gestion d'erreur si l'endpoint n'est pas dans les données mock
          return;
        }
        // Formate les données récupérées en fonction de l'endpoint
        const formattedData =
          endpoint === " "
            ? DataFormatter.formatUserData(mockResponse) // Formate les données utilisateur
            : endpoint === "/activity"
            ? DataFormatter.formatActivityData(mockResponse) // Formate les données d'activité
            : endpoint === "/average-sessions"
            ? DataFormatter.formatSessionData(mockResponse) // Formate les données de session
            : DataFormatter.formatPerformanceData(mockResponse); // Formate les données de performance

        setData(formattedData); // Stocke les données formatées dans l'état
        return;
      }

      // Mode API réel : récupération des données via l'API
      const url = `${import.meta.env.VITE_API_URL}/user/${id}${endpoint}`; // Construction de l'URL de l'API avec l'ID et l'endpoint

      try {
        const response = await fetch(url); // Effectue la requête fetch pour récupérer les données
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`); // Gestion des erreurs HTTP
        }
        const result = await response.json(); // Récupère les données JSON

        let formattedData;
        // Formate les données récupérées en fonction de l'endpoint
        if (endpoint === " ") {
          formattedData = DataFormatter.formatUserData(result);
        } else if (endpoint === "/activity") {
          formattedData = DataFormatter.formatActivityData(result);
        } else if (endpoint === "/average-sessions") {
          formattedData = DataFormatter.formatSessionData(result);
        } else if (endpoint === "/performance") {
          formattedData = DataFormatter.formatPerformanceData(result);
        }
        setData(formattedData); // Stocke les données formatées dans l'état
      } catch (error) {
        setError(error.message); // En cas d'erreur, on stocke le message d'erreur
      }
    };

    fetchData(); // Exécution de la fonction pour récupérer les données
  }, [endpoint, id, useMock]); // Dépendances de l'effet : rerun si l'endpoint, l'id ou le mode changent

  return { data, error }; // Retourne les données et l'erreur
}
