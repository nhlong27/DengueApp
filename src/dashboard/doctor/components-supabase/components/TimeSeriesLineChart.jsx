import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TimeSeriesLineChart = ({ recordsCollected, filters }) => {
  const [period, setPeriod] = useState([]);

  const filterDates = (dates, range) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const twoWeeks = 2 * oneWeek; // 2 weeks in milliseconds
    const now = new Date(dates[dates.length - 1]);
    const filteredDates = [];
    if (range === 'hour') {
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        0,
        0,
      );
      const numRecords = dates.filter(
        (date) => new Date(date) >= startTime && new Date(date) <= now,
      ).length;
      for (let i = 0; i < numRecords; i++) {
        filteredDates.push(dates[dates.length - 1 - i]);
      }
    } else if (range === 'day') {
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      );
      const numRecords = dates.filter(
        (date) => new Date(date) >= startTime && new Date(date) <= now,
      ).length;
      for (let i = 0; i < numRecords; i++) {
        filteredDates.push(dates[dates.length - 1 - i]);
      }
    } else if (range === 'week') {
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay(),
        0,
        0,
        0,
      );
      const numRecords = dates.filter(
        (date) => new Date(date) >= startTime && new Date(date) <= now,
      ).length;
      for (let i = 0; i < numRecords; i++) {
        filteredDates.push(dates[dates.length - 1 - i]);
      }
    } else if (range === 'two weeks') {
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() - 7,
        0,
        0,
        0,
      );
      const numRecords = dates.filter(
        (date) => new Date(date) >= startTime && new Date(date) <= now,
      ).length;
      for (let i = 0; i < numRecords; i++) {
        filteredDates.push(dates[dates.length - 1 - i]);
      }
    }
    setPeriod(() => [...filteredDates]);
  };

  useEffect(() => {
    filterDates(recordsCollected.timeElapsed, filters.period);
  }, [filters]);

  return (
    <>
      {filters.metric === 'all' && (
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: 'Timeseries Data',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 30,
                max: 45,
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
                min: 60,
                max: 110,
              },
            },
          }}
          data={{
            labels: period,
            datasets: [
              {
                label: 'Temperature',
                data: recordsCollected.tempRecords,
                borderColor: 'rgb(255, 99, 132)',
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
              },
              {
                label: 'SpO2',
                data: recordsCollected.spo2Records,
                borderColor: 'rgb(53, 162, 235)',
                // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
              },
              {
                label: 'Heart Rate',
                data: recordsCollected.pressureRecords,
                borderColor: '#9d50eb',
                yAxisID: 'y1',
              },
            ],
          }}
        />
      )}
      {filters.metric === 'temperature' && (
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: 'Timeseries Data',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 30,
                max: 45,
              },
            },
          }}
          data={{
            labels: period,
            datasets: [
              {
                label: 'Temperature',
                data: recordsCollected.tempRecords,
                borderColor: 'rgb(255, 99, 132)',
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
              },
            ],
          }}
        />
      )}
      {filters.metric === 'SpO2' && (
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: 'Timeseries Data',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 60,
                max: 110,
              },
            },
          }}
          data={{
            labels: period,
            datasets: [
              {
                label: 'SpO2',
                data: recordsCollected.spo2Records,
                borderColor: 'rgb(53, 162, 235)',
                // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
              },
            ],
          }}
        />
      )}
      {filters.metric === 'Pressure' && (
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: 'Heart Rate Data',
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 60,
                max: 110,
              },
            },
          }}
          data={{
            labels: period,
            datasets: [
              {
                label: 'Heart Rate',
                data: recordsCollected.pressureRecords,
                borderColor: '#9d50eb',
                yAxisID: 'y',
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default TimeSeriesLineChart;
