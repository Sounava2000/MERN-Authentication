import React from "react";
import "./Instructor.css";
export const Instructor = () => {
  return (
    <div className="instructor-page">
      <div className="instructor-card">
        <div className="instructor-image">
           
        </div>
        <div className="instructor-info">
          <h1>Sounava Mukherjee</h1>
          <h4>Your Instructor</h4>
          <p>
            Hello! I'm Sounava Mukherjee, a passionate MERN stack developer. With
            years of experience in JavaScript, React, Node.js, Express, and
            MongoDB, I am dedicated to helping developers learn and grow their
            skills. Join me in this journey to master authentication and the
            MERN stack!
          </p>
          <div className="social-links">
            <a
              href="https://github.com/Sounava2000"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="  #"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
