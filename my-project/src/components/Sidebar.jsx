import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClipboardList, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`fixed h-full bg-slate-700 text-black text-shadow-md transition-transform duration-300 transform ${isSidebarOpen ? 'w-64 transition-all duration-500' : 'w-0 transition-all duration-500'} md:w-64`}>
      <div className="px-4 py-6">
    
        <div className="flex justify-between items-center">
          <span className={`text-2xl font-serif font-bold ${isSidebarOpen ? 'block' : 'hidden'} text-white md:block`}>
            Life1000
          </span>

    
          <button
            className="md:hidden bg-black text-white rounded-full p-2"
            onClick={toggleSidebar}
          >
            <HiMenu className="text-2xl" />
          </button>
        </div>

        <ul className={`mt-6 space-y-1 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <li>
            <Link
              to="/calendario"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium text-white hover:bg-gray-400 border-r-4 border-transparent hover:border-white"
            >
              <FaCalendarAlt className="text-white" />
              Calendário
            </Link>
          </li>

          <li>
            <Link
              to="/consultas"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium text-white hover:bg-gray-400 border-r-4 border-transparent hover:border-white"
            >
              <FaClipboardList className="text-white" />
              Consultas
            </Link>
          </li>

          <li>
            <Link
              to="/usuarios"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium text-white hover:bg-gray-400 border-r-4 border-transparent hover:border-white"
            >
              <FaUsers className="text-white" />
              Usuários
            </Link>
          </li>

          <li>
            <Link
              to="/relatorios"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium text-white hover:bg-gray-400 border-r-4 border-transparent hover:border-white"
            >
              <FaChartBar className="text-white" />
              Relatórios
            </Link>
          </li>

          <li>
            <Link
              to="/configuracoes"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium text-white hover:bg-gray-400 border-r-4 border-transparent hover:border-white"
            >
              <FaCog className="text-white" />
              Configurações
            </Link>
          </li>
        </ul>
      </div>

      <div className={`sticky inset-x-0 bottom-0 border-t border-gray-100 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <button
          type="button"
          className="flex items-center gap-2 w-full px-4 py-2 text-xl font-medium text-white hover:bg-gray-400"
        >
          <FiLogOut className="text-white" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
