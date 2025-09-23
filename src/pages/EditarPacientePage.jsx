import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Avatar, IconButton, Divider, TextField, Button, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, ListItemAvatar, Snackbar, Alert, CircularProgress, Chip, Stack, Popover, MenuList, MenuItem as MenuItemMui, Dialog, Skeleton } from '@mui/material';
import { PhotoCamera, Save, Comment, Send, Add, FilterList, Close, CloudQueueSharp } from '@mui/icons-material';
import { ThemePalette } from '../theme/theme';
import { useParams } from 'react-router-dom';
import { getPacienteById, getServiciosPorPaciente, asignarServicioPaciente, updatePacienteById, getEstadosPaciente, cambiarEstadoPaciente } from '../services/pacienteService';
import { getDistritos, getTiposDocumento, getGeneros, getServicios } from '../services/catalogoService';
import { asignarTerapeuta } from '../services/terapeutaService';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FolderIcon from '@mui/icons-material/Folder';

import FiliacionView from '../components/EditarPaciente/FiliacionView';
import HistoriaClinicaView from '../components/EditarPaciente/HistoriaClinicaView';
import EstadoCuentaView from '../components/EditarPaciente/EstadoCuentaView';
import PrescripcionesView from '../components/EditarPaciente/PrescripcionesView';
import ArchivosDigitales from '../components/EditarPaciente/ArchivosDigitales';
import EditIcon from '@mui/icons-material/Edit';
import AsignarServicioModal from '../components/EditarPaciente/AsignarServicioModal';
import EditarTerapeutaModal from '../components/EditarPaciente/EditarTerapeutaModal';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useServicios } from '../hooks/useServicios';
import { useTerapeutas } from '../hooks/useTerapeutas';
import { calcularEdad } from '../utils/date';
import NotasEvolucion from '../components/EditarPaciente/NotasEvolucion';
import { obtenerNotasEvolucionPorPaciente } from '../services/notaEvolucionService';
import { ROLES, canManagePatientStatus } from '../constants/roles';

