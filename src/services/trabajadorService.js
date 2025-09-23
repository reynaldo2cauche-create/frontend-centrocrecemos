import api from './api';

// Obtener todos los trabajadores
export const getTrabajadores = async () => {
  const response = await api.get('/trabajadores');
  return response.data;
};

// Aquí puedes agregar más funciones relacionadas a trabajadores, por ejemplo:
// export const createTrabajador = async (data) => { ... }
// export const updateTrabajador = async (id, data) => { ... }
// export const deleteTrabajador = async (id) => { ... } 

export const crearTrabajador = async (data) => {
  const response = await api.post('/trabajadores', data);
  return response.data;
}; 

export const getRoles = async () => {
  const response = await api.get('/roles');
  return response.data;
}; 

export const getEspecialidades = async () => {
  const response = await api.get('/especialidades');
  return response.data;
}; 

export const activarTrabajador = async (id) => {
  const response = await api.put(`/trabajadores/${id}/activar`);
  return response.data;
};

export const desactivarTrabajador = async (id) => {
  const response = await api.put(`/trabajadores/${id}/desactivar`);
  return response.data;
}; 

export const getTrabajadorById = async (id) => {
  const response = await api.get(`/trabajadores/${id}`);
  return response.data;
}; 

export const updateTrabajador = async (id, data) => {
  const response = await api.patch(`/trabajadores/${id}`, data);
  return response.data;
}; 