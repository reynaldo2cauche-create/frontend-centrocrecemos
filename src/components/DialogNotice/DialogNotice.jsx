import React from 'react';
import { Dialog, IconButton, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdsClick } from '@mui/icons-material';

const DialogNotice = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        style: {
          backgroundColor: '#fafafa',
          width: '100%',
          maxWidth: '450px',
          minHeight: { xs: '450px', sm: '500px' },
          position: 'relative',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          margin: '16px'
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'visible'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: -16,
          top: -16,
          color: '#4A148C',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          zIndex: 2,
          '&:hover': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: '1.2rem 0.8rem', sm: '1.5rem 1.2rem' },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '70%',
            backgroundImage: 'url(/logo_little.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {/* <Typography 
            variant="h3" 
            component="h2"
            sx={{ 
              fontWeight: 'bold',
              color: '#4A148C',
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' },
              lineHeight: 1.2,
              
            }}
          >
            Julio:
          </Typography> */}

          <Typography 
            variant="h3" 
            component="h2"
            sx={{ 
              fontWeight: 'bold',
              color: '#4A148C',
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' },
              lineHeight: 1.2,
              marginBottom: { xs: '0.6rem', sm: '0.8rem' }
            }}
          >
            ¡Feliz Día del Niño en Crecemos!
          </Typography>
          <br />
          <Typography 
            variant="body1"
            textAlign="justify"
            sx={{ 
              color: '#333333',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              maxWidth: '95%',
              lineHeight: 1.4,
              marginBottom: { xs: '0.6rem', sm: '0.8rem' }
            }}
          >
            Queremos celebrar a los más pequeños con beneficios que impulsan su desarrollo y bienestar.<br/><br/>
            <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>Promociones especiales:</span><br/>
            <span style={{ fontWeight: 'bold' }}>✅ 30% de descuento en Evaluación de Terapia de Lenguaje o Terapia Ocupacional Sensorial, y en Entrevista de Psicología de Padres</span><br/>
            <span style={{ fontWeight: 'bold' }}>✅ Por el pago de 4 sesiones terapéuticas, obtén 1 sesión gratis.</span><br/>
            <span style={{ fontWeight: 'bold' }}>✅ 10% de descuento en Evaluación Psicológica + Informe físico gratuito</span><br/>            
          </Typography>          

          <Typography 
            variant="h6"
            sx={{ 
              fontWeight: 'bold',
              color: '#7B1FA2',
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              marginBottom: { xs: '0.4rem', sm: '0.5rem' }
            }}
          >
            Agenda ahora y construyamos su desarrollo día a día.
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            marginTop: { xs: '0.2rem', sm: '0.3rem' },
            gap: '0.6rem'
          }}>
            <Box
              sx={{
                width: { xs: '110px', sm: '150px' },
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <img 
                src="/dia-nino-promo.jpg"
                alt="Logo Niño"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'transparent'
                }}
              />
            </Box>

            <Button
              variant="contained"
              startIcon={<AdsClick />}
              sx={{
                backgroundColor: '#FFA726',
                color: 'white',
                borderRadius: '25px',
                padding: { xs: '6px 20px', sm: '8px 24px' },
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#FB8C00'
                },
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                minWidth: { xs: '150px', sm: '170px' }
              }}
              // onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=Hola%20%F0%9F%91%8B%20Estoy%20interesado%20en%20la%20promoci%C3%B3n%20de%20psicolog%C3%ADa%20de%20mayo.%20%C2%BFMe%20puedes%20brindar%20m%C3%A1s%20informaci%C3%B3n?', '_blank')}
              // onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=Hola%20%F0%9F%91%8B%20Estoy%20interesado%20en%20la%20promoci%C3%B3n%20de%20psicolog%C3%ADa%20de%20julio.%20%C2%BFMe%20puedes%20brindar%20m%C3%A1s%20informaci%C3%B3n?', '_blank')}  
              onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=Hola%20%F0%9F%91%8B%20Estoy%20interesado%20en%20la%20promoci%C3%B3n%20de%20psicolog%C3%ADa%20de%20agosto.%20%C2%BFMe%20puedes%20brindar%20m%C3%A1s%20informaci%C3%B3n?', '_blank')}  
            >
              Más Información
            </Button>
          </Box>
        </Box>

        <Typography 
          variant="caption"
          sx={{ 
            color: '#666666',
            fontSize: '0.6rem',
            maxWidth: '90%',
            lineHeight: 1.3,
            mt: { xs: '0.6rem', sm: '0.8rem' },
            position: 'relative',
            zIndex: 1
          }}
        >
          Términos y Condiciones:
          Válido para reservas y pagos del 11 al 16 de agosto de 2025. El 30% de descuento aplica a Evaluación de Terapia de Lenguaje, Terapia Ocupacional Sensorial y Entrevista de Psicología de Padres. 1 sesión gratis por la compra de 4 sesiones terapéuticas en un solo pago. El 10% de descuento en Evaluación Psicológica incluye informe físico gratuito. No acumulable con otras promociones. Sujeto a disponibilidad de horarios.
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DialogNotice; 