import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Information about our store...</p>
      <Link to="/">Back</Link>
    </div>
  );
};

export default About;