// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        
        <section>
        <h4><Link to="/summary">View Summary Chart</Link></h4>
        <h4><Link to="/reports">View Reports Chart</Link></h4>
      </section>
      </section>
  
    </main>
  );
}

export default Dashboard;
