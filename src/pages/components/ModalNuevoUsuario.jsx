import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { ROLES_NAMES } from '../../constants/roles';

const ModalNuevoUsuario = ({ open, usuario, onChange, onClose, onSave, roles, loading, errors, especialidades }) => {
  // Verificar si el rol seleccionado es Terapeuta
  const isTerapeuta = usuario.rol === ROLES_NAMES[4]; // 4 es el ID de TERAPEUTA

  // Función para manejar el cambio de rol y limpiar especialidad si no es terapeuta
  const handleRolChange = (e) => {
    const newRol = e.target.value;
    const newIsTerapeuta = newRol === ROLES_NAMES[4];
    
    // Si cambia de terapeuta a otro rol, limpiar especialidad
    if (!newIsTerapeuta && usuario.especialidad) {
      onChange({ target: { name: 'especialidad', value: '' } });
    }
    
    onChange(e);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Nuevo Usuario</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField 
            label="Nombres" 
            name="nombres" 
            value={usuario.nombres} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.nombres} 
            helperText={errors.nombres} 
          />
          <TextField 
            label="Apellidos" 
            name="apellidos" 
            value={usuario.apellidos} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.apellidos} 
            helperText={errors.apellidos} 
          />
          <TextField 
            label="DNI" 
            name="dni" 
            value={usuario.dni} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.dni} 
            helperText={errors.dni} 
          />
          <TextField 
            label="Usuario" 
            name="usuario" 
            value={usuario.usuario} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.usuario} 
            helperText={errors.usuario} 
          />
          <TextField 
            label="Contraseña" 
            name="contrasena" 
            type="password" 
            value={usuario.contrasena} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.contrasena} 
            helperText={errors.contrasena} 
          />
          <TextField 
            label="Email" 
            name="email" 
            value={usuario.email} 
            onChange={onChange} 
            fullWidth 
            error={!!errors.email} 
            helperText={errors.email} 
          />
          <TextField 
            select 
            label="Rol" 
            name="rol" 
            value={usuario.rol} 
            onChange={handleRolChange} 
            fullWidth 
            error={!!errors.rol} 
            helperText={errors.rol}
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.nombre}>
                {rol.nombre}
              </MenuItem>
            ))}
          </TextField>
          {/* Campo de especialidad solo para terapeutas */}
          {isTerapeuta && (
            <TextField 
              select 
              label="Especialidad" 
              name="especialidad" 
              value={usuario.especialidad} 
              onChange={onChange} 
              fullWidth 
              error={!!errors.especialidad} 
              helperText={errors.especialidad}
            >
              {especialidades.map((esp) => (
                <MenuItem key={esp.id} value={esp.nombre}>
                  {esp.nombre}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNuevoUsuario; 