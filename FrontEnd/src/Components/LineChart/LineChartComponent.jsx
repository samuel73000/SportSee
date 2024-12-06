import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LineChartComponent.css";

export default function LineChartPerf(props) {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  // Mettre à jour la largeur du graphique lorsqu'il est redimensionné
  useEffect(() => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.offsetWidth);
    }
  }, [chartRef.current]);

  // Fonction pour le tooltip personnalisé
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length && coordinate) {
      const { x } = coordinate; // Position x
      const tooltipText = `${payload[0].value} min`;

      // Calculer la largeur en fonction de la position de la souris sur le graphique
      const percentage = Math.min(Math.max((x / chartWidth) * 20, 0), 100);

      let tooltipPosition = {
        left: `${x}px`,
        top: `${y}px`,
        transform: "translateX(-100%)",
      };

      return (
        <div
          className='custom-tooltip-lineChart'
          style={{
            ...tooltipPosition,
            width: `${percentage}vw`, // Largeur dynamique en fonction du graphique
          }}>
          <p className='text-ToolTip'>{tooltipText}</p>
        </div>
      );
    }
    return null;
  };

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
  const data = props.data.map((item) => ({
    day: dayLabels[item.day - 1],
    sessionLength: item.sessionLength,
  }));

  return (
    <div className='line-chart-container'>
      <p className='titre-LineChart'>Durée moyenne des sessions</p>
      <div className='container-graphique-line-chart' ref={chartRef}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 10 }}>
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
              style={{ transform: "scale(0.9)", transformOrigin: "bottom" }}
            />
            <YAxis domain={[0, "dataMax + 20"]} hide={true} />
            <Tooltip content={<CustomTooltip chartWidth={chartWidth} />} />
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
