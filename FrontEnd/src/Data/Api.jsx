import { useState, useEffect } from "react";
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
        setData(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError(error.message);
      });
  }, [endpoint, id]);

  return { data, error };
}
