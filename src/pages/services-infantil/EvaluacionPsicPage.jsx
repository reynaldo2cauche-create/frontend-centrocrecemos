import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { WhatsApp, CheckCircle } from '@mui/icons-material';
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

export const EvaluacionPsicologicaColegioPage = () => {

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
          src={isMobile ? 'fondo-pisco-col-mov.png' : 'fondo-eval-psic-colegio.png'}
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
          onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=%F0%9F%8F%AB%20%C2%A1Hola!%20Me%20interesa%20saber%20sobre%20la%20evaluaci%C3%B3n%20psicol%C3%B3gica%20escolar.', '_blank')}
        >
          Reservar Cita
        </Button>
      </Box>

      {/* SECCIÓN DE EVALUACIONES PSICOLÓGICAS */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          EVALUACIONES PSICOLÓGICAS
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{ maxWidth: '800px', margin: 'auto' }}
        >
          {/* Tarjeta 1 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#F3E5F5',
                borderRadius: '12px',
                textAlign: 'center',
                padding: 3,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Perfil Integral del Desarrollo Infantil
                </Typography>
                <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>
                  S/. 360.00
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6A1B9A' }}>
                  S/. 320.00
                </Typography>

                {/* Línea divisoria debajo del precio */}
                <Box sx={{ borderBottom: '1px solid gray', width: '200px', margin: '10px auto' }} />

                {/* Listado de Beneficios */}
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                  <Typography sx={{ mb: 1.5 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    1 Entrevista (Padres)
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    4 Sesiones evaluativas:
                  </Typography>

                  {/* Lista con menos separación */}
                  <List dense sx={{ ml: 3, mt: -1 }}>
                    {['Cognitivas', 'Emocional', 'Social'].map((item, index) => (
                      <ListItem key={index} disableGutters sx={{ display: 'flex', alignItems: 'center', py: 0 }}>
                        <Typography sx={{ mr: 1, fontSize: '1.1rem', color: '#6A1B9A' }}>•</Typography>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography sx={{ mt: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    1 Informe Verbal
                  </Typography>
                </Box>
              </CardContent>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#6A1B9A',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  '&:hover': { backgroundColor: '#4A148C' },
                }}
              >
                4 a 17 años
              </Button>
            </Card>
          </Grid>

          {/* Tarjeta 2 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#F3E5F5',
                borderRadius: '12px',
                textAlign: 'center',
                padding: 3,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Perfil Integral y Escolar del Desarrollo Infantil
                </Typography>
                <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>
                  S/. 400.00
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6A1B9A' }}>
                  S/. 370.00
                </Typography>

                {/* Línea divisoria debajo del precio */}
                <Box sx={{ borderBottom: '1px solid gray', width: '200px', margin: '10px auto' }} />

                {/* Listado de Beneficios */}
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                  <Typography sx={{ mb: 1.5 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    1 Entrevista (Padres)
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    5 Sesiones evaluativas:
                  </Typography>

                  {/* Lista con menos separación */}
                  <List dense sx={{ ml: 3, mt: -1 }}>
                    {['Cognitivas', 'Emocional', 'Social', 'Aprestamiento Escolar'].map((item, index) => (
                      <ListItem key={index} disableGutters sx={{ display: 'flex', alignItems: 'center', py: 0 }}>
                        <Typography sx={{ mr: 1, fontSize: '1.1rem', color: '#6A1B9A' }}>•</Typography>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography sx={{ mt: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20, verticalAlign: 'middle' }} />{' '}
                    1 Informe Verbal
                  </Typography>
                </Box>
              </CardContent>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#6A1B9A',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  '&:hover': { backgroundColor: '#4A148C' },
                }}
              >
                5 a 17 años
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* TEXTO FINAL FORMATEADO */}
      <Box sx={{ textAlign: 'center', mt: 4, px: 3 }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: '"Times New Roman", serif',
            lineHeight: '1.5',
          }}
        >
          ¡Obtén tu informe físico y digital totalmente gratis! <br />
          Perfecto para facilitar y acelerar la matrícula escolar <br />
          de tus hijos.
        </Typography>
      </Box>

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
