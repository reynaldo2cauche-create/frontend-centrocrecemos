import {
  Assessment,
  FamilyRestroom,
  Psychology,
  MedicalServices,
  Timeline,
  Description,
  School,
  Healing
} from '@mui/icons-material';
import { SERVICIOS } from '../../../constants/areas';

// Configuración de tabs dinámica
export const TAB_CONFIG = [
  {
    id: 'reporte-evolucion',
    label: 'Reporte de Evolución',
    icon: Assessment,
    component: 'ReporteEvolucion',
    visible: () => true, // Siempre visible
    required: true, // Tab principal
    description: 'Reporte detallado del progreso del paciente'
  },
  {
    id: 'entrevista-padres',
    label: 'Entrevista a Padres',
    icon: FamilyRestroom,
    component: 'EntrevistaPadres',
    visible: () => true,
    required: false,
    description: 'Información de la entrevista con los padres'
  },
  
];

// Función para obtener tabs visibles según el paciente
export const getVisibleTabs = (paciente) => {
  return TAB_CONFIG.filter(tab => tab.visible(paciente));
};

// Función para obtener un tab específico por ID
export const getTabById = (tabId) => {
  return TAB_CONFIG.find(tab => tab.id === tabId);
};

// Función para validar si un tab es requerido
export const isTabRequired = (tabId) => {
  const tab = getTabById(tabId);
  return tab?.required || false;
};

// Función para obtener el primer tab visible
export const getFirstVisibleTab = (paciente) => {
  const visibleTabs = getVisibleTabs(paciente);
  return visibleTabs.length > 0 ? visibleTabs[0] : null;
};

// Función para obtener el índice de un tab
export const getTabIndex = (tabId, paciente) => {
  const visibleTabs = getVisibleTabs(paciente);
  return visibleTabs.findIndex(tab => tab.id === tabId);
};
