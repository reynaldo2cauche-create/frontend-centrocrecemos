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
  ListSubheader,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  DialogContentText
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as AccessTime,
  Close as CloseIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Update as UpdateIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useBusquedaPacientes } from '../../hooks/useBusquedaPacientes';
import { useServicios } from '../../hooks/useServicios';
import { useMotivosCita } from '../../hooks/useMotivosCita';
import { useHistorialCita } from '../../hooks/useHistorialCita';
import { ROLES } from '../../constants/roles';

const ModalAgendarCita = ({
  open,
  onClose,
  slotSeleccionado,
  formularioCita,
  onFormularioChange,
  onGuardar,
  onEliminar,
  servicios,
  duraciones,
  terapeutaSeleccionado,
  modoEdicion = false,
  citaEditando = null,
  currentUser = null
}) => {
  const [queryPaciente, setQueryPaciente] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
  const { pacientes, loading: loadingPacientes, error: errorPacientes } = useBusquedaPacientes(queryPaciente);
  const serviciosApi = useServicios();
  const { motivos, loading: loadingMotivos, error: errorMotivos } = useMotivosCita();

  // Hook para el historial (solo para roles ADMINISTRADOR y ADMISION)
  const puedeVerHistorial = currentUser?.rol?.id === ROLES.ADMINISTRADOR || currentUser?.rol?.id === ROLES.ADMISION;
  const puedeEliminar = currentUser?.rol?.id === ROLES.ADMINISTRADOR || currentUser?.rol?.id === ROLES.ADMISION;
  const puedeEditar = currentUser?.rol?.id === ROLES.ADMINISTRADOR || currentUser?.rol?.id === ROLES.ADMISION;
  const esTerapeuta = currentUser?.rol?.id === ROLES.TERAPEUTA;
  const { historial, loading: loadingHistorial, error: errorHistorial } = useHistorialCita(
    modoEdicion && citaEditando?.id ? citaEditando.id : null
  );

  // Resetear búsqueda y pestañas cuando se abre el modal
  useEffect(() => {
    if (open) {
      setQueryPaciente('');
      setTabValue(0); // Siempre empezar en la primera pestaña
      setDialogoEliminarAbierto(false); // Cerrar diálogo de eliminación
    }
  }, [open]);

  // Manejadores para el diálogo de eliminar
  const abrirDialogoEliminar = () => {
    setDialogoEliminarAbierto(true);
  };

  const cerrarDialogoEliminar = () => {
    setDialogoEliminarAbierto(false);
  };

  const confirmarEliminar = () => {
    setDialogoEliminarAbierto(false);
    if (onEliminar) {
      onEliminar();
    }
  };

  // Función para formatear fecha y hora del historial
  const formatearFechaHistorial = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener el ícono según el tipo de operación
  const getIconoOperacion = (tipo) => {
    switch (tipo) {
      case 'CREATE':
        return <AddIcon />;
      case 'UPDATE':
        return <UpdateIcon />;
      case 'DELETE':
        return <EditIcon />;
      default:
        return <HistoryIcon />;
    }
  };

  // Función para obtener el color del chip según el tipo
  const getColorOperacion = (tipo) => {
    switch (tipo) {
      case 'CREATE':
        return 'success';
      case 'UPDATE':
        return 'info';
      case 'DELETE':
        return 'error';
      default:
        return 'default';
    }
  };
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
          overflow: 'hidden',
          height: modoEdicion && puedeVerHistorial ? '80vh' : '75vh'
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
            {esTerapeuta ? 'Ver Cita' : (modoEdicion ? 'Editar Cita' : 'Agendar Nueva Cita')}
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
      
      <DialogContent sx={{ p: 0, maxHeight: '75vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Información del slot seleccionado */}
          {slotSeleccionado && (
            <Box sx={{ 
              background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%)', 
              p: 2, 
            mx: 3,
            mt: 2,
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

        {/* Pestañas */}
        {modoEdicion && puedeVerHistorial && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="📝 Detalles" />
              <Tab label="📋 Historial" />
            </Tabs>
          </Box>
        )}

        {/* Contenido de las pestañas */}
        <Box sx={{ p: 3, flex: 1, overflow: 'auto', minHeight: 0 }}>
          {(!modoEdicion || !puedeVerHistorial || tabValue === 0) && (
            <Stack spacing={2.5} sx={{ mt: 0.5 }}>

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
              disabled={esTerapeuta}
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
              👨‍⚕️ Terapeuta
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={
                terapeutaSeleccionado 
                  ? `${terapeutaSeleccionado.nombres || ''} ${terapeutaSeleccionado.apellidos || ''}`.trim()
                  : 'No seleccionado'
              }
              disabled
                sx={{
                  borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#424242',
                  fontWeight: 'bold',
                },
              }}
            />
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
                disabled={esTerapeuta}
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
                disabled={loadingMotivos || esTerapeuta}
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
                        {String(motivo.nombre || '')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {String(motivo.descripcion || '')}
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
                disabled={esTerapeuta}
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
                  disabled={esTerapeuta}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                    },
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
                  disabled={esTerapeuta}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A3C644',
                      },
                    },
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
              rows={3}
              size="small"
              value={formularioCita.nota || ''}
              onChange={(e) => onFormularioChange('nota', e.target.value)}
              disabled={esTerapeuta}
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
          )}

          {/* Contenido de la pestaña Historial */}
          {modoEdicion && puedeVerHistorial && tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#424242' }}>
                📋 Historial de Cambios
              </Typography>
              
              {loadingHistorial ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : errorHistorial ? (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errorHistorial}
                </Alert>
              ) : historial.length === 0 ? (
                <Alert severity="info">
                  No hay historial disponible para esta cita.
                </Alert>
              ) : (
                <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                  {historial.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: '50%', 
                            bgcolor: getColorOperacion(item.tipo_operacion) === 'success' ? '#e8f5e8' :
                                      getColorOperacion(item.tipo_operacion) === 'info' ? '#e3f2fd' :
                                      getColorOperacion(item.tipo_operacion) === 'error' ? '#ffebee' : '#f5f5f5',
                            color: getColorOperacion(item.tipo_operacion) === 'success' ? '#2e7d32' :
                                   getColorOperacion(item.tipo_operacion) === 'info' ? '#1976d2' :
                                   getColorOperacion(item.tipo_operacion) === 'error' ? '#d32f2f' : '#757575'
                          }}>
                            {getIconoOperacion(item.tipo_operacion)}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip 
                                label={item.tipo_operacion} 
                                color={getColorOperacion(item.tipo_operacion)}
                                size="small"
                              />
                              <Typography variant="body2" color="text.secondary">
                                {formatearFechaHistorial(item.fecha_registro)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {item.descripcion_cambios}
                              </Typography>
                              
                              {/* Detalles de la cita en este momento */}
                              <Box sx={{ 
                                bgcolor: '#f8f9fa', 
                                p: 2, 
                                borderRadius: 1,
                                border: '1px solid #e0e0e0'
                              }}>
                                <Grid container spacing={1}>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Paciente:</strong> {item.paciente_nombre}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Terapeuta:</strong> {item.doctor_nombre}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Servicio:</strong> {item.servicio_nombre}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Motivo:</strong> {item.motivo_nombre}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Fecha:</strong> {item.fecha}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                      <strong>Hora:</strong> {item.hora_inicio} - {item.hora_fin}
                                    </Typography>
                                  </Grid>
                                  {item.nota && (
                                    <Grid item xs={12}>
                                      <Typography variant="caption" color="text.secondary">
                                        <strong>Nota:</strong> {item.nota}
                                      </Typography>
                                    </Grid>
                                  )}
                                </Grid>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < historial.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        gap: 2,
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {/* Botón Eliminar - Solo en modo edición y si el usuario tiene permiso */}
        <Box>
          {modoEdicion && puedeEliminar && (
            <Button 
              onClick={abrirDialogoEliminar}
              variant="outlined"
              size="large"
              startIcon={<DeleteIcon />}
              sx={{
                borderColor: '#d32f2f',
                color: '#d32f2f',
                borderRadius: 2,
                px: 3,
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#b71c1c',
                  backgroundColor: 'rgba(211,47,47,0.08)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Eliminar
            </Button>
          )}
        </Box>

        {/* Botones Cancelar y Guardar */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {esTerapeuta ? (
            // Solo botón Cerrar para terapeutas
            <Button 
              onClick={onClose}
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
              Cerrar
            </Button>
          ) : (
            // Botones Cancelar y Guardar para admin/admisión
            <>
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
                {modoEdicion ? '✏️ Actualizar Cita' : '💾 Guardar Cita'}
              </Button>
            </>
          )}
        </Box>
      </DialogActions>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={dialogoEliminarAbierto}
        onClose={cerrarDialogoEliminar}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <DeleteIcon />
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText>
            ¿Está seguro que desea eliminar esta cita? Esta acción no se puede deshacer.
            {citaEditando && (
              <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Detalles de la cita:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Paciente:</strong> {formularioCita.paciente?.nombre_completo || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha:</strong> {formularioCita.fecha}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Hora:</strong> {formularioCita.horaInicio}
                </Typography>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={cerrarDialogoEliminar}
            variant="outlined"
            sx={{
              borderColor: '#757575',
              color: '#757575'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={confirmarEliminar}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(211,47,47,0.3)'
            }}
          >
            Eliminar Cita
        </Button>
      </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ModalAgendarCita;
