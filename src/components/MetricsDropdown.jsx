import React, { useState, useEffect } from 'react';

function MetricsDropdown({ selectedMetrics, setSelectedMetrics, closeDropdown }) {

  // List of available metrics
  const metricsList = ["Spend", "Revenue", "Orders", "Cr_perc", "ACOS", "ROAS", "AOV", "CPC", "Impressions", "Clicks", "CPM", "CTR"];
  const [tempSelectedMetrics, setTempSelectedMetrics] = useState([...selectedMetrics]);

  // Handles checkbox state change
  const handleCheckboxChange = (metric) => {
    if (tempSelectedMetrics.includes(metric)) {
      setTempSelectedMetrics(tempSelectedMetrics.filter(m => m !== metric));
    } else {
      setTempSelectedMetrics([...tempSelectedMetrics, metric]);
    }
  };

  // Apply the selected metrics
  const handleApply = () => {
    setSelectedMetrics(tempSelectedMetrics);
    closeDropdown();
  };

  // Cancel the selection and close the dropdown
  const handleCancel = () => {
    closeDropdown();
  };

  // Update tempSelectedMetrics when selectedMetrics changes
  useEffect(() => {
    setTempSelectedMetrics([...selectedMetrics]);
  }, [selectedMetrics]);

  return (
    <div className='dropdown-container'>
      <div className='metrics-dropdown'>
        <ul style={{ listStyle: 'none', padding: "0" }}>
          {metricsList.map(metric => (
            <li key={metric}>
              <input 
                type='checkbox' 
                checked={tempSelectedMetrics.includes(metric)}
                onChange={() => handleCheckboxChange(metric)}
              />
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px" }}>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}

export default MetricsDropdown;
