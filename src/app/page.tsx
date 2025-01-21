"use client"
import { useState } from 'react';
import styles from './page.module.css';

const getRandomWeightedColor = () => {
  const colors = [
    { color: '#e6ff92', weight: 4 },
    { color: '#9a6236', weight: 2 },
    { color: '#a679ff', weight: 5 },
    { color: '#c785ad', weight: 4 },
    { color: '#8de0d6', weight: 2 },
    { color: '#aeadad', weight: 4 },
  ];

  const totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);
  let random = Math.random() * totalWeight;

  for (const { color, weight } of colors) {
    if (random < weight) return color;
    random -= weight;
  }

  return 'grey'; // fallback (should not happen)
};

const getRandomWeightedEvent = () => {
  const events = [
    { event: 'Snatch', weight: 1 },
    { event: 'Complete Takeover', weight: 1 },
    { event: '💨', weight: 4 },
  ];

  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;

  for (const { event, weight } of events) {
    if (random < weight) return event;
    random -= weight;
  }

  return '💨'; // fallback (should not happen)
};

export default function Home() {
  const [color, setColor] = useState('white');
  const [event, setEvent] = useState('');
  const [rolling, setRolling] = useState(false);

  const handleRandomize = () => {
    setRolling(true);
    const rollDuration = 500; // Total rolling duration in milliseconds
    const intervalDuration = 100; // Interval for updates
    let elapsed = 0;

    const rollingInterval = setInterval(() => {
      setColor(getRandomWeightedColor());
      setEvent(getRandomWeightedEvent());
      elapsed += intervalDuration;

      if (elapsed >= rollDuration) {
        clearInterval(rollingInterval);
        setColor(getRandomWeightedColor());
        setEvent(getRandomWeightedEvent());
        setRolling(false);
      }
    }, intervalDuration);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Building the Cities</h1>
      <div className={styles.row}>
        <div
          className={styles.colorBox}
          style={{ backgroundColor: color, transition: 'background-color 0.1s ease' }}
        ></div>
        <div className={styles.eventBox}>
          <p style={{ transition: 'opacity 0.1s ease', opacity: rolling ? 0.5 : 1 }}>
            {event}
          </p>
        </div>
      </div>
      <button onClick={handleRandomize} className={styles.button} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Roll!'}
      </button>
    </div>
  );
}
