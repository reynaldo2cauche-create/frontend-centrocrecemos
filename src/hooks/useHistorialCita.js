import { useState, useEffect } from 'react';
import * as citaService from '../services/citaService';

export const useHistorialCita = (citaId) => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarHistorial = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await citaService.getHistorialCita(id);
      setHistorial(data || []);
      return data;
    } catch (err) {
      setError('Error al cargar historial');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (citaId) {
      cargarHistorial(citaId);
    }
  }, [citaId]);

  return { historial, loading, error, cargarHistorial };
};

