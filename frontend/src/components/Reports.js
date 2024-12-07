// src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAIUseCasesData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/data/ai-use-cases', {
          headers: { 'x-auth-token': token },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAIUseCasesData();
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
      .attr('aria-label', 'Pie chart showing AI use cases in healthcare')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
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
      .attr('fill', (d) => color(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add labels
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('text')
      .text((d) => `${d.data.category} (${d.data.percentage}%)`)
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
        <strong>Explanation:</strong> This chart displays the distribution of AI use cases in healthcare. The use cases include diagnostics, patient management, hospital administration, and treatment recommendations, as discussed in the referenced article.
      </p>
      <p>
        <strong>Data Source:</strong> Data interpreted from the article "<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7732404/" target="_blank" rel="noopener noreferrer">Emerging Healthcare Technologies</a>".
      </p>
    </main>
  );
}

export default Reports;
