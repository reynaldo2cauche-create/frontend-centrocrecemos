import React from 'react'
import { Card, CardContent, Typography, Grid, Avatar, Container, Box, CssBaseline, Button, useMediaQuery } from '@mui/material';
import { ThemePalette } from '../../theme/theme';
import { WhatsApp } from '@mui/icons-material';

const itemData = [
  {
    id: '1',
    img: '/terapuet-danielac.png',
    title: 'Lic. Daniela Calle',
    profession: 'Terapeuta Ocupacional',
  }
];

const treatments = [
  {
    title: 'Terapia de Integración Sensorial',
    description: 'Ayuda a niños con dificultades para procesar estímulos como sonidos, texturas, movimientos o luces, favoreciendo su adaptación al entorno.',
    image: './trp-lenguaje-card1.jpeg',
  },
  {
    title: 'Rehabilitación Motriz Fina y Gruesa',
    description: 'Mejora la coordinación necesaria para realizar actividades como escribir, cortar con tijeras, saltar, o mantener el equilibrio.',
    image: './trp-lenguaje-card2.jpeg',
  },
  {
    title: 'Entrenamiento en Habilidades de Vida Diaria',
    description: 'Enseña y fortalece habilidades básicas como vestirse, comer de forma independiente, y mantener la higiene personal.',
    image: './trp-lenguaje-card3.jpeg',
  },
  {
    title: 'Intervención en Habilidades Sociales y Adaptativas',
    description: 'Promueve interacciones positivas y ayuda a los niños a adaptarse a diferentes contextos sociales y escolares.',
    image: './trp-lenguaje-card4.jpeg',
  },
];



export const TerapiaOcupacionalPage = () => {

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
          src={isMobile ? 'fondo-ter-ocup-mov.png' : 'fondo-terapia-ocupacional-2.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%A4%97%20%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20terapia%20ocupacional%20y%20sus%20beneficios.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom marginTop={4} sx={{ fontWeight: 'bold', textAlign: 'center' }} >
        Principales Tratamientos en Terapia Ocupacional
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
        ¿Cuándo pasar por Terapia Ocupacional?
      </Typography>
      <Box p='15px 50px 10px'>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
        Considera acudir a Terapia Ocupacional si tu niño:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 3, lineHeight: 1.8 }}>
          {[
            'Tiene dificultad para realizar actividades diarias como vestirse, comer o escribir.',
            'Presenta problemas de coordinación motriz fina o gruesa.',
            'Muestra sensibilidad extrema o dificultad para procesar estímulos sensoriales (ruidos, texturas, luces, etc.).',
            'Ha sido diagnosticado con TEA, TDAH, parálisis cerebral, Síndrome de Down u otros trastornos del desarrollo.',
            'Tiene problemas para mantener la atención o seguir rutinas básicas.',
            'Tiene problemas para mantener la atención o seguir rutinas básicas.',
            'Experimenta dificultades para interactuar socialmente o adaptarse a su entorno.',
          ].map((text, index) => (
            <Typography component="li" key={index} sx={{ marginBottom: 1, fontSize: '1rem' }}>
              {text}
            </Typography>
          ))}
        </Box>
      </Box>

      <Typography p='15px 50px 41px' variant="h6" >
        La terapia ocupacional ayuda a mejorar estas áreas, promoviendo independencia y desarrollo integral.
      </Typography>

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
