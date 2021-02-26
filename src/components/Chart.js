/* eslint-disable react/prop-types */
import React from 'react';
import './Chart.css';
import { useSelector } from 'react-redux';
import { selectWeather, selectStatus } from '../store/reducers/chartSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, temp, time } = payload[0].payload;
    return (
      <div className="chart-box__custom-tooltip">
        <p className="custom-tooltip__label">{`${time} ${temp}℃`}</p>
        <p className="custom-tooltip__label">{`${date}`}</p>
      </div>
    );
  }
  return null;
};

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
            height={400}
            data={weather.chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid 
              strokeDasharray="2 2 2" 
              vertical={false}/>
            <XAxis 
              dataKey="date" 
              stroke="black"
              fontSize="12"/>
            <YAxis 
              stroke="black"
              unit="℃"
              tickCount={10}
              type="number" 
              domain={[0, 0]}/>
            <Tooltip content={<CustomTooltip />}/>
            <Bar
              dataKey="temp"
              fill="#8884d8"/>
          </BarChart>
        </>
      }
    </div>
  );

};