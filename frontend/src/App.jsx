import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ParticlesBg from './ParticlesBg';
import './App.css'
import HomePage from './modules/HomePage/HomePage';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // If the target date is in the past, set the countdown to zero
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateProgress = (value, maxValue) => {
    return ((maxValue - value) / maxValue) * 100;
  };

  const renderCircularProgress = (value, maxValue, label) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = calculateProgress(value, maxValue);
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="circular-progress" >
        <svg width="100" height="100">
          <circle
            className="progress-circle"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            stroke="#3498db"  // Set the fill color for the progress circle
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius - 4} // Adjust the inner circle radius for the red border
            strokeWidth="2"
            stroke="#3498db" // Set the red border color
            fill="transparent"
          />
          <text x="50" y="50" textAnchor="middle" dy="7" fill="#2c3e50">
            {value}
          </text>
          <text x="50" y="75" textAnchor="middle" fill="#2c3e50">
            {label}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div>
      {renderCircularProgress(timeRemaining.days, 365, 'Days')}
      {renderCircularProgress(timeRemaining.hours, 24, 'Hours')}
      {renderCircularProgress(timeRemaining.minutes, 60, 'Minutes')}
      {renderCircularProgress(timeRemaining.seconds, 60, 'Seconds')}
    </div>
  );
};

const App = () => {
  const targetDate = new Date('September 9, 2024 09:00:00').getTime();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
  ]);
  return (
    // <>
    //   <div className='container' style={{ pointerEvents: 'visible' }}>
    //     <div className="lower-element">
    //       <ParticlesBg />
    //       <h1>Countdown Timer</h1>
    //       {/* <CountdownTimer targetDate={targetDate} /> */}
    //     </div>
    //   </div>
    // </>
    <RouterProvider router={router} />
  );
};

export default App;
