import { useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import { FontSize, ThemePalette } from '../theme/theme'
import { AccessTime, Edit, LocationOn, MailOutline, PhoneInTalk } from '@mui/icons-material';
import { CButton } from '../components/Button';
import { useForm } from 'react-hook-form';
import emailjs from "@emailjs/browser";

const defaultValues = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
  message: "",
};

const msgRequired = "Este campo es requerido";

export const ContactUs = () => {
  
  console.log('Contact us')
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState(false);

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
        "service_hceijsu",
        "template_h6kn9z6",
        e.target,
        "lswdI3Z3eW2gYBtrc"
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
    <Box marginTop='20px' p='10px 50px' display='flex' flexDirection='column' gap='50px'>
      <Box>
        <Box display='flex' flexDirection='column' gap='20px'>
          <Box>
            <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.PURPLE_LIGHT} 
              fontWeight='bold' 
              textAlign='center'
            >
              Contacto Administrativo
            </Typography>
            <Divider sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT, width: '190px', margin: 'auto' }} />
          </Box>
          <Typography component='p' mb='20px'>Cuéntanos en el siguiente formulario como te podemos ayudar. Este formulario no es para solicitar una Cita.</Typography>
        </Box>
          
        <Grid container spacing='20px'>
          <Grid item xs={12} md={6}>          
            <Grid container component='form' spacing='20px' onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} md={6}>
                <TextField 
                  id="outlined-basic" 
                  label="Nombres" 
                  variant="outlined" 
                  fullWidth 
                  type='text'
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.FORM_ERROR}>{msgRequired}</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  id="outlined-basic" 
                  label="Apellidos" 
                  variant="outlined" 
                  fullWidth 
                  type='text'
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.FORM_ERROR}>{msgRequired}</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  id="outlined-basic" 
                  label="Teléfono o Celular" 
                  variant="outlined" 
                  fullWidth
                  type='number'
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.FORM_ERROR}>{msgRequired}</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  id="outlined-basic" 
                  label="Correo electrónico" 
                  variant="outlined" 
                  fullWidth
                  {...register("email", { required: true })}
                  type='email'
                />
                {errors.email && (
                  <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.FORM_ERROR}>{msgRequired}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Mensaje"
                  multiline
                  rows={4}
                  fullWidth
                  type='text'
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.FORM_ERROR}>{msgRequired}</Typography>
                )}
              </Grid>
              <Grid item xs={12} textAlign='center'>
                <CButton
                  variant='contained'
                  type='submit'
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Cargando..." : "Enviar"}
                </CButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ width: onlySmallScreen ? '100%' : '50%', margin: 'auto' }}>
              <CardContent>
                <Grid container >
                  <Grid item md={2} >
                    <PhoneInTalk />
                  </Grid>
                  <Grid item md={10}  display='flex' flexDirection='column' >
                    <Typography component='h3' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold'>Celular</Typography>
                    <Typography component='span'>
                      <a href="tel:+51957064401" style={{ textDecoration: 'none', color: 'inherit' }}>
                        (+51) 957064401
                      </a>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container mt='10px'>
                  <Grid item md={2}>
                    <AccessTime />
                  </Grid>
                  <Grid item md={10} display='flex' flexDirection='column' >
                    <Typography component='h3' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold'>Horario de atención:</Typography>
                    <Typography component='span'>L a V: 11:00 am - 8:00 pm</Typography>
                    <Typography component='span'>Sab: 8:00 am - 2:00 pm</Typography>
                  </Grid>
                </Grid>

                <Grid container mt='10px'>
                  <Grid item md={2}>
                    <MailOutline />
                  </Grid>
                  <Grid item md={10} display='flex' flexDirection='column' >
                    <Typography component='h3' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold'>Correo</Typography>
                    <Typography component='span'>
                      <a href="mailto:info@crecemos.com.pe" style={{ textDecoration: 'none', color: 'inherit' }}>
                        info@crecemos.com.pe
                      </a>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container mt='10px'>
                  <Grid item md={2}>
                    <LocationOn />
                  </Grid>
                  <Grid item md={10} display='flex' flexDirection='column' >
                    <Typography component='h3' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold'>Sedes</Typography>
                    <Typography component='span'>Comas</Typography>
                  </Grid>
                </Grid>
                
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {
          isSendEmail && (
            <Typography component='span' color={ThemePalette.PURPLE_LIGHT} fontSize={FontSize.MESSAGE_EMAIL} fontWeight='bold'>Gracias por contactarnos, en unos momentos nos estaremos comunicando con usted</Typography>
          )
        }

        {
          errorSendEmail && (
            <Typography component='span' color={ThemePalette.RED} fontSize={FontSize.MESSAGE_EMAIL}>En estos momentos no se puede enviar el email, por favor intente
            nuevamente o contactenos a +51957064401</Typography>
          )
        }
        
      </Box>
      <Box>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7807.700157082227!2d-77.054089!3d-11.91552!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d053057f4573%3A0x5538361fe86bb43c!2sCENTRO%20DE%20TERAPIAS%20CRECEMOS!5e0!3m2!1ses!2spe!4v1712604339131!5m2!1ses!2spe" width='100%' height="450" style={{ border: '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </Box>
      
    </Box>
  )
}
