import React from 'react';
import { Dialog, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogNotice = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundImage: 'url(/popup_noticia_1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          maxWidth: '500px',
          height: '600px',
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 3,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)'
        }}
      >
        <Typography 
          variant="h3" 
          component="h2"
          sx={{ 
            fontWeight: 'bold',
            marginBottom: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            color: '#663399' // Color morado para el título
          }}
        >
          Mayo: Mes del Bienestar Emocional en Crecemos
        </Typography>

        <Typography 
          variant="body1"
          sx={{ 
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            marginBottom: 3,
            fontSize: '1.1rem',
            maxWidth: '80%'
          }}
        >
          Este Mayo, cuida tu mente y fortalece tu familia. En Crecemos, tu bienestar emocional es prioridad. Aprovecha un 30% de descuento en la entrevista psicológica y recibe 1 sesión gratuita al iniciar tu proceso con nosotros.
        </Typography>

        <Typography 
          variant="h6"
          sx={{ 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginBottom: 2
          }}
        >
          ¡Agenda tu cita y aprovecha este beneficio especial!
        </Typography>

        <Typography 
          variant="caption"
          sx={{ 
            position: 'absolute',
            bottom: 16,
            fontSize: '0.7rem',
            opacity: 0.8
          }}
        >
          Términos y Condiciones:
          Promoción válida durante abril de 2025 para pacientes con diagnóstico médico de TEA. Aplica un 40% de descuento en la entrevista o evaluación y 1 sesión gratuita. Sujeto a disponibilidad de horarios. No acumulable con otras promociones.
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DialogNotice; 