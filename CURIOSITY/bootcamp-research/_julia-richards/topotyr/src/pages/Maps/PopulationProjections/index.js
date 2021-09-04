import React from "react";
import "../styles/BasicMapPage.css";

import boulder2010 from "./images/boudler_2010.jpg";
import boulder2020 from "./images/boulder_2020.jpg";
import boulder2025 from "./images/boulder_2025.jpg";
import boulder2030 from "./images/boulder_2030.jpg";
import boulder2030PC from "./images/boulder_2030_percent_change.jpg";

const images = [
  { src: boulder2010, alt: "Boulder 2010 Census" },
  { src: boulder2020, alt: "Boulder 2020 Projection" },
  { src: boulder2025, alt: "Boulder 2025 Projection" },
  { src: boulder2030, alt: "Boulder 2030 Projection" },
  { src: boulder2030PC, alt: "Boulder 2030 Percent Change" }
];

const PopulationProjects = _ => {
  return (
    <React.Fragment>
      <div className="map-page-wrap">
        <div class="main">
          <h1>Population Projections</h1>
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
        <div class="sidebar">
          <div class="sidebar-item">
            <h4>Overview</h4>
            <p>
              A custom project for the non-profit organization A Little Help to
              visualize population changes in the elderly.
            </p>
          </div>
          <div class="sidebar-item">
            <h4>Tools Used</h4>
            <ul>
              <li>Esri ArcGIS</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopulationProjects;
