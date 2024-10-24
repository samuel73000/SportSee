import { useState, useEffect } from "react";

// CALL API pour prendre firstName , calorieCount etc ...
export function fetchUserData(id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // On stocke les données dans le state
      })
      .catch((error) => {
        setError(error);
        console.error("Erreur:", error);
      });
  }, [id]);

  return { data, error }; // On retourne les données et l'erreur
}

// CALL API pour Activité quotidienne 
export function fetchUserActivité(id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/activity`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError(error.message);
      });
  }, [id]);

  return { data, error }; // On retourne les données et l'erreur
}
