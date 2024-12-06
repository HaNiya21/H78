// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <h2>Advancements in Telemedicine</h2>
        <p>
          Telemedicine has emerged as a pivotal innovation in healthcare, transforming how patients access medical services. This technology allows patients to consult healthcare providers remotely, using video conferencing, phone calls, or messaging systems. The COVID-19 pandemic accelerated the adoption of telemedicine, as it provided a safe alternative to in-person visits, minimizing the risk of virus transmission. Telehealth has proven particularly beneficial for individuals in rural or underserved regions, where access to medical facilities is limited. It offers convenience, reduces travel time, and enables continuous monitoring of chronic conditions. Advances in telemedicine are now integrating artificial intelligence (AI) to enhance diagnostic accuracy and predictive analytics. Wearable devices are also playing a significant role by tracking vital signs and health metrics in real-time, allowing for proactive healthcare interventions. As telemedicine continues to evolve, it holds the promise of making healthcare more accessible, efficient, and personalized.
        </p>
        <p>
          <strong>Source:</strong>{' '}
          <a href="https://www.health.harvard.edu/blog/the-future-of-healthcare-advancements-in-telemedicine-202106152462" target="_blank" rel="noopener noreferrer">
            The Future of Healthcare: Advancements in Telemedicine
          </a>
        </p>
      </section>
      <section>
        <h2>Technical Description</h2>
        <p>
          This application, H78, is built using the MERN stack—MongoDB, Express.js, React, and Node.js. The backend is powered by Node.js with Express.js handling HTTP requests and routing. MongoDB serves as the database, storing user credentials and chart data securely. JWT authentication ensures secure user sessions. The frontend is developed with React, providing a responsive and dynamic user interface. D3.js is utilized for creating interactive and dynamic charts on the Summary and Reports pages. The application adheres to accessibility standards, incorporating ARIA roles and keyboard navigation. The entire application is hosted on a single server with NGINX serving the frontend on port 80 and proxying API calls to the backend on port 3000.
      
        </p>
      </section>
      <section>
        <h2>Key Features</h2>
        <ul>
          <li>User authentication with JWT</li>
          <li>Protected routes for authenticated users</li>
          <li>Interactive charts using D3.js</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Accessibility enhancements with ARIA roles</li>
          <li>Secure data storage in MongoDB</li>
        </ul>
      </section>
      <section>
        <h2>Future Enhancements</h2>
        <p>
          Future updates to the application will focus on expanding the reporting capabilities with additional chart types and data visualizations. Integration of real-time data streams for monitoring patient vitals and health metrics is planned. Enhanced user profile management and customization options will be implemented to provide a more personalized experience. The application will undergo further testing and optimization to ensure seamless performance across various devices and browsers. Feedback from users and healthcare professionals will be instrumental in shaping the future development roadmap.
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
