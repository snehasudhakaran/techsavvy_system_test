import axios from 'axios';

// Function to fetch metrics performance data from the API
export const fetchMetricsPerformance = async () => {

  // API endpoint URL
  const url = 'https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList';

  // Headers required for the API request
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-GB,en;q=0.9',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc',
    'X-USER-IDENTITY': 'U2FsdGVkX1+GZ5mnAUMis4VC8jL5g2BdcRai8iXYI29OIStJwwzI4Wf6H8+/nJjEDGl4ly0lR3JXZddDjqwuWaZMDyCIOc4WW586U//KMIUVsM2kMN3KMJf8eGAcW7X0aRgkNwkQKVlyZNf1sQqvusuFbb3XFl5GP+otaIQh7NrOgEMvBxMYmiA9OIla8iLAbKkHVCdAIFW+/qjDlZWq6u5fs9k266mMdr4UuFxvEDS6U0+xjei5BdwUaZvWmlETmKDT4JtLHVcTECPxcxHJllRClmUPcnjC5xRJV0mfsG1sRpHLHDW5o5GanBbdQU5yDYrJEj/OYXrYySZ2tzQu/b6EqzTguqNISSNhjxNtSlK3MXBisf5aSZQanXxIpKoYkXaNmo2k45y1tl0xe66TWw=='
  };

   // Request body with the desired date range and metrics
  const body = {
    startDate: '2024-01-14',
    endDate: '2024-01-20',
    metrics: ["Spend", "Revenue", "Orders", "Cr_perc", "ACOS", "ROAS", "AOV", "CPC", "Impressions", "Clicks", "CPM", "CTR"]
  };

  try {
     // Making the API request using axios
    const response = await axios.post(url, body, { headers });

     // Returning the data received from the API
    return response.data;
  } catch (error) {

    // Logging any errors that occur during the API request
    console.error('Failed to fetch metrics performance:', error);

    // Throwing the error to be handled by the calling function
    throw error;
  }
};
