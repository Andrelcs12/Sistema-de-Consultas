import { useState } from "react";
import Form from "../components/Form";
import Calendario from "../components/Calendario";
import ConsultaLista from "../components/ConsultaLista";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setEditEvent({ ...eventToEdit, index });
  };

  const handleSaveEdit = (updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[editEvent.index] = updatedEvent;
    setEvents(updatedEvents);
    setEditEvent(null);
  };

  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="bg-slate-300 min-h-screen p-6 md:pl-72">
      <h1 className="text-gray-700 font-bold text-3xl mb-6 text-center md:text-left">
        PAINEL DE CONTROLE
      </h1>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <Form onAddEvent={handleAddEvent} onSaveEdit={handleSaveEdit} eventToEdit={editEvent} />
        <Calendario events={events} />
      </div>

      <ConsultaLista 
        events={events} 
        onEditEvent={handleEditEvent} 
        onRemoveEvent={handleRemoveEvent} 
      />
    </div>
  );
};

export default Home;