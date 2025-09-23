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

export const AdultoEvalPsicolUniverPage = () => {

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
          src={isMobile ? 'fondo-eval-psic-univ-adul-mov.png' : 'fondo-eval-psic-univ-adul.png'}
          alt="Evaluación Psicológica para la Universidad"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '90vh',
            objectFit: 'cover',
          }}
        />

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
          onClick={() =>
            window.open(
              'https://api.whatsapp.com/send?phone=+51957064401&text=Hola.%20Deseo%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20evaluaci%C3%B3n%20psicol%C3%B3gica%20para%20la%20universidad.%20Quisiera%20que%20me%20contacten%20con%20el%20%C3%A1rea%20de%20admisi%C3%B3n',
              '_blank'
            )
          }
        >
          Reservar Cita
        </Button>
      </Box>

      {/* SECCIÓN DE PSICOTERAPIA INDIVIDUAL */}
      <Box sx={{ textAlign: 'left', mt: 4, px: 3, pt: 4, maxWidth: '800px', margin: 'auto' }}>
        {/* TÍTULO PRINCIPAL EN NEGRITA */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#F57C00', mb: 1 }}>
        Orientamos tu futuro con respaldo profesional
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          En Centro de Terapias CRECEMOS, ofrecemos el servicio especializado de Evaluación Psicológica para ingreso o permanencia universitaria, dirigido a estudiantes que requieren presentar un informe profesional ante instituciones educativas superiores.
          <br />
          <br />
          Nuestro proceso está diseñado para ser claro, confidencial y alineado con los requerimientos de cada universidad. Contamos con psicólogos colegiados y capacitados en evaluación vocacional, emocional y cognitiva, garantizando un diagnóstico ético y confiable.
        </Typography>

        {/* CUÁNDO ACUDIR A TERAPIA */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
        ¿Cuándo solicitar este servicio?
        </Typography>

        <List dense>
          {[
            'Para cumplir con un requisito de ingreso a la universidad.',
            'En casos en que la universidad solicite una evaluación por razones académicas o emocionales.',
            'Para orientar decisiones sobre cambio de carrera, manejo del estrés, u organización del tiempo.'            
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
          ¿Qué incluye?
        </Typography>

        <List dense>
          {[
            'Entrevista clínica.',
            'Aplicación de pruebas psicológicas válidas y actualizadas.',
            'Informe psicológico profesional con validez oficial.',
            'Recomendaciones personalizadas.'            
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

        {/* CÓMO TE AYUDAMOS */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F57C00', mt: 3, mb: 1 }}>
          ¿Por qué elegirnos?
        </Typography>

        <List dense>
          {[
            'Atención rápida y empática.',
            'Informes con estándares profesionales.',
            'Acompañamiento durante todo el proceso.',   
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

        {/* MENSAJE FINAL */}
        <Typography
          sx={{
            fontSize: '16px',
            mt: 3,
          }}
        >
          📍 Agenda tu cita con nosotros y prepárate para dar el siguiente paso en tu formación universitaria con seguridad y respaldo profesional.
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
