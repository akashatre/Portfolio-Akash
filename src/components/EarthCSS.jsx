import React from 'react';
import './EarthCSS.css';

const EarthCSS = () => {
    return (
        <div className="earth-container">
            <div className="stars"></div>
            <div className="planet-wrapper">
                <div className="earth"></div>
                <div className="clouds"></div>
            </div>
        </div>
    );
};

export default EarthCSS;
