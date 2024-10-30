import "./BarChartComponent.css"
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function BarChartComponent (props){
    return(
        <div className="bar-chart-container">
      <h2 className="title">Poids et Calories par Jour</h2>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="kilogram" fill="#8884d8" name="kilogram" />
        <Bar dataKey="calories" fill="#82ca9d" name="Calories" />
      </BarChart>
    </div>
    )
}