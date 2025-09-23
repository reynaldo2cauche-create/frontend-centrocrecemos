import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { FontSize, ThemePalette } from '../../theme/theme'

export const ServiceDetail = ({
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
  const imgSection2 = `/portada_web.png`
  return (
    <Box>

      {/* Section 1 */}
      <Box 
        sx={{
          backgroundImage: `url(${imgSection1})`,
          width: '100%',
          height: '540px',
          backgroundRepeat: 'round'
        }}
      >
        <Box position='absolute' top='320px' left='800px' pr='22px' display='flex' flexDirection='column' gap='40px'>
          {section1.text}
          <Typography component='div' sx={{ cursor: 'pointer' }} bgcolor={ThemePalette.SKYBLUE_MEDIUM} color={ThemePalette.WHITE} borderRadius='10px' padding='12px 18px' margin='auto'
            onClick={() => window.open('https://wa.me/51957064401', '_blank')}
          >RESERVAR CITA</Typography>
        </Box>
      </Box>
      
      {/* Section 2 */}
      <Box 
        sx={{
          backgroundImage: `url(${imgSection2})`,
          width: '90%',
          height: '540px',
          backgroundRepeat: 'round',
          margin: '150px auto 0px',
          borderTopLeftRadius: '70px',
          borderBottomRightRadius: '70px'
        }}
        display='flex'
        flexDirection='row'
      >
        <Box display='flex' flex='1' justifyContent='center' mt='-110px'>
          <img src={`/${section2.image}`}/>
        </Box>

        <Box display='flex' flex='1' flexDirection='column' gap='20px' p='20px' pt='70px'>
          <Typography 
            component='h2' 
            fontSize={FontSize.TITLE_SERVICE} 
            color={ThemePalette.WHITE} 
            fontWeight='bold'
            textAlign='center'
          >
            {section2.title}
          </Typography>
          <Box color={ThemePalette.WHITE} fontSize='15px'>
            {section2.text}
          </Box>
        </Box>

        {/* <Box position='absolute' display='flex' flexDirection='column' gap='10px' left='680px' p='20px'>
          <Box>
            <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.WHITE} 
              fontWeight='bold'
              textAlign='center'
            >
              {section2.title}
            </Typography>
            <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '250px', margin: 'auto' }} />
          </Box>
          <Box color={ThemePalette.WHITE} fontSize='15px'>
            {section2.text}
          </Box>
        </Box> */}
        
      </Box>

      {/* Section 2 */}
      {/* <Grid container rowSpacing='20px' columnSpacing='40px' sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT_CARD }} 
        p='15px 50px 41px'
      >
        <Grid item xs={12} md={6} display='flex' justifyContent='center'>
          <img src={imgSection2} width='100%' />
        </Grid>
        <Grid item xs={12} md={6} component='div' display='flex' flexDirection='column' gap='10px'>
          <Box>
            <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.WHITE} 
              textAlign='center'
            >
              {section2.title}
            </Typography>
            <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '150px', margin: 'auto' }} />
          </Box>
          
          <Typography 
            component='p' 
            textAlign='justify' 
            fontSize={FontSize.PARAGRAPH} 
            color={ThemePalette.WHITE}
            >
              {section2.text}
          </Typography>         
        </Grid>
      </Grid> */}
      
      {/* Section 3 */}
      <Box display='flex' flexDirection='column' gap='20px' mt='20px'>
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
        <Grid container component="div" display="flex" spacing='40px' justifyContent='center'>
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
