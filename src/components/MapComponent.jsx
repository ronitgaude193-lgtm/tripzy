import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const LocationSelector = ({ setPickup, setDestination }) => {
  const [step, setStep] = useState("pickup");

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (step === "pickup") {
        setPickup({ lat, lng });
        setStep("destination");
      } else {
        setDestination({ lat, lng });
        setStep("pickup");
      }
    }
  });

  return null;
};

const MapComponent = ({ pickup, destination, setPickup, setDestination }) => {
  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationSelector
        setPickup={setPickup}
        setDestination={setDestination}
      />

      {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
      {destination && <Marker position={[destination.lat, destination.lng]} />}
    </MapContainer>
  );
};

export default MapComponent;