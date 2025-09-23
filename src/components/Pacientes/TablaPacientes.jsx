import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import FilaPaciente from './FilaPaciente';
import { canViewContactInfo, canViewServiceInfo } from '../../constants/roles';

const TablaPacientes = ({ pacientes, onSelect, pacienteSeleccionadoId, user, showEmptyMessage, emptyMessage }) => (
  <Table>
    <TableHead>
      <TableRow sx={{ 
        background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
        borderBottom: '2px solid #B39DDB'
      }}>
        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Fecha Creación</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Documento</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Nombre Completo</TableCell>        
        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Edad</TableCell>
        {canViewServiceInfo(user) && (
          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Servicio</TableCell>
        )}
        {canViewContactInfo(user) && (
          <>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Distrito</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Teléfono</TableCell>
          </>
        )}
        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Estado</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {pacientes.length === 0 ? (
        <TableRow>
          <TableCell colSpan={
          (canViewContactInfo(user) ? 8 : 6) + (canViewServiceInfo(user) ? 0 : -1)
        } align="center">
            {emptyMessage || 'No se encontraron datos'}
          </TableCell>
        </TableRow>
      ) : (
        pacientes.map((paciente, idx) => (
          <FilaPaciente
            key={paciente.id}
            paciente={paciente}
            idx={idx}
            onSelect={onSelect}
            seleccionado={paciente.id === pacienteSeleccionadoId}
            user={user}
          />
        ))
      )}
    </TableBody>
  </Table>
);

export default TablaPacientes; 