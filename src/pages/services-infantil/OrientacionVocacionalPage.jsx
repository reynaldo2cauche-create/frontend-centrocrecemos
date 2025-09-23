import React from 'react'
import { Typography, Grid, Box, Button, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Card } from '@mui/material';
import { WhatsApp, CheckCircle } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ThemePalette } from '../../theme/theme';
const itemData = [
  {
    id: '1',
    img: '/linda-samanez.png',
    title: 'Lic. Linda Samanez',
    profession: 'Psicólogía',
  }  
];

export const OrientacionVocacionalPage = () => {

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
          src={isMobile ? 'fondo-orien-voc-mov.png' : 'fondo-orientacion-vocacional.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%8E%93%20%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20el%20test%20vocacional.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>

      {/* SECCIÓN DE PSICOTERAPIA INDIVIDUAL */}
      <Box sx={{ textAlign: 'left', mt: 4, px: 3, pt: 4, maxWidth: '800px', margin: 'auto' }}>
        {/* TÍTULO PRINCIPAL EN NEGRITA */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#F57C00', mb: 1 }}>
          Orientación Vocacional
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          La orientación vocacional es un proceso que ayuda a adolescentes y adultos a descubrir su vocación, intereses y habilidades para tomar decisiones acertadas sobre su futuro académico y profesional.
        </Typography>

        {/* CUÁNDO ACUDIR A TERAPIA */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Por qué es importante?
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          Elegir una carrera es una de las decisiones más importantes en la vida. Contar con una adecuada orientación vocacional permite:
        </Typography>
        <List dense>
          {[
            'Identificar habilidades, intereses y valores personales.',
            'Explorar opciones de estudio y profesiones acorde al perfil del estudiante.',
            'Evitar frustraciones y cambios de carrera innecesarios.',
            'Fomentar la motivación y seguridad en la elección profesional.',
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
          ¿A quién está dirigido?
        </Typography>
        <List dense>
          {[
            'Estudiantes de secundaria que aún no han decidido qué carrera seguir.',
            'Jóvenes que desean confirmar si su elección es la adecuada.',
            'Personas que buscan cambiar de profesión o especializarse en otro ámbito.',
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

        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Cómo es el proceso?
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          En nuestro centro ofrecemos:
        </Typography>
        <List dense>
          {[
            'Evaluaciones psicométricas y test vocacionales.',
            'Análisis de intereses, habilidades y aptitudes.',
            'Asesoramiento individualizado con un especialista.',
            'Información sobre el campo laboral y tendencias del mercado.',
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


        {/* MENSAJE FINAL */}
        <Typography
          sx={{
            fontSize: '16px',
            mt: 3,
          }}
        >
          💡 Toma una decisión informada y construye tu futuro con confianza.
        </Typography>

        <Typography
          sx={{
            fontSize: '16px',
            mt: 1,
          }}
        >
          📅 ¡Agenda tu evaluación vocacional hoy mismo!
        </Typography>
      </Box>

      {/* SECCIÓN DE PROFESIONALES */}
      <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 3 , mt: 5}} 
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
