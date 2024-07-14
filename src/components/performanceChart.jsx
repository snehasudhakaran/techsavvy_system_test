import React, { useState, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MetricsDropdown from './MetricsDropdown';
import { fetchMetricsPerformance } from './fetchMetricsPerformance';

function PerformanceChart() {
  // State to hold the fetched data
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // State to hold the formatted chart data
  const [chartData, setChartData] = useState([]);
  // State to manage the visibility of the dropdown
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  // State to hold the selected metrics for the chart
  const [selectedMetrics, setSelectedMetrics] = useState(["Spend", "Revenue", "Orders", "Cr_perc", "ACOS", "ROAS", "AOV", "CPC", "Impressions", "Clicks", "CPM", "CTR"]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMetricsPerformance();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Format the data for the chart whenever the fetched data changes
  useEffect(() => {
    if (data) {
      const categories = data.result.categories;
      const series = data.result.series;

      const formattedData = categories.map((category, index) => {
        const dataPoint = { name: category };
        series.forEach(serie => {
          dataPoint[serie.name] = serie.data[index];
        });
        return dataPoint;
      });

      setChartData(formattedData);
    }
  }, [data]);

  // Error handling and loading states
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  // Toggle dropdown visibility
  const handleDropdown = () => {
    setIsDropDownVisible(prevState => !prevState);
  };

  // Close dropdown
  const closeDropdown = () => {
    setIsDropDownVisible(false);
  };

  return (
    <div className="performance-chart-container">
      <div className='heading'>
        <div style={{ textAlign: "left" }}>
          <span style={{ fontSize: "13px", fontWeight: "400" }}>Performance Chart</span> <br />
          <small style={{ color: "rgba(157, 157, 157, 1)", fontSize: "11px" }}>
            Key Metrics for Department Schedule Performance Evaluation
          </small>
        </div>

        <button type='button' onClick={handleDropdown}>
          <span>Select Metrics</span>
          <FaChevronDown style={{ color: "#8F8F91" }} />
        </button>
      </div>
      {isDropDownVisible && (
        <MetricsDropdown 
          selectedMetrics={selectedMetrics} 
          setSelectedMetrics={setSelectedMetrics} 
          closeDropdown={closeDropdown}
        />
      )}
      <div className="performance-chart">
        <ResponsiveContainer width="100%" height={400} className="responsive-container">
          <LineChart data={chartData} className='line-chart mt-2'>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className='cartesian' />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            {selectedMetrics.map(metric => (
              <Line key={metric} type="monotone" dataKey={metric} stroke={getColor(metric)} />
            ))}
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Function to get color for each metric line
const getColor = (metric) => {
  const darkToLight = ["CPC", "CPM", "CPO", "ACOS", "CPA"];
  const lightToDark = ["Spend", "Revenue", "Orders", "Cr_perc", "ROAS", "AOV", "Impressions", "Clicks", "CTR"];

  if (darkToLight.includes(metric)) {
    return {
      "CPC": "#003f5c",
      "CPM": "#2f4b7c",
      "CPO": "#665191",
      "ACOS": "rgba(221, 119, 3, 1)",
      "CPA": "#d45087"
    }[metric];
  } else if (lightToDark.includes(metric)) {
    return {
      "Spend": "#ff7c43",
      "Revenue": "#ffa600",
      "Orders": "#ffcc00",
      "Cr_perc": "rgba(46, 140, 184, 1)",
      "ROAS": "rgba(186, 101, 156, 1)",
      "AOV": "rgba(88, 112, 33, 1)",
      "Impressions": "#99ffcc",
      "Clicks": "#66ffff",
      "CTR": "#3399ff"
    }[metric];
  } else {
    return 'grey';
  }
};

export default PerformanceChart;
