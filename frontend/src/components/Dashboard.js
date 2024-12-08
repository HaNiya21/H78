import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <p>
          Recent advancements in healthcare have been revolutionized by technologies such as IoT (Internet of Things), artificial intelligence, blockchain, and wearable health monitoring systems. These innovations are aimed at improving patient care, personalized health tracking, and the efficiency of healthcare delivery. Explore the data-driven insights in the summary and reports charts below.
        </p>
      </section>
      
      <section>
        <h2>Emerging Healthcare Technologies</h2>
        <p>
          Healthcare is undergoing a digital transformation with the integration of several cutting-edge technologies. Key areas where these technologies are making a significant impact include:
        </p>
        <ul>
          <li>
            <strong>Internet of Things (IoT):</strong> IoT devices are transforming patient care by enabling real-time health monitoring. Wearables and smart devices collect data such as heart rate, blood pressure, and glucose levels, which help in providing personalized care and better diagnosis.
          </li>
          <li>
            <strong>Artificial Intelligence (AI):</strong> AI is playing a pivotal role in healthcare through diagnostics, predictive analytics, and decision support systems. AI-driven tools assist doctors in identifying patterns in medical data, improving diagnosis accuracy, and offering personalized treatment recommendations.
          </li>
          <li>
            <strong>Blockchain Technology:</strong> Blockchain is enhancing data security and privacy by providing decentralized and immutable records for patient data. Blockchain ensures secure sharing of medical records between different healthcare providers, ensuring patient privacy and reducing fraud.
          </li>
        </ul>
      </section>

      <section>
        <h2>Technical Description</h2>
        <p>
          This application, H78, is built using the MERN stack—MongoDB, Express.js, React, and Node.js. The backend is powered by Node.js with Express.js handling HTTP requests and routing. MongoDB serves as the database, storing user credentials and chart data securely. JWT authentication ensures secure user sessions. The frontend is developed with React, providing a responsive and dynamic user interface. D3.js is utilized for creating interactive and dynamic charts on the Summary and Reports pages. The application adheres to accessibility standards, incorporating ARIA roles and keyboard navigation. The entire application is hosted on a single server with NGINX serving the frontend on port 80 and proxying API calls to the backend on port 3000.
        </p>
      </section>
  
      <h2>Key Features</h2>
      <ul>
        <li>User authentication with JWT</li>
        <li>Protected routes for authenticated users</li>
        <li>Interactive charts using D3.js</li>
        <li>Responsive design for mobile and desktop</li>
        <li>Accessibility enhancements with ARIA roles</li>
        <li>Secure data storage in MongoDB</li>
      </ul>

      <section>
        <h2>Future Enhancements</h2>
        <p>
          Future updates to the application will focus on expanding the reporting capabilities with additional chart types and data visualizations. Integration of real-time data streams for monitoring patient vitals and health metrics is planned. Enhanced user profile management and customization options will be implemented to provide a more personalized experience. The application will undergo further testing and optimization to ensure seamless performance across various devices and browsers. Feedback from users and healthcare professionals will be instrumental in shaping the future development roadmap.
        </p>
      </section>

      <h4><Link to="/summary">View Summary Chart</Link></h4>
      <h4><Link to="/reports">View Reports Chart</Link></h4>
      <h4><Link to="/blockchain">View Blockchain Chart</Link></h4>
    </main>
  );
}

export default Dashboard;
