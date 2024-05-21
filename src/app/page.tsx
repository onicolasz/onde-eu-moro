"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import Map from "./components/Map";
import CreateEvent from "./components/CreateEvent";
import AddressInfoCard from "./components/AddressInfoCard";
import { Transition } from "react-transition-group";

interface Event {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  occurred_at: string;
}

export default function Home() {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>({
    lat: -23.55052,
    lng: -46.633308,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [zoom, setZoom] = useState<number>(12);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressInfo, setShowAddressInfo] = useState<boolean>(false);
  const [searchedAddress, setSearchedAddress] = useState<string>("Endereço");
  const [newCircle, setNewCircle] = useState<{
    lat: number;
    lng: number;
    radius: number | null;
  }>({ lat: 0, lng: 0, radius: null });
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);

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
      setSearchedAddress(address);
      setShowAddressInfo(true);
    }
  };

  const handleButtonClick = () => {
    setShowMessage(true);
    setShowCreateEvent(true);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    if (showMessage) {
      const response = await fetch(
        `/api/reverse-geocode?lat=${lat}&lng=${lng}`
      );
      const data = await response.json();

      if (response.status === 200) {
        setSelectedAddress(data.address);
        setNewCircle({ lat, lng, radius: 1 });
        setShowMessage(false);
      }
    }
  };

  const updateCircleRadius = (radius: number) => {
    setNewCircle((prev) => ({ ...prev, radius }));
  };

  const handleCloseCreateEvent = () => {
    setShowCreateEvent(false);
    setSelectedAddress(null);
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      <header className="absolute justify-center top-0 left-0 w-full flex flex-row p-4 z-10">
        <SearchBar onSearch={handleSearch} />
      </header>
      <Map
        center={center}
        events={events}
        zoom={zoom}
        onMapClick={handleMapClick}
        newCircle={newCircle}
      />
      {showMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded">
          Por favor, selecione um local no mapa.
        </div>
      )}
      {!selectedAddress && !showCreateEvent && (
        <Button
          className="fixed bottom-4 right-16 z-10 shadow-xl bg-white border-none hover:bg-zinc-200 duration-300 active:bg-white"
          text="Criar Evento"
          onClick={handleButtonClick}
        />
      )}
      <Transition in={!!selectedAddress} timeout={150} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            className={`fixed bottom-4 right-16 z-20 ${
              state === "entered"
                ? "transition-transform scale-100"
                : "transition-transform scale-0"
            }`}
          >
            <CreateEvent
              address={selectedAddress}
              updateCircleRadius={updateCircleRadius}
              onClose={handleCloseCreateEvent}
            />
          </div>
        )}
      </Transition>
      {showAddressInfo && !selectedAddress && (
        <AddressInfoCard events={events} address={searchedAddress} />
      )}
    </main>
  );
}
