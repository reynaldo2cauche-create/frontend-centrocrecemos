// hooks/useReclamos.js
import { useState, useEffect } from 'react';
import { libroReclamacionesService } from '../services/libroReclamacionesService';

export const useReclamos = (filtrosIniciales = {}) => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filtros, setFiltros] = useState({
    page: 1,
    limit: 10,
    sortBy: 'fecha_registro',
    sortOrder: 'DESC',
    ...filtrosIniciales
  });

  const cargarReclamos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await libroReclamacionesService.listarReclamos(filtros);
      
      if (result.success) {
        setReclamos(result.data);
        setPagination(result.pagination || {});
      } else {
        setError(result.message || 'Error al cargar reclamos');
      }
    } catch (err) {
      setError(err.message || 'Error de conexión');
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

  const refrescar = () => {
    cargarReclamos();
  };

  useEffect(() => {
    cargarReclamos();
  }, [filtros]);

  return {
    reclamos,
    loading,
    error,
    pagination,
    filtros,
    actualizarFiltros,
    cambiarPagina,
    refrescar
  };
};