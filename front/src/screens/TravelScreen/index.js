import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const positions = [
  {
    lat: 37.772,
    lng: -122.214,
  },
  {
    lat: 37.672,
    lng: -122.219,
  },
  {
    lat: 37.832,
    lng: -122.424,
  },
];

function MyComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB89A46XhoFozfegjbh7gnPzh9FiSQwRbo">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center} // set senter
        zoom={10}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          icon={
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          }
          position={positions[0]}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
