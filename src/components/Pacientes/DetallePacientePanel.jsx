import React, { useState } from 'react';
import { Paper, Box, Typography, Divider, Checkbox, FormControlLabel, IconButton, Tooltip, Chip, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { canViewContactInfo, isTerapeuta, canManagePatientStatus } from '../../constants/roles';
import { cambiarVisibilidadPaciente } from '../../services/pacienteService';

const DetallePacientePanel = ({ paciente, onEditar, user, onPacienteOcultado }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [ocultando, setOcultando] = useState(false);

  if (!paciente) {
    return (
      <Paper sx={{ 
        p: 4, 
        color: '#888', 
        textAlign: 'center',
        borderRadius: 2,
        backgroundColor: '#f8f9fa',
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="subtitle1">Selecciona un paciente para ver el detalle</Typography>
      </Paper>
    );
  }

  const getEstadoColor = (nombreEstado) => {
    // Mapeo de colores para los estados del backend
    const colorMap = {
      'Nuevo': '#4CAF50',        // Verde - Estado inicial
      'Entrevista': '#2196F3',   // Azul - En proceso de entrevista
      'Evaluacion': '#FF9800',   // Naranja - En evaluación
      'Terapia': '#9C27B0',      // Púrpura - En tratamiento activo
      'Inactivo': '#607D8B'      // Gris - Inactivo
    };
    return colorMap[nombreEstado] || '#757575';
  };

  const handleOcultarPaciente = async () => {    
    setOcultando(true);
    try {      
      await cambiarVisibilidadPaciente(paciente.id, false, user.id);      
      
      // Notificar al componente padre que el paciente fue ocultado
      if (onPacienteOcultado) {
        console.log('📞 Llamando callback onPacienteOcultado...');
        onPacienteOcultado(paciente.id);
      } else {
        console.log('⚠️ onPacienteOcultado no está definido');
      }
      
      console.log('🚪 Cerrando modal de confirmación...');
      setOpenConfirmDialog(false);
    } catch (error) {
      console.error('❌ Error al ocultar paciente:', error);
      // Aquí podrías mostrar un snackbar de error
    } finally {
      console.log('🏁 Finalizando proceso, ocultando = false');
      setOcultando(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 0,
          background: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minHeight: 340,
          border: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          mt: { xs: 2, md: 0 },
          mr: { xs: 0, md: 2 },
          mb: 2,
          ml: { xs: 0, md: 4 },
        }}
      >
        {/* Header con gradiente morado suave */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
            color: '#fff',
            p: 2,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #FFB74D, #FF8A65)',
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box sx={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%', 
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <PersonIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', letterSpacing: 0.3, mb: 0.25, color: 'white' }}>
                {paciente.nombres?.toUpperCase()} {paciente.apellido_paterno?.toUpperCase()} {paciente.apellido_materno?.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Editar paciente">
              <IconButton 
                onClick={() => onEditar && onEditar(paciente.id)}
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  p: 0.75,
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    color: 'white'
                  }
                }}
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            {canManagePatientStatus(user) && (
              <Tooltip title="Ocultar paciente">
                <IconButton 
                  onClick={() => setOpenConfirmDialog(true)}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    p: 0.75,
                    '&:hover': { 
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      color: 'white'
                    }
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Estado del Paciente */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            
            <Chip 
              label={paciente.estado?.nombre || 'Sin estado'} 
              size="medium" 
              sx={{ 
                backgroundColor: getEstadoColor(paciente.estado?.nombre),
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                padding: '8px 16px',
                '& .MuiChip-label': {
                  padding: '0 8px'
                }
              }} 
            />
          </Box>

          {/* Datos Paciente */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon sx={{ color: '#9575CD', fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Datos Paciente
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Fecha Nacimiento
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'No especificada'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Sexo
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.sexo?.nombre || 'No especificado'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Documento
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.tipo_documento?.nombre} - {paciente.numero_documento}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Información de Contacto */}
          {canViewContactInfo(user) && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ContactPhoneIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Información de Contacto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Distrito
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.distrito?.nombre || 'No especificado'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Celular Principal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.celular || 'No especificado'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Celular Secundario
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.celular2 || 'No especificado'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Correo Electrónico
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.correo || 'No especificado'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Dirección
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.direccion || 'No especificada'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Datos del Responsable */}
          {paciente.responsable_nombre && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Datos del Responsable
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Nombre Completo
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.responsable_nombre} {paciente.responsable_apellido_paterno} {paciente.responsable_apellido_materno}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                      Relación
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paciente.responsable_relacion?.nombre || 'No especificada'}
                    </Typography>
                  </Box>
                </Grid>
                {!isTerapeuta(user) && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                          Teléfono
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {paciente.responsable_telefono || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                          Documento
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {paciente.responsable_tipo_documento?.nombre} - {paciente.responsable_numero_documento}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                          Correo
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {paciente.responsable_email || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}

          {/* Información Médica */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MedicalServicesIcon sx={{ color: '#e91e63', fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Información Médica
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Diagnóstico Médico
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.diagnostico_medico || 'No especificado'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Alergias Conocidas
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.alergias || 'Ninguna conocida'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Medicamentos Actuales
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.medicamentos_actuales || 'Ninguno'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Información Adicional */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AssignmentIcon sx={{ color: '#9c27b0', fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Información Adicional
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Motivo de Consulta
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.motivo_consulta || 'No especificado'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                    Referido Por
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {paciente.referido_por || 'No especificado'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Consentimiento */}
          {canViewContactInfo(user) && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AssignmentIcon sx={{ color: '#607d8b', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Consentimientos
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={!!paciente.acepta_terminos} 
                      disabled 
                      sx={{ 
                        color: '#607d8b',
                        '&.Mui-checked': { color: '#455a64' }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      Acepto los términos y condiciones de la empresa
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={!!paciente.acepta_info_comercial} 
                      disabled 
                      sx={{ 
                        color: '#607d8b',
                        '&.Mui-checked': { color: '#455a64' }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      Autorizo el envío de información comercial
                    </Typography>
                  }
                />
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Dialog de confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Confirmar Ocultación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas ocultar al paciente <strong>{paciente.nombres} {paciente.apellido_paterno}</strong>?
            <br /><br />
            <strong>Nota:</strong> Esta acción ocultará al paciente de la lista principal, pero no eliminará sus datos del sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenConfirmDialog(false)} 
            color="secondary"
            disabled={ocultando}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleOcultarPaciente} 
            color="error" 
            variant="contained"
            disabled={ocultando}
            startIcon={ocultando ? <div style={{ width: 16, height: 16, border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <DeleteIcon />}
            sx={{
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          >
            {ocultando ? 'Ocultando...' : 'Ocultar Paciente'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetallePacientePanel; 