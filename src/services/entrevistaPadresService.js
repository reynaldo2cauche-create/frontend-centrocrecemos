import api from './api';

export const guardarEntrevistaPadres = async (entrevistaData) => {
  const response = await api.post('/historia-clinica/entrevista-padres', entrevistaData);
  return response.data;
};

export const obtenerEntrevistaPadres = async (pacienteId) => {
  const response = await api.get(`/historia-clinica/paciente/${pacienteId}/entrevistas-padres`);
  // El backend devuelve un array, tomamos el primer elemento
  const data = response.data;
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
};

export const actualizarEntrevistaPadres = async (entrevistaId, entrevistaData) => {
  const response = await api.put(`/historia-clinica/entrevista-padres/${entrevistaId}`, entrevistaData);
  return response.data;
};

export const eliminarEntrevistaPadres = async (entrevistaId) => {
  const response = await api.delete(`/historia-clinica/entrevista-padres/${entrevistaId}`);
  return response.data;
};
