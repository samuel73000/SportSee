// LineChartPerf.js
import "./LineChartComponent.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChartPerf(props) {
  // Composant pour le tooltip personnalisé
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip-lineChart'>
          <p className='text-ToolTip'>{`${payload[0].value} min`}</p>{" "}
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
      <div className='container-graphique-line-chart'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey='day'
              padding={{ left: 10, right: 10 }}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#FFFFFF", fontSize: 12, dx: -10 }}
              minTickGap={0}
              interval='preserveStartEnd'
              tickMargin={10}
              fillOpacity={0.5}
              style={{
                transform: "scale(0.9)",
                transformOrigin: "bottom",
              }}
            />
            <YAxis domain={[0, "dataMax + 20"]} hide={true} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type='monotone'
              dataKey='sessionLength'
              activeDot={{ r: 8 }}
              dot={false}
              stroke='#FFFFFF'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
