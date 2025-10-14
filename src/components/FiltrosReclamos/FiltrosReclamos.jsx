// components/Admin/FiltrosReclamos.jsx
import { useState, useEffect } from 'react';

export const FiltrosReclamos = ({ filtros, onFiltrosChange }) => {
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);

  useEffect(() => {
    setFiltrosLocales(filtros);
  }, [filtros]);

  const handleChange = (key, value) => {
    const nuevosFiltros = { ...filtrosLocales, [key]: value || undefined };
    setFiltrosLocales(nuevosFiltros);
  };

  const aplicarFiltros = () => {
    onFiltrosChange(filtrosLocales);
  };

  const limpiarFiltros = () => {
    const filtrosLimpios = {
      page: 1,
      limit: 10,
      sortBy: 'fecha_registro',
      sortOrder: 'DESC'
    };
    setFiltrosLocales(filtrosLimpios);
    onFiltrosChange(filtrosLimpios);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Número de Reclamo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Reclamo
          </label>
          <input
            type="text"
            value={filtrosLocales.numeroReclamo || ''}
            onChange={(e) => handleChange('numeroReclamo', e.target.value)}
            placeholder="Ej: REC-2024-001"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tipo de Reclamo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Reclamo
          </label>
          <select
            value={filtrosLocales.tipoReclamo || ''}
            onChange={(e) => handleChange('tipoReclamo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={filtrosLocales.estado || ''}
            onChange={(e) => handleChange('estado', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="RECIBIDO">Recibido</option>
            <option value="EN_REVISION">En Revisión</option>
            <option value="RESPONDIDO">Respondido</option>
            <option value="CERRADO">Cerrado</option>
          </select>
        </div>

        {/* Documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            N° Documento
          </label>
          <input
            type="text"
            value={filtrosLocales.numeroDocumento || ''}
            onChange={(e) => handleChange('numeroDocumento', e.target.value)}
            placeholder="DNI, CE o RUC"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Segunda fila de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fecha Desde */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <input
            type="date"
            value={filtrosLocales.fechaDesde || ''}
            onChange={(e) => handleChange('fechaDesde', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <input
            type="date"
            value={filtrosLocales.fechaHasta || ''}
            onChange={(e) => handleChange('fechaHasta', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botones */}
        <div className="flex items-end gap-2">
          <button
            onClick={aplicarFiltros}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={limpiarFiltros}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};