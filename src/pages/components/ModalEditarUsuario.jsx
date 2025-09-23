import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { ROLES_NAMES } from '../../constants/roles';

// Componente simple de botón con carga
const LoadingButton = ({ loading, children, ...props }) => (
  <Button
    {...props}
    disabled={loading || props.disabled}
    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : props.startIcon}
  >
    {children}
  </Button>
);

const ModalEditarUsuario = ({ open, usuario, onChange, onClose, onSave, roles, especialidades, errors }) => {
  const [saving, setSaving] = useState(false);
  
  // Verificar si el rol seleccionado es Terapeuta
  const rolNombre = typeof usuario?.rol === 'object' ? usuario?.rol?.nombre : usuario?.rol;
  const isTerapeuta = rolNombre === ROLES_NAMES[4]; // 4 es el ID de TERAPEUTA

  // Función para manejar el cambio de rol y limpiar especialidad si no es terapeuta
  const handleRolChange = (e) => {
    const newRol = e.target.value;
    const newIsTerapeuta = newRol === ROLES_NAMES[4];
    
    // Si cambia de terapeuta a otro rol, limpiar especialidad
    if (!newIsTerapeuta && usuario?.especialidad) {
      onChange({ target: { name: 'especialidad', value: '' } });
    }
    
    onChange(e);
  };

  // Función wrapper para manejar el guardado con estado de carga
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nombres" name="nombres" value={usuario?.nombres || ''} onChange={onChange} fullWidth error={!!errors?.nombres} helperText={errors?.nombres} />
          <TextField label="Apellidos" name="apellidos" value={usuario?.apellidos || ''} onChange={onChange} fullWidth error={!!errors?.apellidos} helperText={errors?.apellidos} />
          <TextField label="DNI" name="dni" value={usuario?.dni || ''} onChange={onChange} fullWidth error={!!errors?.dni} helperText={errors?.dni} />
          <TextField label="Usuario" name="usuario" value={usuario?.usuario || usuario?.username || ''} onChange={onChange} fullWidth error={!!errors?.usuario} helperText={errors?.usuario} />
          <TextField label="Contraseña" name="contrasena" type="password" value={usuario?.contrasena || ''} onChange={onChange} fullWidth error={!!errors?.contrasena} helperText={errors?.contrasena} />
          <TextField label="Email" name="email" value={usuario?.email || ''} onChange={onChange} fullWidth error={!!errors?.email} helperText={errors?.email} />
          <TextField select label="Rol" name="rol" value={usuario?.rol?.nombre || usuario?.rol || ''} onChange={handleRolChange} fullWidth error={!!errors?.rol} helperText={errors?.rol}>
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.nombre}>{rol.nombre}</MenuItem>
            ))}
          </TextField>
          {/* Campo de especialidad solo para terapeutas */}
          {isTerapeuta && (
            <TextField select label="Especialidad" name="especialidad" value={usuario?.especialidad?.nombre || usuario?.especialidad || ''} onChange={onChange} fullWidth error={!!errors?.especialidad} helperText={errors?.especialidad}>
              {especialidades && especialidades.map((esp) => (
                <MenuItem key={esp.id} value={esp.nombre}>{esp.nombre}</MenuItem>
              ))}
            </TextField>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={saving}>
          Cancelar
        </Button>
        <LoadingButton
          onClick={handleSave}
          color="primary"
          variant="contained"
          loading={saving}
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarUsuario; 