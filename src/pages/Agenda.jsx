import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  IconButton,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

// Componentes
import ModalAgendarCita from '../components/Agenda/ModalAgendarCita';
import CalendarioSemanal from '../components/Agenda/CalendarioSemanal';

// Datos y utilidades
import { 
  diasSemana, 
  horas, 
  servicios, 
  duraciones,
  citasEjemplo
} from '../constants/agendaData';
import { getEstadoColor, getEstadoIcon } from '../utils/agendaUtils';
import { useCitas } from '../hooks/useCitas';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useTrabajadores } from '../hooks/useTrabajadores';
import { ROLES } from '../constants/roles';

const Agenda = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [modalAbierto, setModalAbierto] = useState(false);
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);
  const [terapeutaFiltro, setTerapeutaFiltro] = useState('');
  const [formularioCita, setFormularioCita] = useState({
    paciente: null,
    doctor_id: '',
    servicio_id: '',
    motivo_id: '',
    duracion: '',
    fecha: '',
    horaInicio: '',
    nota: ''
  });

  // Obtener usuario actual
  const currentUser = useCurrentUser();
  
  // Hook de trabajadores (para el filtro de terapeutas)
  const { trabajadores } = useTrabajadores();
  
  // Debug: Ver datos de trabajadores
  React.useEffect(() => {
    if (trabajadores.length > 0) {
      console.log('Trabajadores cargados:', trabajadores);
      console.log('Primer trabajador:', trabajadores[0]);
    }
  }, [trabajadores]);
  
  // Hook de citas (listar + crear)
  const { citas, loading, error, listarCitas, crearCita } = useCitas();
  
  // Cargar citas al montar y al cambiar de semana o filtro
  React.useEffect(() => {
    // Si el usuario es terapeuta, filtrar por su ID
    if (currentUser?.rol?.id === ROLES.TERAPEUTA) {
      listarCitas({ terapeuta_id: currentUser.id });
    } 
    // Si es administrador y hay un terapeuta seleccionado en el filtro
    else if (currentUser?.rol?.id === ROLES.ADMINISTRADOR && terapeutaFiltro) {
      listarCitas({ terapeuta_id: terapeutaFiltro });
    } 
    // Caso general: listar todas las citas
    else {
      listarCitas();
    }
  }, [currentUser, terapeutaFiltro]);

  // Handlers para el modal
  const abrirModal = (dia, hora) => {
    setSlotSeleccionado({ 
      dia: dia.nombre, 
      hora,
      fecha: dia.fechaString 
    });
    setFormularioCita({
      ...formularioCita,
      fecha: dia.fechaString,
      horaInicio: hora
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setSlotSeleccionado(null);
    setFormularioCita({
      paciente: null,
      doctor_id: '',
      servicio_id: '',
      motivo_id: '',
      duracion: '',
      fecha: '',
      horaInicio: '',
      nota: ''
    });
  };

  const manejarCambioFormulario = (campo, valor) => {
    setFormularioCita(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const guardarCita = async () => {
    try {
      console.log('Guardando cita:', formularioCita);
      // Preparar datos para enviar al backend
      const citaData = {
        paciente_id: formularioCita.paciente?.id,
        doctor_id: formularioCita.doctor_id,
        servicio_id: formularioCita.servicio_id,
        motivo_id: formularioCita.motivo_id,
        fecha: formularioCita.fecha,
        hora_inicio: formularioCita.horaInicio + ':00',
        duracion_minutos: parseInt(formularioCita.duracion),
        nota: formularioCita.nota,
        user_id: currentUser?.id,
        estado_id: 1
      };

      await crearCita(citaData);
      cerrarModal();
    } catch (error) {
      console.error('Error al guardar cita:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: { xs: 6, md: 7 } }}>
      {/* Título de la página */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#424242', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CalendarIcon sx={{ color: '#A3C644', fontSize: 40 }} />
          Agenda de Citas
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#757575', 
            mt: 1,
            fontSize: '1.1rem'
          }}
        >
          Gestiona y organiza las citas de tus pacientes
        </Typography>
      </Box>

      {/* Header con filtros y acciones */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        p: 3,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid rgba(163,198,68,0.1)'
      }}>
        {/* Lado izquierdo - Filtros */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ color: '#424242', fontWeight: 'bold', mr: 2 }}>
            Filtros
          </Typography>
          
          {/* Filtro de Terapeuta - Solo para Administrador */}
          {currentUser?.rol?.id === ROLES.ADMINISTRADOR && (
            <FormControl 
              sx={{ 
                minWidth: 220,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: '#A3C644',
                    borderRadius: 2
                  },
                  '&:hover fieldset': { 
                    borderColor: '#8fb23a',
                    boxShadow: '0 0 0 2px rgba(163,198,68,0.1)'
                  },
                  '&.Mui-focused fieldset': { 
                    borderColor: '#A3C644',
                    boxShadow: '0 0 0 3px rgba(163,198,68,0.15)'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': { 
                  color: '#A3C644',
                  fontWeight: 'bold'
                }
              }}
            >
              <InputLabel>Terapeuta</InputLabel>
              <Select
                value={terapeutaFiltro}
                label="Terapeuta"
                onChange={(e) => setTerapeutaFiltro(e.target.value)}
                sx={{ 
                  backgroundColor: '#fafafa',
                  '& .MuiSelect-select': {
                    py: 1.5
                  }
                }}
              >
                <MenuItem value="">
                  <em>Todos los terapeutas</em>
                </MenuItem>
                {trabajadores && trabajadores.length > 0 ? (
                  trabajadores
                    .filter(t => {
                      // Manejar diferentes estructuras: rol_id o rol.id
                      const rolId = t.rol_id || t.rol?.id;
                      return rolId === ROLES.TERAPEUTA;
                    })
                    .map((terapeuta) => (
                      <MenuItem key={terapeuta.id} value={terapeuta.id}>
                        {terapeuta.nombres} {terapeuta.apellidos}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>
                    <em>Cargando terapeutas...</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          )}
          
          <Button
            variant="outlined"
            sx={{
              borderColor: '#A3C644',
              color: '#A3C644',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { 
                borderColor: '#8fb23a', 
                backgroundColor: 'rgba(163,198,68,0.08)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(163,198,68,0.2)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Estado: Todos
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#A3C644',
              color: '#A3C644',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { 
                borderColor: '#8fb23a', 
                backgroundColor: 'rgba(163,198,68,0.08)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(163,198,68,0.2)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Vista: Por semana
          </Button>
        </Box>

        {/* Lado derecho - Acciones */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#A3C644',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(163,198,68,0.3)',
              '&:hover': { 
                backgroundColor: '#8fb23a',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(163,198,68,0.4)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Nueva Cita
          </Button>
        </Box>
      </Box>

      {/* Calendario semanal */}
      <CalendarioSemanal
        horas={horas}
        citas={citas}
        onSlotClick={abrirModal}
        onCitaClick={({ fecha, hora, cita }) => {
          setSlotSeleccionado({ dia: '', hora, fecha });
          setFormularioCita({
            fecha,
            horaInicio: hora,
            // Crear objeto paciente con la estructura que espera el Autocomplete
            paciente: cita.paciente_id ? {
              id: cita.paciente_id,
              nombre_completo: cita.paciente_nombre
            } : null,
            doctor_id: cita.doctor_id || '',
            servicio_id: cita.servicio_id || '',
            motivo_id: cita.motivo_id || '',
            duracion: String(cita.duracion_minutos || ''),
            nota: cita.nota || ''
          });
          setModalAbierto(true);
        }}
        getEstadoColor={getEstadoColor}
        getEstadoIcon={getEstadoIcon}
        fechaActual={fechaActual}
        onFechaChange={setFechaActual}
      />

      {/* Botón flotante para nueva cita */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          backgroundColor: '#A3C644',
          width: 64,
          height: 64,
          boxShadow: '0 8px 24px rgba(163,198,68,0.4)',
          '&:hover': { 
            backgroundColor: '#8fb23a',
            transform: 'scale(1.1)',
            boxShadow: '0 12px 32px rgba(163,198,68,0.5)'
          },
          '&:active': {
            transform: 'scale(0.95)'
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <AddIcon sx={{ fontSize: 28 }} />
      </Fab>

      {/* Modal para agendar cita */}
      <ModalAgendarCita
        open={modalAbierto}
        onClose={cerrarModal}
        slotSeleccionado={slotSeleccionado}
        formularioCita={formularioCita}
        onFormularioChange={manejarCambioFormulario}
        onGuardar={guardarCita}
        servicios={servicios}
        duraciones={duraciones}
      />
    </Box>
  );
};

export default Agenda;
