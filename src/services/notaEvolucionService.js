import api from './api';

export const guardarNotaEvolucion = async (notaData) => {
  const response = await api.post('/nota-evolucion', notaData);
  return response.data;
};

export const obtenerNotasEvolucionPorPaciente = async (paciente_id, url = null) => {
  const endpoint = url || `/nota-evolucion/paciente/${paciente_id}`;
  const response = await api.get(endpoint);
  return response.data;
}; 

