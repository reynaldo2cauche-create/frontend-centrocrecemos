// components/Admin/TablaReclamos.jsx
import { Link } from 'react-router-dom';

export const TablaReclamos = ({ reclamos, loading, pagination, onPaginaChange }) => {
  const getEstadoBadge = (estado) => {
    const estados = {
      RECIBIDO: { clase: 'bg-yellow-100 text-yellow-800', texto: 'Recibido' },
      EN_REVISION: { clase: 'bg-blue-100 text-blue-800', texto: 'En Revisión' },
      RESPONDIDO: { clase: 'bg-green-100 text-green-800', texto: 'Respondido' },
      CERRADO: { clase: 'bg-gray-100 text-gray-800', texto: 'Cerrado' }
    };
    
    const estadoInfo = estados[estado] || estados.RECIBIDO;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoInfo.clase}`}>
        {estadoInfo.texto}
      </span>
    );
  };

  const getTipoBadge = (tipo) => {
    const tipos = {
      queja: { clase: 'bg-red-100 text-red-800', texto: 'Queja' },
      reclamo: { clase: 'bg-orange-100 text-orange-800', texto: 'Reclamo' },
      sugerencia: { clase: 'bg-purple-100 text-purple-800', texto: 'Sugerencia' }
    };
    
    const tipoInfo = tipos[tipo] || tipos.reclamo;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${tipoInfo.clase}`}>
        {tipoInfo.texto}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header de la tabla */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Reclamos ({pagination.total || 0})
        </h3>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reclamo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Consumidor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reclamos.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No se encontraron reclamos con los filtros aplicados
                </td>
              </tr>
            ) : (
              reclamos.map((reclamo) => (
                <tr key={reclamo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        #{reclamo.numeroReclamo}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {reclamo.bienContratado}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reclamo.nombres} {reclamo.apellidos}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reclamo.tipoDocumento}: {reclamo.numeroDocumento}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTipoBadge(reclamo.tipoReclamo)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getEstadoBadge(reclamo.estado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reclamo.fecha_registro).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/reclamos/${reclamo.id}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{pagination.from || 0}</span> a{' '}
              <span className="font-medium">{pagination.to || 0}</span> de{' '}
              <span className="font-medium">{pagination.total || 0}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onPaginaChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <button
                onClick={() => onPaginaChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};