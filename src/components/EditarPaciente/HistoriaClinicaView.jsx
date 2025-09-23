import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  Assessment,
  Save,
  Description,
  Timeline,
  Psychology,
  MedicalServices,
  FamilyRestroom
} from '@mui/icons-material';
import { guardarReporteEvolucion, actualizarReporteEvolucion, obtenerReporteEvolucion } from '../../services/historiaClinicaService';
import { getServiciosPorPaciente } from '../../services/pacienteService';

import { getVisibleTabs, getTabIndex } from './HistoriaClinicaView/tabConfig';
import EntrevistaPadresView from './HistoriaClinicaView/components/EntrevistaPadresView';
import ReporteEvolucion from './HistoriaClinicaView/components/ReporteEvolucion';
import { calcularEdad } from '../../utils/date';

// Componente para el contenido de las pestañas
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`historia-tabpanel-${index}`}
      aria-labelledby={`historia-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Usar la configuración de tabs desde el archivo separado

// Componente ReporteEvolucion ahora está en un archivo separado

const HistoriaClinicaView = ({ paciente, user }) => {
  console.log('user11', user);
  const [tabValue, setTabValue] = useState(0);
  
  // Filtrar tabs visibles según la configuración
  const visibleTabs = getVisibleTabs(paciente);
  
  const [reporteEvolucion, setReporteEvolucion] = useState({
    servicio: null,
    edad: paciente?.edad || '',
    fechaEvaluacion: new Date().toISOString().split('T')[0],
    periodoIntervencion: '',
    frecuenciaAtencion: '',
    especialista: user?.nombres + ' ' + user?.apellidos,
    metodologia: '',
    objetivos: '',
    logros: '',
    dificultades: '',
    objetivosSiguientePeriodo: ''
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportesExistentes, setReportesExistentes] = useState([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [reporteId, setReporteId] = useState(null);
  const [vistaResumida, setVistaResumida] = useState(true);
  const [serviciosPaciente, setServiciosPaciente] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setReporteEvolucion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCambiarReporte = (reporte) => {
    setReporteSeleccionado(reporte);
    setReporteId(reporte.id);
    
    // Actualizar el formulario con los datos del reporte seleccionado
    setReporteEvolucion({
      servicio: reporte.servicio || '',
      edad: reporte.edad?.toString() || '',
      fechaEvaluacion: reporte.fechaEvaluacion ? new Date(reporte.fechaEvaluacion).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      periodoIntervencion: reporte.periodoIntervencion || '',
      frecuenciaAtencion: reporte.frecuenciaAtencion || '',
      especialista: reporte.especialista || user?.nombres + ' ' + user?.apellidos,
      metodologia: reporte.metodologia || '',
      objetivos: reporte.objetivos || '',
      logros: reporte.logros || '',
      dificultades: reporte.dificultades || '',
      objetivosSiguientePeriodo: reporte.objetivosSiguientePeriodo || ''
    });
  };

  const handleNuevoReporte = () => {
    setReporteSeleccionado(null);
    setReporteId(null);
    
    // Cambiar a vista completa para mostrar el formulario
    setVistaResumida(false);
    
    // Limpiar el formulario para un nuevo reporte
    setReporteEvolucion({
      servicio: null,
      edad: '', // Ya no se usa, se calcula automáticamente
      fechaEvaluacion: new Date().toISOString().split('T')[0],
      periodoIntervencion: '',
      frecuenciaAtencion: '',
      especialista: '', // Ya no se usa, se toma del usuario actual
      metodologia: '',
      objetivos: '',
      logros: '',
      dificultades: '',
      objetivosSiguientePeriodo: ''
    });
  };

  const toggleVistaResumida = () => {
    const nuevaVistaResumida = !vistaResumida;
    setVistaResumida(nuevaVistaResumida);
    
    // Si estamos cambiando a vista completa (crear nuevo reporte), limpiar el formulario
    if (!nuevaVistaResumida) {
      setReporteSeleccionado(null);
      setReporteId(null);
      setReporteEvolucion({
        servicio: null,
        edad: '', // Ya no se usa, se calcula automáticamente
        fechaEvaluacion: new Date().toISOString().split('T')[0],
        periodoIntervencion: '',
        frecuenciaAtencion: '',
        especialista: '', // Ya no se usa, se toma del usuario actual
        metodologia: '',
        objetivos: '',
        logros: '',
        dificultades: '',
        objetivosSiguientePeriodo: ''
      });
    }
  };

  const handleSaveReporte = async () => {
    try {
      setSaving(true);
      
      // Validar campos requeridos
      if (!reporteEvolucion.servicio || !reporteEvolucion.periodoIntervencion || 
          !reporteEvolucion.frecuenciaAtencion || !reporteEvolucion.metodologia || 
          !reporteEvolucion.objetivos || !reporteEvolucion.logros || 
          !reporteEvolucion.dificultades || !reporteEvolucion.objetivosSiguientePeriodo) {
        setSnackbarMessage('Por favor complete todos los campos requeridos');
        setSnackbarSeverity('error');
        setShowSnackbar(true);
        return;
      }

      // Preparar datos para el backend
      const reporteData = {
        paciente_id: paciente?.id,
        servicio_id: reporteEvolucion.servicio,
        edad: calcularEdad(paciente?.fecha_nacimiento) || 0,
        fecha_evaluacion: reporteEvolucion.fechaEvaluacion,
        periodo_intervencion: reporteEvolucion.periodoIntervencion,
        frecuencia_atencion: reporteEvolucion.frecuenciaAtencion,
        especialista: user?.nombres + ' ' + user?.apellidos,
        metodologia: reporteEvolucion.metodologia,
        objetivos: reporteEvolucion.objetivos,
        logros: reporteEvolucion.logros,
        dificultades: reporteEvolucion.dificultades,
        objetivos_siguiente_periodo: reporteEvolucion.objetivosSiguientePeriodo,
        usuario_id: user?.id
      };

      console.log('Enviando reporte de evolución:', reporteData);

      let response;
      
      // Determinar si es crear o actualizar
      if (reporteId) {
        // Actualizar reporte existente
        console.log('Actualizando reporte existente con ID:', reporteId);
        response = await actualizarReporteEvolucion(reporteId, reporteData);
        setSnackbarMessage('Reporte de evolución actualizado exitosamente');
      } else {
        // Crear nuevo reporte
        console.log('Creando nuevo reporte de evolución');
        response = await guardarReporteEvolucion(reporteData);
        setSnackbarMessage('Reporte de evolución guardado exitosamente');
        
        // Si es un nuevo reporte, actualizar el ID para futuras actualizaciones
        if (response && response.id) {
          setReporteId(response.id);
        }
      }
      
      console.log('Respuesta del backend:', response);
      
      // Recargar los reportes para incluir el nuevo
      try {
        const reportesData = await obtenerReporteEvolucion(paciente.id);
        if (reportesData && reportesData.length > 0) {
          setReportesExistentes(reportesData);
        }
      } catch (error) {
        console.error('Error al recargar reportes:', error);
      }
      
      // Cambiar a vista resumida para mostrar el reporte guardado
      setVistaResumida(true);
      
      // Limpiar el formulario
      setReporteEvolucion({
        servicio: null,
        edad: paciente?.edad || '',
        fechaEvaluacion: new Date().toISOString().split('T')[0],
        periodoIntervencion: '',
        frecuenciaAtencion: '',
        especialista: user?.nombres + ' ' + user?.apellidos,
        metodologia: '',
        objetivos: '',
        logros: '',
        dificultades: '',
        objetivosSiguientePeriodo: ''
      });
      
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      
    } catch (error) {
      console.error('Error al guardar reporte de evolución:', error);
      setSnackbarMessage(error.response?.data?.message || 'Error al guardar el reporte de evolución');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setSaving(false);
    }
  };

  const frecuenciasAtencion = [
    { value: '1', label: '1 vez por semana' },
    { value: '2', label: '2 veces por semana' },
    { value: '3', label: '3 veces por semana' },
    { value: '4', label: '4 veces por semana' },
    { value: '5', label: '5 veces por semana' }
  ];

  // Cargar datos existentes cuando se monta el componente
  useEffect(() => {
    const cargarDatos = async () => {
      if (!paciente?.id) return;
      
      try {
        setLoading(true);
        
        // Cargar reportes de evolución
        const reportesData = await obtenerReporteEvolucion(paciente.id);
        if (reportesData && reportesData.length > 0) {
          setReportesExistentes(reportesData);
        }
        
        // Cargar servicios del paciente
        const serviciosData = await getServiciosPorPaciente(paciente.id);
        setServiciosPaciente(serviciosData);
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setReportesExistentes([]);
        setServiciosPaciente([]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [paciente?.id, user]);

  // Renderizar el componente correspondiente según el tab activo
  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 'reporte-evolucion':
        return (
          <ReporteEvolucion 
            paciente={paciente}
            user={user}
            loading={loading}
            reporteEvolucion={reporteEvolucion}
            handleInputChange={handleInputChange}
            handleSaveReporte={handleSaveReporte}
            saving={saving}
            reportesExistentes={reportesExistentes}
            vistaResumida={vistaResumida}
            toggleVistaResumida={toggleVistaResumida}
            frecuenciasAtencion={frecuenciasAtencion}
            handleNuevoReporte={handleNuevoReporte}
            serviciosPaciente={serviciosPaciente}
          />
        );
      case 'entrevista-padres':
        return <EntrevistaPadresView paciente={paciente} user={user} />;
      default:
        return <div>Contenido no encontrado</div>;
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ background: 'white', borderRadius: 2, overflow: 'hidden' }}>
        {/* Header con pestañas */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#f8f9fa' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                minHeight: 48,
                color: '#6c757d',
                '&.Mui-selected': {
                  color: '#9575CD',
                  backgroundColor: 'white'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#9575CD',
                height: 3
              }
            }}
          >
            {visibleTabs.map((tab, index) => {
              const IconComponent = tab.icon;
              return (
                <Tab 
                  key={tab.id}
                  icon={<IconComponent sx={{ fontSize: 20 }} />} 
                  label={tab.label} 
                  iconPosition="start"
                />
              );
            })}
          </Tabs>
        </Box>

        {/* Contenido de las pestañas */}
        <Box sx={{ p: 3 }}>
          {visibleTabs.map((tab, index) => (
            <TabPanel key={tab.id} value={tabValue} index={index}>
              {renderTabContent(tab.id)}
            </TabPanel>
          ))}
        </Box>
      </Paper>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HistoriaClinicaView; 