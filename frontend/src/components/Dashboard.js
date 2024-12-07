// src/components/Dashboard.js 
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <p>
          Recent advancements in healthcare have been revolutionized by technologies such as IoT (Internet of Things), artificial intelligence, and wearable health monitoring systems. These innovations are aimed at improving patient care, personalized health tracking, and the efficiency of healthcare delivery. Explore the data-driven insights in the summary and reports charts below.
        </p>
        <section>
          <h4><Link to="/summary">View Summary Chart</Link></h4>
          <h4><Link to="/reports">View Reports Chart</Link></h4>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
