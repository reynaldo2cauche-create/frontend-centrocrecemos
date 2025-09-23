import api from './api';
import { API_BASE_URL } from './api';

export const guardarTest = async (testData) => {
  const response = await fetch(`${API_BASE_URL}/evaluaciones/guardar-resultado`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  });
  if (!response.ok) throw new Error(`Error al guardar el test: ${response.status}`);
  return await response.json();
};

export const getInstituciones = async () => {
  const response = await api.get('/evaluaciones/instituciones');
  return response.data;
};

export const getSecciones = async () => {
  const response = await api.get('/evaluaciones/secciones');
  return response.data;
};

export const getGrados = async () => {
  const response = await api.get('/evaluaciones/grados');
  return response.data;
};

export const getTrabajadores = async () => {
  const response = await api.get('/evaluaciones/trabajadores');
  return response.data;
};

export const getTiposTest = async () => {
  const response = await api.get('/evaluaciones/tipos-test');
  return response.data;
};

export const getEstructuraTest = async (id) => {
  const response = await api.get(`/evaluaciones/estructura-test/${id}`);
  return response.data;
};

export const getDatosEstudiantes = async () => {
  const response = await api.get('/evaluaciones/datos-estudiantes');
  return response.data;
}; 