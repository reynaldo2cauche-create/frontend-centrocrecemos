import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import WizardRegistroPaciente from '../components/WizzardRegistroPaciente/WizzardRegistroPaciente';

const RegistroPacientePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#eaf2fb',
        display: 'flex',
        alignItems: 'center',
       pt: { xs: '70px', md: '90px' },
        
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            backgroundColor: '#eaf2fb',
            p: { xs: 0, md: 0 },
            boxShadow: 'none',
          }}
        >
          <Grid
            container
            spacing={0}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent="center"
            sx={{
              minHeight: { xs: 'auto', md: '80vh' },
            }}
          >
            {/* Columna de texto */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  p: { xs: 3, md: 8 },
                  maxWidth: 480,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: '#174ea6',
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  Registro de Paciente
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#174ea6',
                    fontSize: '1.1rem',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  Bienvenido al Registro de Paciente
                  Para comenzar su atención, complete este formulario con sus datos.
Si cuenta con alguna condición especial o requiere apoyo durante el registro, indíquelo en el espacio correspondiente. Nuestro equipo estará disponible para acompañarlo y brindarle una atención personalizada en todo momento.
                </Typography>
              </Box>
            </Grid>
            {/* Columna del wizard */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 6 },
                  width: '100%',
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    width: '100%',
                    maxWidth: 700,
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                    backgroundColor: 'white',
                    boxShadow: '0 8px 32px rgba(23, 78, 166, 0.10)',
                  }}
                >
                  <WizardRegistroPaciente
                    onClose={() => {}}
                    isPageView={true}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistroPacientePage;
