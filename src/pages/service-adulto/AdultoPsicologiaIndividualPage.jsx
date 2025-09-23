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
    profession: 'Psicología',
  }  
];

export const AdultoPsicologiaIndividualPage = () => {

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
          src={isMobile ? 'fondo-psic-indiv-mov.png' : 'fondo-psicot-individual.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%92%99%20%C2%A1Hola!%20Estoy%20interesado%20en%20la%20psicoterapia%20para%20adultos,%20%C2%BFme%20pueden%20dar%20detalles?', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>

      {/* SECCIÓN DE PSICOTERAPIA INDIVIDUAL */}
      <Box sx={{ textAlign: 'left', mt: 4, px: 3, pt: 4, maxWidth: '800px', margin: 'auto' }}>
        {/* TÍTULO PRINCIPAL EN NEGRITA */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#F57C00', mb: 1 }}>
          Psicoterapia Individual
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          La psicoterapia individual es un espacio seguro y confidencial donde puedes expresar
          tus emociones, comprender tus pensamientos y trabajar en tu bienestar emocional.
        </Typography>

        {/* CUÁNDO ACUDIR A TERAPIA */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Cuándo acudir a terapia?
        </Typography>
        <List dense>
          {[
            'Ansiedad, estrés o depresión.',
            'Dificultades en la toma de decisiones.',
            'Problemas de autoestima o inseguridad.',
            'Procesos de duelo o cambios importantes.',
            'Manejo de emociones y relaciones personales.',
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
          ¿Cómo te ayudamos?
        </Typography>
        <List dense>
          {[
            'Técnicas para gestionar emociones y pensamientos negativos.',
            'Desarrollo de habilidades para afrontar desafíos personales.',
            'Apoyo en la resolución de conflictos y toma de decisiones.',
            'Acompañamiento en procesos de crecimiento personal.',
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
        <Typography
          sx={{
            fontSize: '16px',
            mt: 3,
          }}
        >
          💻 Sesiones presenciales y virtuales disponibles.
        </Typography>

        {/* MENSAJE FINAL */}
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            mt: 3,
            fontStyle: 'italic',
            color: '#FF8F00',
          }}
        >
          ✨ ¡Prioriza tu bienestar! Agenda tu cita y comienza tu camino hacia el equilibrio emocional. 💙
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
