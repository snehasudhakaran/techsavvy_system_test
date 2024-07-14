import React, { useState, useEffect } from 'react';
import HeatMap from 'react-heatmap-grid';

// Function to fetch heatmap data from the API
const fetchHeatmapData = async () => {
  const response = await fetch("https://coreapi.hectorai.live/api/day-parting/heatmap-list", {
    method: "POST",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc",
      "X-USER-IDENTITY": "U2FsdGVkX1/s3KYiwn1BdNtI1nNitQYbPVGs5G6NloO7PVGlCBTzYpJzAOD/8GaIp30IcvyKuBArXvm5xNN+gOhrSx51l49Ejxan4p7mt1vAUIE6/O277AUuMZVIMsmOtF5YGyaGkyDk9bMjArr3ekLdCKAZu9xXN/b92jqFqXb2jy4tbQbp8UUQxgywAWk1gR4dSb/vaJt4oEIeh0EWuEc4xU2NVdGSedANzYRqUEatsdtRYbNbdkZMt9koQcKO55/Y6fGafYUCztvkASn6i8WyPIxXMq6vf+xo4IYXeOh2WP8WgH/cQgq6V74Fnl82KYtUvGzWVMXpm2rrhsHewJptgJvJY+NinV05HdRJGtXQ1SN3/IhqyJZJhTb/TcO5SkDa8dIGfwgcciGspOofrA==",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "startDate": "2024-06-08",
      "endDate": "2024-07-07",
      "metrics": ["CPC", "CR_perc", "ROAS"]
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Function to get color for columns
const getColumnColor = (columnIndex) => {
  const colors = [
    'rgb(255, 200, 200)', 'rgb(255, 180, 180)', 'rgb(255, 160, 160)',
    'rgb(200, 255, 200)', 'rgb(180, 255, 180)', 'rgb(160, 255, 160)',
    'rgb(200, 200, 255)', 'rgb(180, 180, 255)', 'rgb(160, 160, 255)',
    'rgb(255, 255, 200)', 'rgb(255, 255, 180)', 'rgb(255, 255, 160)',
    'rgb(255, 200, 255)', 'rgb(255, 180, 255)', 'rgb(255, 160, 255)',
    'rgb(200, 255, 255)', 'rgb(180, 255, 255)', 'rgb(160, 255, 255)',
    'rgb(255, 220, 220)', 'rgb(255, 210, 210)', 'rgb(255, 200, 200)'
  ];
  return colors[columnIndex % colors.length];
};

// Function to calculate cell color based on value
const calculateColor = (value, max, columnIndex, isInverted = false) => {
  const baseColor = getColumnColor(columnIndex);
  const intensity = isInverted ? (value / max) * 255 : 255 - (value / max) * 255;
  const [r, g, b] = baseColor.match(/\d+/g).map(Number);
  return `rgb(${r}, ${g - intensity}, ${b - intensity})`;
};


function HeatmapComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchHeatmapData();
        setData(result);
        console.log(result, "result");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  // Define x and y labels
  const xLabels = ['Sun', '', '', 'Mon', '', '', 'Tue', '', '', 'Wed', '', '', 'Thu', '', '', 'Fri', '', '', 'Sat', '', ''];
  const yLabels = Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? 'AM' : 'PM'}`);

  // Initialize heatmap data with zeros
  const heatmapData = Array(24).fill(0).map(() => Array(7 * 3).fill(0));

  // Populate heatmap data with fetched data
  data.result.forEach((day, dayIndex) => {
    day.Hourly_Data.forEach(hourlyData => {
      const hour = parseInt(hourlyData.time_part.split(':')[0]);
      const dayOffset = dayIndex * 3;
      heatmapData[hour][dayOffset] = hourlyData.CPC;
      heatmapData[hour][dayOffset + 1] = hourlyData.CPC;
      heatmapData[hour][dayOffset + 2] = hourlyData.CPC;
    });
  });

  // Calculate average values for the last row
  const totalRow = Array(7 * 3).fill(0);
  data.result.forEach((day, dayIndex) => {
    day.Hourly_Data.forEach(hourlyData => {
      const hour = parseInt(hourlyData.time_part.split(':')[0]);
      const dayOffset = dayIndex * 3;
      totalRow[dayOffset] += hourlyData.CPC;
      totalRow[dayOffset + 1] += hourlyData.CPC;
      totalRow[dayOffset + 2] += hourlyData.CPC;
    });
  });
  for (let i = 0; i < totalRow.length; i++) {
    totalRow[i] /= 24;
  }

  return (
    <div className="heatmap">
      <div className='heading'>
        <div style={{ textAlign: "left" }}>
          <span style={{ fontSize: "13px", fontWeight: "400" }}>Heat Map</span> <br />
          <small style={{ color: "rgba(157, 157, 157, 1)", fontSize: "11px" }}>
            Select hours to schedule Dayparting
          </small>
        </div>
      </div>
      <div className="xlabel">
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
        <p>Imp</p>
        <p>Clicks</p>
        <p>CPM</p>
      </div>
      <HeatMap
        xLabels={xLabels}
        yLabels={[...yLabels, 'Avg']}
        data={[...heatmapData, totalRow]}
        background="white"
        yLabelWidth={50}
        yLabelStyle={{
          fontSize: '10px',
          color: '#333'
        }}
        cellStyle={(background, value, min, max, data, x, y) => {
          const isInverted = false;
          return {
            background: calculateColor(value, max, x, isInverted),
            fontSize: "11px"
          };
        }}
        cellRender={value => value && `${value.toFixed(2)}`}
      />
    </div>
  );
}

export default HeatmapComponent;
