import React, { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';

import { BiRefresh } from 'react-icons/bi';
import { InfinitySpin } from 'react-loader-spinner';
import TimeSeriesLineChart from '../../components/TimeSeriesLineChart';

export function TimeSeriesHistory(props) {
  const [recordsCollected, setRecordsCollected] = useState({
    tempRecords: [0],
    spo2Records: [0],
    pressureRecords: [0],
    timeElapsed: ['time', 'time', 'time', 'time', 'time'],
  });

  const [filters, setFilters] = useState({ metric: 'all', period: 'hour' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadTele = async () => {
    setIsLoading(true);
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
      timeElapsed.push(new Date(record.created_at).toLocaleString());
    }
    setRecordsCollected(() => ({
      tempRecords: tempRecords,
      spo2Records: spo2Records,
      pressureRecords: pressureRecords,
      timeElapsed: timeElapsed,
    }));
    setIsLoading(false);
  };

  useEffect(async () => {
    setRecordsCollected({
      tempRecords: [0],
      spo2Records: [0],
      pressureRecords: [0],
      timeElapsed: ['time', 'time', 'time', 'time', 'time'],
    });
    setFilters({ metric: 'all', period: 'hour' });
    handleLoadTele();
  }, [props.deviceId, isRefreshing]);

  return (
    <div className="mt-4 w-[100%] rounded-xl bg-auto-white p-4 shadow-lg">
      <div className="flex w-[100%] items-center justify-start rounded-3xl p-2 shadow-lg ring-2 ring-gray-300">
        <div className="ml-auto mr-4 flex gap-2 rounded-lg bg-white">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, metric: 'all' }))}
            className="flex items-center justify-center rounded-lg  bg-gray-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-500"
          >
            All
          </button>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                metric: 'temperature',
              }))
            }
            className="flex items-center justify-center rounded-lg  bg-orange-400 px-4  py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-orange-500"
          >
            Temperature
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, metric: 'SpO2' }))}
            className="flex items-center justify-center rounded-lg  bg-blue-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-blue-500"
          >
            SpO2
          </button>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                metric: 'Pressure',
              }))
            }
            className="flex items-center justify-center rounded-lg  bg-purple-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-purple-500"
          >
            Heart rate
          </button>
        </div>
        <div className="mx-4 flex gap-2 rounded-lg bg-white">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, period: 'hour' }))}
            className="flex items-center justify-center rounded-lg  bg-auto-white px-4 py-2 tracking-wide text-black ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-300"
          >
            Hour
          </button>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                period: 'day',
              }))
            }
            className="flex items-center justify-center rounded-lg bg-auto-white px-4  py-2 tracking-wide text-black ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-300"
          >
            Day
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, period: 'week' }))}
            className="flex items-center justify-center rounded-lg  bg-auto-white px-4 py-2 tracking-wide text-black ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-300"
          >
            Week
          </button>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                period: 'two weeks',
              }))
            }
            className="flex items-center justify-center rounded-lg  bg-auto-white px-4 py-2 tracking-wide text-black ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-300"
          >
            2 Weeks
          </button>
        </div>
        <button
          className="duration-600 mr-4 flex h-[80%] max-w-[10%] items-center justify-center rounded-[3rem] bg-gray-300 p-3 text-[18px] tracking-wider text-white ring-2 ring-black transition-all hover:bg-gray-400 hover:text-[20px] hover:tracking-[1px] focus:bg-gray-400"
          onClick={() => setIsRefreshing((state) => !state)}
        >
          <BiRefresh size={30} color="black" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex min-h-[30%] w-[100%] items-center justify-center">
          <InfinitySpin width="300" color="#475569" />
        </div>
      ) : (
        <div className="flex w-[100%] flex-col items-center justify-start rounded-3xl px-2 py-8 shadow-lg ring-2 ring-gray-300">
          <TimeSeriesLineChart recordsCollected={recordsCollected} filters={filters} />
        </div>
      )}
    </div>
  );
}
