// src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAgeGroupData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/data/telemedicine-age-group', {
          headers: { 'x-auth-token': token },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgeGroupData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    // Clear previous chart
    d3.select('#pieChart').selectAll('*').remove();

    // Set dimensions and margins
    const width = 450,
      height = 450,
      margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one)
    const radius = Math.min(width, height) / 2 - margin;

    // Append the svg object
    const svg = d3
      .select('#pieChart')
      .append('svg')
      .attr('role', 'img') // Accessibility
      .attr('aria-label', 'Pie chart showing telemedicine usage by age group')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.ageGroup))
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie
    const pie = d3.pie().value((d) => d.percentage);
    const data_ready = pie(data);

    // Build the pie chart
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', (d) => color(d.data.ageGroup))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add labels
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('text')
      .text((d) => `${d.data.ageGroup} (${d.data.percentage}%)`)
      .attr('transform', (d) => {
        const _d = d3.arc().innerRadius(0).outerRadius(radius).centroid(d);
        return `translate(${_d[0]},${_d[1]})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', 12);
  };

  return (
    <main>
      <h1>Reports</h1>
      <div id="pieChart"></div>
      <p>
        <strong>Explanation:</strong> This chart displays the distribution of telemedicine usage across different age groups. It reveals that the 30-49 age group has the highest adoption rate, indicating the importance of telehealth services for working-age adults.
      </p>
      <p>
        <strong>Data Source:</strong> Data derived from the article "<a href="https://www.health.harvard.edu/blog/the-future-of-healthcare-advancements-in-telemedicine-202106152462" target="_blank" rel="noopener noreferrer">The Future of Healthcare: Advancements in Telemedicine</a>".
      </p>
    </main>
  );
}

export default Reports;
