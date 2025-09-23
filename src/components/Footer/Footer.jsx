import { FacebookOutlined, Instagram, YouTube } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, Link, TextField, Typography, styled, Button } from '@mui/material';
import { GridInfoDetailFooter, GridInfoLogoFooter, GridInfoSocialFooter } from './constants';
import { FontSize, ThemePalette } from '../../theme/theme';
import { CButton } from '../Button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import emailjs from "@emailjs/browser";
import { useNavigate } from 'react-router-dom';
import { DialogRegistroPaciente } from '../DialogRegistroPaciente/DialogRegistroPaciente';
import WizardRegistroPaciente from '../WizzardRegistroPaciente/WizzardRegistroPaciente';
import CloseIcon from '@mui/icons-material/Close';

const defaultValues = {
  name: "",
  phone: "",
  email: "",
  message: "Mensaje del formulairio Unete a nuestro equipo"
};

const msgRequired = "Este campo es requerido";

export const Footer = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState(false);

  const [showWizard, setShowWizard] = useState(false);

  const handleStartWizard = () => setShowWizard(true)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        "gmail",
        "template_3wvi4b9",
        e.target,
        "SX4oS1TmEUndpmixK"
      )
      .then(
        (result) => {
          setIsLoading(false);
          setIsSendEmail(true);
          reset(defaultValues);
        },
        (error) => {     
          console.log('error', error)     
          setIsLoading(false);
          setErrorSendEmail(true);
          reset(defaultValues);
        }
      );
  }

  return (
    <>
      <Box marginTop='20px' p='20px 50px' component="footer" bgcolor={ThemePalette.PURPLE_LIGHT} display='flex' flexDirection='column'>
        <Box 
          display='flex' 
          gap='20px'  
          color={ThemePalette.WHITE} 
          justifyContent='space-between' 
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Cambia a columna en pantallas pequeñas
            alignItems: { xs: 'flex-start', sm: 'flex-start' }, // Alinea todo a la izquierda
            rowGap: { xs: '20px', sm: '0' } // Añade separación en pantallas pequeñas
          }}
        >
          {/* Sección 1 */}
          <Box rowGap='2px' display='flex' flexDirection='column' gap='10px' flex={1}>
            <Typography component="h4" color={ThemePalette.WHITE} fontWeight='bold' fontSize={FontSize.FOOTER_TITLE}>
              DONDE ESTAMOS
            </Typography>
            <Typography component="p" color={ThemePalette.WHITE} pr='15px' fontSize={FontSize.FOOTER_TEXT}>
              Puedes Visitar nuestras instalaciones en la siguiente dirección:
            </Typography>
            <Typography component="p" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}>
              Calle 48 Nro. 234 Urbanización El Pinar, Comas 15316
            </Typography>
            <Box display='flex' flexDirection='column' gap='5px'>
              <Box>
                <Typography component="h6" color={ThemePalette.WHITE} fontWeight='500' pt='15px' fontSize={FontSize.FOOTER_TEXT}>
                  HORARIO DE ATENCIÓN:
                </Typography>
                <Typography component="p" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}>
                  Lunes - Viernes: 11:00 am - 8:00 pm
                </Typography>
                <Typography component="p" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}>
                  Sab: 8:00 am - 2:00 pm
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Sección 2 */}
          <Box rowGap='12px' display='flex' flexDirection='column' flex={1}>
            <Typography component="h4" color={ThemePalette.WHITE} fontWeight='bold' fontSize={FontSize.FOOTER_TITLE}>
              SERVICIOS
            </Typography>
            <Box display='flex' flexDirection='column' gap='2px'>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/area-infantil-adolescentes')} sx={{ cursor: 'pointer' }}
              >
                Área Infantil y Adolescentes
              </Typography>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/area-adultos')} sx={{ cursor: 'pointer' }}
              >
                Área Adultos
              </Typography>
            </Box>
          </Box>

          {/* Sección 3 */}
          <Box rowGap='12px' display='flex' flexDirection='column' flex={1}>
            <Typography component="h4" color={ThemePalette.WHITE} fontWeight='bold' fontSize={FontSize.FOOTER_TITLE}>
              Legales
            </Typography>
            <Box display='flex' flexDirection='column' gap='2px'>
              {/* <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={handleStartWizard}  sx={{ cursor: 'pointer' }}
              > */}
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/registro-paciente')} sx={{ cursor: 'pointer' }}
              >
                Registro de Paciente
              </Typography>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/trabaja-nosotros')} sx={{ cursor: 'pointer' }}
              >
                Trabaja con Nosotros
              </Typography>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/terminos-condiciones')} sx={{ cursor: 'pointer' }}
              >
                Términos y Condiciones
              </Typography>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/terminos-condiciones')} sx={{ cursor: 'pointer' }}
              >
                Política de Privacidad
              </Typography>
              <Typography component="span" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}
                onClick={() => navigate('/terminos-condiciones')} sx={{ cursor: 'pointer' }}
              >
                Reglamento Interno para Clientes
              </Typography>
            </Box>
          </Box>

          {/* Sección 4 */}
          <Box rowGap='12px' display='flex' flexDirection='column' flex={1}>
            <Typography component="h4" color={ThemePalette.WHITE} fontWeight='bold' fontSize={FontSize.FOOTER_TITLE}>
              Contáctanos
            </Typography>
            <Box display='flex' flexDirection='column' gap='2px'>
              <Typography component="p" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}>
                <a href="tel:+51957064401" style={{ color: "inherit", textDecoration: "none" }}>
                  +51 957064401
                </a>
              </Typography>
              <Typography component="p" color={ThemePalette.WHITE} fontSize={FontSize.FOOTER_TEXT}>
                <a href="mailto:info@crecemos.com.pe" style={{ color: "inherit", textDecoration: "none" }}>
                  info@crecemos.com.pe
                </a>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Divider y Copyright */}
        <Divider sx={{ backgroundColor: ThemePalette.WHITE, margin: '10px 0px' }} />
        <Box display='flex' justifyContent='space-between' alignItems='center' flexDirection={{ xs: 'column', sm: 'row' }} rowGap={2}>
          <Typography color={ThemePalette.WHITE} textAlign={{ xs: 'center', sm: 'left' }}>
            Copyright 2024 - Todos los derechos reservados
          </Typography>
          <Box display='flex' gap={2} alignItems='center' justifyContent={{ xs: 'center', sm: 'flex-end' }} pr='25px'>
            <Link target="_blank" href="https://www.facebook.com/CentrodeTerapiasCrecemos" rel="noopener" color={ThemePalette.WHITE}>
              <FacebookOutlined fontSize='large'  />
            </Link>
            <Link target="_blank" href="https://www.instagram.com/centro_crecemos" rel="noreferrer" color={ThemePalette.WHITE}>
              <Instagram fontSize='large' />
            </Link>
            <Link target="_blank" href="https://www.youtube.com/@centrodeterapiacrecemos677" rel="noreferrer" color={ThemePalette.WHITE}>
              <YouTube fontSize='large' />
            </Link>
            <a target="_blank" href="https://www.tiktok.com/@centrocrecemos">
              <img src='./icon_tiktok.svg' alt='TikTok' width="30" height="30" />
            </a>
          </Box>
        </Box>
      </Box>

      {/* <DialogRegistroPaciente open={showRegistroPacienteModal} handleClose={() => setShowRegistroPacienteModal(false)} /> */}
      
      <Dialog open={showWizard} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Formulario de Registro
          <Button
            onClick={() => {
              console.log('cerrando wizard');
              setShowWizard(false);
            }}
            sx={{
              minWidth: '36px',
              height: '36px',
              borderRadius: '50%',
              padding: 0,
              color: 'gray',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.07)'
              }
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <WizardRegistroPaciente onClose={() => {
            console.log('cerrando wizard')
            setShowWizard(false);
          }} />
        </DialogContent>
      </Dialog>
    </>
  )
  
}