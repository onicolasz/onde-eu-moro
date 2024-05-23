"use client";

import { createContext, useState } from "react";
import { Event } from "@/app/types/event";

interface Center {
  lat: number;
  lng: number;
}

type MapContextProps = {
  center: Center | null;
  zoom: number;
  events: Event[];
  address: string | null;
  searchAddress: (address: string | null) => void;
};

const MapContext = createContext<MapContextProps>({} as MapContextProps);

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>({
    lat: -23.55052,
    lng: -46.633308,
  });
  const [zoom, setZoom] = useState<number>(12);
  const [events, setEvents] = useState<Event[]>([]);
  const [address, setAddress] = useState<string | null>(null);

  const setMapFocus = async (center: Center, zoom: number) => {
    setCenter(center);
    setZoom(zoom);
    const eventsData = await fetch(
      `/api/events?latitude=${center.lat}&longitude=${center.lng}`
    ).then((res) => res.json());
    setEvents(eventsData);
  };

  const searchAddress = async (address: string | null) => {
    const response = await fetch(`/api/search?address=${address}`);
    const data = await response.json()

    if (response.status === 200) {
      setMapFocus({ lat: data.latitude, lng: data.longitude }, 18);
      setAddress(address);
    }
  };

  return (
    <MapContext.Provider
      value={{ center, zoom, events, address, searchAddress }}
    >
      <>{children}</>
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
