import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Event {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  occurred_at: string;
}

interface Circle {
  lat: number; 
  lng: number; 
  radius: number | null;
}

interface MapProps {
  center: { lat: number; lng: number } | null;
  events: Event[];
  zoom: number;
  onMapClick: (lat: number, lng: number) => void;
  newCircle: Circle;
}

const Map: React.FC<MapProps> = ({ center, events, zoom, onMapClick, newCircle }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    let map: google.maps.Map;

    loader.load().then(() => {
      if (mapRef.current) {
        map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        });

        map.addListener("click", (e: { latLng: { lat: () => number; lng: () => number; }; }) => {
          onMapClick(e.latLng.lat(), e.latLng.lng());
        });

        events.forEach((event) => {
          const circle = new google.maps.Circle({
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "red",
            fillOpacity: 0.35,
            map,
            center: { lat: event.latitude, lng: event.longitude },
            radius: event.radius,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `${event.title}. Ocorrido em: ${event.occurred_at}`,
          });

          circle.addListener("mouseover", () => {
            infoWindow.setPosition(circle.getCenter());
            infoWindow.open(map);
          });

          circle.addListener("mouseout", () => {
            infoWindow.close();
          });
          
        });

        if (newCircle.lat && newCircle.lng && newCircle.radius !== null) {
          if (circleRef.current) {
            circleRef.current.setMap(null);
          }
          circleRef.current = new google.maps.Circle({
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35,
            map,
            center: { lat: newCircle.lat, lng: newCircle.lng },
            radius: newCircle.radius * 10,
          });
        }
      }
    });
  }, [center, events, onMapClick, zoom, newCircle]);

  return <div ref={mapRef} style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }} />;
};

export default Map;
