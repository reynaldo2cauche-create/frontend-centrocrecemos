import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { FontSize, ThemePalette } from '../../theme/theme'

export const ServiceDetailMovil = ({
  section1 = {
    image: '',
    text: ''
  },
  section2 = {
    image: '',
    title: '',
    text: ''
  },
  section3 = {
    title: 'Profesionales',
    persons: [
      {
        id: '',
        img: '',
        title: '',
        profession: ''
      }
    ]
  }
}) => {
  const imgSection1 = `/${section1.image}`
  const imgSection2 = `/${section2.image}`
  return (
    <Box>

      {/* Section 1 */}
      <Box display='flex' flexDirection='column'  bgcolor={ThemePalette.PURPLE_LIGHT_CARD} pb='20px'>
        <img src='/fondo-terapia-lenguaje_movil.png' />
        <Box display='flex' flexDirection='column' gap='15px' p='15px'>
          <Box display='flex' flexDirection='column'>
            <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.WHITE} 
              fontWeight='bold'
              textAlign='center'
            >
              Terapia de Lenguaje
            </Typography>
            <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '150px', margin: 'auto' }} />
          </Box>
          
          <Typography 
            component='p' 
            fontSize={FontSize.PARAGRAPH} 
            color={ThemePalette.WHITE} 
            textAlign='justify'
          >
            {section1.text}
          </Typography>

          <Box display='flex' gap='20px' flexWrap='wrap'>
            <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Habla</Typography>
            <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Lenguaje</Typography>
            <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Voz</Typography>
            <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Deglución</Typography>
          </Box>
        </Box>
        <Typography component='div' sx={{ cursor: 'pointer' }} bgcolor={ThemePalette.SKYBLUE_MEDIUM} color={ThemePalette.WHITE} borderRadius='10px' padding='12px 18px' margin='auto'
          onClick={() => window.open('https://wa.me/51957064401', '_blank')}
        >RESERVAR CITA</Typography>
      </Box>

      {/* Section 2 */}
      <Box display='flex' flexDirection='column'  bgcolor={ThemePalette.WHITE} pb='20px'>
        <img src='/serv_terapia_lenguaje_movil.png' />
        <Box display='flex' flexDirection='column' gap='15px' p='15px'>
          <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.PURPLE_LIGHT} 
              fontWeight='bold'
              textAlign='center'
            >
              ¿Cuándo pasar por terapia de lenguaje?
            </Typography>

          <Box>
            <Typography>Si tu niño:</Typography>
            <ul>
              <li>Tiene dificultad en la comunicación verbal o gestual</li>
              <li>Ha sido diagnosticado Trastorno del espectro autismo(TEA)</li>
              <li>Ha sido diagnosticado Trastorno por déficit de atención e hiperactividad(TDHA)</li>
              <li>Presenta Síndrome de Down</li>
              <li>Tiene 2 años y aun no habla</li>
              <li>Tiene 3 años, habla y no se le entiende</li>
              <li>Tiene 4 años y no estructura oraciones largas</li>
              <li>Tiene 5 años y aún presenta muchos problemas de articulación</li>
            </ul>
          </Box>
          
        </Box>
      </Box>

      {/* Section 3 */}
      <Box display='flex' flexDirection='column' gap='20px' pt='20px'>
        <Box>
          <Typography 
            component='h2' 
            fontSize={FontSize.TITLE_SECTION} 
            color={ThemePalette.PURPLE_LIGHT} 
            fontWeight='bold' 
            textAlign='center'
          >
            {section3.title}
          </Typography>
          <Divider sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT, width: '90px', margin: 'auto' }} />
        </Box>
        <Grid container component="div" display="flex" spacing='40px' justifyContent='center' p='20px'>
          {section3.persons.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <img style={{ borderRadius: '30px' }} src={item.img} alt={item.title} width='100%'/>
              <Box>
                <Typography component="div" textAlign='center' fontWeight='bold' color={ThemePalette.PURPLE_LIGHT} fontSize={FontSize.TITLE_PARAGRAPH}>
                  {item.title}
                </Typography>
                <Typography gutterBottom component="div" textAlign='center' color={ThemePalette.BLACK_MEDIUM} fontSize={FontSize.PROFESSION_IMAGE_STAFF}>
                  {item.profession}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  )
}
