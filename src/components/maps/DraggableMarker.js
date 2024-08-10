import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import { useEffect, useMemo, useRef } from "react";

export default function DraggableMarker({
  position,
  setPosition,
  center,
  loading,
  setLoading,
}) {
  const markerRef = useRef(null);

  const handleLocationFound = (e) => {
    setLoading(true);
    setPosition(e.latlng);
    map.flyTo(e.latlng, map.getZoom());
  };

  const handleMarkerDragEnd = (e) => {
    setLoading(true);
    const newPosition = e.target.getLatLng();
    setPosition(newPosition);
  };

  const map = useMapEvents({
    locationfound: handleLocationFound,
  });

  const eventHandlers = useMemo(
    () => ({
      dragend: handleMarkerDragEnd,
    }),
    []
  );

  const markerIcon = () =>
    L.icon({
      iconUrl: icon,
      // shadowUrl: iconShadow,
      iconSize: [30, 40],
      iconAnchor: [22, 44],
      popupAnchor: [-3, -76],
      shadowSize: [38, 45],
      shadowAnchor: [22, 94],
    });

  useEffect(() => {
    if (position.lat !== center?.lat && position.lng !== center?.lng) {
      map.flyTo(position, map.getZoom());
    }
  }, [position.lat, position.lng, map]);

  useEffect(() => {
    if (loading) {
      map.once("moveend", () => {
        setLoading(false);
      });
    }
  }, [loading, map]);
  return (
    <Marker
      icon={markerIcon()}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      {/* <Popup minWidth={90}>
        <p>Test</p>
      </Popup> */}
    </Marker>
  );
}
