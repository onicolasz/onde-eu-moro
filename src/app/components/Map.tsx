import React, { useContext, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapContext } from "@/contexts/map";

interface Circle {
  lat: number;
  lng: number;
  radius: number | null;
}

interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  newCircle: Circle;
}

const Map: React.FC<MapProps> = ({
  onMapClick,
  newCircle,
}) => {
  const { center, zoom, events  } = useContext(MapContext)
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        });

        mapInstanceRef.current.addListener(
          "click",
          (e: { latLng: { lat: () => number; lng: () => number } }) => {
            onMapClick(e.latLng.lat(), e.latLng.lng());
          }
        );
      }
    });
  }, [center, zoom, onMapClick]);

  useEffect(() => {
    if (
      newCircle.lat &&
      newCircle.lng &&
      newCircle.radius !== null &&
      mapInstanceRef.current
    ) {
      // Verifica se o mapa está disponível
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
      circleRef.current = new google.maps.Circle({
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "blue",
        fillOpacity: 0.35,
        map: mapInstanceRef.current,
        center: { lat: newCircle.lat, lng: newCircle.lng },
        radius: newCircle.radius * 10,
      });
    }
  }, [newCircle]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      if (center && zoom) {
        mapInstanceRef.current?.setCenter(center);
        mapInstanceRef.current?.setZoom(zoom);
      }

      events.forEach((event) => {
        const circle = new google.maps.Circle({
          strokeColor: "red",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "red",
          fillOpacity: 0.35,
          map: mapInstanceRef.current,
          center: { lat: event.latitude, lng: event.longitude },
          radius: event.radius,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `${event.title}. Ocorrido em: ${event.occurred_at}`,
        });

        circle.addListener("mouseover", () => {
          infoWindow.setPosition(circle.getCenter());
          infoWindow.open(mapInstanceRef.current);
        });

        circle.addListener("mouseout", () => {
          infoWindow.close();
        });
      });
    }
  }, [events, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default Map;
