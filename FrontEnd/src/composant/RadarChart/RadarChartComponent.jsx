import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import "./RadarChartComponent.css";

export default function RadarChartPerf(props) {
  return (
    <div className='container-RadarChart'>
      <ResponsiveContainer width="100%" height='100%'>
        <RadarChart outerRadius="80%" data={props.data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis 
            dataKey='kind' 
            stroke='#FFFFFF' 
            tickLine={false} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 150]} 
            tick={null} 
            axisLine={false} 
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
      </ResponsiveContainer>
    </div>
  );
}