import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  ListSubheader
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as AccessTime,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useBusquedaPacientes } from '../../hooks/useBusquedaPacientes';
import { useTrabajadores } from '../../hooks/useTrabajadores';
import { useServicios } from '../../hooks/useServicios';
import { useMotivosCita } from '../../hooks/useMotivosCita';

const ModalAgendarCita = ({
  open,
  onClose,
  slotSeleccionado,
  formularioCita,
  onFormularioChange,
  onGuardar,
  servicios,
  duraciones
}) => {
  const [queryPaciente, setQueryPaciente] = useState('');
  const { pacientes, loading: loadingPacientes, error: errorPacientes } = useBusquedaPacientes(queryPaciente);
  const { trabajadores, loading: loadingTrabajadores, error: errorTrabajadores } = useTrabajadores();
  const serviciosApi = useServicios();
  const { motivos, loading: loadingMotivos, error: errorMotivos } = useMotivosCita();

  // Resetear búsqueda cuando se abre el modal
  useEffect(() => {
    if (open) {
      setQueryPaciente('');
    }
  }, [open]);
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #A3C644 0%, #8fb23a 100%)',
        color: 'white',
        fontWeight: 'bold',
        py: 2,
        px: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarIcon />
          <Typography variant="h6" component="div">
            Agendar Nueva Cita
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.1)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3, maxHeight: '70vh', overflow: 'auto' }}>
        <Stack spacing={2.5} sx={{ mt: 0.5 }}>
          {/* Información del slot seleccionado */}
          {slotSeleccionado && (
            <Box sx={{ 
              background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%)', 
              p: 2, 
              borderRadius: 2,
              border: '2px solid #A3C644',
              boxShadow: '0 2px 8px rgba(163,198,68,0.15)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime sx={{ color: '#A3C644', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#A3C644' }}>
                  {slotSeleccionado.dia} a las {slotSeleccionado.hora}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Buscador de Paciente */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              👤 Paciente
            </Typography>
            <Autocomplete
              options={pacientes}
              getOptionLabel={(option) => option.nombre_completo || option.nombre || ''}
              value={formularioCita.paciente}
              onChange={(event, newValue) => onFormularioChange('paciente', newValue)}
              onInputChange={(event, newInputValue) => {
                setQueryPaciente(newInputValue);
              }}
              loading={loadingPacientes}
              loadingText="Buscando pacientes..."
              noOptionsText={queryPaciente.length < 2 ? "Escriba al menos 2 caracteres..." : "No se encontraron pacientes"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Buscar por nombre completo..."
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingPacientes ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                    }
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {option.nombre_completo || option.nombre}
                    </Typography>
                    {option.documento && (
                      <Typography variant="body2" color="text.secondary">
                        Documento: {option.documento}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            />
            {errorPacientes && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorPacientes}
              </Alert>
            )}
          </Box>

          {/* Doctor/Trabajador */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              👨‍⚕️ Doctor/Terapeuta
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formularioCita.doctor_id || ''}
                onChange={(e) => onFormularioChange('doctor_id', e.target.value)}
                displayEmpty
                disabled={loadingTrabajadores}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>
                    {loadingTrabajadores ? 'Cargando trabajadores...' : 'Seleccionar doctor/terapeuta...'}
                  </em>
                </MenuItem>
                {trabajadores.map((trabajador) => (
                  <MenuItem key={trabajador.id} value={trabajador.id}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {trabajador.nombre_completo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trabajador.cargo}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errorTrabajadores && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorTrabajadores}
              </Alert>
            )}
          </Box>

            {/* Servicio */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              🏥 Servicio
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formularioCita.servicio_id || ''}
                onChange={(e) => onFormularioChange('servicio_id', e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Seleccionar servicio...</em>
                </MenuItem>
                {(() => {
                  const lista = (serviciosApi && serviciosApi.length ? serviciosApi : (servicios || []));
                  const agrupados = lista.reduce((acc, srv) => {
                    const area = srv.area?.nombre || srv.area || 'Sin Área';
                    if (!acc[area]) acc[area] = [];
                    acc[area].push(srv);
                    return acc;
                  }, {});
                  return Object.entries(agrupados).map(([areaNombre, serviciosArea]) => [
                    <ListSubheader
                      key={areaNombre}
                      sx={{
                        background: '#fff',
                        color: '#174ea6',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        letterSpacing: 0.5,
                        py: 1,
                        borderBottom: '1px solid #e0e0e0'
                      }}
                    >
                      {areaNombre}
                    </ListSubheader>,
                    serviciosArea.map(srv => {
                      const key = srv.id ?? srv.value ?? srv.nombre ?? String(srv);
                      const label = srv.nombre ?? srv.label ?? String(srv);
                      return (
                        <MenuItem key={key} value={srv.id}>
                          {label}
                        </MenuItem>
                      );
                    })
                  ]);
                })()}
              </Select>
            </FormControl>
          </Box>

          {/* Motivo */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              📝 Motivo
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formularioCita.motivo_id || ''}
                onChange={(e) => onFormularioChange('motivo_id', e.target.value)}
                displayEmpty
                disabled={loadingMotivos}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>
                    {loadingMotivos ? 'Cargando motivos...' : 'Seleccionar motivo...'}
                  </em>
                </MenuItem>
                {motivos.map((motivo) => (
                  <MenuItem key={motivo.id} value={motivo.id}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {motivo.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {motivo.descripcion}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errorMotivos && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorMotivos}
              </Alert>
            )}
          </Box>

          {/* Duración */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              ⏱️ Duración
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formularioCita.duracion}
                onChange={(e) => onFormularioChange('duracion', e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Seleccionar duración...</em>
                </MenuItem>
                {duraciones.map((duracion) => (
                  <MenuItem key={duracion.valor} value={duracion.valor}>
                    {duracion.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Fecha y Hora */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              📅 Fecha y Hora
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={formularioCita.fecha}
                  onChange={(e) => onFormularioChange('fecha', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="time"
                  value={formularioCita.horaInicio}
                  onChange={(e) => onFormularioChange('horaInicio', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Nota de la cita */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}>
              📝 Nota de la cita
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              size="small"
              value={formularioCita.nota}
              onChange={(e) => onFormularioChange('nota', e.target.value)}
              placeholder="Agregue cualquier observación o nota adicional..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#A3C644',
                  },
                }
              }}
            />
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        gap: 2,
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e0e0e0'
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderColor: '#A3C644',
            color: '#A3C644',
            borderRadius: 2,
            px: 3,
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#8fb23a',
              backgroundColor: 'rgba(163,198,68,0.08)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onGuardar}
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #A3C644 0%, #8fb23a 100%)',
            borderRadius: 2,
            px: 4,
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(163,198,68,0.3)',
            '&:hover': { 
              background: 'linear-gradient(135deg, #8fb23a 0%, #7a9a32 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 16px rgba(163,198,68,0.4)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          💾 Guardar Cita
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAgendarCita;
