export const AREAS = {
  INFANTIL_ADOLESCENTES: 1,
  ADULTOS: 2
};

export const AREAS_NAMES = {
  [AREAS.INFANTIL_ADOLESCENTES]: 'Área Infantil y Adolescentes',
  [AREAS.ADULTOS]: 'Área Adultos'
};

export const AREAS_DESCRIPTIONS = {
  [AREAS.INFANTIL_ADOLESCENTES]: 'Servicios especializados para niños y adolescentes',
  [AREAS.ADULTOS]: 'Servicios especializados para adultos'
};

export const SERVICIOS = {
  // Área Infantil y Adolescentes (area_id: 1)
  TERAPIA_LENGUAJE: 1,
  TERAPIA_OCUPACIONAL: 2,
  TERAPIA_APRENDIZAJE: 3,
  PSICOLOGIA: 4,
  EVALUACION_PSICOLOGICA_COLEGIO: 5,
  ORIENTACION_VOCACIONAL: 6,
  
  // Área Adultos (area_id: 2)
  PSICOTERAPIA_INDIVIDUAL: 7,
  TERAPIA_PAREJA: 8,
  TERAPIA_FAMILIAR: 9,
  TERAPIA_LENGUAJE_ADULTOS: 10
};

export const SERVICIOS_DATA = {
  [SERVICIOS.TERAPIA_LENGUAJE]: {
    id: 1,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Terapia de Lenguaje',
    activo: 1
  },
  [SERVICIOS.TERAPIA_OCUPACIONAL]: {
    id: 2,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Terapia Ocupacional',
    activo: 1
  },
  [SERVICIOS.TERAPIA_APRENDIZAJE]: {
    id: 3,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Terapia de Aprendizaje',
    activo: 1
  },
  [SERVICIOS.PSICOLOGIA]: {
    id: 4,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Psicología',
    activo: 1
  },
  [SERVICIOS.EVALUACION_PSICOLOGICA_COLEGIO]: {
    id: 5,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Evaluación Psicológica para Colegio',
    activo: 1
  },
  [SERVICIOS.ORIENTACION_VOCACIONAL]: {
    id: 6,
    area_id: AREAS.INFANTIL_ADOLESCENTES,
    nombre: 'Orientación Vocacional',
    activo: 1
  },
  [SERVICIOS.PSICOTERAPIA_INDIVIDUAL]: {
    id: 7,
    area_id: AREAS.ADULTOS,
    nombre: 'Psicoterapia Individual',
    activo: 1
  },
  [SERVICIOS.TERAPIA_PAREJA]: {
    id: 8,
    area_id: AREAS.ADULTOS,
    nombre: 'Terapia de Pareja',
    activo: 1
  },
  [SERVICIOS.TERAPIA_FAMILIAR]: {
    id: 9,
    area_id: AREAS.ADULTOS,
    nombre: 'Terapia Familiar',
    activo: 1
  },
  [SERVICIOS.TERAPIA_LENGUAJE_ADULTOS]: {
    id: 10,
    area_id: AREAS.ADULTOS,
    nombre: 'Terapia de Lenguaje',
    activo: 1
  }
};

// Funciones helper para obtener servicios por área
export const getServiciosByArea = (areaId) => {
  return Object.values(SERVICIOS_DATA).filter(servicio => servicio.area_id === areaId);
};

export const getServiciosInfantilAdolescentes = () => {
  return getServiciosByArea(AREAS.INFANTIL_ADOLESCENTES);
};

export const getServiciosAdultos = () => {
  return getServiciosByArea(AREAS.ADULTOS);
};

// Función para obtener el nombre del servicio por ID
export const getServicioName = (servicioId) => {
  return SERVICIOS_DATA[servicioId]?.nombre || 'Servicio no encontrado';
};

// Función para obtener el área del servicio por ID
export const getServicioArea = (servicioId) => {
  const servicio = SERVICIOS_DATA[servicioId];
  return servicio ? AREAS_NAMES[servicio.area_id] : 'Área no encontrada';
};

// Función para verificar si un servicio pertenece a un área específica
export const isServicioInArea = (servicioId, areaId) => {
  return SERVICIOS_DATA[servicioId]?.area_id === areaId;
};

// Función para obtener todos los servicios activos
export const getServiciosActivos = () => {
  return Object.values(SERVICIOS_DATA).filter(servicio => servicio.activo === 1);
}; 