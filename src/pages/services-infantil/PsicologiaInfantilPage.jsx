import React from 'react'
import { Card, CardContent, Typography, Grid, Avatar, Container, Box, CssBaseline, Button, useMediaQuery } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { ThemePalette } from '../../theme/theme';

const itemData = [  
  {
    id: '2',
    img: '/terapeutica-cherQui.jpg',
    title: 'Lic. Cherly Quiquia',
    profession: 'Psicología',
  },
  {
    id: '3',
    img: '/linda-samanez.png',
    title: 'Lic. Linda Samanez',
    profession: 'Psicólogía',
  }  
];

const treatments = [
  {
    title: 'Terapia Cognitivo-Conductual (TCC)',
    description: 'Ayuda a modificar patrones de pensamiento y comportamiento en niños con ansiedad, depresión, o problemas de conducta.',
    image: './trp-lenguaje-card1.jpeg',
  },
  {
    title: 'Terapia de Juego',
    description: 'Utiliza el juego como herramienta para que los niños expresen emociones, superen traumas y desarrollen habilidades sociales.',
    image: './trp-lenguaje-card2.jpeg',
  },
  {
    title: 'Intervención en Problemas de Aprendizaje',
    description: 'Ofrece estrategias para superar dificultades académicas como dislexia, déficit de atención o problemas de memoria.',
    image: './trp-lenguaje-card3.jpeg',
  },
  {
    title: 'Orientación y Apoyo Familiar',
    description: 'Brinda herramientas a los padres para entender y manejar de manera efectiva las necesidades emocionales y conductuales de sus hijos.',
    image: './trp-lenguaje-card4.jpeg',
  },
];



export const PsicologiaInfantilPage = () => {

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
          position: 'relative', // Permite posicionar el botón dentro del Box
        }}
      >
        <img
          src={isMobile ? 'fondo-psic-infan-mov.png' : 'fondo-psicol-infantil-2.png'}
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
            backgroundColor: '#FFC107', // Color amarillo similar al de la imagen
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FFA000', // Color más oscuro al pasar el mouse
            },
          }}
          startIcon={<WhatsApp />}
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%A7%A0%20%C2%A1Hola!%20Necesito%20informaci%C3%B3n%20sobre%20psicolog%C3%ADa%20para%20ni%C3%B1os%20y%20adolescentes.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>
      
      <Typography variant="h4" gutterBottom marginTop={4} sx={{ fontWeight: 'bold', textAlign: 'center' }} >
        Principales Tratamientos en Psicologia Infantil
      </Typography>

      {/* Sección de tratamientos */}

      <Grid 
        p={{ xs: '15px', sm: '15px 50px 41px' }} // Padding ajustado solo para pantallas pequeñas
        container 
        spacing={4} 
        sx={{ mt: 2 }}
      >
        {treatments.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}> {/* xs={12} para móviles, sm={6} para pantallas medianas */}
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 2,
                  mr: 2,
                  objectFit: 'cover', // Asegura que las imágenes no se deformen
                }}
              />
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cuándo pasar por terapia de lenguaje */}
      <Typography variant="h5" gutterBottom marginTop={1} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        ¿Cuándo acudir a Psicología Infantil?
      </Typography>
      <Box p='15px 50px 10px'>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
        Considera acudir a Terapia Ocupacional si tu niño:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 3, lineHeight: 1.8 }}>
          {[
            'Si tu hijo tiene dificultades para gestionar emociones como tristeza, ira o ansiedad.',
            'Cuando presenta problemas de conducta, como agresividad, desobediencia o aislamiento.',
            'Si enfrenta desafíos sociales, como dificultad para relacionarse con otros niños o expresar sus pensamientos.',
            'En casos de cambios significativos en su vida, como separación de los padres, pérdida de un ser querido o mudanzas.',
            'Si tiene diagnósticos como Trastorno del Espectro Autista (TEA), TDAH o problemas de aprendizaje.Ante señales de baja autoestima o inseguridad constante.',
            'Cuando muestra miedos excesivos o recurrentes que afectan su día a día.',
          ].map((text, index) => (
            <Typography component="li" key={index} sx={{ marginBottom: 1, fontSize: '1rem' }}>
              {text}
            </Typography>
          ))}
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 3 }} 
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
  )
}
