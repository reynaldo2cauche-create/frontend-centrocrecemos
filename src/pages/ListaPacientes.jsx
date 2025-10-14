import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  TablePagination,
  Drawer,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  ListSubheader
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getPacientes, getPacienteById, getEstadosPaciente } from '../services/pacienteService';
import { getDistritos, getServicios } from '../services/catalogoService';
import WizardRegistroPaciente from '../components/WizzardRegistroPaciente/WizzardRegistroPaciente';
import TablaPacientes from '../components/Pacientes/TablaPacientes';
import DetallePacientePanel from '../components/Pacientes/DetallePacientePanel';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ROLES, isTerapeuta, canViewServiceInfo } from '../constants/roles';

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

export const ListaPacientes = () => {
  const user = useCurrentUser();
  const [logged, setLogged] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pacienteToDelete, setPacienteToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tipoDocumento: '',
    distrito: '',
    sexo: '',
    distritoId: '',
    estadoId: '',
    numeroDocumento: '',
    nombreCompleto: '',
    servicioId: ''
  });
  const [numeroDocumentoInput, setNumeroDocumentoInput] = useState('');
  const [nombreCompletoInput, setNombreCompletoInput] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const numeroDocumentoRef = useRef(null);
  const nombreCompletoRef = useRef(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pacienteDetalle, setPacienteDetalle] = useState(null);
  const [parejasDetalle, setParejasDetalle] = useState([]);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [pacienteSeleccionadoId, setPacienteSeleccionadoId] = useState(null);
  const [distritos, setDistritos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [filtrosActivos, setFiltrosActivos] = useState(false);
  const [searching, setSearching] = useState(false);


  useEffect(() => {
    // Solo ejecutar búsqueda si searchParams tiene valores reales (no solo el objeto vacío inicial)
    const tieneFiltrosActivos = searchParams.distritoId || searchParams.estadoId || 
                                searchParams.numeroDocumento || searchParams.nombreCompleto || 
                                searchParams.servicioId;
    
    if (!tieneFiltrosActivos) {
      console.log('No hay filtros activos, no se ejecuta búsqueda');
      return; // No ejecutar búsqueda si no hay filtros
    }
    
    console.log('useEffect cargarPacientes triggered with searchParams:', searchParams);
    const cargarPacientes = async () => {
      try {
        setLoading(true);
        let url = '/pacientes';
        const params = new URLSearchParams();
        console.log(user);
        if (user?.rol?.id === ROLES.TERAPEUTA) {
          params.append('terapeutaId', user.id);
        }
        
        // Agregar parámetros de búsqueda si están definidos
        if (searchParams.distritoId) {
          params.append('distritoId', searchParams.distritoId);
        }
        if (searchParams.estadoId) {
          params.append('estadoId', searchParams.estadoId);
        }
        if (searchParams.numeroDocumento) {
          params.append('numeroDocumento', searchParams.numeroDocumento);
        }
        if (searchParams.nombreCompleto) {
          params.append('nombreCompleto', searchParams.nombreCompleto);
        }
        if (searchParams.servicioId && searchParams.servicioId !== '') {
          console.log('Adding servicioId to API params:', searchParams.servicioId);
          params.append('servicioId', searchParams.servicioId);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const data = await getPacientes(url);
        
        if (data && Array.isArray(data)) {
          setPacientes(data);
          setFilteredPacientes(data);
          setError(null);
        } else {
          setPacientes([]);
          setFilteredPacientes([]);
          setError(null);
        }
      } catch (err) {
        console.error('Error al cargar pacientes:', err);
        setPacientes([]);
        setFilteredPacientes([]);
        setError('Error al cargar los pacientes');
      } finally {
        setLoading(false);
      }
    };

    cargarPacientes();
  }, [user, searchParams]);

  // Cargar pacientes iniciales sin filtros (solo una vez al montar)
  useEffect(() => {
    const cargarPacientesIniciales = async () => {
      try {
        setLoading(true);
        let url = '/pacientes';
        const params = new URLSearchParams();
        
        if (user?.rol?.id === ROLES.TERAPEUTA) {
          params.append('terapeutaId', user.id);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const data = await getPacientes(url);
        
        if (data && Array.isArray(data)) {
          setPacientes(data);
          setFilteredPacientes(data);
          setError(null);
        } else {
          setPacientes([]);
          setFilteredPacientes([]);
          setError(null);
        }
      } catch (err) {
        console.error('Error al cargar pacientes iniciales:', err);
        setPacientes([]);
        setFilteredPacientes([]);
        setError('Error al cargar los pacientes');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      cargarPacientesIniciales();
    }
  }, [user]); // Solo se ejecuta cuando cambia el usuario









  // Función para ejecutar búsqueda manual con todos los filtros
  // NOTA: Esta función toma los valores actuales de todos los filtros
  // y solo se ejecuta cuando el usuario presiona el botón "Buscar"
  const ejecutarBusqueda = async () => {
    setSearching(true); // Activar estado de carga
    
    try {
      const nuevosSearchParams = {
        // Filtros de texto (sin condiciones de longitud mínima)
        numeroDocumento: numeroDocumentoInput || '',
        nombreCompleto: nombreCompletoInput || '',
        
        // Filtros de selección (tomados del estado actual)
        distritoId: filters.distritoId || '',
        estadoId: filters.estadoId || '',
        // Solo incluir servicioId si el usuario puede ver información de servicios
        ...(canViewServiceInfo(user) && { servicioId: filters.servicioId || '' })
      };
      
      console.log('Ejecutando búsqueda con parámetros:', nuevosSearchParams);
      setSearchParams(nuevosSearchParams);
      
      // Aplicar filtros localmente para mostrar resultados inmediatos
      let filtered = [...pacientes];
      
      // Filtro por distrito
      if (nuevosSearchParams.distritoId) {
        filtered = filtered.filter(p => p.distrito?.id === parseInt(nuevosSearchParams.distritoId));
      }
      
      // Filtro por estado
      if (nuevosSearchParams.estadoId) {
        filtered = filtered.filter(p => p.estado?.id === parseInt(nuevosSearchParams.estadoId));
      }
      
      // Filtro por servicio (solo si el usuario puede ver información de servicios)
      if (canViewServiceInfo(user) && nuevosSearchParams.servicioId) {
        filtered = filtered.filter(p => p.servicio?.id === parseInt(nuevosSearchParams.servicioId));
      }
      
      // Filtro por número de documento
      if (nuevosSearchParams.numeroDocumento) {
        filtered = filtered.filter(p => 
          p.numero_documento && p.numero_documento.includes(nuevosSearchParams.numeroDocumento)
        );
      }
      
      // Filtro por nombre completo
      if (nuevosSearchParams.nombreCompleto && nuevosSearchParams.nombreCompleto.trim() !== '') {
        const nombreLower = nuevosSearchParams.nombreCompleto.toLowerCase();
        filtered = filtered.filter(p => 
          (p.nombres && p.nombres.toLowerCase().includes(nombreLower)) ||
          (p.apellido_paterno && p.apellido_paterno.toLowerCase().includes(nombreLower)) ||
          (p.apellido_materno && p.apellido_materno.toLowerCase().includes(nombreLower))
        );
      }
      
      setFilteredPacientes(filtered);
    } finally {
      setSearching(false); // Desactivar estado de carga
    }
  };





  // Cargar datos de distritos y estados
  useEffect(() => {
    const cargarDatosAdicionales = async () => {
      try {
        const [distritosData, estadosData, serviciosData] = await Promise.all([
          getDistritos(),
          getEstadosPaciente(),
          getServicios()
        ]);
        
        setDistritos(distritosData || []);
        setEstados(estadosData || []);
        console.log('Services loaded:', serviciosData);
        setServicios(serviciosData || []);
      } catch (error) {
        console.error('Error cargando datos adicionales:', error);
      }
    };

    cargarDatosAdicionales();
  }, []);



  // const handleOpenDialog = async (paciente) => {
  //   try {
  //     const detallesPaciente = await getPacienteById(paciente.id);
  //     setSelectedPaciente(detallesPaciente);
  //     setOpenDialog(true);
  //   } catch (error) {
  //     console.error('Error al cargar detalles del paciente:', error);
  //   }
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPaciente(null);
  };

  const paginatedPacientes = filteredPacientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSelectPaciente = async (paciente) => {
    setPacienteSeleccionadoId(paciente.id);
    setLoadingDetalle(true);
    try {
      const detalle = await getPacienteById(paciente.id);
      setPacienteDetalle(detalle.paciente);
    } catch (e) {
      setPacienteDetalle(null);
    }
    setLoadingDetalle(false);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchDetalle = async () => {
      // Si no hay pacientes filtrados, limpiar el detalle y no cargar nada
      if (filteredPacientes.length === 0) {
        setPacienteDetalle(null);
        setPacienteSeleccionadoId(null);
        setLoadingDetalle(false);
        return;
      }

      const start = page * rowsPerPage;
      const paciente = filteredPacientes[start];
      if (paciente) {
        setPacienteSeleccionadoId(paciente.id);
        setLoadingDetalle(true);
        try {
          const detalle = await getPacienteById(paciente.id);
          if (isMounted) setPacienteDetalle(detalle.paciente);
        } catch (e) {
          if (isMounted) setPacienteDetalle(null);
        }
        if (isMounted) setLoadingDetalle(false);
      } else {
        setPacienteDetalle(null);
        setLoadingDetalle(false);
      }
    };
    fetchDetalle();
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, [page, rowsPerPage, filteredPacientes]);

  const handleCloseWizard = () => {
    setShowWizard(false);
    recargarPacientes();
  };

  const recargarPacientes = async () => {
    try {
      setLoading(true);
      const data = await getPacientes();
      setPacientes(data);
      setFilteredPacientes(data);
    } catch (err) {
      console.error('Error al recargar pacientes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (paciente) => {
    setPacienteToDelete(paciente);
    setShowDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setPacienteToDelete(null);
  };

  const handleFilterChange = (field, value) => {
    console.log('field', field, 'value', value);
    
    // Para servicioId, asegurar que sea string para el estado
    let processedValue = value;
    if (field === 'servicioId') {
      processedValue = value === '' ? '' : String(value);
    }
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [field]: processedValue
      };
      console.log('Filters updated:', newFilters);
      return newFilters;
    });
  };

  const clearFilters = async () => {
    console.log('Clearing filters but maintaining terapeuta filter if applicable');
    
    // Llamar al servicio para obtener la lista completa, pero manteniendo el filtro de terapeuta
    try {
      setLoading(true);
      let url = '/pacientes';
      const params = new URLSearchParams();
      
      // Mantener el filtro de terapeuta si el usuario es terapeuta
      if (user?.rol?.id === ROLES.TERAPEUTA) {
        params.append('terapeutaId', user.id);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const data = await getPacientes(url);
      setPacientes(data);
      setFilteredPacientes(data);
      console.log('Pacientes recargados sin filtros adicionales:', data.length);
    } catch (error) {
      console.error('Error al recargar pacientes:', error);
      setError('Error al recargar la lista de pacientes');
    } finally {
      setLoading(false);
    }
    
    // Limpiar todos los estados DESPUÉS de cargar los datos
    setFilters({
      tipoDocumento: '',
      distrito: '',
      sexo: '',
      distritoId: '',
      estadoId: '',
      numeroDocumento: '',
      nombreCompleto: '',
      // Solo limpiar servicioId si el usuario puede ver información de servicios
      ...(canViewServiceInfo(user) && { servicioId: '' })
    });
    setNumeroDocumentoInput('');
    setNombreCompletoInput('');
    setSearchParams({});
  };

  const handleEditarPaciente = (id) => {
    navigate(`/editar-paciente/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#f5f5f5', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error && !pacientes.length) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#f5f5f5', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography color="error" variant="h6">{error}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 4 }, 
          backgroundColor: '#f5f5f5', 
          minHeight: '100vh', 
          width: '100vw',
          overflowX: 'hidden',
          mt: { xs: 6, md: 7 }
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 3
            }}
          >
            Lista de Pacientes
          </Typography>
          
          {/* Action Button */}
          {/* <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => console.log('registrar nuevo paciente')}
              sx={{ 
                backgroundColor: (theme) => theme.palette.primary.main, 
                '&:hover': { backgroundColor: (theme) => theme.palette.primary.dark },
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem'
              }}
            >
              Nuevo Paciente
            </Button>
          </Box> */}

          {/* Filters Section */}
          <Box sx={{ mb: 4 }}>
            {/* Section Title */}
            <Typography 
              variant="h6" 
              component="h2"
              sx={{ 
                fontWeight: 500,
                color: '#333',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SearchIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              Filtros de Búsqueda
            </Typography>

            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros aplicados - Solo mostrar después de presionar "Buscar" */}
                {(searchParams.distritoId || searchParams.estadoId || searchParams.servicioId || searchParams.numeroDocumento || searchParams.nombreCompleto) && (
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: '#fff3e0', 
                    borderRadius: 1.5,
                    border: '1px solid #ffb74d'
                  }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography variant="body2" color="#e65100" sx={{ mr: 1, fontWeight: 600 }}>
                        Filtros aplicados:
                      </Typography>
                      {searchParams.distritoId && (
                        <Chip 
                          label={`Distrito: ${distritos.find(d => d.id === parseInt(searchParams.distritoId))?.nombre || searchParams.distritoId}`}
                          size="small"
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: '#fff',
                            color: '#e65100',
                            fontWeight: 600,
                            border: '1px solid #ffb74d'
                          }}
                        />
                      )}
                      {searchParams.estadoId && (
                        <Chip 
                          label={`Estado: ${estados.find(e => e.id === parseInt(searchParams.estadoId))?.nombre || searchParams.estadoId}`}
                          size="small"
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: '#fff',
                            color: '#e65100',
                            fontWeight: 600,
                            border: '1px solid #ffb74d'
                          }}
                        />
                      )}
                      {searchParams.numeroDocumento && (
                        <Chip 
                          label={`Doc: ${searchParams.numeroDocumento}`}
                          size="small"
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: '#fff',
                            color: '#e65100',
                            fontWeight: 600,
                            border: '1px solid #ffb74d'
                          }}
                        />
                      )}
                      {searchParams.nombreCompleto && (
                        <Chip 
                          label={`Nombre: ${searchParams.nombreCompleto}`}
                          size="small"
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: '#fff',
                            color: '#e65100',
                            fontWeight: 600,
                            border: '1px solid #ffb74d'
                          }}
                        />
                      )}
                      {searchParams.servicioId && (
                        <Chip 
                          label={`Servicio: ${servicios.find(s => s.id === parseInt(searchParams.servicioId))?.nombre || searchParams.servicioId}`}
                          size="small"
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: '#fff',
                            color: '#e65100',
                            fontWeight: 600,
                            border: '1px solid #ffb74d'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
                
                {/* Filter Controls */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Buscar por:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
                    <TextField
                      ref={nombreCompletoRef}
                      label="Nombre Completo"
                      variant="outlined"
                      size="small"
                      value={nombreCompletoInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Solo permitir letras, espacios y algunos caracteres especiales
                        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                          setNombreCompletoInput(value);
                        }
                      }}
                      onKeyPress={(e) => {
                        // Solo permitir letras, espacios y algunos caracteres especiales
                        if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Ejecutar búsqueda al presionar Enter
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          ejecutarBusqueda();
                        }
                      }}
                      sx={{ 
                        minWidth: 280,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#fafafa'
                          }
                        }
                      }}
                    />
                    
                    <TextField
                      ref={numeroDocumentoRef}
                      label="Número de Documento"
                      variant="outlined"
                      size="small"
                      value={numeroDocumentoInput}
                      inputProps={{
                        maxLength: 12,
                        pattern: '[0-9]*'
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Solo permitir números
                        if (/^\d*$/.test(value)) {
                          setNumeroDocumentoInput(value);
                          // Actualizar filters.numeroDocumento para mostrar en filtros aplicados
                          setFilters(prev => ({
                            ...prev,
                            numeroDocumento: value
                          }));
                        }
                      }}
                      onKeyPress={(e) => {
                        // Prevenir entrada de caracteres que no sean números
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Ejecutar búsqueda al presionar Enter
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          ejecutarBusqueda();
                        }
                      }}
                      sx={{ 
                        minWidth: 220,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#fafafa'
                          }
                        }
                      }}
                    />

                    {!isTerapeuta(user) && (
                      <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel>Distrito</InputLabel>
                        <Select
                          value={filters.distritoId}
                          label="Distrito"
                          onChange={(e) => handleFilterChange('distritoId', e.target.value)}
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }}
                        >
                          <MenuItem value="">Todos los distritos</MenuItem>
                          {distritos.map((distrito) => (
                            <MenuItem key={distrito.id} value={distrito.id}>
                              {distrito.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    <FormControl size="small" sx={{ minWidth: 220 }}>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={filters.estadoId}
                        label="Estado"
                        onChange={(e) => handleFilterChange('estadoId', e.target.value)}
                        sx={{ 
                          borderRadius: 1.5,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#fafafa'
                          }
                        }}
                      >
                        <MenuItem value="">Todos los estados</MenuItem>
                        {estados.map((estado) => (
                          <MenuItem key={estado.id} value={estado.id}>
                            {estado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {canViewServiceInfo(user) && (
                      <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel>Servicio</InputLabel>
                        <Select
                          value={filters.servicioId || ''}
                          label="Servicio"
                          onChange={(e) => {
                            console.log('Service filter onChange triggered:', e.target.value);
                            handleFilterChange('servicioId', e.target.value);
                          }}
                          sx={{ 
                            borderRadius: 1.5,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }}
                        >
                          <MenuItem value="">Todos los servicios</MenuItem>
                          {/* Agrupar servicios por área usando la misma estructura que funciona */}
                          {Object.entries(
                            servicios.reduce((acc, servicio) => {
                              if (servicio.activo && servicio.area?.activo) {
                                const area = servicio.area?.nombre || 'Sin Área';
                                if (!acc[area]) acc[area] = [];
                                acc[area].push(servicio);
                              }
                              return acc;
                            }, {})
                          ).map(([areaNombre, serviciosArea]) => [
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
                            serviciosArea.map(servicio => (
                              <MenuItem key={servicio.id} value={servicio.id}>
                                {servicio.nombre}
                              </MenuItem>
                            ))
                          ])}
                        </Select>
                      </FormControl>
                    )}
                    
                    
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                    <LoadingButton
                      variant="contained"
                      size="small"
                      onClick={ejecutarBusqueda}
                      startIcon={<SearchIcon />}
                      loading={searching}
                      disabled={!numeroDocumentoInput && !nombreCompletoInput && !filters.distritoId && !filters.estadoId && !(canViewServiceInfo(user) && filters.servicioId)}
                      sx={{ 
                        height: 40,
                        px: 3,
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1565c0'
                        }
                      }}
                                          >
                        {searching ? 'Buscando...' : 'Buscar'}
                      </LoadingButton>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={clearFilters}
                      sx={{ 
                        height: 40,
                        px: 3,
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: 'grey.400',
                        color: 'grey.700',
                        '&:hover': {
                          borderColor: 'grey.600',
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                    
                    <Button
                      variant={filtrosActivos ? "contained" : "outlined"}
                      size="small"
                      disabled={!filtrosActivos}
                      sx={{ 
                        height: 40,
                        px: 3,
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        backgroundColor: filtrosActivos ? 'success.main' : 'transparent',
                        color: filtrosActivos ? 'white' : 'grey.500',
                        borderColor: filtrosActivos ? 'success.main' : 'grey.300',
                        '&:hover': {
                          backgroundColor: filtrosActivos ? 'success.dark' : '#f5f5f5'
                        }
                      }}
                    >
                      {filtrosActivos ? `${filteredPacientes.length} resultados` : 'Sin filtros'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Results Section */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              component="h2"
              sx={{ 
                fontWeight: 500,
                color: '#333',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Resultados
              {filtrosActivos && (
                <Chip 
                  label={`${filteredPacientes.length} pacientes`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
          </Box>

          {/* Main Content Grid */}
          <Box sx={{ p: { xs: 0, md: 1 } }}>
            <Grid container spacing={3}>
              {/* Table Section */}
              <Grid item xs={12} md={8}>
                <Paper 
                  sx={{ 
                    width: '100%', 
                    overflowX: 'auto', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white'
                  }}
                >
                  <TablaPacientes
                    pacientes={paginatedPacientes}
                    onSelect={handleSelectPaciente}
                    pacienteSeleccionadoId={pacienteSeleccionadoId}
                    user={user}
                    emptyMessage={
                      pacientes.length === 0 && !loading
                        ? (filtrosActivos ? 'No se encontraron pacientes con los filtros aplicados' : 'No hay pacientes registrados')
                        : filteredPacientes.length === 0 && pacientes.length > 0
                        ? 'No se encontraron pacientes con los filtros aplicados'
                        : null
                    }
                  />
                  <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
                    <TablePagination
                      component="div"
                      count={filteredPacientes.length}
                      page={page}
                      onPageChange={(event, newPage) => setPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={e => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      labelRowsPerPage="Filas por página:"
                      sx={{
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                          fontSize: '0.875rem'
                        }
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
              
              {/* Detail Panel */}
              <Grid item xs={12} md={4}>
                {loadingDetalle ? (
                  <Paper 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #e0e0e0',
                      minHeight: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={40} />
                      <Typography color="text.secondary">Cargando detalles...</Typography>
                    </Box>
                  </Paper>
                ) : pacienteDetalle ? (
                  <DetallePacientePanel 
                    paciente={pacienteDetalle} 
                    onEditar={handleEditarPaciente} 
                    user={user}
                    onPacienteOcultado={(pacienteId) => {
                      console.log('🎯 Callback onPacienteOcultado ejecutado con ID:', pacienteId);
                      // Refrescar la lista después de ocultar el paciente
                      console.log('🔄 Llamando a recargarPacientes...');
                      recargarPacientes();
                      // Limpiar el paciente seleccionado si era el que se ocultó
                      if (pacienteDetalle && pacienteDetalle.id === pacienteId) {
                        console.log('🧹 Limpiando pacienteDetalle...');
                        setPacienteDetalle(null);
                      }
                    }}
                  />
                ) : (
                  <Paper 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      color: 'text.secondary',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #e0e0e0',
                      minHeight: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" color="text.secondary">
                        {filteredPacientes.length === 0 
                          ? 'No hay pacientes para mostrar' 
                          : 'Selecciona un paciente'
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {filteredPacientes.length === 0 
                          ? 'Intenta ajustar los filtros de búsqueda' 
                          : 'para ver el detalle completo'
                        }
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Dialog 
          open={showWizard} 
          onClose={handleCloseWizard}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2
            }
          }}
        >
          <DialogTitle>Registro de Paciente</DialogTitle>
          <DialogContent>
            <WizardRegistroPaciente onClose={handleCloseWizard} />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}; 