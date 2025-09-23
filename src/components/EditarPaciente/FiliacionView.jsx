import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Divider, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Stack, Chip, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Tooltip } from '@mui/material';
import { Save } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Add from '@mui/icons-material/Add';
import { ThemePalette } from '../../theme/theme';
import { canViewContactInfo, canEditPatient, canManageServices, ROLES, isTerapeuta, canManagePatientStatus } from '../../constants/roles';
import { SERVICIOS } from '../../constants/areas';
import { desasignarServicioPaciente } from '../../services/pacienteService';

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

// Componente para los datos del paciente (fuera del componente principal)
const PacienteData = ({ paciente, setPaciente, isAdmision, generos, distritos, tiposDocumento, user, onLocalChange }) => {
  // Estado local para manejar los cambios sin actualizar el estado del paciente inmediatamente
  const [localPaciente, setLocalPaciente] = useState(paciente);

  // Actualizar el estado local cuando cambie el paciente desde el padre
  React.useEffect(() => {
    setLocalPaciente(paciente);
  }, [paciente]);

  // Función para actualizar el estado local
  const handleLocalChange = (field, value) => {
    const updatedPaciente = {
      ...localPaciente,
      [field]: value
    };
    setLocalPaciente(updatedPaciente);
    // Notificar al componente padre sobre el cambio local
    if (onLocalChange) {
      onLocalChange(updatedPaciente);
    }
  };

  // Función para actualizar el estado del paciente en el padre (solo cuando se guarde)
  const updateParentPaciente = (field, value) => {
    // Solo actualizar el estado del padre cuando se guarde el formulario
    // Por ahora no hacemos nada aquí
  };

  return (
  <Grid container spacing={2}>
    {/* Datos Personales */}
    
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Nombres"
        value={localPaciente.nombres || ''}
                 onChange={(e) => handleLocalChange('nombres', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Apellido Paterno"
        value={localPaciente.apellido_paterno || ''}
                 onChange={(e) => handleLocalChange('apellido_paterno', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Apellido Materno"
        value={localPaciente.apellido_materno || ''}
                 onChange={(e) => handleLocalChange('apellido_materno', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="date"
        label="Fecha de Nacimiento"
        value={localPaciente.fecha_nacimiento ? localPaciente.fecha_nacimiento.substring(0, 10) : ''}
                 onChange={(e) => handleLocalChange('fecha_nacimiento', e.target.value)}
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel>Tipo de Documento</InputLabel>
        <Select
          value={localPaciente.tipo_documento?.id || ''}
          label="Tipo de Documento"
                     onChange={(e) => {
             handleLocalChange('tipo_documento', { id: e.target.value });
           }}
          disabled={!canEditPatient(user)}
        >
          {tiposDocumento.map((tipo) => (
            <MenuItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Número de Documento"
        value={localPaciente.numero_documento || ''}
                 onChange={(e) => handleLocalChange('numero_documento', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel>Sexo</InputLabel>
        <Select
          value={localPaciente.sexo?.id || ''}
          label="Sexo"
                     onChange={(e) => {
             handleLocalChange('sexo', { id: e.target.value });
           }}
          disabled={!canEditPatient(user)}
        >
          {generos.map((genero) => (
            <MenuItem key={genero.id} value={genero.id}>
              {genero.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    
    {canViewContactInfo(user) && (
      <>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Distrito</InputLabel>
          <Select
            value={localPaciente.distrito?.id || ''}
            label="Distrito"
                         onChange={(e) => {
               handleLocalChange('distrito', { id: e.target.value });
             }}
            disabled={!canEditPatient(user)}
          >
            {distritos.map((distrito) => (
              <MenuItem key={distrito.id} value={distrito.id}>
                {distrito.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Dirección Completa"
          value={localPaciente.direccion || ''}
                     onChange={(e) => handleLocalChange('direccion', e.target.value)}
          InputProps={{ readOnly: isAdmision }}
        />
      </Grid>
        <Grid item xs={12} sm={6}>
           <TextField
             fullWidth
             label="Celular"
             value={localPaciente.celular || ''}
                           onChange={(e) => handleLocalChange('celular', e.target.value)}
             InputProps={{ readOnly: isAdmision }}
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             fullWidth
             label="Celular 2"
             value={localPaciente.celular2 || ''}
                           onChange={(e) => handleLocalChange('celular2', e.target.value)}
             InputProps={{ readOnly: isAdmision }}
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             fullWidth
             label="Correo Electrónico"
             type="email"
             value={localPaciente.correo || ''}
                           onChange={(e) => handleLocalChange('correo', e.target.value)}
             InputProps={{ readOnly: isAdmision }}
           />
         </Grid>
      </>
    )}

    {/* Datos del Responsable (si es menor de edad) */}
    {paciente.responsable_nombre && (
      <>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Datos del Responsable
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombres del Responsable"
            value={localPaciente.responsable_nombre || ''}
                         onChange={(e) => handleLocalChange('responsable_nombre', e.target.value)}
            InputProps={{ readOnly: isAdmision }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido Paterno del Responsable"
            value={localPaciente.responsable_apellido_paterno || ''}
                         onChange={(e) => handleLocalChange('responsable_apellido_paterno', e.target.value)}
            InputProps={{ readOnly: isAdmision }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido Materno del Responsable"
            value={localPaciente.responsable_apellido_materno || ''}
                         onChange={(e) => handleLocalChange('responsable_apellido_materno', e.target.value)}
            InputProps={{ readOnly: isAdmision }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Relación con el Paciente"
            value={localPaciente.responsable_relacion?.nombre || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        {
          !isTerapeuta(user) && (
            <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tipo de Documento del Responsable"
                value={localPaciente.responsable_tipo_documento?.nombre || ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Documento del Responsable"
                value={localPaciente.responsable_numero_documento || ''}
                               onChange={(e) => handleLocalChange('responsable_numero_documento', e.target.value)}
                InputProps={{ readOnly: isAdmision }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono del Responsable"
                value={localPaciente.responsable_telefono || ''}
                               onChange={(e) => handleLocalChange('responsable_telefono', e.target.value)}
                InputProps={{ readOnly: isAdmision }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo del Responsable"
                type="email"
                value={localPaciente.responsable_email || ''}
                               onChange={(e) => handleLocalChange('responsable_email', e.target.value)}
                InputProps={{ readOnly: isAdmision }}
              />
            </Grid>    
            </>
          )
        }
        
      </>
    )}
    <Grid item xs={12}>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Información Adicional
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Motivo de consulta"
        multiline
        minRows={2}
        value={localPaciente.motivo_consulta || ''}
                 onChange={e => handleLocalChange('motivo_consulta', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Referido por"
        value={localPaciente.referido_por || ''}
                 onChange={e => handleLocalChange('referido_por', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Diagnóstico Médico"
        multiline
        minRows={2}
        value={localPaciente.diagnostico_medico || ''}
                 onChange={e => handleLocalChange('diagnostico_medico', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Alergias conocidas"
        multiline
        minRows={2}
        value={localPaciente.alergias || ''}
                 onChange={e => handleLocalChange('alergias', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Medicamentos actuales"
        multiline
        minRows={2}
        value={localPaciente.medicamentos_actuales || ''}
                 onChange={e => handleLocalChange('medicamentos_actuales', e.target.value)}
        InputProps={{ readOnly: isAdmision }}
      />
    </Grid>
  </Grid>
  );
};

// Componente para los datos de la pareja (fuera del componente principal)
const ParejaData = ({ paciente, tiposDocumento }) => {
  const pareja = paciente.parejas && paciente.parejas.length > 0 ? paciente.parejas[0] : null;
  
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Nombres"
          value={pareja?.nombres || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Apellido Paterno"
          value={pareja?.apellido_paterno || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Apellido Materno"
          value={pareja?.apellido_materno || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Tipo de Documento</InputLabel>
          <Select
            value={pareja?.tipo_documento?.id || ''}
            label="Tipo de Documento"
            InputProps={{ readOnly: true }}
          >
            {tiposDocumento.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Número de Documento"
          value={pareja?.numero_documento || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Celular"
          value={pareja?.celular || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Dirección"
          value={pareja?.direccion || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Correo Electrónico"
          type="email"
          value={pareja?.email || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    </Grid>
  );
};

const FiliacionView = ({ paciente, setPaciente, handleSubmit, saving, generos, distritos, tiposDocumento, setOpenAsignarServicio, setServicioAEditar, setNuevoTerapeuta, setOpenEditarTerapeuta, user }) => {
  // Estado local para manejar los cambios sin afectar el estado del paciente
  const [localPacienteData, setLocalPacienteData] = useState(paciente);

  // Actualizar el estado local cuando cambie el paciente desde el padre
  React.useEffect(() => {
    setLocalPacienteData(paciente);
  }, [paciente]);

  // Función para manejar cambios locales
  const handleLocalChange = (updatedPaciente) => {
    setLocalPacienteData(updatedPaciente);
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Llamar al handleSubmit con los datos actualizados directamente
    handleSubmit(e, localPacienteData);
  };
  if (!paciente) return null;
  
  // El rol de ADMISIÓN solo puede ver los datos (bloqueados) y gestionar servicios
  const isAdmision = user?.rol?.id === ROLES.ADMISION || user?.rol?.id === ROLES.TERAPEUTA;
  
  // Verificar si es terapia de pareja
  const isTerapiaPareja = paciente.servicio?.id === SERVICIOS.TERAPIA_PAREJA;
  
  // Estado para el tab activo
  const [activeTab, setActiveTab] = useState(0);
  
  // Estado para el modal de confirmación de desasignar servicio
  const [openDesasignarModal, setOpenDesasignarModal] = useState(false);
  const [servicioADesasignar, setServicioADesasignar] = useState(null);
  const [desasignando, setDesasignando] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDesasignarServicio = async () => {
    if (!servicioADesasignar) return;
    
    setDesasignando(true);
    try {
      await desasignarServicioPaciente(paciente.id, servicioADesasignar.servicio.id);
      // Actualizar el estado del paciente en el padre
      setPaciente(prev => ({
        ...prev,
        servicios: prev.servicios.filter(s => s.id !== servicioADesasignar.id)
      }));
      setOpenDesasignarModal(false);
      setServicioADesasignar(null);
    } catch (error) {
      console.error('Error al desasignar servicio:', error);
    } finally {
      setDesasignando(false);
    }
  };

  return (
    <>
      <Paper 
        elevation={4} 
        sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 4,
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
          p: 1.5,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 3,
          border: '1px solid #dee2e6',
          position: 'relative'
        }}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold', 
            color: '#2c3e50',
            textAlign: 'center',
            mb: 0.5,
            fontSize: '1.1rem'
          }}>
            {isAdmision ? 'Datos del Paciente' : 'Editar Datos del Paciente'}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#6c757d', 
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: '0.85rem'
          }}>
            {isAdmision ? 'Vista de solo lectura' : 'Modifica la información del paciente'}
          </Typography>
        </Box>
        
        {isTerapiaPareja ? (
          // Diseño con tabs para terapia de pareja
          <Box>
            <Paper elevation={2} sx={{ 
              mb: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              border: '1px solid #dee2e6'
            }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    color: '#495057',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    minHeight: 60,
                    '&.Mui-selected': {
                      color: '#9575CD',
                      fontWeight: 'bold',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#9575CD',
                    height: 3,
                    borderRadius: '2px'
                  }
                }}
              >
                <Tab label="Datos del Paciente" />
                <Tab label="Datos de la Pareja" />
              </Tabs>
            </Paper>
            
                         <form onSubmit={handleFormSubmit}>
               {activeTab === 0 && (
                 <Box sx={{ 
                   p: 3,
                   background: 'white',
                   borderRadius: 3,
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                   border: '1px solid #e0e0e0'
                 }}>
                   <PacienteData 
                     paciente={localPacienteData}
                     setPaciente={setPaciente}
                     isAdmision={isAdmision}
                     generos={generos}
                     distritos={distritos}
                     tiposDocumento={tiposDocumento}
                     user={user}
                     onLocalChange={handleLocalChange}
                   />
                </Box>
              )}
              {activeTab === 1 && (
                <Box sx={{ 
                  p: 3,
                  background: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  border: '1px solid #e0e0e0'
                }}>
                  <ParejaData 
                    paciente={paciente}
                    tiposDocumento={tiposDocumento}
                  />
                </Box>
              )}
              
              {/* Botón de Guardar solo en el tab del paciente */}
              {activeTab === 0 && canEditPatient(user) && !isAdmision && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <LoadingButton
                    type="submit"   
                    variant="contained"
                    loading={saving}
                    startIcon={<Save />}
                    size="medium"
                    sx={{ 
                      px: 3,
                      py: 1,
                      background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
                      borderRadius: 2,
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      boxShadow: '0 3px 8px rgba(149, 117, 205, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(149, 117, 205, 0.4)',
                        transition: 'all 0.3s ease'
                      },
                      '&:disabled': {
                        background: '#ccc',
                        transform: 'none',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </LoadingButton>
                </Box>
              )}
            </form>
          </Box>
        ) : (
                     // Diseño normal para otros servicios
           <form onSubmit={handleFormSubmit}>
             <Box sx={{ 
               p: 3,
               background: 'white',
               borderRadius: 3,
               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
               border: '1px solid #e0e0e0'
             }}>
               <PacienteData 
                 paciente={localPacienteData}
                 setPaciente={setPaciente}
                 isAdmision={isAdmision}
                 generos={generos}
                 distritos={distritos}
                 tiposDocumento={tiposDocumento}
                 user={user}
                 onLocalChange={handleLocalChange}
               />
            </Box>
            
            {/* Botón de Guardar */}
            {canEditPatient(user) && !isAdmision && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <LoadingButton
                  type="submit"   
                  variant="contained"
                  loading={saving}
                  startIcon={<Save />}
                  size="medium"
                  sx={{ 
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    boxShadow: '0 3px 8px rgba(149, 117, 205, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(149, 117, 205, 0.4)',
                      transition: 'all 0.3s ease'
                    },
                    '&:disabled': {
                      background: '#ccc',
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </LoadingButton>
              </Box>
            )}
          </form>
        )}

                 {/* Servicios asignados (sección separada) - para todos los servicios */}
         {canManageServices(user) && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ 
              mb: 2,
              p: 2,
              background: 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)',
              borderRadius: 2,
              border: '1px solid #c3e6cb'
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                🏥 Servicios Asignados
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', mt: 0.5 }}>
                Gestiona los servicios y terapeutas asignados al paciente
              </Typography>
            </Box>
            
            <Paper elevation={2} sx={{ 
              p: 2, 
              borderRadius: 3, 
              background: 'white',
              border: '1px solid #e0e0e0',
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Add />} 
                  onClick={() => setOpenAsignarServicio(true)} 
                  size="small"
                  sx={{ 
                    height: 36, 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem', 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                    boxShadow: '0 3px 8px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #43A047 0%, #4CAF50 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  Asignar Nuevo Servicio
                </Button>
              </Box>
              <Stack direction="column" spacing={2} alignItems="stretch">
                {paciente && paciente.servicios && paciente.servicios.length > 0 && paciente.servicios.map(servicio => (
                  <Paper key={servicio.id} elevation={1} sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e0e0e0',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    '&:hover': {
                      boxShadow: '0 3px 12px rgba(0,0,0,0.12)',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ 
                        fontWeight: 'bold', 
                        fontSize: '1rem', 
                        color: '#7B1FA2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        🎯 {servicio.servicio?.nombre || 'Sin nombre'}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => {
                            setServicioAEditar(servicio);
                            setNuevoTerapeuta(
                              servicio.asignaciones && servicio.asignaciones.length > 0 && servicio.asignaciones[0].terapeuta
                                ? `${servicio.asignaciones[0].terapeuta.nombres} ${servicio.asignaciones[0].terapeuta.apellidos}`
                                : ''
                            );
                            setOpenEditarTerapeuta(true);
                          }}
                          sx={{
                            background: 'linear-gradient(135deg, #9575CD 0%, #B39DDB 100%)',
                            color: 'white',
                            width: 32,
                            height: 32,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
                              transform: 'scale(1.05)',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        {canManagePatientStatus(user) && (
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => {
                              setServicioADesasignar(servicio);
                              setOpenDesasignarModal(true);
                            }}
                            sx={{
                              background: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
                              color: 'white',
                              width: 32,
                              height: 32,
                              '&:hover': {
                                background: 'linear-gradient(135deg, #EF5350 0%, #EC407A 100%)',
                                transform: 'scale(1.05)',
                                transition: 'all 0.3s ease'
                              }
                            }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>
                    <Chip
                      label={
                        servicio.asignaciones && servicio.asignaciones.length > 0 && servicio.asignaciones[0].terapeuta
                          ? `${servicio.asignaciones[0].terapeuta.nombres} ${servicio.asignaciones[0].terapeuta.apellidos}`
                          : 'Sin asignar'
                      }
                      color="primary"
                      size="small"
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: '0.8rem', 
                        px: 1.5, 
                        py: 0.5,
                        alignSelf: 'flex-start',
                        background: servicio.asignaciones && servicio.asignaciones.length > 0 && servicio.asignaciones[0].terapeuta
                          ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
                          : 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
                      }}
                    />
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Box>
        )}
      </Paper>

      {/* Modal de confirmación para desasignar servicio */}
      <Dialog
        open={openDesasignarModal}
        onClose={() => setOpenDesasignarModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid #e0e0e0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#d32f2f', 
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
          borderBottom: '1px solid #ffcdd2'
        }}>
          🚫 Desasignar Servicio
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText sx={{ textAlign: 'center', fontSize: '1rem' }}>
            ¿Estás seguro de que quieres desasignar el servicio{' '}
            <strong style={{ color: '#7B1FA2' }}>
              "{servicioADesasignar?.servicio?.nombre}"
            </strong>{' '}
            del paciente <strong>{paciente.nombres} {paciente.apellido_paterno}</strong>?
            <br /><br />
            <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>
              ⚠️ Esta acción no se puede deshacer
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3, 
          justifyContent: 'center',
          gap: 2
        }}>
          <Button 
            onClick={() => setOpenDesasignarModal(false)} 
            color="secondary"
            variant="outlined"
            disabled={desasignando}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              border: '2px solid',
              '&:hover': {
                border: '2px solid',
                transform: 'translateY(-1px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDesasignarServicio} 
            color="error" 
            variant="contained"
            disabled={desasignando}
            startIcon={desasignando ? <CircularProgress size={16} color="inherit" /> : <DeleteOutlineIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
              boxShadow: '0 3px 8px rgba(244, 67, 54, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #EF5350 0%, #EC407A 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
                transition: 'all 0.3s ease'
              },
              '&:disabled': {
                background: '#ccc',
                transform: 'none',
                boxShadow: 'none'
              }
            }}
          >
            {desasignando ? 'Desasignando...' : 'Desasignar Servicio'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FiliacionView; 