import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import '../index.css';

function Blockchain() {
  const [blockchainData, setBlockchainData] = useState([]);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      try {
        // Corrected the URL to match the backend route
        const res = await axios.get('http://157.230.52.106:3000/api/data/blockchain-use', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Blockchain Data:', res.data); // Display the fetched data
        setBlockchainData(res.data); // Set state with the fetched data
      } catch (err) {
        console.error('Error fetching Blockchain Data:', err.response?.data || err.message);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = '/login'; // Redirect to login
        }
      }
    };

    fetchBlockchainData();
  }, []);

  useEffect(() => {
    if (blockchainData.length > 0) {
      renderChart();
    }
  }, [blockchainData]);

  const renderChart = () => {
    // Clear any previous chart
    d3.select('#chart').selectAll('*').remove();

    // Set dimensions and margins for the bar chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Append the SVG object
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('role', 'img') // Accessibility
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('aria-label', 'Bar chart showing Blockchain adoption in healthcare')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set the x scale (category: Blockchain application)
    const x = d3
      .scaleBand()
      .domain(blockchainData.map(d => d.application))
      .range([0, width])
      .padding(0.1);

    // Set the y scale (adoption rate)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(blockchainData, d => d.adoptionRate)])
      .nice()
      .range([height, 0]);

    // Add the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add the y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Add the bars
    svg
      .selectAll('.bar')
      .data(blockchainData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.application))
      .attr('y', d => y(d.adoptionRate))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.adoptionRate))
      .attr('fill', '#ff6600');

    // Add labels and title for accessibility
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Blockchain Application');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .text('Adoption Rate (%)');
  };

  return (
    <main>
      <h1>Blockchain for Healthcare</h1>
      <p>
        <strong>Explanation:</strong> Blockchain technology is transforming healthcare by enhancing data security and privacy, ensuring safe sharing of patient data, and enabling transparency in medical transactions.
      </p>
      
      <h3>Applications of Blockchain in Healthcare</h3>
      <div id="chart" role="img" aria-label="Bar chart showing Blockchain adoption in healthcare"></div>

      <p>
        <strong>Data Source:</strong> Data interpreted from recent research on Blockchain technology in healthcare.
      </p>
    </main>
  );
}

export default Blockchain;
