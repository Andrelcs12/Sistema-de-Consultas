






import PropTypes from 'prop-types';

const ConsultaLista = ({ events, onEditEvent, onRemoveEvent }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-2xl mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Lista de Consultas</h1>

      {/* Para telas grandes, mantemos a tabela */}
      <div className="hidden md:block">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Tipo de Consulta</th>
              <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Médico</th>
              <th className="px-6 py-4 text-center font-bold text-lg uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-center font-bold text-lg uppercase tracking-wider">Hora</th>
              <th className="px-6 py-4 text-center font-bold text-lg uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-200 border-b">
                <td className="px-6 py-4 text-left">{event.title}</td>
                <td className="px-6 py-4 text-left">{event.doctor}</td>
                <td className="px-6 py-4 text-center">{new Date(event.start).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEditEvent(index)}
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onRemoveEvent(index)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Para telas pequenas, usamos uma lista de cartões */}
      <div className="md:hidden">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-indigo-600">{event.title}</h2>
            <p className="text-gray-700">Médico: {event.doctor}</p>
            <p className="text-gray-500">Data: {new Date(event.start).toLocaleDateString()}</p>
            <p className="text-gray-500">Hora: {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => onEditEvent(index)}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onRemoveEvent(index)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ConsultaLista.propTypes = {
  events: PropTypes.array.isRequired,
  onEditEvent: PropTypes.func.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
};

export default ConsultaLista;