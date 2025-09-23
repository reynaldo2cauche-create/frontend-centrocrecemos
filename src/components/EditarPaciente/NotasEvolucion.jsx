import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, CircularProgress } from '@mui/material';
import Add from '@mui/icons-material/Add';
import FilterList from '@mui/icons-material/FilterList';
import Close from '@mui/icons-material/Close';
import { guardarNotaEvolucion } from '../../services/notaEvolucionService';

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

const NotasEvolucion = ({ notas, setNotas, openNotaModal, setOpenNotaModal, nota, setNota, paciente_id, user_id_crea, user, setSnackbar }) => {
  // Estado para controlar la carga del botón
  const [saving, setSaving] = useState(false);

  // Función helper para convertir saltos de línea en elementos JSX
  const formatTextWithLineBreaks = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleAgregarComentario = async (e) => {
    console.log('guardo nota');
    e.preventDefault();
    if (nota.entrevista.trim() || nota.sesionEvaluacion.trim() || nota.sesionTerapias.trim() || nota.objetivosTerapeuticos.trim() || nota.observaciones.trim()) {
      setSaving(true); // Activar estado de carga
      const nuevaNota = {
        paciente_id,
        entrevista: nota.entrevista,
        sesion_evaluacion: nota.sesionEvaluacion,
        sesion_terapias: nota.sesionTerapias,
        objetivos_terapeuticos: nota.objetivosTerapeuticos,
        observaciones: nota.observaciones,
        user_id_crea
      };
      try {
        console.log('nuevaNota', nuevaNota);
        await guardarNotaEvolucion(nuevaNota);
        setNotas([
          {
            id: notas.length + 1,
            fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),            
            autor: user ? `${user.nombres} ${user.apellidos}${user.rol ? ' — ' + user.rol.nombre : ''}` : 'Usuario',
            entrevista: nota.entrevista,
            sesionEvaluacion: nota.sesionEvaluacion,
            sesionTerapias: nota.sesionTerapias,
            objetivosTerapeuticos: nota.objetivosTerapeuticos,
            observaciones: nota.observaciones
          },
          ...notas
        ]);
        setNota({ entrevista: '', sesionEvaluacion: '', sesionTerapias: '', objetivosTerapeuticos: '', observaciones: '' });
        setOpenNotaModal(false);
        setSnackbar({ open: true, message: 'Nota de evolución guardada correctamente', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al guardar la nota de evolución', severity: 'error' });
      } finally {
        setSaving(false); // Desactivar estado de carga
      }
    }
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        mt: 0, 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: 4,
        p: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid rgba(255,255,255,0.8)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #9575CD, #B39DDB, #9575CD)',
          borderRadius: '4px 4px 0 0'
        }
      }}
    >
      <Box sx={{ 
        mb: 3,
        p: 2,
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
        borderRadius: 3,
        border: '1px solid #f48fb1',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(233, 30, 99, 0.1) 0%, transparent 50%)',
          borderRadius: 3,
          pointerEvents: 'none'
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold',
            color: '#e91e63',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '1.1rem'
          }}>
            📝 Notas de Evolución
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenNotaModal(true)}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #e91e63 0%, #f06292 100%)',
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: '0 3px 8px rgba(233, 30, 99, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.4)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Nueva Nota
          </Button>
        </Box>
        <Typography variant="caption" sx={{ color: '#666', mt: 1, fontStyle: 'italic', fontSize: '0.75rem' }}>
          Registra el progreso y observaciones del paciente
        </Typography>
      </Box>
      
      {/* Lista de notas */}
      {notas && notas.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notas.map((n, idx) => {
            const [nombre, especialidad] = n.autor.split(' — ');
            return (
              <Paper key={n.id} sx={{ 
                p: 2, 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                borderRadius: 2,
                boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.3s ease'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: idx % 2 === 0 
                    ? 'linear-gradient(135deg, #9575CD, #B39DDB)' 
                    : 'linear-gradient(135deg, #e91e63, #f06292)',
                  borderRadius: '2px'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 1.5,
                  pl: 1.5
                }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '0.9rem'
                    }}>
                      📅 {n.fecha} - {nombre}
                    </Typography>
                    {especialidad && (
                      <Chip 
                        label={especialidad.trim()} 
                        size="small" 
                        sx={{ 
                          mt: 0.5,
                          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.7rem'
                        }}
                      />
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ pl: 1.5 }}>
                  {n.entrevista && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold', 
                        color: '#2c3e50',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem'
                      }}>
                        🗣️ Entrevista:
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 13, 
                        color: '#2c3e50',
                        lineHeight: 1.5,
                        background: 'rgba(149, 117, 205, 0.05)',
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(149, 117, 205, 0.1)'
                      }}>
                        {formatTextWithLineBreaks(n.entrevista)}
                      </Typography>
                    </Box>
                  )}
                  
                  {n.objetivosTerapeuticos && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold', 
                        color: '#2c3e50',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem'
                      }}>
                        🎯 Objetivos Terapéuticos:
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 13, 
                        color: '#2c3e50',
                        lineHeight: 1.5,
                        background: 'rgba(149, 117, 205, 0.05)',
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(149, 117, 205, 0.1)'
                      }}>
                        {formatTextWithLineBreaks(n.objetivosTerapeuticos)}
                      </Typography>
                    </Box>
                  )}
                  
                  {n.sesionEvaluacion && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold', 
                        color: '#2c3e50',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem'
                      }}>
                        📊 Sesión de Evaluación:
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 13, 
                        color: '#2c3e50',
                        lineHeight: 1.5,
                        background: 'rgba(149, 117, 205, 0.05)',
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(149, 117, 205, 0.1)'
                      }}>
                        {formatTextWithLineBreaks(n.sesionEvaluacion)}
                      </Typography>
                    </Box>
                  )}
                  
                  {n.sesionTerapias && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold', 
                        color: '#2c3e50',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem'
                      }}>
                        🏥 Sesión de Terapias:
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 13, 
                        color: '#2c3e50',
                        lineHeight: 1.5,
                        background: 'rgba(149, 117, 205, 0.05)',
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(149, 117, 205, 0.1)'
                      }}>
                        {formatTextWithLineBreaks(n.sesionTerapias)}
                      </Typography>
                    </Box>
                  )}
                  
                  {n.observaciones && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold', 
                        color: '#2c3e50',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem'
                      }}>
                        📝 Observaciones:
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 13, 
                        color: '#2c3e50',
                        lineHeight: 1.5,
                        background: 'rgba(149, 117, 205, 0.05)',
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(149, 117, 205, 0.1)'
                      }}>
                        {formatTextWithLineBreaks(n.observaciones)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 3,
          border: '2px dashed #dee2e6'
        }}>
          <Typography variant="h6" sx={{ 
            color: '#6c757d',
            fontWeight: 'bold',
            mb: 1
          }}>
            📝 No hay notas registradas
          </Typography>
          <Typography variant="body2" sx={{ color: '#868e96' }}>
            Comienza agregando la primera nota de evolución
          </Typography>
        </Box>
      )}

      {/* Modal para agregar nota de evolución */}
      <Dialog 
        open={openNotaModal} 
        onClose={() => setOpenNotaModal(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
          color: 'white',
          fontWeight: 'bold'
        }}>
          📝 Agregar Nota de Evolución
          <IconButton 
            onClick={() => setOpenNotaModal(false)}
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                🗣️ Entrevista
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={nota.entrevista}
                onChange={e => setNota({ ...nota, entrevista: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9575CD'
                      }
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                🎯 Objetivos Terapéuticos
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={nota.objetivosTerapeuticos}
                onChange={e => setNota({ ...nota, objetivosTerapeuticos: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9575CD'
                      }
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                📊 Sesión de Evaluación
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={nota.sesionEvaluacion}
                onChange={e => setNota({ ...nota, sesionEvaluacion: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9575CD'
                      }
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                🏥 Sesión de Terapias
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={nota.sesionTerapias}
                onChange={e => setNota({ ...nota, sesionTerapias: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9575CD'
                      }
                    }
                  }
                }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                📝 Observaciones
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={nota.observaciones}
                onChange={e => setNota({ ...nota, observaciones: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9575CD'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1.5 }}>
          <Button 
            onClick={() => setOpenNotaModal(false)} 
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              borderColor: '#9575CD',
              color: '#9575CD',
              fontSize: '0.85rem',
              '&:hover': {
                borderColor: '#7B68EE',
                backgroundColor: 'rgba(149, 117, 205, 0.05)'
              }
            }}
          >
            Cancelar
          </Button>
          <LoadingButton 
            onClick={handleAgregarComentario} 
            variant="contained"
            size="small"
            loading={saving}
            sx={{
              background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: '0 3px 8px rgba(149, 117, 205, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7B68EE 0%, #9575CD 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(149, 117, 205, 0.4)',
                transition: 'all 0.3s ease'
              }
            }}
                      >
              {saving ? 'Guardando...' : 'Guardar Nota'}
            </LoadingButton>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NotasEvolucion;
