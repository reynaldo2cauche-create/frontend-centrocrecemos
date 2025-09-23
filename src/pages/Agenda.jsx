import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  Chip,
  IconButton,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const Agenda = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  
  // Datos de ejemplo para la agenda - vista semanal
  const citas = [
    {
      id: 1,
      paciente: 'María González',
      terapeuta: 'Dr. Juan Pérez',
      fecha: '2024-01-15',
      hora: '09:00',
      duracion: 60,
      tipo: 'Terapia Individual',
      estado: 'Confirmada',
      dia: 'Lunes'
    },
    {
      id: 2,
      paciente: 'Carlos López',
      terapeuta: 'Dra. Ana Martínez',
      fecha: '2024-01-16',
      hora: '10:30',
      duracion: 45,
      tipo: 'Evaluación',
      estado: 'Pendiente',
      dia: 'Martes'
    },
    {
      id: 3,
      paciente: 'Sofia Rodríguez',
      terapeuta: 'Dr. Miguel Torres',
      fecha: '2024-01-17',
      hora: '14:00',
      duracion: 90,
      tipo: 'Terapia Familiar',
      estado: 'Confirmada',
      dia: 'Miércoles'
    },
    {
      id: 4,
      paciente: 'Romeo Prueba',
      terapeuta: 'Dr. Juan Pérez',
      fecha: '2024-01-17',
      hora: '09:00',
      duracion: 60,
      tipo: 'Evaluación',
      estado: 'Confirmada',
      dia: 'Miércoles'
    },
    {
      id: 5,
      paciente: 'Homero Prueba',
      terapeuta: 'Dra. Ana Martínez',
      fecha: '2024-01-17',
      hora: '11:00',
      duracion: 60,
      tipo: 'Terapia Individual',
      estado: 'Confirmada',
      dia: 'Miércoles'
    }
  ];

  // Días de la semana
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Horas del día (9 AM a 6 PM)
  const horas = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return '#4caf50';
      case 'Pendiente':
        return '#ff9800';
      case 'Cancelada':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />;
      case 'Cancelada':
        return <CancelIcon sx={{ fontSize: 16, color: '#f44336' }} />;
      default:
        return null;
    }
  };

  // Función para obtener citas por día y hora
  const getCitaEnSlot = (dia, hora) => {
    return citas.find(cita => cita.dia === dia && cita.hora === hora);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: { xs: 6, md: 7 } }}>
      {/* Header con navegación */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            sx={{ 
              backgroundColor: '#A3C644', 
              color: 'white',
              '&:hover': { backgroundColor: '#8fb23a' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: '#A3C644', 
              color: 'white',
              '&:hover': { backgroundColor: '#8fb23a' }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<CalendarIcon />}
            sx={{
              backgroundColor: '#A3C644',
              '&:hover': { backgroundColor: '#8fb23a' },
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Hoy
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>
            15 sep - 22 sep 2025
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#A3C644',
              color: '#A3C644',
              '&:hover': { borderColor: '#8fb23a', backgroundColor: 'rgba(163,198,68,0.08)' }
            }}
          >
            Estado: Todos
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#A3C644',
              color: '#A3C644',
              '&:hover': { borderColor: '#8fb23a', backgroundColor: 'rgba(163,198,68,0.08)' }
            }}
          >
            Vista: Por semana
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#A3C644',
              '&:hover': { backgroundColor: '#8fb23a' },
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Nueva Cita
          </Button>
        </Box>
      </Box>

      {/* Calendario semanal */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell sx={{ width: '120px', fontWeight: 'bold', color: '#424242' }}>
                  Hora
                </TableCell>
                {diasSemana.map((dia) => (
                  <TableCell 
                    key={dia} 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#424242',
                      textAlign: 'center',
                      backgroundColor: dia === 'Miércoles' ? '#e8f5e8' : 'transparent'
                    }}
                  >
                    {dia} {dia === 'Miércoles' ? '17' : ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {horas.map((hora) => (
                <TableRow key={hora} sx={{ height: '60px' }}>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#666',
                      backgroundColor: '#f8f9fa',
                      borderRight: '1px solid #e0e0e0'
                    }}
                  >
                    {hora}
                  </TableCell>
                  {diasSemana.map((dia) => {
                    const cita = getCitaEnSlot(dia, hora);
                    return (
                      <TableCell 
                        key={`${dia}-${hora}`} 
                        sx={{ 
                          position: 'relative',
                          backgroundColor: dia === 'Miércoles' ? '#f0f8f0' : 'transparent',
                          border: '1px solid #e0e0e0',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      >
                        {cita && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 4,
                              left: 4,
                              right: 4,
                              bottom: 4,
                              backgroundColor: '#e3f2fd',
                              border: `2px solid ${getEstadoColor(cita.estado)}`,
                              borderRadius: 1,
                              p: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: '#bbdefb'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                {cita.paciente}
                              </Typography>
                              {getEstadoIcon(cita.estado)}
                            </Box>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                              {cita.tipo}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Botón flotante para nueva cita */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#A3C644',
          '&:hover': { backgroundColor: '#8fb23a' }
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Agenda;
