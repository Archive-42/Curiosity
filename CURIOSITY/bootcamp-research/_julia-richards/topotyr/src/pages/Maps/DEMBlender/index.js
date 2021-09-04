import React from "react";
import "../styles/BasicMapPage.css";

import blenderImage from "./sample.png";

const DEMBlender = _ => {
  return (
    <React.Fragment>
      <div className="map-page-wrap">
        <div class="main">
          <h1>DEM Blender</h1>
          <img src={blenderImage} alt="Shaded Mountains" />
        </div>
        <div class="sidebar">
          <div class="sidebar-item">
            <h4>Overview</h4>
            <p>A sample of shaded relief DEM (digital elevation model)</p>
          </div>
          <div class="sidebar-item">
            <h4>Tools Used</h4>
            <ul>
              <li>QGIS</li>
              <li>Blender</li>
              <li>Adobe Photoshop</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DEMBlender;
