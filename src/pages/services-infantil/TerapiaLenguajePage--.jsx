import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { FontSize, ThemePalette } from '../../theme/theme'
import { TitleSection } from '../../components/TitleSection/TitleSection'
import { TypeTitleSection } from '../../constants/TitleSection.constant'
import { ServiceDetail } from '../../components/ServiceDetail/ServiceDetail'
import { ServiceDetailMovil } from '../../components/ServiceDetail/ServiceDetailMovil'

const itemData = [
  {
    id: '1',
    img: '/merlin_lenguaje.png',
    title: 'Lic. Merlin Fernandez',
    profession: 'Terapeuta de lenguaje',
  },
  {
    id: '2',
    img: '/erikavivas_lenguaje.png',
    title: 'Lic. Erika Vivas',
    profession: 'Terapeuta de lenguaje',
  }
]

const textDetail = 'Nuestros profesionales son tecnólogos médicos especializados en terapia de lenguaje que brindan al menor: evaluaciones, diagnóstico, pronóstico, programación y tratamiento preventivo en las deficiencias, relacionadas con el habla, lenguaje, voz, y deglución.'

export const TerapiaLenguajePage = () => {
  return (
    <Box pt='8px' display='flex' gap='30px' flexDirection='column' >

      <ServiceDetail
        section1={{
          image:'fondo-terapia-lenguaje.png',
          text: (
            <Box display='flex' flexDirection='column' gap='20px'>
              <Typography 
                component='p' 
                fontSize={FontSize.PARAGRAPH} 
                color={ThemePalette.WHITE} 
                textAlign='justify'
              >
                Nuestros profesionales son tecnólogos médicos especializados en terapia de lenguaje que brindan al menor evaluaciones y tratamiento relacionadas con :
              </Typography>
            
              <Box display='flex' gap='20px'>
                <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Habla</Typography>
                <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Lenguaje</Typography>
                <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Voz</Typography>
                <Typography component='div' bgcolor={ThemePalette.WHITE} borderRadius='10px' padding='2px 18px'>Deglución</Typography>
              </Box>
            </Box>
          )
        }}
        section2={{
          title:'¿Cuándo pasar por terapia de lenguaje?',
          text: (
            <>
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
            </>
          ),
          // image: 'serv_terapia_lenguaje.png'
          image: 'serv_terapia_lenguaje_blank.png'
        }}
        section3={{
          title: 'Profesionales',
          persons: itemData
        }}
      />
    </Box>
  )
}
