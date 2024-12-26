import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Form = ({ onAddEvent, onSaveEdit, eventToEdit }) => {
  const [consulta, setConsulta] = useState({
    typeConsulta: "",
    doctorName: "",
    day: "",
    hour: "",
  });

  useEffect(() => {
    if (eventToEdit) {
      setConsulta({
        typeConsulta: eventToEdit.title,
        doctorName: eventToEdit.doctor,
        day: eventToEdit.start.toISOString().split("T")[0],
        hour: eventToEdit.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
  }, [eventToEdit]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEvent = {
      title: consulta.typeConsulta,
      doctor: consulta.doctorName,
      start: new Date(`${consulta.day}T${consulta.hour}:00`), // Use um formato de data válido
      end: new Date(`${consulta.day}T${consulta.hour}:00`),   // Mesmo aqui
      allDay: false,
    };
  
    if (eventToEdit) {
      onSaveEdit(newEvent);
    } else {
      onAddEvent(newEvent);
    }
  
    setConsulta({ typeConsulta: "", doctorName: "", day: "", hour: "" });
  };
  

  return (
    <div className="max-w-lg w-full p-8 bg-white rounded-lg  shadow-lg border border-gray-200">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <label className="block text-2xl font-medium text-gray-700 mb-2">Tipo de Consulta:</label>
          <select
            name="typeConsulta"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={consulta.typeConsulta}
            onChange={handleChange}
          >
            <option value="">Selecione o tipo de consulta</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Endocrinologia">Endocrinologia</option>
            <option value="Gastroenterologia">Gastroenterologia</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Psiquiatria">Psiquiatria</option>
            <option value="Oftalmologia">Oftalmologia</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-2xl font-medium text-gray-700 mb-2">Nome do Médico:</label>
          <select
            name="doctorName"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={consulta.doctorName}
            onChange={handleChange}
          >
            <option value="">Selecione um médico</option>
            <option value="Célia Torres">Célia Torres</option>
            <option value="André Lucas">André Lucas</option>
            <option value="Matias Barros">Matias Barros</option>
            <option value="Daniela Ferreira">Daniela Ferreira</option>
            <option value="Luan Sacramento">Luan Sacramento</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-2xl font-medium text-gray-700 mb-2">Data da Consulta:</label>
          <input
            name="day"
            type="date"
            required
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={consulta.day}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-2xl font-medium text-gray-700 mb-2">Horário da Consulta:</label>
          <select
            name="hour"
            value={consulta.hour}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {[...Array(29)].map((_, i) => {
              const hour = Math.floor(i / 2) + 6; 
              const minute = i % 2 === 0 ? "00" : "30";
              const time = `${hour < 10 ? '0' : ''}${hour}:${minute}`; // Corrigido o template literal aqui
              return (
                <option key={time} value={time}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          {eventToEdit ? "Salvar Edição" : "Adicionar Consulta"}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  onAddEvent: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  eventToEdit: PropTypes.object,
};

export default Form;
