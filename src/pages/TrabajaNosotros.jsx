
import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { imagesUneteNosotros, imagesUneteNosotrosMov } from './constants'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ThemePalette } from '../theme/theme'
import { CButton } from '../components/Button'
import FormularioTrabaja from '../components/FormularioTrabaja/FormularioTrabaja'

const jobs = [
  {
    id: '1',
    title: 'Psicomotricidad y Terapia Ocupacional',
    description: '¡Únete a nuestro equipo! Buscamos licenciadas para Psicomotricidad y Terapia Ocupacional que disfruten ayudar a nuestros niños y jóvenes a fortalecer sus habilidades motoras y a ganar mayor independencia. ¡Tu talento puede marcar la diferencia!',    
  },
  {
    id: '2',
    title: 'Psicología de Adultos y Orientación Vocacional',
    description: '“Si eres psicóloga y te apasiona guiar a adultos en su crecimiento emocional o apoyarlos con orientación vocacional, ¡te queremos en nuestro equipo! Ayuda a nuestros pacientes a descubrir su potencial y enfrentar sus desafíos con confianza.”',    
  },
  {
    id: '3',
    title: 'Psicología y Terapia de Aprendizaje',
    description: '“Estamos en búsqueda de psicólogas para trabajar en terapia de aprendizaje, acompañando a niños y adolescentes a desarrollar sus habilidades cognitivas y académicas. Si crees en el poder de la educación y la empatía, ¡postula con nosotros!”',
  },
  {
    id: '4',
    title: 'Terapia de Lenguaje',
    description: '“¿Eres terapeuta de lenguaje y quieres apoyar a los más pequeños en su desarrollo comunicativo? ¡Esta es tu oportunidad! Únete y contribuye a que nuestros niños y adolescentes se expresen con claridad y seguridad.”',
  },
  {
    id: '5',
    title: 'Estimulación Temprana',
    description: '“Invitamos a licenciadas en Estimulación Temprana que quieran ayudar a nuestros pequeñitos en su desarrollo inicial. Si te encanta trabajar con los más pequeños y fomentar su crecimiento integral, ¡esperamos tu postulación!”',
  },
]

export const TrabajaNosotros = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [cargoPostular, setCargoPostular] = useState('');
  const handleCloseModal = () => setModalOpen(false);

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderItem = (data) =>  (
    <Box height='100%' key={data.key}>
      <img  src={data.image} height='100%' width='100%'  />
    </Box>
  )

  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (

    <>
    <Box display='flex'  flexDirection='column'>

      {/* SECTION 1 */}
      <Carousel 
        height= {onlySmallScreen ? '365px' : '535px'}
        sx={{
          marginTop: '8px'
        }}
      >
        {
          onlySmallScreen ? (
            imagesUneteNosotrosMov.map( (item) => renderItem(item) )
          ) : (
            imagesUneteNosotros.map( (item) => renderItem(item) )
          )
        }
      </Carousel>
      
      {/* SECTION 2 */}
      <Box display='flex' gap='30px' flexDirection='column' bgcolor={ThemePalette.PURPLE_LIGHT} p='40px 10px'>
        <Box>
          <Typography component='h1' textAlign='center' fontWeight='bold' fontSize='24px' color={ThemePalette.WHITE}>ÚNETE A NUESTRA FAMILIA</Typography>
          <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '280px', margin: 'auto' }} />
        </Box>  
        <Typography component='p' textAlign='center' color={ThemePalette.WHITE}
          sx={{
            p: { md: '0px 100px', xs:'1px'}
          }}
        >“En Crecemos, valoramos el talento, la vocación y el compromiso con el bienestar de nuestros pacientes. Sé parte de un equipo apasionado por transformar vidas a través de terapias integrales y personalizadas. Juntos, hacemos la diferencia.”
        </Typography>
      </Box>

      {/* SECTION 3 */}
      <Box display='flex' flexDirection='column' gap='20px' bgcolor={ThemePalette.PURPLE_LIGHT} p='20px 0px'>
        <Box display='flex' gap='30px' flexDirection='column'>
          <Box>
            <Typography component='h1' textAlign='center' fontWeight='bold' fontSize='24px' color={ThemePalette.WHITE}>TRABAJA CON NOSOTROS</Typography>
            <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '250px', margin: 'auto' }} />
          </Box>          
          <Typography component='p' textAlign='center' color={ThemePalette.WHITE}
            sx={{
              p: { md: '0px 100px', xs:'1px'}
            }}
          >“Buscamos profesionales dedicados que compartan nuestra misión de brindar calidad, calidez y excelencia en cada sesión. Descubre cómo puedes crecer profesionalmente en un ambiente colaborativo y enriquecedor.”</Typography>
        </Box>
        

        <Box display='flex' flexDirection='column' gap='10px' justifyContent='center' alignItems='center'>
          {
            jobs.map((res) => (
              <Box  key={res.id} display='flex' flexDirection='row' alignItems='center' bgcolor={ThemePalette.WHITE}  borderRadius='10px' p='10px 30px' width='90%'>
                <Box display='flex' flexDirection='column' gap='10px' flex='1'>
                  <Typography component='h2' fontWeight='bold' color={ThemePalette.BLACK_MEDIUM} fontSize='17px'>{res.title}</Typography>                  
                  <Typography component='p'>{res.description}</Typography>
                </Box>
                <Box display='flex' flex={1} justifyContent='flex-end'>
                  <CButton
                    variant='contained'
                    type='button'
                    backgroundColor={ThemePalette.SKYBLUE_MEDIUM  }
                    onClick={() => {
                      setModalOpen(true)
                      setCargoPostular(res.title)
                    }}
                  >
                    Postula Aquí
                  </CButton>
                </Box>
                
              </Box>
              

            ))
          }
        </Box>
      </Box>

    </Box>

    {modalOpen && (
        <FormularioTrabaja
          onCloseModal={handleCloseModal} // Callback para cerrar el modal desde el componente padre
          cargoPostular={cargoPostular}
        />
      )}
    {/* <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Postular</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bienvenido a CentroCrecemos, deje sus datos para poder contactarlo , gracias por la postulación
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullname"
            name="fullname"
            label="Nombres y Apellidos"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Teléfono de Contacto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />          
          <TextField
            autoFocus
            required
            margin="dense"
            id="fileCv"
            name="fileCv"
            label="Sube tu CV, Resumen"
            type="file"
            fullWidth
            variant="standard"
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type="button" onClick={handleClose}>Guardar</Button>
        </DialogActions>
    </Dialog> */}

    </>
  )
}
