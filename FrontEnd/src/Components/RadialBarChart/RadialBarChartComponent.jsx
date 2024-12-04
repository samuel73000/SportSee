import React from "react";
import "./RadialBarChartComponent.css";
import  {ResponsiveContainer} from 'recharts';

export default function RadialBarChart({ value }) {
  const radius = 50; // Rayon du cercle
  const circumference = 2 * Math.PI * radius; // Circonférence du cercle
  const progress = Math.min(Math.max(value, 0), 1); // Limite la valeur entre 0 et 1
  const offset = circumference * (1 - progress); // Calcul du remplissage

  return (
    <div className='radial-bar-chart'>
      <p className='titre-radialBarChart'>Score</p>
      <ResponsiveContainer width="100%" height="100%">

      <svg viewBox='0 -10 120 130'>
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
          fontSize='22'
          fill='black'
          fontFamily='Roboto, sans-serif' 
          >
          {Math.round(progress * 100)}%
        </text>
        {/* Texte "de votre objectif" en dessous */}
        <text
          x='60'
          y='70'
          textAnchor='middle'
          fontSize='13'
          fill='#74798C'
          fontFamily='Roboto, sans-serif' 
          >
          <tspan x='60' dy='0.1rem' style={{ fontSize: '12px' }}>
            de votre
          </tspan>{" "}
          {/* Première ligne, pas de décalage */}
          <tspan x='60' dy='1em' style={{ fontSize: '12px' }}>
            objectif
          </tspan>{" "}
          {/* Deuxième ligne, ajusté pour un espacement adéquat */}
        </text>
      </svg>
      </ResponsiveContainer>
    </div>
  );
}
