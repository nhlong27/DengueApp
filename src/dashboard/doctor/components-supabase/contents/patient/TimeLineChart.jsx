import React, { useState, useEffect } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export function TimeLineChart(props) {
  const [recordsCollected, setRecordsCollected] = useState({
    tempRecords: [0],
    spo2Records: [0],
    pressureRecords: [0],
    timeElapsed: ['time', 'time', 'time', 'time', 'time'],
  });

  const handleLoadTele = async () => {
    let { data: TELEMETRY, error } = await supabase
      .from('TELEMETRY')
      .select('Temperature, SpO2, Pressure, created_at')
      .eq('D_Id', props.deviceId);
    if (error) throw error;
    let tempRecords = [];
    let spo2Records = [];
    let pressureRecords = [];
    let timeElapsed = [];
    for (let record of TELEMETRY) {
      tempRecords.push(record.Temperature);
      spo2Records.push(record.SpO2);
      pressureRecords.push(record.Pressure);
      timeElapsed.push(
        new Date(record.created_at).toLocaleString(),
      );
    }
    setRecordsCollected(() => ({
      tempRecords: tempRecords,
      spo2Records: spo2Records,
      pressureRecords: pressureRecords,
      timeElapsed: timeElapsed,
    }));
  };

  useEffect(async () => {
    handleLoadTele();
  }, []);

  return (
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
        labels: recordsCollected.timeElapsed,
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
  );
}
