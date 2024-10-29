import React from "react";
import "./RadialBarChart.css";

export default function RadialBarChart({ value }) {
  const radius = 50; // Rayon du cercle
  const circumference = 2 * Math.PI * radius; // Circonférence du cercle
  const progress = Math.min(Math.max(value, 0), 1); // Limite la valeur entre 0 et 1
  const offset = circumference * (1 - progress); // Calcul du remplissage

  return (
    <div className='radial-bar-chart'>
      <p className='titre-radialBarChart'>Score</p>
      <svg width='199' height='199' viewBox='0 0 120 120'>
        {/* Cercle de fond */}
        <circle
          cx='60'
          cy='60'
          r={radius}
          stroke='#FBFBFB' // Couleur de fond du cercle
          strokeWidth='7'
          fill='white'
        />
        {/* Cercle de progression */}
        <circle
          cx='60'
          cy='60'
          r={radius}
          stroke='red' // Couleur du cercle de progression
          strokeWidth='7'
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={-offset} // Décalage négatif pour l'inverse des aiguilles d'une montre
          transform='rotate(-90 60 60)' // Rotation pour commencer en haut
          strokeLinecap='round'
        />

        {/* Texte de pourcentage au centre */}
        <text
          x='60'
          y='55'
          textAnchor='middle'
          fontSize='26'
          fill='black'
          // font-weight='700'
          >
          {Math.round(progress * 100)}%
        </text>
        {/* Texte "de votre objectif" en dessous */}
        <text
          x='60'
          y='70'
          textAnchor='middle'
          fontSize='16'
          fill='#74798C'
          // font-Weight='500'
          >
          <tspan x='60' dy='0.5rem'>
            de votre
          </tspan>{" "}
          {/* Première ligne, pas de décalage */}
          <tspan x='60' dy='1em'>
            objectif
          </tspan>{" "}
          {/* Deuxième ligne, ajusté pour un espacement adéquat */}
        </text>
      </svg>
    </div>
  );
}
