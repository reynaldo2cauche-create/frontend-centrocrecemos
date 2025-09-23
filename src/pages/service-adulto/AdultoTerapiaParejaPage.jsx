import React from 'react'
import { Typography, Grid, Box, Button, List, ListItem, ListItemIcon, ListItemText, Card, useMediaQuery } from '@mui/material';
import { WhatsApp, CheckCircle } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ThemePalette } from '../../theme/theme';

const itemData = [
  {
    id: '1',
    img: '/linda-samanez.png',
    title: 'Lic. Linda Samanez',
    profession: 'Psicóloga',
  }  
];

export const AdultoTerapiaParejaPage = () => {

  const isMobile = useMediaQuery('(max-width:600px)'); // Detecta pantallas móviles

  return (
    <Box sx={{ pt: 2, pb: 4, maxWidth: '100%', overflowX: 'hidden', padding: 0 }}>
      {/* Background image */}
      <Box
        sx={{
          width: '100%',
          minHeight: '50vh',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src={isMobile ? 'fondo-ter-par-mov.png' : 'fondo-terapia-pareja.png'}
          alt="Terapia de Lenguaje"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '90vh',
            objectFit: 'cover',
          }}
        />

        {/* Botón flotante */}
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#FFC107',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FFA000',
            },
          }}
          startIcon={<WhatsApp />}
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%E2%9D%A4%EF%B8%8F%20%C2%A1Hola!%20Estoy%20interesado%20en%20la%20terapia%20de%20pareja,%20%C2%BFme%20pueden%20dar%20m%C3%A1s%20detalles?', '_blank')}          
        >
          Reservar Cita
        </Button>
      </Box>

      {/* SECCIÓN DE PSICOTERAPIA INDIVIDUAL */}
      <Box sx={{ textAlign: 'left', mt: 4, px: 3, pt: 4, maxWidth: '800px', margin: 'auto' }}>
        {/* TÍTULO PRINCIPAL EN NEGRITA */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#F57C00', mb: 1 }}>
          Terapia de Pareja
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          La relación de pareja enfrenta diversos desafíos a lo largo del tiempo, desde problemas de comunicación hasta conflictos emocionales o cambios en la dinámica familiar. Nuestra terapia de pareja está diseñada para ayudar a fortalecer la relación, mejorar la convivencia y fomentar un vínculo más saludable.
        </Typography>

        {/* CUÁNDO ACUDIR A TERAPIA */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Cuándo acudir a terapia de pareja?
        </Typography>

        <List dense>
          {[
            'Dificultades en la comunicación y frecuentes malentendidos.',
            'Conflictos constantes sin solución efectiva.',
            'Falta de confianza o situaciones de infidelidad.',
            'Pérdida de conexión emocional o afectiva.',
            'Estrés por cambios familiares o laborales.',
            'Diferencias en la crianza de los hijos o toma de decisiones.',
            'Sensación de estancamiento en la relación.'
          ].map((item, index) => (
            <ListItem key={index} disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ color: '#7CB342', fontSize: 20, mr: 1 }} />
              <ListItemText 
                primary={item} 
                primaryTypographyProps={{ sx: { fontSize: '16px' } }} 
              />
            </ListItem>
          ))}
        </List>

        {/* CÓMO TE AYUDAMOS */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Cómo trabajamos?
        </Typography>
        <List dense>
          {[
            'Evaluación inicial: Identificamos los principales problemas y necesidades de la pareja.',
            'Terapia basada en técnicas efectivas de comunicación y resolución de conflictos.',
            'Desarrollo de estrategias para fortalecer la relación y recuperar la confianza.',
            'Espacios de escucha activa y empatía para mejorar la convivencia.',
          ].map((item, index) => (
            <ListItem key={index} disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
              <FiberManualRecordIcon sx={{ color: '#03A9F4', fontSize: 12, mr: 1 }} />
              <ListItemText 
                primary={item} 
                primaryTypographyProps={{ sx: { fontSize: '16px' } }} 
              />
            </ListItem>
          ))}
        </List>

        {/* SESIONES DISPONIBLES */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: '#1E88E5',
              borderRadius: '2px',
              mr: 1,
            }}
          />
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Sesiones presenciales y virtuales para adaptarnos a tus necesidades.
          </Typography>
        </Box>

        {/* MENSAJE FINAL */}
        <Typography
          sx={{
            fontSize: '16px',
            mt: 3,
          }}
        >
          ¡No esperes a que los problemas se agraven! Agenda una consulta y empieza a fortalecer tu relación. ❤️
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 3, mt: 3 }} 
        color={ThemePalette.PURPLE_LIGHT}>
        Profesionales
      </Typography>

      <Grid container spacing={4} justifyContent="center" p='15px 50px 41px'>
        {itemData.map((prof) => (
          <Grid item xs={12} sm={6} md={4} key={prof.id}>
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: '#ffffff', // Fondo sutil
                transition: '0.3s',
                '&:hover': { boxShadow: 6 } // Efecto al pasar el cursor
              }}
            >
              <Box
                component="img"
                src={prof.img}
                alt={prof.title}
                sx={{
                  width: 260, // Mejor proporción
                  height: 300, // Más alto
                  borderRadius: '16px', // Bordes suavizados
                  mb: 2,
                  objectFit: 'cover', // Evita que la imagen se deforme
                  border: '1px solid #e0e0e0' // Borde más sutil
                }}
              />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                {prof.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {prof.profession}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};
