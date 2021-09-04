import React from "react";
import "../styles/BasicMapPage.css";
import edibleCampusMap from "./edible_campus_map.png";

const EdibleCampusMap = _ => {
  return (
    <React.Fragment>
      <div className="map-page-wrap">
        <div class="main">
          <h1>Edible Campus Map</h1>
          <img src={edibleCampusMap} alt="Edible Campus Map of DU" />
        </div>
        <div class="sidebar">
          <div class="sidebar-item">
            <h4>Overview</h4>
            <p>
              A static map design for increasing student interaction with edible
              fruit at the University of Denver.
            </p>
          </div>
          <div class="sidebar-item">
            <h4>Tools Used</h4>
            <ul>
              <li>Adobe Illustrator</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EdibleCampusMap;
