import React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { FontSize, ThemePalette } from '../theme/theme'

const itemData = [
  {
    id: '1',
    img: '/merlin_lenguaje.png',
    title: 'Lic. Merlin Fernandez',
    profession: 'Terapia de Lenguaje',
  },
  // {
  //   id: '2',
  //   img: '/ladyperalta_adultos.png',
  //   title: 'Lic. Lady Peralta',
  //   profession: 'Psiocología de Adultos y Orientacion Vocacional',
  // },  
  // {
  //   id: '4',
  //   img: '/fernandacueva_psicologia.png',
  //   title: 'Lic. Fernanda Cueva',
  //   profession: 'Psicología y Terapia de Aprendizaje',
  // },
  {
    id: '5',
    img: '/cherlyquiuia_psicologia.png',
    title: 'Lic. Cherly Quiquia',
    profession: 'Psicología y Terapia de Aprendizaje',
  },
  {
    id: '6',
    img: '/linda-samanez.png',
    title: 'Lic. Linda Samanez',
    profession: 'Psicología Infantil, de Adolescentes y Adultos',
  },
  {
    id: '7',
    img: '/lic_jhoselyn_q.png',
    title: 'Lic. Jhoselyn Quispe',
    profession: 'Psicología Infantil y Terapia de Aprendizaje',
  },
  {
    id: '8',
    img: '/terapeutica-lizbeth.png',
    title: 'Lic. Lizbeth Olortegui',
    profession: 'Terapia de Lenguaje',
  },
  {
    id: '9',
    img: '/terapuet-danielac.png',
    title: 'Lic. Daniela Calle',
    profession: 'Terapeuta Ocupacional con Enfoque en Integración Sensorial',
  },  
];

export const Staff = () => {
  return (
    <>
      <Grid container marginTop='0px' p='10px 50px' display='flex' flexDirection='column' gap='20px' spacing='20px'>
        <Grid item xs={12}>
            <Box display='flex' gap='20px' flexDirection='column'>
              <Box>
                <Typography 
                  component='h2' 
                  fontSize={FontSize.TITLE_SECTION} 
                  color={ThemePalette.PURPLE_LIGHT} 
                  fontWeight='bold' 
                  textAlign='center'
                >
                  Staff Terapeútico
                </Typography>
                <Divider sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT, width: '130px', margin: 'auto' }} />
              </Box>
              <Typography component='div' color={ThemePalette.BLACK_MEDIUM} fontSize={FontSize.PARAGRAPH} textAlign='center'>
              En el Centro de Terapias Crecemos, podrá encontrar tecnólogos médicos especializados en terapia de lenguaje, ocupacional y física , así mismo contamos con  psicólogos especializados en terapias infantiles, adolescentes , terapia individual y terapia de pareja.  Conoce un poco más a nuestro Staff Especializado y contáctanos:
              </Typography>
            </Box>
            
        </Grid>
        <Grid xs={12}>
          <Grid container component="div" display="flex" spacing='40px' justifyContent='center'>
            {itemData.map((item) => (
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
        </Grid>
      </Grid>
    </>
  )
}
