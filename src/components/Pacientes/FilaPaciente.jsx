import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { canViewContactInfo, canViewServiceInfo } from '../../constants/roles';

const getEstadoColor = (estado) => {
  switch (estado) {
    case 'Nuevo':
      return 'default';
    case 'Entrevista':
      return 'info';
    case 'Evaluacion':
      return 'warning';
    case 'Terapia':
      return 'success';
    case 'Inactivo':
      return 'error';
    default:
      return 'default';
  }
};

const FilaPaciente = ({ paciente, idx, onSelect, seleccionado, user }) => (
  <TableRow
    sx={{
      backgroundColor: seleccionado
        ? '#E1D7F0'
        : idx % 2 === 0
        ? '#fff'
        : (theme) => theme.palette.background.default,
      cursor: 'pointer'
    }}
    hover
    onClick={() => onSelect(paciente)}
  >
    <TableCell>
      {paciente.created_at ? new Date(paciente.created_at).toLocaleDateString('es-PE') : ''}
    </TableCell>
    <TableCell>
      <Chip 
        label={`${paciente.tipo_documento?.nombre || ''}: ${paciente.numero_documento}`}
        size="small"
        sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: '#fff' }}
      />
    </TableCell>
    <TableCell>
      {`${paciente.nombres} ${paciente.apellido_paterno} ${paciente.apellido_materno}`}
    </TableCell>
    {/* <TableCell>{paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toLocaleDateString() : ''}</TableCell> */}
    <TableCell>{(() => {
      if (!paciente.fecha_nacimiento) return '-';
      const hoy = new Date();
      const nacimiento = new Date(paciente.fecha_nacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad;
    })()}</TableCell>
    {canViewServiceInfo(user) && (
      <TableCell>
        {paciente.servicio ? (
          <Chip
            label={paciente.servicio.nombre}
            size="small"
            sx={{ 
              backgroundColor: (theme) => theme.palette.secondary.main, 
              color: '#fff',
              fontWeight: '500'
            }}
          />
        ) : (
          <Chip
            label="Sin servicio"
            size="small"
            sx={{ 
              backgroundColor: '#ccc', 
              color: '#666',
              fontWeight: '400'
            }}
          />
        )}
      </TableCell>
    )}
    {canViewContactInfo(user) && (
      <>
        <TableCell>{paciente.distrito?.nombre || ''}</TableCell>
        <TableCell>{paciente.celular || ''}</TableCell>
      </>
    )}
    <TableCell>
      <Chip
        label={paciente.estado?.nombre || ''}
        color={getEstadoColor(paciente.estado?.nombre)}
        size="small"
        sx={{ fontWeight: 'bold' }}
      />
    </TableCell>
  </TableRow>
);

export default FilaPaciente; 