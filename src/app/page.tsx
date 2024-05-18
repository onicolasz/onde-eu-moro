"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import Map from "./components/Map";
import CreateEvent from "./components/CreateEvent";
import { CSSTransition } from 'react-transition-group';

interface Event {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  occurred_at: string;
}

export default function Home() {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: -23.55052,
    lng: -46.633308,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [zoom, setZoom] = useState<number>(12);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleSearch = async (address: string) => {
    const response = await fetch(`/api/search?address=${address}`);
    const data = await response.json();

    if (response.status === 200) {
      setCenter({ lat: data.latitude, lng: data.longitude });
      setZoom(18);

      const eventsResponse = await fetch(
        `/api/events?latitude=${data.latitude}&longitude=${data.longitude}`
      );
      const eventsData = await eventsResponse.json();

      setEvents(eventsData);
    }
  };

  const handleButtonClick = () => {
    setShowMessage(true);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    if (showMessage) {
      const response = await fetch(
        `/api/reverse-geocode?lat=${lat}&lng=${lng}`
      );
      const data = await response.json();

      if (response.status === 200) {
        setSelectedAddress(data.address);
        setShowMessage(false);
      }
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      <header className="absolute justify-center top-0 left-0 w-full flex flex-row p-8 z-10">
        <SearchBar onSearch={handleSearch} />
      </header>
      <Map center={center} events={events} zoom={zoom} onMapClick={handleMapClick} />
      {showMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded">
          Por favor, selecione um local no mapa.
        </div>
      )}
      <CSSTransition
        in={!selectedAddress}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Button onClick={handleButtonClick} />
      </CSSTransition>
      {selectedAddress && (
        <CreateEvent address={selectedAddress} />
      )}
    </main>
  );
}
