import React from 'react';
import './Chart.css';
import { useSelector } from 'react-redux';
import { selectWeather, selectStatus } from '../store/reducers/weatherSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

export const Chart = () => {

  const weather = useSelector( selectWeather );
  const status = useSelector( selectStatus );

  return(
    <div className="chart-box">
      { status === 'none'
        ?
        <div className="chart-box__empty">No city was found yet</div>
        : 
        <>
          <div className="chart-box__title">{`City: ${weather.city} Country: ${weather.country}`}</div>
          <BarChart
            width={800}
            height={500}
            data={weather.chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <XAxis 
              dataKey="time" 
              stroke="black"/>
            <YAxis 
              stroke="black"
              unit="℃"/>
            <Tooltip />
            <Bar dataKey="temp" fill="#8884d8" />
          </BarChart>
        </>
      }
    </div>
  );

};