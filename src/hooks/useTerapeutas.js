import { useState, useEffect } from 'react';
import { getTrabajadores } from '../services/trabajadorService';

export function useTerapeutas() {
  const [terapeutas, setTerapeutas] = useState([]);
  useEffect(() => {
    getTrabajadores().then(setTerapeutas).catch(() => setTerapeutas([]));
  }, []);
  return terapeutas;
} 