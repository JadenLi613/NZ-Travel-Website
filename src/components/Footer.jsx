import React from 'react';

const Footer = ({ onWeatherClick }) => {
  return (
    <footer>
      <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer">
        <img src="/assets/icons/hotel.svg" alt="hotel" />
      </a>
      <a href="https://www.booking.com/flights" target="_blank" rel="noopener noreferrer">
        <img src="/assets/icons/plane.svg" alt="plane" />
      </a>
      <div className="weather-button" onClick={onWeatherClick}>
        <img src="/assets/icons/sun.svg" alt="weather" />
      </div>
    </footer>
  );
};

export default Footer;