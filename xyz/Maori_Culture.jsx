import React, { useState } from 'react';
import './App.css'; // 引入合并后的CSS文件

const App = () => {
  const [hovered, setHovered] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleOptionClick = (option) => {
    setOverlay(option);
  };

  const closeOverlay = () => {
    setOverlay(null);
  };

  return (
    <div className="app-container">
      <div 
        className="button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="main-button">Hover me</button>
        {hovered && (
          <div className="options-container">
            <button onClick={() => handleOptionClick('option1')}>Option 1</button>
            <button onClick={() => handleOptionClick('option2')}>Option 2</button>
            <button onClick={() => handleOptionClick('option3')}>Option 3</button>
          </div>
        )}
      </div>

      {overlay === 'option1' && (
        <div className="overlay">
          <div className="overlay-content">
            <img src="/assets/images/background1.jpg" alt="Background" />
            <h1>Option 1 Content</h1>
            <p>This is the content for option 1.</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}

      {overlay === 'option2' && (
        <div className="overlay">
          <div className="overlay-content">
            <img src="/assets/images/background2.jpg" alt="Background" />
            <h1>Option 2 Content</h1>
            <p>This is the content for option 2.</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}

      {overlay === 'option3' && (
        <div className="overlay">
          <div className="overlay-content">
            <img src="/assets/images/background3.jpg" alt="Background" />
            <h1>Option 3 Content</h1>
            <p>This is the content for option 3.</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



