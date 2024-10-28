// api.jsx
import { useState, useEffect } from "react";

// Classe de modélisation pour formater les données
class DataFormatter {
  static formatUserData(data) {
    return {
      firstName: data.data.userInfos.firstName,
     age: data.data.userInfos.age,
    lastName: data.data.userInfos.lastName,
      calorieCount: data.data.keyData.calorieCount,
      proteinCount: data.data.keyData.proteinCount,
      carbohydrateCount: data.data.keyData.carbohydrateCount,
      lipidCount: data.data.keyData.lipidCount,
      todayScore: data.data.todayScore || data.data.score, // Utilise `todayScore` si elle existe, sinon `score`
    };
  }

  static formatActivityData(data) {
    // Formatage des données d'activité
    return data.data.sessions.map((session) => ({
      day: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }

  static formatSessionData(data) {
    // Formatage des données de session
    return data.data.sessions.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }));
  }

  static formatPerformanceData(data) {
    // Formatage des données de performance
    return data.data.data.map((item) => ({
      value: item.value,
      kind: data.data.kind[item.kind],
    }));
  }
}

// Hook personnalisé pour les appels API
export default function useFetchData(endpoint, id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint || !id) return;

    const url = `http://localhost:3000/user/${id}${endpoint}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        // Appeler la méthode de formatage en fonction de l'endpoint
        let formattedData;
        if (endpoint === " ") {
          formattedData = DataFormatter.formatUserData(data);
        } else if (endpoint === "/activity") {
          formattedData = DataFormatter.formatActivityData(data);
        } else if (endpoint === "/average-sessions") {
          formattedData = DataFormatter.formatSessionData(data);
        } else if (endpoint === "/performance") {
          formattedData = DataFormatter.formatPerformanceData(data);
        }

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError(error.message);
      });
  }, [endpoint, id]);

  return { data, error };
}