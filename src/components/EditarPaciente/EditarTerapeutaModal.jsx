import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
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

const EditarTerapeutaModal = ({ open, onClose, servicio, nuevoTerapeuta, setNuevoTerapeuta, terapeutas, onGuardar }) => {
  // Estado para controlar la carga del botón
  const [saving, setSaving] = useState(false);

  // Función wrapper para manejar la carga
  const handleGuardar = async () => {
    setSaving(true);
    try {
      await onGuardar();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Editar terapeuta asignado</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Servicio</InputLabel>
          <Select
            value={servicio?.servicio?.nombre || ''}
            label="Servicio"
            disabled
          >
            <MenuItem value={servicio?.servicio?.nombre || ''}>
              {servicio?.servicio?.nombre || 'Sin nombre'}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Terapeuta</InputLabel>
          <Select
            value={nuevoTerapeuta}
            label="Terapeuta"
            onChange={e => setNuevoTerapeuta(e.target.value)}
          >
            <MenuItem value="">
              <em>Sin asignar</em>
            </MenuItem>
            {terapeutas.filter(t => t.estado === true && t.rol?.id === ROLES.TERAPEUTA).map(t => (
              <MenuItem key={t.id} value={`${t.nombres} ${t.apellidos}`}>
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
          onClick={handleGuardar} 
          color="primary" 
          variant="contained"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditarTerapeutaModal;
