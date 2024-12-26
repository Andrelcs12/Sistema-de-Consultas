import PropTypes from "prop-types";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdEvent } from "react-icons/md";
import { useState, useRef } from "react";

const locales = { "pt-BR": ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendario = ({ events }) => {
  const [currentView, setCurrentView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef();

  const handleNavigate = (direction) => {
    if (calendarRef.current) {
      calendarRef.current.handleNavigate(direction);
    }
  };

  const closeModal = () => setSelectedEvent(null);

  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-xl max-w-6xl mx-auto border border-gray-200">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <MdEvent className="text-indigo-600 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">
            Calendário de Consultas
          </h1>
        </div>
      </header>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => handleNavigate("PREV")}
          className="px-5 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
        >
          Anterior
        </button>
        <select
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="month">Mês</option>
          <option value="week">Semana</option>
          <option value="day">Dia</option>
          <option value="agenda">Agenda</option>
        </select>
        <button
          onClick={() => handleNavigate("NEXT")}
          className="px-5 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
        >
          Próximo
        </button>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <Calendar
          ref={calendarRef}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={{
            
            today: "Hoje",
            previous: "Voltar",
            next: "Avançar",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            noEventsInRange: "Não há eventos no período selecionado.",
            date: "Data",
            time: "Hora",
            event: "Evento",
            showMore: (count) => `+${count}`,
          }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          onView={(view) => setCurrentView(view)}
          view={currentView}
        />
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600">
              <strong>Início:</strong>{" "}
              {format(new Date(selectedEvent.start), "dd/MM/yyyy HH:mm")}
            </p>
            <p className="text-gray-600">
              <strong>Término:</strong>{" "}
              {format(
                new Date(selectedEvent.start.getTime() + 60 * 60 * 1000),
                "dd/MM/yyyy HH:mm"
              )}
            </p>
            <p className="text-gray-600">
              <strong>Médico:</strong>{" "}
              {selectedEvent.doctor || "Sem médico atribuído"}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Calendario.propTypes = {
  events: PropTypes.array.isRequired,
};

export default Calendario;
