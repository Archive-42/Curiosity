import React from "react";
import denverMap from "./images/Denver_Maps.png";
import idahoMtn from "./images/Idaho_Mtns.png";
import iceLakes from "./images/IceLakes.png";
import edibleCampus from "./images/EdibleCampus.png";
import littleHelp from "./images/CO_Springs_ALH.png";
import demBlender from "./images/blenderDemo.png";

import "./styles/Maps.css";

const mapCollection = [
  {
    image: denverMap,
    title: "Denver Neighborhoods",
    link: "https://julia-richards.github.io/denver-maps/",
    detail: "An interactive guide to Denver’s neighborhoods."
  },
  {
    image: iceLakes,
    title: "Silverton Trails",
    link: "/maps/silverton_trails",
    detail:
      "An in progress tool to visualize and explore trails in Silverton, Colorado."
  },
  {
    image: littleHelp,
    title: "Population Projections",
    link: "/maps/population_projections",
    detail:
      "A custom project for the non-profit organization A Little Help to visualize population changes in the elderly."
  },
  {
    image: edibleCampus,
    title: "Edible Campus",
    link: "/maps/edible_campus_du",
    detail:
      "A static map design for increasing student interaction with edible fruit at the University of Denver."
  },
  {
    image: idahoMtn,
    title: "Idaho Mountains",
    link:
      "https://juliarichards.carto.com/builder/eae64ec7-73c2-4eb6-af44-90cf5d7c50a3/embed",
    detail:
      "A visualization of mountains and fault lines using the Carto platform."
  },
  {
    image: demBlender,
    title: "DEM Blender Relief",
    link: "/maps/dem_blender",
    detail:
      "A sample of shaded relief DEM (digital elevation model) using blender and photoshop."
  }
];

function Maps() {
  return (
    <React.Fragment>
      <div className="title-wrapper">
        <h2>Maps</h2>
      </div>
      <div className="map-card-container">
        {mapCollection.map((map, i) => (
          <div className="map-card" key={i}>
            <a href={map.link}>
              <div className="map-card-image-container">
                <img
                  className="map-card-image"
                  src={map.image}
                  alt={map.title}
                />
                <p className="map-card-detail">{map.detail}</p>
              </div>
              <h3 className="map-card-title">{map.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Maps;
