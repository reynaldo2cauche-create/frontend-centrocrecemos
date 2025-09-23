import api from './api';

export const guardarReporteEvolucion = async (reporteData) => {
  try {
    const response = await api.post('/historia-clinica/reporte-evolucion', reporteData);
    return response.data;
  } catch (error) {
    console.error('Error al guardar reporte de evolución:', error);
    throw error;
  }
};

export const actualizarReporteEvolucion = async (reporteId, reporteData) => {
  try {
    const response = await api.put(`/historia-clinica/reporte-evolucion/${reporteId}`, reporteData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar reporte de evolución:', error);
    throw error;
  }
};

export const obtenerReporteEvolucion = async (pacienteId) => {
  try {
    const response = await api.get(`/historia-clinica/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reporte de evolución:', error);
    throw error;
  }
};
