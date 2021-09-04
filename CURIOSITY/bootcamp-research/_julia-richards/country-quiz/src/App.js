import React, { useState } from "react";
import Select from "react-select";
import countries from "./lib/countries.json";
import { Map, GeoJSON } from "react-leaflet";

import countryShapes from "./lib/country_shapes";
// object of all countries with key of 3 letter code
// { "SWE": swedenGeoJson }

import "./App.css";
import "leaflet/dist/leaflet.css";

const sortLabels = (a, b) => {
  if (a.label > b.label) return 1;
  if (b.label > a.label) return -1;

  return 0;
};

const countryOptions = countries
  .map((json) => ({
    label: json.name.common,
    value: json.cca3,
  }))
  .sort(sortLabels);

function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

function getCenter(coordinates) {
  const longs = coordinates.map((coord) => coord[0]);
  const lats = coordinates.map((coord) => coord[1]);
  const avgLong = getAvg(longs);
  const avgLat = getAvg(lats);

  return [avgLat, avgLong]; // react-leaflet wants [lat, long] per https://react-leaflet.js.org/docs/en/components#map
}

const CountryMap = ({ cca3 }) => {
  if (!cca3) {
    // prevent errors if cca3 missing
    return <p>Please select country</p>;
  }

  const activeGeoJSON = countryShapes[cca3];
  const activeCoords = activeGeoJSON.features[0].geometry.coordinates[0];

  return (
    <div>
      <Map center={getCenter(activeCoords)} zoom={4}>
        <GeoJSON data={activeGeoJSON} style={() => ({ color: "#A6483E" })} />
      </Map>
      <pre>
        activeGeoJSON:
        {JSON.stringify(activeGeoJSON, null, 2)}
      </pre>
    </div>
  );
};

function App() {
  const [selectedOption, setSelectedOption] = useState({});

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={(option) => setSelectedOption(option)}
        options={countryOptions}
      />
      <pre>selected option: {JSON.stringify(selectedOption, null, 2)}</pre>
      <CountryMap cca3={selectedOption.value} />
    </div>
  );
}

export default App;
