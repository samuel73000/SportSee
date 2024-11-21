import { createContext, useState, useContext } from "react";

// Création du contexte "ModeContext" qui contiendra l'état partagé pour le mode de l'application
const ModeContext = createContext();

// Création d'un hook personnalisé "useMode" qui permet d'accéder facilement aux valeurs du contexte "ModeContext"
export const useMode = () => {
  return useContext(ModeContext); // Utilise "useContext" pour récupérer les valeurs du contexte
};

// Le composant "ModeProvider" est un fournisseur de contexte qui permet aux composants enfants d'accéder à l'état du contexte
export const ModeProvider = ({ children }) => {
  // Déclaration de l'état local "useMock" pour savoir si on utilise des données simulées (mock) ou réelles
  const [useMock, setUseMock] = useState(false);

  // Déclaration de l'état local "userId" qui stocke l'ID de l'utilisateur sélectionné
  const [userId, setUserId] = useState(null);

  return (
    // Le composant "ModeContext.Provider" permet de transmettre les valeurs de "useMock", "setUseMock", "userId", et "setUserId"
    // aux composants enfants qui consomment ce contexte.
    <ModeContext.Provider value={{ useMock, setUseMock, userId, setUserId }}>
      {children}{" "}
    </ModeContext.Provider>
  );
};
