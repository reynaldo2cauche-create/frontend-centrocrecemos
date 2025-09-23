import { useState, useEffect } from 'react';
import { getServicios } from '../services/catalogoService';
export function useServicios() {
  const [servicios, setServicios] = useState([]);
  useEffect(() => {
    getServicios().then(setServicios).catch(() => setServicios([]));
  }, []);
  return servicios;
} 