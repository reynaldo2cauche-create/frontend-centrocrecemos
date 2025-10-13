// Utilidades para la agenda

export const getEstadoColor = (estado) => {
  switch (estado) {
    case 'Confirmada':
      return '#4caf50';
    case 'Pendiente':
      return '#ff9800';
    case 'Cancelada':
      return '#f44336';
    default:
      return '#757575';
  }
};

export const getEstadoIcon = (estado) => {
  switch (estado) {
    case 'Confirmada':
      return 'success';
    case 'Cancelada':
      return 'error';
    default:
      return null;
  }
};
