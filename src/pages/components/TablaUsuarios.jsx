import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Chip, Stack, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TablaUsuarios = ({ usuarios, onEditar, onToggleActivo }) => (
  <Paper sx={{ p: 2 }}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#7B1FA2' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Correo Personal</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Rol</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Especialidad</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Usuario Sistema</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id} hover>
              <TableCell>{usuario.nombre || usuario.nombres + ' ' + usuario.apellidos}</TableCell>
              <TableCell>{usuario.correo || usuario.email}</TableCell>
              <TableCell>{usuario.rol ? (typeof usuario.rol === 'object' ? usuario.rol.nombre : usuario.rol) : ''}</TableCell>
              <TableCell>{usuario.especialidad ? (typeof usuario.especialidad === 'object' ? usuario.especialidad.nombre : usuario.especialidad) : ''}</TableCell>
              <TableCell>{usuario.username}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Switch
                    checked={usuario.estado === 1 || usuario.estado === true}
                    onChange={() => onToggleActivo(usuario.id)}
                    color="primary"
                  />
                  <Chip
                    label={(usuario.estado === 1 || usuario.estado === true) ? 'Activo' : 'Inactivo'}
                    color={(usuario.estado === 1 || usuario.estado === true) ? 'success' : 'default'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEditar(usuario)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default TablaUsuarios; 