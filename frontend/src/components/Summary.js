// src/components/Summary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Summary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVisitsData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/data/telemedicine-visits', {
          headers: { 'x-auth-token': token },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVisitsData();
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
      .attr('aria-label', 'Line chart showing telemedicine visits over time')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Parse the date / time
    const parseTime = d3.timeParse('%b %Y');
  
    // Format the data
    data.forEach((d) => {
      d.date = parseTime(d.month);
      d.visits = +d.visits;
    });
  
    // Set the scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);
  
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.visits)])
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
      .attr('fill', 'none') // Corrected here
      .attr('stroke', '#ff6600')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.visits))
      );
  
    // Add labels and title for accessibility
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Month');
  
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .text('Number of Visits');
  };
  

  return (
    <main>
      <h1>Summary</h1>
      <div id="chart" role="img" aria-label="Telemedicine visits over time"></div>
      <p>
        <strong>Explanation:</strong> This chart illustrates the significant growth in telemedicine visits over the past two years, particularly during the COVID-19 pandemic. The data highlights how telemedicine has become an essential component of healthcare delivery.
      </p>
      <p>
        <strong>Data Source:</strong> Based on data interpreted from the article "<a href="https://www.health.harvard.edu/blog/the-future-of-healthcare-advancements-in-telemedicine-202106152462" target="_blank" rel="noopener noreferrer">The Future of Healthcare: Advancements in Telemedicine</a>".
      </p>
    </main>
  );
}

export default Summary;
