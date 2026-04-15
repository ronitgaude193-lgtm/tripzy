import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

// 🔧 FIX: Load Leaflet marker icons correctly
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const Routing = ({ pickupCoords, destinationCoords, setDistance, setDuration }) => {
  const map = useMap();

  useEffect(() => {
    if (!pickupCoords || !destinationCoords) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickupCoords[0], pickupCoords[1]),
        L.latLng(destinationCoords[0], destinationCoords[1])
      ],

      lineOptions: {
        styles: [{ color: "blue", weight: 4 }]
      },

      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      showAlternatives: false,

      // 🔴 THIS HIDES THE DIRECTIONS PANEL
      createMarker: () => null,
      itineraryFormatter: null

    }).addTo(map);

    // hide itinerary container
    routingControl.hide();

    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];

      const distanceKm = (route.summary.totalDistance / 1000).toFixed(1);
      const timeMin = Math.round(route.summary.totalTime / 60);

      setDistance(distanceKm);
      setDuration(timeMin);
    });

    return () => {
      map.removeControl(routingControl);
    };

  }, [pickupCoords, destinationCoords, map, setDistance, setDuration]);

  return null;
};

const MapRouteComponent = ({ setPickup, setDestination }) => {

  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const getLocationName = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const data = await res.json();
    return data.display_name;
  };

  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {

        const { lat, lng } = e.latlng;
        const locationName = await getLocationName(lat, lng);

        if (!pickupCoords) {
          setPickupCoords([lat, lng]);
          setPickup(locationName);

        } else if (!destinationCoords) {
          setDestinationCoords([lat, lng]);
          setDestination(locationName);

        } else {
          // reset route
          setPickupCoords([lat, lng]);
          setDestinationCoords(null);

          setPickup(locationName);
          setDestination("");

          setDistance(null);
          setDuration(null);
        }
      }
    });

    return null;
  };

  const suggestedFare = distance ? Math.round(distance * 2) : null;

  return (
    <div>

      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={7}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "10px"
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {pickupCoords && <Marker position={pickupCoords} />}
        {destinationCoords && <Marker position={destinationCoords} />}

        {pickupCoords && destinationCoords && (
          <Routing
            pickupCoords={pickupCoords}
            destinationCoords={destinationCoords}
            setDistance={setDistance}
            setDuration={setDuration}
          />
        )}

      </MapContainer>

      {distance && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            background: "#f1f5f9",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <p><strong>Distance:</strong> {distance} km</p>
          <p><strong>Estimated Time:</strong> {duration} minutes</p>
          <p><strong>Suggested Fare:</strong> ₹{suggestedFare}</p>
        </div>
      )}

    </div>
  );
};

export default MapRouteComponent;