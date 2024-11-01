// LineChartPerf.js
import "./LineChartComponent.css";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function LineChartPerf(props) {
  // Composant pour le tooltip personnalisé
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='text-ToolTip'>{`${payload[0].value} min`}</p>{" "}
          {/* Modifie ceci selon tes données */}
        </div>
      );
    }
    return null;
  };

  // Mapping des jours numériques vers leurs initiales
  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

  // Transformation des données pour utiliser les initiales des jours
  const data = props.data.map((item) => ({
    day: dayLabels[item.day - 1], // -1 pour ajuster l'index
    sessionLength: item.sessionLength, // Assurez-vous que cela correspond à votre clé
  }));

  return (
    <div className='line-chart-container'>
      <p className='titre-LineChart'>Durée moyenne des sessions</p>
      <div className='rectangle-LineChart'></div>
      <div className="container-graphique-line-chart">
      <LineChart
        width={280}
        height={190}
        data={data}
        margin={{ top: 5, right: 13, left: 13, bottom: -10 }}>
        <XAxis
          dataKey='day'
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#FFFFFF', fontSize: 12, dx:20 }}
        />
        <YAxis hide={true} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type='monotone'
          dataKey='sessionLength'
          activeDot={{ r: 8 }}
          dot={false}
          stroke='#FFFFFF'
        />
      </LineChart>
      </div>
    </div>
  );
}


















