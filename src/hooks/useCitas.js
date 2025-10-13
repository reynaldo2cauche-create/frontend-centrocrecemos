import { useEffect, useState } from 'react';
import * as citaService from '../services/citaService';

export const useCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listarCitas = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await citaService.listarCitas(params);
      setCitas(data || []);
      return data;
    } catch (err) {
      setError('Error al listar citas');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const crearCita = async (citaData) => {
    const nueva = await citaService.crearCita(citaData);
    setCitas(prev => [...prev, nueva]);
    return nueva;
  };

  return { citas, loading, error, listarCitas, crearCita };
};
