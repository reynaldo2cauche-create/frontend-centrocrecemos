import React, { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  CircularProgress,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Assessment,
  Save,
  Description,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { calcularEdad } from '../../../../utils/date';

const ReporteEvolucion = ({ 
  paciente, 
  user, 
  loading, 
  reporteEvolucion, 
  handleInputChange, 
  handleSaveReporte, 
  saving, 
  reportesExistentes, 
  vistaResumida, 
  toggleVistaResumida, 
  frecuenciasAtencion,
  handleNuevoReporte,
  serviciosPaciente
}) => {
  const [expandedReportes, setExpandedReportes] = useState({});

  const toggleExpandedReporte = (reporteId) => {
    setExpandedReportes(prev => ({
      ...prev,
      [reporteId]: !prev[reporteId]
    }));
  };

  // Expandir el primer reporte por defecto cuando se cargan los reportes
  useEffect(() => {
    if (reportesExistentes.length > 0 && Object.keys(expandedReportes).length === 0) {
      const primerReporte = reportesExistentes[0];
      setExpandedReportes({ [primerReporte.id]: true });
    }
  }, [reportesExistentes, expandedReportes]);
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3,
        p: 2,
        backgroundColor: '#fff3cd',
        borderRadius: 2,
        border: '1px solid #ffeaa7'
      }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           <Assessment sx={{ color: '#856404', fontSize: 28 }} />
           <Button
             variant="text"
             sx={{
               color: '#856404',
               fontSize: '1.5rem',
               fontWeight: 'bold',
               textTransform: 'none',
               p: 0,
               minWidth: 'auto',
               '&:hover': {
                 backgroundColor: 'transparent',
                 textDecoration: 'underline'
               }
             }}
           >
             REPORTE DE EVOLUCIÓN
           </Button>
         </Box>
                                   <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={vistaResumida ? "contained" : "outlined"}
              size="small"
              onClick={toggleVistaResumida}
              startIcon={<Description />}
              sx={{
                backgroundColor: vistaResumida ? '#17a2b8' : 'transparent',
                borderColor: vistaResumida ? '#17a2b8' : '#856404',
                color: vistaResumida ? 'white' : '#856404',
                '&:hover': {
                  backgroundColor: vistaResumida ? '#138496' : 'rgba(133, 100, 4, 0.1)'
                }
              }}
            >
              Vista Completa
            </Button>
                        <Button
               variant="outlined"
               size="small"
               onClick={handleNuevoReporte}
               sx={{
                 borderColor: '#9575CD',
                 color: '#9575CD',
                 '&:hover': {
                   borderColor: '#7B68EE',
                   backgroundColor: 'rgba(149, 117, 205, 0.1)'
                 }
               }}
             >
               Nuevo Reporte
             </Button>
          </Box>
      </Box>

      

      {/* Vista Resumida - Todos los reportes */}
      {vistaResumida ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reportesExistentes.length > 0 ? (
            reportesExistentes.map((reporte, index) => (
              <Box key={reporte.id} sx={{ 
                backgroundColor: 'white', 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}>
                {/* Header del reporte */}
                <Box sx={{ 
                  backgroundColor: '#e3f2fd', 
                  p: 2, 
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => toggleExpandedReporte(reporte.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                      Reporte {index + 1}
                    </Typography>
                                         <Typography variant="body2" sx={{ color: '#666' }}>
                       {reporte.servicio?.nombre || reporte.servicio} - {reporte.periodoIntervencion}
                     </Typography>
                  </Box>
                  <IconButton size="small">
                    {expandedReportes[reporte.id] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                {/* Contenido expandible del reporte */}
                <Collapse in={expandedReportes[reporte.id]}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      {/* Primera fila - Dos columnas */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Servicio
                          </Typography>
                                                     <Typography variant="body2" sx={{ color: '#333' }}>
                             {reporte.servicio?.nombre || reporte.servicio || 'No especificado'}
                           </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Especialista
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }}>
                            {reporte.especialista || 'No especificado'}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Segunda fila - Tres columnas */}
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Edad
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }}>
                            {reporte.edad ? `${reporte.edad} años` : 'No especificado'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Fecha Evaluación
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }}>
                            {reporte.fechaEvaluacion || 'No especificado'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Frecuencia Atención
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }}>
                            {reporte.frecuenciaAtencion || 'No especificado'}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Tercera fila */}
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                            Período de Intervención
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }}>
                            {reporte.periodoIntervencion || 'No especificado'}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Campos de texto largo - Una columna */}
                                             <Grid item xs={12}>
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                             Metodología
                           </Typography>
                           <Box sx={{ 
                             color: '#333', 
                             fontSize: '0.875rem',
                             lineHeight: 1.5,
                             whiteSpace: 'pre-wrap',
                             fontFamily: 'inherit'
                           }}>
                             {reporte.metodologia || 'No especificado'}
                           </Box>
                         </Box>
                       </Grid>

                                             <Grid item xs={12}>
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                             Objetivos
                           </Typography>
                           <Box sx={{ 
                             color: '#333', 
                             fontSize: '0.875rem',
                             lineHeight: 1.5,
                             whiteSpace: 'pre-wrap',
                             fontFamily: 'inherit'
                           }}>
                             {reporte.objetivos || 'No especificado'}
                           </Box>
                         </Box>
                       </Grid>

                                             <Grid item xs={12}>
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                             Logros
                           </Typography>
                           <Box sx={{ 
                             color: '#333', 
                             fontSize: '0.875rem',
                             lineHeight: 1.5,
                             whiteSpace: 'pre-wrap',
                             fontFamily: 'inherit'
                           }}>
                             {reporte.logros || 'No especificado'}
                           </Box>
                         </Box>
                       </Grid>

                                             <Grid item xs={12}>
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                             Dificultades
                           </Typography>
                           <Box sx={{ 
                             color: '#333', 
                             fontSize: '0.875rem',
                             lineHeight: 1.5,
                             whiteSpace: 'pre-wrap',
                             fontFamily: 'inherit'
                           }}>
                             {reporte.dificultades || 'No especificado'}
                           </Box>
                         </Box>
                       </Grid>

                                             <Grid item xs={12}>
                         <Box sx={{ mb: 2 }}>
                           <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                             Objetivos Siguiente Período
                           </Typography>
                           <Box sx={{ 
                             color: '#333', 
                             fontSize: '0.875rem',
                             lineHeight: 1.5,
                             whiteSpace: 'pre-wrap',
                             fontFamily: 'inherit'
                           }}>
                             {reporte.objetivosSiguientePeriodo || 'No especificado'}
                           </Box>
                         </Box>
                       </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Box>
            ))
          ) : (
            <Box sx={{ 
              backgroundColor: 'white', 
              borderRadius: 2, 
              border: '1px solid #e0e0e0',
              p: 4,
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                No hay reportes de evolución
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Aún no se han creado reportes de evolución para este paciente
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Sección I: DATOS GENERALES */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              I. DATOS GENERALES
            </Typography>
            
            <Grid container spacing={2}>
                             <Grid item xs={12} md={6}>
                 <FormControl fullWidth>
                   <InputLabel>SERVICIO</InputLabel>
                                       <Select
                      value={reporteEvolucion.servicio}
                      onChange={(e) => handleInputChange('servicio', e.target.value)}
                      label="SERVICIO"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                      }}
                    >
                      {serviciosPaciente.map((servicio) => (
                        <MenuItem key={servicio.id} value={servicio.servicio.id}>
                          {servicio.servicio.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                 </FormControl>
               </Grid>
              
                             <Grid item xs={12} md={6}>
                 <TextField
                   fullWidth
                   label="EDAD (ACTUAL AL REALIZAR EL REPORTE)"
                   value={calcularEdad(paciente?.fecha_nacimiento)}
                   disabled
                   type="number"
                   InputProps={{
                     endAdornment: <InputAdornment position="end">años</InputAdornment>,
                   }}
                   sx={{
                     '& .MuiOutlinedInput-root': {
                       '& fieldset': { borderColor: '#e0e0e0' },
                       '&.Mui-disabled': {
                         backgroundColor: '#f5f5f5',
                         '& fieldset': { borderColor: '#e0e0e0' }
                       }
                     }
                   }}
                 />
               </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="FECHA DE EVALUACIÓN"
                  type="date"
                  value={reporteEvolucion.fechaEvaluacion}
                  onChange={(e) => handleInputChange('fechaEvaluacion', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#e0e0e0' },
                      '&:hover fieldset': { borderColor: '#9575CD' },
                      '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>FRECUENCIA DE ATENCIÓN</InputLabel>
                  <Select
                    value={reporteEvolucion.frecuenciaAtencion}
                    onChange={(e) => handleInputChange('frecuenciaAtencion', e.target.value)}
                    label="FRECUENCIA DE ATENCIÓN"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                    }}
                  >
                    {frecuenciasAtencion.map((freq) => (
                      <MenuItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
                             <Grid item xs={12} md={6}>
                 <TextField
                   fullWidth
                   label="ESPECIALISTA"
                   value={user?.nombres + ' ' + user?.apellidos}
                   disabled
                   sx={{
                     '& .MuiOutlinedInput-root': {
                       '& fieldset': { borderColor: '#e0e0e0' },
                       '&.Mui-disabled': {
                         backgroundColor: '#f5f5f5',
                         '& fieldset': { borderColor: '#e0e0e0' }
                       }
                     }
                   }}
                 />
               </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="PERIODO DE INTERVENCIÓN"
                  value={reporteEvolucion.periodoIntervencion}
                  onChange={(e) => handleInputChange('periodoIntervencion', e.target.value)}
                  placeholder="Ej: Enero - Marzo 2024"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#e0e0e0' },
                      '&:hover fieldset': { borderColor: '#9575CD' },
                      '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Sección II: METODOLOGÍA EMPLEADA */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              II. METODOLOGÍA EMPLEADA
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              value={reporteEvolucion.metodologia}
              onChange={(e) => handleInputChange('metodologia', e.target.value)}
              placeholder="Describa la metodología empleada en el tratamiento..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#000',
                    borderWidth: 2,
                    borderRadius: 2
                  },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#000' }
                }
              }}
            />
          </Grid>

          {/* Sección III: OBJETIVOS TRAZADOS */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              III. OBJETIVOS TRAZADOS (24 SESIONES)
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              value={reporteEvolucion.objetivos}
              onChange={(e) => handleInputChange('objetivos', e.target.value)}
              placeholder="Describa los objetivos trazados para las 24 sesiones..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#000',
                    borderWidth: 2,
                    borderRadius: 2
                  },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#000' }
                }
              }}
            />
          </Grid>

          {/* Sección IV: LOGROS */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              IV. LOGROS
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              value={reporteEvolucion.logros}
              onChange={(e) => handleInputChange('logros', e.target.value)}
              placeholder="Describa los logros alcanzados durante el tratamiento..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#000',
                    borderWidth: 2,
                    borderRadius: 2
                  },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#000' }
                }
              }}
            />
          </Grid>

          {/* Sección V: DIFICULTADES */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              V. DIFICULTADES
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              value={reporteEvolucion.dificultades}
              onChange={(e) => handleInputChange('dificultades', e.target.value)}
              placeholder="Describa las dificultades encontradas durante el tratamiento..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#000',
                    borderWidth: 2,
                    borderRadius: 2
                  },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#000' }
                }
              }}
            />
          </Grid>

          {/* Sección VI: OBJETIVOS PARA EL SIGUIENTE PERIODO */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #9575CD',
              pb: 1
            }}>
              VI. OBJETIVOS PARA EL SIGUIENTE PERIODO
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              value={reporteEvolucion.objetivosSiguientePeriodo}
              onChange={(e) => handleInputChange('objetivosSiguientePeriodo', e.target.value)}
              placeholder="Describa los objetivos para el siguiente period de tratamiento..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#000',
                    borderWidth: 2,
                    borderRadius: 2
                  },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#000' }
                }
              }}
            />
          </Grid>
        </Grid>
      )}
      {/* Botón de Guardar - Solo visible en vista completa */}
      {!vistaResumida && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            onClick={handleSaveReporte}
            disabled={saving || loading}
            sx={{
              backgroundColor: '#9575CD',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#7B68EE' },
              '&:disabled': {
                backgroundColor: '#ccc',
                color: '#666'
              }
            }}
          >
                         {saving ? 'Guardando...' : 'Guardar Nuevo Reporte de Evolución'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ReporteEvolucion;
