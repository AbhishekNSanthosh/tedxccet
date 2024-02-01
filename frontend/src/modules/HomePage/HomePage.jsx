import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'
import ParticlesBg from '../../ParticlesBg'
import logo from '../../assets/Logo.svg'
import banner from '../../assets/banner.png'
import commingSoon from '../../assets/stay1.svg'
import { BarLoader } from 'react-spinners'

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
    const radius = 62;
    const circumference = 2 * Math.PI * radius;
    const progress = calculateProgress(value, maxValue);
    const offset = circumference - (progress / 100) * circumference;


    return (
      <div className={styles.progressBox}>
        <svg width="140" height="140" className={styles.svg}>
          {/* Outer Circle (border) */}
          <circle
            cx="70"
            cy="70"
            r="68"
            strokeWidth="2"
            stroke="#EB0028"  // Outer border color
            fill="transparent"
          />
          <circle
            transform="rotate(-90, 70, 70)"
            className={styles.progressCircle}
            cx="70"
            cy="70"
            r="62"
            strokeWidth="12"
            stroke="#EB0028"  // Progress circle color
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            fill="transparent"
            // strokeLinecap="round"  
          />
          {/* Inner Circle (background) */}
          <circle
            cx="70"
            cy="70"
            r="56"
            strokeWidth="2"
            stroke="#EB0028"  // No stroke for inner circle
            fill="#030000"  // Inner background color
          />
          {/* Progress Circle */}
          {/* Inner Text */}
          <text x="70" y="70" textAnchor="middle" dy="7" fontWeight='500' fill="#fff" fontSize="20">
            {value}
          </text>

          <text x="70" y="95" textAnchor="middle" fill="#fff" fontWeight='500' fontSize="14">
            {label}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className={styles.progress}>
      {renderCircularProgress(timeRemaining.days, 365, 'Days')}
      {renderCircularProgress(timeRemaining.hours, 24, 'Hours')}
      {renderCircularProgress(timeRemaining.minutes, 60, 'Minutes')}
      {renderCircularProgress(timeRemaining.seconds, 60, 'Seconds')}
    </div>
  );
};

const HomePage = () => {
  const targetDate = new Date('September 9, 2024 09:00:00').getTime();
  let no = 5
  let name = `messi${no}`
   console.log(name)
  return (
    <>
      <ParticlesBg />
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navbarWrap}>
            <div className={styles.navbarLeft}>
              <div className={styles.navbarLeftItem}>
                <img src={logo} alt="" className={styles.logoImg} />
              </div>
            </div>
            <div className={styles.navbarRight}></div>
          </div>
        </div>

        <div className={styles.banner}>
          <img src={banner} alt="" className={styles.bannerImg} />
          {/* <BarLoader color="red"  width={300}/> */}
          <span className={styles.comming}>COMINGx <span className={styles.high}>SOON</span></span>
          <CountdownTimer targetDate={targetDate} />
          <img src={commingSoon} alt="" className={styles.commingSoon} />
        </div>
      </div>
    </>
  )
}

export default HomePage;
