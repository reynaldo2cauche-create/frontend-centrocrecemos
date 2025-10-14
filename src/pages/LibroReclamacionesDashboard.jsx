// pages/Admin/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { libroReclamacionesService } from '../services/libroReclamaciones';
import { CardEstadistica } from '../components/CardEstadistica/CardEstadistica.jsx';
import { FiltrosReclamos } from '../components/FiltrosReclamos/FiltrosReclamos.jsx';
import { TablaReclamos } from '../components/TablaReclamos/TablaReclamos.jsx';  

export const LibroReclamacionesDashboard = () => {
  const [reclamos, setReclamos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({
    page: 1,
    limit: 10,
    sortBy: 'fecha_registro',
    sortOrder: 'DESC'
  });
  const [pagination, setPagination] = useState({}); // AÑADIR PAGINATION AL ESTADO

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/intranet/login');
      return;
    }
    
    cargarDatos();
  }, [filtros, navigate]); // AÑADIR filtros COMO DEPENDENCIA

  const cargarDatos = async () => {
    await Promise.all([cargarEstadisticas(), cargarReclamos()]);
  };

  const cargarEstadisticas = async () => {
    try {
      setLoadingStats(true);
      const result = await libroReclamacionesService.obtenerEstadisticas();
      if (result.success) {
        setEstadisticas(result.data);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      if (error.message.includes('autenticado') || error.message.includes('token')) {
        navigate('/intranet/login');
      }
    } finally {
      setLoadingStats(false);
    }
  };

  const cargarReclamos = async () => {
    try {
      setLoading(true);
      const result = await libroReclamacionesService.listarReclamos(filtros); // USAR filtros EN LUGAR DE VALORES FIJOS
      if (result.success) {
        setReclamos(result.data);
        setPagination(result.pagination || {}); // ACTUALIZAR PAGINATION
      }
    } catch (error) {
      console.error('Error cargando reclamos:', error);
      if (error.message.includes('autenticado') || error.message.includes('token')) {
        navigate('/intranet/login');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros, page: 1 }));
  };

  const cambiarPagina = (nuevaPagina) => {
    setFiltros(prev => ({ ...prev, page: nuevaPagina }));
  };

  const cardsEstadisticas = [
    {
      titulo: 'Total Reclamos',
      valor: estadisticas.totalReclamos || 0,
      icono: '📋',
      color: 'blue',
      descripcion: 'Reclamos registrados'
    },
    {
      titulo: 'Pendientes',
      valor: estadisticas.pendientes || 0,
      icono: '⏳',
      color: 'yellow',
      descripcion: 'En revisión'
    },
    {
      titulo: 'Respondidos',
      valor: estadisticas.respondidos || 0,
      icono: '✅',
      color: 'green',
      descripcion: 'Con respuesta'
    },
    {
      titulo: 'Cerrados',
      valor: estadisticas.cerrados || 0,
      icono: '🔒',
      color: 'gray',
      descripcion: 'Finalizados'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Reclamos</h1>
        <p className="text-gray-600 mt-2">Gestión y seguimiento de reclamos del libro de reclamaciones</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardsEstadisticas.map((card, index) => (
          <CardEstadistica
            key={index}
            titulo={card.titulo}
            valor={card.valor}
            icono={card.icono}
            color={card.color}
            descripcion={card.descripcion}
            loading={loadingStats}
          />
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <FiltrosReclamos 
          filtros={filtros}
          onFiltrosChange={actualizarFiltros}
        />
      </div>

      {/* Tabla de Reclamos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <TablaReclamos
          reclamos={reclamos}
          loading={loading}
          pagination={pagination} 
          onPaginaChange={cambiarPagina}
        />
      </div>
    </div>
  );
};