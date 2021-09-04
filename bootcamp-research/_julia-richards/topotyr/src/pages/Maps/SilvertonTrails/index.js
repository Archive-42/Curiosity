import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Map, GeoJSON, TileLayer } from "react-leaflet";

import anvilNiagara from "./AnviltoNiagara.json";
import iceLakes from "./IceLakes.json";

import "leaflet/dist/leaflet.css";
import "./SilvertonTrails.css";

const mapOptions = [
  {
    slug: "anvil",
    name: "Anvil to Niagara",
    geoJSON: anvilNiagara,
    center: [37.815015, -107.667013]
  },
  {
    slug: "ice_lakes",
    name: "Ice Lakes",
    geoJSON: iceLakes,
    center: [37.80669, -107.774144]
  }
];

const SilvertonTrails = ({
  match: {
    params: { slug }
  },
  history
}) => {
  const [basemap, setBasemap] = useState(
    "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
  );
  const activeMap = mapOptions.find(mapOption => mapOption.slug === slug);

  return (
    <React.Fragment>
      <div className="map-page-container">
        <nav className="map-nav">
          {mapOptions.map((mapOption, i) => (
            <NavLink
              to={`/maps/silverton_trails/${mapOption.slug}`}
              className="map-link"
              activeClassName="map-link--active"
            >
              {mapOption.name}
            </NavLink>
          ))}
        </nav>
        {!!activeMap ? (
          <React.Fragment>
            <h1>{activeMap.name}</h1>

            <div>
              <button
                onClick={() =>
                  setBasemap("http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg")
                }
              >
                Terrain
              </button>
              <button
                onClick={() =>
                  setBasemap(
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
                  )
                }
              >
                Satellite
              </button>
            </div>
            <Map
              center={activeMap.center}
              zoom={13}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={false}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <TileLayer url={basemap} />
              <GeoJSON
                data={activeMap.geoJSON}
                key={activeMap.slug}
                style={feature => ({ color: "#A6483E" })}
              />
            </Map>
          </React.Fragment>
        ) : (
          <h3 className="none-selected-msg">Select a trail!</h3>
        )}
      </div>
    </React.Fragment>
  );
};

export default SilvertonTrails;
