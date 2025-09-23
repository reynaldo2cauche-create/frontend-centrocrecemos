import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { ROLES } from '../../constants/roles';

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

const AsignarServicioModal = ({ open, onClose, servicios, terapeutas, nuevoServicio, setNuevoServicio, onAsignar }) => {
  // Estado para controlar la carga del botón
  const [saving, setSaving] = useState(false);

  // Función wrapper para manejar la carga
  const handleAsignar = async () => {
    setSaving(true);
    try {
      await onAsignar();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Asignar nuevo servicio</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Servicio</InputLabel>
          <Select
            value={nuevoServicio.servicio}
            label="Servicio"
            onChange={e => setNuevoServicio({ ...nuevoServicio, servicio: e.target.value })}
          >
            {servicios.map(s => (
              <MenuItem key={s.id} value={s.nombre}>{s.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Terapeuta</InputLabel>
          <Select
            value={nuevoServicio.terapeuta}
            label="Terapeuta"
            onChange={e => setNuevoServicio({ ...nuevoServicio, terapeuta: e.target.value })}
          >
            {terapeutas.filter(t => t.estado === true && t.rol?.id === ROLES.TERAPEUTA).map(t => (
              <MenuItem key={t.id} value={t.nombres + ' ' + t.apellidos}>
                {t.nombres} {t.apellidos}{t.especialidad ? ` — ${t.especialidad.nombre}` : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <LoadingButton 
          loading={saving} 
          onClick={handleAsignar} 
          color="primary" 
          variant="contained"
        >
          {saving ? 'Asignando...' : 'Asignar'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AsignarServicioModal; 