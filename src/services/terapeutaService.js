import api from './api';

export const asignarTerapeuta = async ({ paciente_servicio_id, terapeuta_id }) => {
  const response = await api.post('/asignacion-terapeuta/asignar', {
    paciente_servicio_id,
    terapeuta_id
  });
  return response.data;
}; 