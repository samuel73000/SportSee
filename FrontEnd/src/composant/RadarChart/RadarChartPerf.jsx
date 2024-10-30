import "./RadarChartPerf.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

export default function RadarChartPerf(props) {
  return (
    <div className='container-RadarChart'>
      <RadarChart outerRadius={115} data={props.data} width={320} height={320}>
        <PolarGrid radialLines={false} /> {/* Supprime les lignes radiales */}
        <PolarAngleAxis 
          dataKey='kind' 
          stroke='#FFFFFF' 
          tickLine={false} // Désactive les lignes de liaison des ticks
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 150]} 
          tick={null} 
          axisLine={false} // Désactive la ligne de l'axe radial
        />
        <Radar
          name='votre performance'
          dataKey='value'
          stroke='red'
          fill='red'
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </div>
  );
}
