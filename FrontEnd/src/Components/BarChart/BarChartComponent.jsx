// BarChartComponent.js
import "./BarChartComponent.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent(props) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate(); // Retourne seulement le numéro du jour
  };

  // Fonction personnalisée pour le contenu du tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${payload[0].value} kg`}</p>
          <p className='label'>{` ${payload[1].value}Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bar-chart-container'>
      <div className='container-title-barChart'>
        <p className='title-barChart'>Activité quotidienne</p>
        <span className='legend-item'>
          <span
            className='legend-color'
            style={{ backgroundColor: "#282D30" }}></span>
          <span className="legend-texte">Poids (kg)</span>
          <span
            className='legend-color'
            style={{ backgroundColor: "#E60000" }}></span>
          <span className="legend-texte">Calories (Kcal)</span>
        </span>
      </div>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={props.data}
          margin={{ top: 20, right: 40, left: 53, bottom: 5 }}
          barSize={9} 
          barGap={7} 
          >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray='3 3'
          />
          <XAxis dataKey='day' tickFormatter={formatDate} tickLine={false} />
          <YAxis orientation='right' tickLine={false} axisLine={false}  />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='kilogram' fill='#282D30' radius={[30, 30, 0, 0]}  />
          <Bar dataKey='calories' fill='#E60000' radius={[30, 30, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
