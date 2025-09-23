import React from 'react'
import { Card, CardContent, Typography, Grid, Avatar, Container, Box, CssBaseline, Button, useMediaQuery } from '@mui/material';
import { FontSize, ThemePalette } from '../../theme/theme';
import { WhatsApp } from '@mui/icons-material';

const itemData = [
  {
    id: '1',
    img: '/terapeutica-merlin.jpg',
    title: 'Lic. Merlin Fernandez',
    profession: 'Terapeuta de lenguaje',
  },
  {
    id: '2',
    img: '/terapeutica-lizbeth.png',
    title: 'Lic. Lizbeth Olortegui',
    profession: 'Terapeuta de lenguaje',
  },
];

const treatments = [
  {
    title: 'Tratamiento de trastornos del habla',
    description: 'Intervención para corregir dificultades en la pronunciación, fluidez o producción de sonidos.',
    image: './trp-lenguaje-card1.jpeg',
  },
  {
    title: 'Terapia del lenguaje receptivo y expresivo',
    description: 'Mejora de la comprensión y expresión verbal en casos de retrasos del lenguaje.',
    image: './trp-lenguaje-card2.jpeg',
  },
  {
    title: 'Rehabilitación de trastornos de la comunicación',
    description: 'Ayuda en casos de afasia, apraxia o disartria, como resultado de condiciones neurológicas.',
    image: './trp-lenguaje-card3.jpeg',
  },
  {
    title: 'Estimulación del lenguaje en niños pequeños',
    description: 'Fomento del desarrollo del lenguaje desde edades tempranas para prevenir retrasos.',
    image: './trp-lenguaje-card4.jpeg',
  },
];



export const TerapiaLenguajePage = () => {

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
          src={isMobile ? 'fondo-ter-len-inf-mov.png' : 'fondo-terapia-lenguaje-2.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%97%A3%EF%B8%8F%20%C2%A1Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20la%20terapia%20de%20lenguaje%20y%20c%C3%B3mo%20puede%20ayudarme.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>
      
      <Typography variant="h4" gutterBottom marginTop={4} sx={{ fontWeight: 'bold', textAlign: 'center' }} >
        Principales Tratamientos Realizados por un Terapeuta de Lenguaje
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
        ¿Cuándo pasar por terapia de lenguaje?
      </Typography>
      <Box p='15px 50px 41px'>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
          Considere terapia de lenguaje si su niño presenta alguna de las siguientes situaciones:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 3, lineHeight: 1.8 }}>
          {[
            'Tiene dificultades para comunicarse, ya sea de manera verbal o gestual.',
            'Ha sido diagnosticado con Trastorno del Espectro Autista (TEA).',
            'Tiene diagnóstico de Trastorno por Déficit de Atención e Hiperactividad (TDAH).',
            'Presenta Síndrome de Down u otro diagnóstico asociado con retraso en el desarrollo del lenguaje.',
            'Tiene 2 años y no habla.',
            'Tiene 3 años, pero no se le entiende al hablar.',
            'Tiene 4 años y no forma oraciones completas o largas.',
            'Tiene 5 años y presenta problemas significativos en la pronunciación de palabras.',
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
