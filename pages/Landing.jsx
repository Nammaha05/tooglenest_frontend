import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎯 Welcome to ToggleNest</h1>
      <p>Team Task and Workflow Management Platform</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login" style={{ margin: '0 10px', padding: '10px 20px', background: '#667eea', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Login</Link>
        <Link to="/signup" style={{ margin: '0 10px', padding: '10px 20px', background: '#764ba2', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Sign Up</Link>
      </div>
      <p style={{ marginTop: '20px' }}></p>
    </div>
  );
};

export default Landing;