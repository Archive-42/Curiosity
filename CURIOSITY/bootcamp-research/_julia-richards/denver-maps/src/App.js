import React, { Component } from "react";
import "./App.css";
import neighborhoods from "./neighborhoods.json";
import { Map as LeafletMap, TileLayer, Polygon } from "react-leaflet";

const NeighborhoodWriteup = ({ name, writeUp, keyFeats }) => {
  return (
    <React.Fragment>
      <article className="write-up">
        <h2>{name}</h2>
        <p>{writeUp}</p>
      </article>
      <aside className="key-features">
        <h4>Key Features</h4>
        <ul>
          {keyFeats.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </aside>
    </React.Fragment>
  );
};
class App extends Component {
  state = {
    activeNeighborhood: null
  };

  handleNeighborhoodClick = neighborhood => {
    this.setState({ activeNeighborhood: neighborhood });
    document.title = neighborhood.properties.name;
  };

  render() {
    const { activeNeighborhood } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h3 className="brand">
            <span role="img" aria-label="House Emoji">
              🏡
            </span>
            Explore Denver Neighborhoods
          </h3>
        </header>
        <main className="App-main">
          <LeafletMap
            center={[39.714, -104.992]}
            zoom={12}
            maxZoom={15}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={false}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer url="http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png" />
            {neighborhoods.map((neighborhood, i) => (
              <Polygon
                key={i}
                positions={neighborhood.geometry.coordinates}
                color={neighborhood.properties.fillColor}
                fillOpacity={0.7}
                stroke={false}
                onClick={() => {
                  this.handleNeighborhoodClick(neighborhood);
                }}
              />
            ))}
          </LeafletMap>
          <section className="neighborhood-detail">
            {!!activeNeighborhood ? (
              <NeighborhoodWriteup
                name={activeNeighborhood.properties.name}
                writeUp={activeNeighborhood.properties.writeUp}
                keyFeats={activeNeighborhood.properties.keyFeats}
              />
            ) : (
              <h4>Select a neighborhood</h4>
            )}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
