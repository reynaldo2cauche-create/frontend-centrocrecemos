// hooks/useEstadisticas.js
import { useState, useEffect } from 'react';
import { libroReclamacionesService } from '../services/libroReclamacionesService';

export const useEstadisticas = () => {
  const [estadisticas, setEstadisticas] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await libroReclamacionesService.obtenerEstadisticas();
      
      if (result.success) {
        setEstadisticas(result.data);
      } else {
        setError(result.message || 'Error al cargar estadísticas');
      }
    } catch (err) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  return {
    estadisticas,
    loading,
    error,
    refrescar: cargarEstadisticas
  };
};