// Componente Skeleton para la carga
const EditarPacienteSkeleton = () => (
  <Box sx={{ flexGrow: 1, p: 3, backgroundColor: ThemePalette.PURPLE_MEDIUM, paddingTop: '70px' }}>
    <Grid container spacing={3}>
      {/* Columna izquierda: Skeleton del menú lateral */}
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 3, height: 'fit-content', background: 'white', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Skeleton del Avatar */}
            <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
            
            {/* Skeleton del nombre */}
            <Skeleton variant="text" width={200} height={24} sx={{ mb: 1 }} />
            
            {/* Skeleton de la edad */}
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
            
            {/* Skeleton de la fecha */}
            <Skeleton variant="text" width={120} height={16} sx={{ mb: 2 }} />
            
            {/* Skeleton del estado */}
            <Skeleton variant="rounded" width={120} height={32} sx={{ mb: 3 }} />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Skeleton del menú */}
          <Skeleton variant="rounded" width="100%" height={48} sx={{ mb: 1 }} />
        </Paper>
      </Grid>

      {/* Columna central: Skeleton del contenido */}
      <Grid item xs={12} md={5}>
        <Paper elevation={2} sx={{ p: 3, background: 'white', borderRadius: 2 }}>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 3 }} />
          
          {/* Skeleton de campos del formulario */}
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} key={item}>
                <Skeleton variant="rounded" width="100%" height={56} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Skeleton variant="rounded" width={200} height={40} />
          </Box>
        </Paper>
      </Grid>

      {/* Columna derecha: Skeleton de notas */}
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, background: 'white', borderRadius: 2 }}>
          <Skeleton variant="text" width="50%" height={28} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={16} sx={{ mb: 3 }} />
          
          {/* Skeleton de botón */}
          <Skeleton variant="rounded" width={120} height={36} sx={{ mb: 3 }} />
          
          {/* Skeleton de notas */}
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="90%" height={16} />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const EditarPacientePage = () => {
  const { id } = useParams();
  const user = useCurrentUser();
  console.log('user22', user);
  const user_id = user?.id;
  const [paciente, setPaciente] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true); // Nuevo estado para datos adicionales
  const [error, setError] = useState(null);
  const [distritos, setDistritos] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estadosPaciente, setEstadosPaciente] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [saving, setSaving] = useState(false);
  const [openNotaModal, setOpenNotaModal] = useState(false);
  const [nota, setNota] = useState({
    entrevista: '',
    sesionEvaluacion: '',
    sesionTerapias: '',
    objetivosTerapeuticos: '',
    observaciones: ''
  });
  const [tabSeleccionado, setTabSeleccionado] = useState('filiacion');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const serviciosDisponibles = useServicios();
  const terapeutasDisponibles = useTerapeutas();
  const [openAsignarServicio, setOpenAsignarServicio] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ servicio: '', terapeuta: '' });
  const [openEditarTerapeuta, setOpenEditarTerapeuta] = useState(false);
  const [servicioAEditar, setServicioAEditar] = useState(null);
  const [nuevoTerapeuta, setNuevoTerapeuta] = useState('');
  const [anchorEstado, setAnchorEstado] = useState(null);
  const [cambiandoEstado, setCambiandoEstado] = useState(false);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        setLoading(true);
        const data = await getPacienteById(id);
        // Combinar los datos del paciente con las parejas para que estén en el mismo objeto
        const pacienteCompleto = {
          ...data.paciente,
          parejas: data.parejas || []
        };
        // Obtener servicios reales del paciente
        const servicios = await getServiciosPorPaciente(id);
        pacienteCompleto.servicios = servicios;
        setPaciente(pacienteCompleto);
        setLoading(false); // Paciente cargado, mostrar skeleton de datos
      } catch (err) {
        setError('Error al cargar los datos del paciente');
        console.error('Error al cargar los datos del paciente', err);
        setLoading(false);
      }
    };
    if (id) cargarPaciente();
  }, [id]);

  useEffect(() => {
    const cargarDatosAdicionales = async () => {
      try {
        setLoadingData(true);
        const [distritosData, tiposDocumentoData, generosData, estadosData] = await Promise.all([
          getDistritos(),
          getTiposDocumento(),
          getGeneros(),
          getEstadosPaciente()
        ]);
        
        setDistritos(distritosData || []);
        setTiposDocumento(tiposDocumentoData || []);
        setGeneros(generosData || []);
        setEstadosPaciente(estadosData || []);
      } catch (err) {
        console.error('Error al cargar datos adicionales:', err);
      } finally {
        setLoadingData(false);
      }
    };
    
    // Solo cargar datos adicionales si el paciente ya está cargado
    if (!loading && paciente) {
      cargarDatosAdicionales();
    }
  }, [loading, paciente]);

  useEffect(() => {
    if (paciente && paciente.servicios && paciente.servicios.length > 0) {
      setServicioSeleccionado(paciente.servicios[0].id);
    }
  }, [paciente]);

  useEffect(() => {
    const cargarNotasEvolucion = async () => {
      if (id) {
        try {
          let url = `/nota-evolucion/paciente/${id}`;
          if (user?.rol?.id === ROLES.TERAPEUTA) {
            url += `?trabajador_id=${user.id}`;
          }
          const notas = await obtenerNotasEvolucionPorPaciente(id, url);
          setComentarios(notas.map(nota => ({
            id: nota.id,
            fecha: nota.fecha_crea ? new Date(nota.fecha_crea).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date(nota.fecha_crea).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '',
            autor: nota.trabajador
              ? `${nota.trabajador.nombres} ${nota.trabajador.apellidos}${nota.trabajador.rol ? ' — ' + nota.trabajador.rol.nombre : ''}`
              : `Usuario ${nota.user_id_crea}`,
            entrevista: nota.entrevista,
            sesionEvaluacion: nota.sesion_evaluacion,
            sesionTerapias: nota.sesion_terapias,
            objetivosTerapeuticos: nota.objetivos_terapeuticos,
            observaciones: nota.observaciones
          })));
        } catch (error) {
          setComentarios([]);
        }
      }
    };
    cargarNotasEvolucion();
  }, [id, user]);

  if (loading) return <EditarPacienteSkeleton />;
  if (error) return <Box p={4} color="error.main">{error}</Box>;
  if (!paciente) return <Box p={4}>No se encontró el paciente.</Box>;

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };  

  const handleSubmit = async (event, datosActualizados = null) => {
    event.preventDefault();
    setSaving(true);
    
    // Usar los datos actualizados si se proporcionan, sino usar el estado paciente
    const pacienteData = datosActualizados || paciente;
    
    const data = {
      nombres: pacienteData.nombres,
      apellido_paterno: pacienteData.apellido_paterno,
      apellido_materno: pacienteData.apellido_materno,
      fecha_nacimiento: pacienteData.fecha_nacimiento,
      tipo_documento_id: pacienteData.tipo_documento?.id || null,
      numero_documento: pacienteData.numero_documento,
      sexo_id: pacienteData.sexo?.id || null,
      distrito_id: pacienteData.distrito?.id || null,
      direccion: pacienteData.direccion,
      celular: pacienteData.celular,
      celular2: pacienteData.celular2,
      correo: pacienteData.correo,
      user_id,
      motivo_consulta: pacienteData.motivo_consulta,
      referido_por: pacienteData.referido_por,
      diagnostico_medico: pacienteData.diagnostico_medico,
      alergias: pacienteData.alergias,
      medicamentos_actuales: pacienteData.medicamentos_actuales
    };
    try {
      await updatePacienteById(id, data);
      setSnackbar({ open: true, message: 'Datos guardados correctamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar los datos', severity: 'error' });
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Función para obtener el color del estado
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

  // Función para manejar el cambio de estado
  const handleCambiarEstado = async (estadoId) => {
    setCambiandoEstado(true);
    try {
      const estadoSeleccionado = estadosPaciente.find(e => e.id === estadoId);
      
      if (!estadoSeleccionado) {
        throw new Error('Estado no encontrado');
      }

      // Llamada real a la API para cambiar el estado
      await cambiarEstadoPaciente(paciente.id, estadoId, user_id);
      
      // Actualizar el estado local después de la respuesta exitosa
      setPaciente(prev => ({
        ...prev,
        estado: {
          id: estadoSeleccionado.id,
          nombre: estadoSeleccionado.nombre
        }
      }));
      
      setSnackbar({
        open: true,
        message: `Estado cambiado a: ${estadoSeleccionado.nombre}`,
        severity: 'success'
      });
      
      setAnchorEstado(null);
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error al cambiar el estado',
        severity: 'error'
      });
    } finally {
      setCambiandoEstado(false);
    }
  };

  const handleAgregarComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim()) {
      const comentario = {
        id: comentarios.length + 1,
        fecha: new Date().toISOString().split('T')[0],
        autor: 'Usuario Actual', // Aquí iría el usuario logueado
        texto: nuevoComentario,
        tipo: 'Observación General'
      };
      setComentarios([comentario, ...comentarios]);
      setNuevoComentario('');
    }
  };

  const edad = calcularEdad(paciente.fecha_nacimiento);
  const serviciosFiltrados = serviciosDisponibles.filter(servicio => {
    if (edad >= 18) {
      return servicio.area && servicio.area.id === 2;
    } else {
      return servicio.area && servicio.area.id === 1;
    }
  });

  const servicioActual = paciente && paciente.servicios ? paciente.servicios.find(s => s.id === servicioSeleccionado) : null;

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: ThemePalette.PURPLE_MEDIUM, paddingTop: '70px' }}>
      {/* Indicador de progreso de carga */}
      {loadingData && !loading && (
        <Paper elevation={1} sx={{ 
          p: 2, 
          mb: 3, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '1px solid #2196f3',
          borderRadius: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} color="primary" />
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              Cargando datos adicionales del formulario...
            </Typography>
          </Box>
        </Paper>
      )}
      
      <Grid container spacing={3}>
        {/* Columna izquierda: Menú lateral */}
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              height: 'fit-content',
              background: 'white',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Avatar simplificado */}
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Avatar
                  src={fotoPerfil || paciente.fotoPerfil}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    border: '3px solid #9575CD',
                    boxShadow: '0 4px 12px rgba(149, 117, 205, 0.2)'
                  }}
                />
                {/* Botón de cámara */}
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -4, 
                  right: -4,
                  background: '#9575CD',
                  borderRadius: '50%',
                  p: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  border: '2px solid white'
                }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleFotoChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton 
                      component="span"
                      sx={{ 
                        color: 'white',
                        p: 0.5,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.2)'
                        }
                      }}
                    >
                      <PhotoCamera sx={{ fontSize: 16 }} />
                    </IconButton>
                  </label>
                </Box>
              </Box>

              {/* Datos principales del paciente */}
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                textAlign: 'center',
                color: '#2c3e50',
                fontSize: '1rem',
                mb: 0.5
              }}>
                {paciente.nombres} {paciente.apellido_paterno} {paciente.apellido_materno}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#6c757d', 
                textAlign: 'center',
                fontSize: '0.9rem',
                mb: 0.5
              }}>
                {edad} años
              </Typography>
              {paciente.created_at && (
                <Typography variant="body2" sx={{ 
                  color: '#868e96', 
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  mb: 2
                }}>
                  Creado el {new Date(paciente.created_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Typography>
              )}
              
              {/* Estado del paciente */}
              <Box sx={{ textAlign: 'center', width: '100%', mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  color: '#6c757d', 
                  mb: 1,
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  Estado actual:
                </Typography>
                <Chip
                  label={paciente.estado?.nombre || 'Sin estado'}
                  onClick={canManagePatientStatus(user) ? (event) => setAnchorEstado(event.currentTarget) : undefined}
                  sx={{
                    backgroundColor: getEstadoColor(paciente.estado?.nombre),
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    cursor: canManagePatientStatus(user) ? 'pointer' : 'default'
                  }}
                />
              </Box>
            </Box>

            {/* Menú lateral */}
            <Divider sx={{ my: 2, backgroundColor: '#e0e0e0' }} />
            <Box sx={{ p: 0 }}>
              <Button
                fullWidth
                variant={tabSeleccionado === 'filiacion' ? 'contained' : 'text'}
                startIcon={<AssignmentIndIcon />}
                onClick={() => setTabSeleccionado('filiacion')}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 1,
                  background: tabSeleccionado === 'filiacion' ? '#9575CD' : 'transparent',
                  color: tabSeleccionado === 'filiacion' ? 'white' : '#2c3e50',
                  fontWeight: tabSeleccionado === 'filiacion' ? 'bold' : 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    background: tabSeleccionado === 'filiacion' ? '#7B68EE' : 'rgba(149, 117, 205, 0.1)'
                  }
                }}
              >
                Filiación
              </Button>
              
              <Button
                fullWidth
                variant={tabSeleccionado === 'historia' ? 'contained' : 'text'}
                startIcon={<MedicalServicesIcon />}
                onClick={() => setTabSeleccionado('historia')}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 1,
                  background: tabSeleccionado === 'historia' ? '#9575CD' : 'transparent',
                  color: tabSeleccionado === 'historia' ? 'white' : '#2c3e50',
                  fontWeight: tabSeleccionado === 'historia' ? 'bold' : 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  mt: 1,
                  '&:hover': {
                    background: tabSeleccionado === 'historia' ? '#7B68EE' : 'rgba(149, 117, 205, 0.1)'
                  }
                }}
              >
                Historia Clínica
              </Button>

              <Button
                fullWidth
                variant={tabSeleccionado === 'archivos' ? 'contained' : 'text'}
                startIcon={<CloudQueueSharp />}
                onClick={() => setTabSeleccionado('archivos')}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 1,
                  background: tabSeleccionado === 'archivos' ? '#9575CD' : 'transparent',
                  color: tabSeleccionado === 'archivos' ? 'white' : '#2c3e50',
                  fontWeight: tabSeleccionado === 'archivos' ? 'bold' : 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  mt: 1,
                  '&:hover': {
                    background: tabSeleccionado === 'archivos' ? '#7B68EE' : 'rgba(149, 117, 205, 0.1)'
                  }
                }}
              >
                Archivos Digitales
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Columna central: Contenido según tabSeleccionado */}
        <Grid item xs={12} md={5}>
          {/* Formulario de edición de datos del paciente */}
          <Box sx={{ mb: 4 }}>
            {tabSeleccionado === 'filiacion' && (
              loadingData ? (
                <Paper elevation={2} sx={{ p: 3, background: 'white', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">
                      Cargando datos del formulario...
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Grid item xs={12} sm={6} key={item}>
                        <Skeleton variant="rounded" width="100%" height={56} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              ) : (
                <FiliacionView
                  paciente={paciente}
                  setPaciente={setPaciente}
                  handleSubmit={handleSubmit}
                  saving={saving}
                  generos={generos}
                  distritos={distritos}
                  tiposDocumento={tiposDocumento}
                  servicio={servicioActual}
                  setOpenAsignarServicio={setOpenAsignarServicio}
                  setServicioAEditar={setServicioAEditar}
                  setNuevoTerapeuta={setNuevoTerapeuta}
                  setOpenEditarTerapeuta={setOpenEditarTerapeuta}
                  user={user}
                />
              )
            )}
            {tabSeleccionado === 'historia' && <HistoriaClinicaView paciente={paciente} user={user} />}
            {/* {tabSeleccionado === 'estado' && <EstadoCuentaView paciente={paciente} />} */}
            {tabSeleccionado === 'prescripciones' && <PrescripcionesView paciente={paciente} />}
            {tabSeleccionado === 'archivos' && <ArchivosDigitales paciente={paciente} />}
          </Box>          
        </Grid>

        {/* Columna derecha: Notas de evolución */}
        <Grid item xs={12} md={4}>
          {loadingData ? (
            <Paper elevation={2} sx={{ p: 3, background: 'white', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Cargando notas de evolución...
                </Typography>
              </Box>
              <Skeleton variant="rounded" width={120} height={36} sx={{ mb: 3 }} />
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="90%" height={16} />
                </Box>
              ))}
            </Paper>
          ) : (
            <NotasEvolucion
              notas={comentarios}
              setNotas={setComentarios}
              openNotaModal={openNotaModal}
              setOpenNotaModal={setOpenNotaModal}
              nota={nota}
              setNota={setNota}
              paciente_id={paciente?.id}
              user_id_crea={user_id}
              user={user}
              setSnackbar={setSnackbar}
            />
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Modal para asignar servicio */}
      <AsignarServicioModal
        open={openAsignarServicio}
        onClose={() => setOpenAsignarServicio(false)}
        servicios={serviciosFiltrados}
        terapeutas={terapeutasDisponibles}
        nuevoServicio={nuevoServicio}
        setNuevoServicio={setNuevoServicio}
        onAsignar={async () => {
          console.log('entro22')
          if (nuevoServicio.servicio && nuevoServicio.terapeuta) {
            console.log('entro')
            // Buscar los IDs a partir del nombre
            const servicioObj = serviciosFiltrados.find(s => s.nombre === nuevoServicio.servicio);
            console.log('servicioObj', servicioObj)
            // const terapeutaObj = terapeutasDisponibles.find(t => t.nombre === nuevoServicio.terapeuta);

            const terapeutaObj = terapeutasDisponibles.find(
              t => `${t.nombres} ${t.apellidos}` === nuevoServicio.terapeuta
            );

            console.log('terapeutaObj', terapeutaObj)
            if (!servicioObj || !terapeutaObj) return;
            try {
              console.log('a3')
              const response = await asignarServicioPaciente({
                paciente_id: paciente.id,
                servicio_id: servicioObj.id,
                terapeuta_id: terapeutaObj.id
              });
              
              // Agregar el nuevo servicio al estado local con los datos correctos
              setPaciente(prev => ({
                ...prev,
                servicios: [
                  ...prev.servicios,
                  {
                    id: Date.now(), // ID temporal
                    servicio: {
                      id: servicioObj.id,
                      nombre: servicioObj.nombre
                    },
                    asignaciones: [
                      {
                        terapeuta: {
                          id: terapeutaObj.id,
                          nombres: terapeutaObj.nombres,
                          apellidos: terapeutaObj.apellidos
                        }
                      }
                    ]
                  }
                ]
              }));
              
              setSnackbar({ open: true, message: response.message || 'Servicio asignado correctamente', severity: 'success' });
              setNuevoServicio({ servicio: '', terapeuta: '' });
              setOpenAsignarServicio(false);
            } catch (error) {
              setSnackbar({ open: true, message: 'Error al asignar el servicio', severity: 'error' });
            }
          }
        }}
      />

      {/* Modal para editar terapeuta */}
      <EditarTerapeutaModal
        open={openEditarTerapeuta}
        onClose={() => setOpenEditarTerapeuta(false)}
        servicio={servicioAEditar}
        nuevoTerapeuta={nuevoTerapeuta}
        setNuevoTerapeuta={setNuevoTerapeuta}
        terapeutas={terapeutasDisponibles}
        onGuardar={async () => {
          if (servicioAEditar) {
            try {
              if (nuevoTerapeuta) {
                // Buscar el terapeuta seleccionado
                const terapeutaObj = terapeutasDisponibles.find(
                  t => `${t.nombres} ${t.apellidos}` === nuevoTerapeuta
                );

                if (!terapeutaObj) {
                  setSnackbar({ open: true, message: 'Terapeuta no encontrado', severity: 'error' });
                  return;
                }

                // Llamada a la API para asignar el terapeuta
                await asignarTerapeuta({
                  paciente_servicio_id: servicioAEditar.id,
                  terapeuta_id: terapeutaObj.id
                });

                // Actualizar el estado local
                setPaciente(prev => ({
                  ...prev,
                  servicios: prev.servicios.map(servicio => 
                    servicio.id === servicioAEditar.id 
                      ? {
                          ...servicio,
                          asignaciones: [
                            {
                              terapeuta: {
                                id: terapeutaObj.id,
                                nombres: terapeutaObj.nombres,
                                apellidos: terapeutaObj.apellidos
                              }
                            }
                          ]
                        }
                      : servicio
                  )
                }));

                setSnackbar({ open: true, message: 'Terapeuta asignado correctamente', severity: 'success' });
              } else {
                // Quitar terapeuta (solo actualizar estado local por ahora)
                setPaciente(prev => ({
                  ...prev,
                  servicios: prev.servicios.map(servicio => 
                    servicio.id === servicioAEditar.id 
                      ? {
                          ...servicio,
                          asignaciones: []
                        }
                      : servicio
                  )
                }));

                setSnackbar({ open: true, message: 'Terapeuta removido correctamente', severity: 'success' });
              }

              setOpenEditarTerapeuta(false);
            } catch (error) {
              console.error('Error al actualizar terapeuta:', error);
              setSnackbar({ open: true, message: 'Error al actualizar el terapeuta', severity: 'error' });
            }
          }
        }}
      />

      {/* Popover para cambiar estado - Solo visible para roles autorizados */}
      {canManagePatientStatus(user) && (
        <Popover
          open={Boolean(anchorEstado)}
          anchorEl={anchorEstado}
          onClose={() => setAnchorEstado(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              mb: 1,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: 2
            }
          }}
        >
          <MenuList>
            {estadosPaciente.filter(estado => estado.activo).map((estado) => (
              <MenuItemMui
                key={estado.id}
                onClick={() => handleCambiarEstado(estado.id)}
                disabled={cambiandoEstado || paciente?.estado?.id === estado.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: ThemePalette.SKYBLUE_MEDIUM + '15'
                  },
                  '&.Mui-disabled': {
                    opacity: 0.6
                  }
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: getEstadoColor(estado.nombre),
                    flexShrink: 0
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: paciente?.estado?.id === estado.id ? 'bold' : 'normal' }}>
                  {estado.nombre}
                  {paciente?.estado?.id === estado.id && ' (Actual)'}
                </Typography>
              </MenuItemMui>
            ))}
          </MenuList>
        </Popover>
      )}
    </Box>
  );
};

export default EditarPacientePage;