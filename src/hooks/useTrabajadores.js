import { useState, useEffect } from 'react';
import { getTrabajadores } from '../services/trabajadorService';

export const useTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarTrabajadores = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTrabajadores();
      setTrabajadores(data || []);
    } catch (err) {
      console.error('Error al cargar trabajadores:', err);
      setError('Error al cargar trabajadores');
      setTrabajadores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTrabajadores();
  }, []);

  return {
    trabajadores,
    loading,
    error,
    recargar: cargarTrabajadores
  };
};
