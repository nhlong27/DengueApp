import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
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
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { ContentContainerContext } from '../../ContentContainer';

// import faker from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  StreamingPlugin,
);

export function LineChart(props) {
  const [telemetries, setTelemetries] = useState({
    Temperature: 36,
    SpO2: 95,
    Pressure: 70,
  });
  const subscribe = () => {
    const TELEMETRY = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'TELEMETRY' },
        (payload) => {
          telemetries.Temperature = payload.new.Temperature;
          telemetries.SpO2 = payload.new.SpO2;
          telemetries.Pressure = payload.new.Pressure;
        },
      )
      .subscribe();
  };
  useEffect(() => {
    subscribe();
  }, []);
  // console.log(telemetries);

  return (
    <Line
      // width={800}
      // height={650}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: 'false',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              delay: 100,
              refresh: 1000,
              onRefresh: async (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  // dataset.data.push({
                  //   x: Date.now(),
                  //   y: telemetries.Temperature,
                  // });
                  if (dataset.label === 'Temperature') {
                    dataset.data.push({
                      x: Date.now(),
                      y: telemetries.Temperature,
                    });
                  } else if (dataset.label === 'SpO2') {
                    dataset.data.push({
                      x: Date.now(),
                      y: telemetries.SpO2,
                    });
                  } else {
                    dataset.data.push({
                      x: Date.now(),
                      y: telemetries.Pressure,
                    });
                  }
                }),
                  chart.update('quiet');
              },
            },
          },
          y1: {
            beginAtZero: false,
            min: 30,
            max: 45,
            position: 'left',
          },
          y2: {
            min: 60,
            max: 110,
            position: 'right',
          },
        },
      }}
      data={{
        datasets: [
          {
            label: 'Temperature',
            // data: labels.map(() => Math.round(Math.random() * 100)) + 1,
            borderColor: '#f5ab78',
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data: [],
            yAxisID: 'y1',
          },
          {
            label: 'SpO2',
            // data: labels.map(() => Math.round(Math.random() * 100)) + 1,
            borderColor: '#2f68eb',
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: [],
            yAxisID: 'y2',
          },
          {
            label: 'Heart Rate',
            // data: labels.map(() => Math.round(Math.random() * 100)) + 1,
            borderColor: '#9d50eb',
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: [],
            yAxisID: 'y2',
          },
        ],
      }}
    />
  );
}

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
//   scales: {
//     x: {
//       type: 'realtime',
//       realtime: {
//         delay: 1000,
//         refresh: 1000,
//         onRefresh: (chart) => {
//           chart.data.datasets.forEach((dataset) => {
//             dataset.data.push({
//               x: Date.now(),
//               y: Math.random(),
//             });
//           });
//         },
//       },
//     },
//     y: {
//       beginAtZero: true,
//       min: 0,
//       max: 100,
//     },
//   },
// };

// // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   datasets: [
//     {
//       label: 'Dataset 1',
//       // data: labels.map(() => Math.round(Math.random() * 100)) + 1,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       data: [],
//     },
//     {
//       label: 'Dataset 2',
//       // data: labels.map(() => Math.round(Math.random() * 100)) + 1,
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       data: [],
//     },
//   ],
// };
