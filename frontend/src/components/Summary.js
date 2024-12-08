import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Summary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIoTDevicesData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      try {
        const res = await axios.get('/api/data/iot-devices-growth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add Authorization header
        });
        console.log('Fetched Data:', res.data); // Display the fetched data
        setData(res.data); // Set state with the fetched data

        
      } catch (err) {
        console.error('Error fetching IoT Devices Data:', err.response?.data || err.message);        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = '/login'; // Redirect to login
        }
      }
    };
    
    fetchIoTDevicesData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    // Clear previous chart
    d3.select('#chart').selectAll('*').remove();
  
    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
    // Append SVG object
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('role', 'img') // Accessibility
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('aria-label', 'Line chart showing growth of IoT devices in healthcare')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Parse the date / time
    const parseTime = d3.timeParse('%Y');
  
    // Format the data
    data.forEach((d) => {
      d.date = parseTime(d.year);
      d.devices = +d.devices;
    });
  
    // Set the scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);
  
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.devices)])
      .range([height, 0]);
  
    // Add the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));
  
    // Add the y-axis
    svg.append('g').call(d3.axisLeft(y));
  
    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff6600')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.devices))
      );
  
    // Add labels and title for accessibility
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Year');
  
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .text('Number of IoT Devices');
  };

  return (
    <main>
      <h1>Summary</h1>
      <div id="chart" role="img" aria-label="Growth of IoT devices in healthcare"></div>
      <p>
        <strong>Explanation:</strong> This chart illustrates the significant growth of IoT devices in healthcare over the past decade. The adoption of wearable devices and smart sensors has improved personalized care and remote patient monitoring.
      </p>
      <p>
        <strong>Data Source:</strong> Data interpreted from the article "<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7732404/" target="_blank" rel="noopener noreferrer">Emerging Healthcare Technologies</a>".
      </p>
    </main>
  );
}

export default Summary;
