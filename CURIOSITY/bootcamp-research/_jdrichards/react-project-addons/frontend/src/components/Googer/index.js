import { useState, useCallback, useRef } from 'react';
import styles from './GoogerStyle';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

import { formatRelative } from 'date-fns';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import './Googer.css';
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 41.2901,
  lng: -73.9204
};

const options = {
  styles, //got this from snazzyMaps
  disableDefaultUI: true,
  zoomControl: true
};

const Googer = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
    libraries
  });

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() }
    ]);
  }, []);

  const mapRef = useRef();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  });

  const onUnmount = useCallback(function callback(map) {
    setMarkers(null);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    console.log('yo', mapRef.current);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <h1 className='wine'>
        Wine
        <span role='img' aria-label='wine'>
          🍷
        </span>{' '}
      </h1>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/wine-glass.png',
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20) // half of scaled size to position in the middle
            }}
            onClick={() => setSelected(marker)}
          ></Marker>
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Wine found!</h2>
              <p>Winery found at {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

const Locate = ({ panTo }) => {
  return (
    <button
      onClick={() => {
        panTo({ lat: 41.2901, lng: -73.9204 });

        // navigator.geolocation.getCurrentPosition(
        //   (position) =>
        //     panTo({
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     }),
        //   () => null
        // );
      }}
      className='locate'
      style={{ backgroundColor: 'blue', borderRadius: '50%' }}
    >
      <i
        style={{ backgroundColor: 'blue', color: 'white' }}
        className='fas fa-home'
      ></i>
    </button>
  );
};

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 41.2901, lng: () => -73.9204 },
      radius: 200 * 1000 //kilometers to meters. meters preferred in radiua
    }
  });

  return (
    <div className='search'>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const res = await getGeocode({ address });
            const { lat, lng } = await getLatLng(res[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter an Address'
        />
        <ComboboxPopover>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxList key={place_id}>
                <ComboboxOption value={description} />
              </ComboboxList>
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
export default Googer;
