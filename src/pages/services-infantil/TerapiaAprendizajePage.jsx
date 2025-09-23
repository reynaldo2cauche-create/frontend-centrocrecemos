import React from 'react'
import { Card, CardContent, Typography, Grid, Avatar, Container, Box, CssBaseline, Button, useMediaQuery } from '@mui/material';
import { ThemePalette } from '../../theme/theme';
import { WhatsApp } from '@mui/icons-material';

const itemData = [  
  {
    id: '2',
    img: '/terapeutica-cherQui.jpg',
    title: 'Lic. Cherly Quiquia',
    profession: 'Psicología',
  },
];

const treatments = [
  {
    title: 'Estrategias para la atención y concentración',
    description: 'Técnicas para mejorar el enfoque y reducir distracciones.',
    image: './trp-lenguaje-card1.jpeg',
  },
  {
    title: 'Estimulación de la memoria y el razonamiento',
    description: 'Actividades para fortalecer la retención y el pensamiento lógico.',
    image: './trp-lenguaje-card2.jpeg',
  },
  {
    title: 'Desarrollo de habilidades de lectoescritura',
    description: 'Apoyo en la lectura, comprensión y escritura.',
    image: './trp-lenguaje-card3.jpeg',
  },
  {
    title: 'Técnicas para el aprendizaje autónomo',
    description: 'Métodos para organizar y gestionar el estudio de manera efectiva.',
    image: './trp-lenguaje-card4.jpeg',
  },
];



export const TerapiaAprendizajePage = () => {

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
          src={isMobile ? 'fondo-ter-apre-mov.png' : 'fondo-terapia-aprendizaje-2.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%93%9A%20%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20sobre%20la%20terapia%20de%20aprendizaje.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom marginTop={4} sx={{ fontWeight: 'bold', textAlign: 'center' }} >
        Tratamientos Realizados por un Terapeuta de Aprendizaje
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
        ¿Cuándo llevar terapia de aprendizaje?
      </Typography>
      <Box p='15px 50px 10px'>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
        Se recomienda llevar terapia de aprendizaje si el niño o adolescente:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 3, lineHeight: 1.8 }}>
          {[
            'Tiene dificultades para leer, escribir o comprender textos.',
            'Presenta problemas de atención y concentración en clase.',
            'Se le dificulta organizar sus tareas y recordar información.',
            'Muestra bajo rendimiento escolar a pesar del esfuerzo.',
            'Tiene dificultades para seguir instrucciones o resolver problemas matemáticos.'
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
