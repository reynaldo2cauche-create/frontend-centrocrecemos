import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { FontSize, ThemePalette } from '../../theme/theme'
import { TitleSection } from '../../components/TitleSection/TitleSection'
import { TypeTitleSection } from '../../constants/TitleSection.constant'
import { ServiceDetail } from '../../components/ServiceDetail/ServiceDetail'

const itemData = [
  {
    id: '1',
    img: '/fernandacueva_psicologia.png',
    title: 'Lic. Fernanda Cueva',
    profession: 'Psicología y Terapia de Aprendizaje',
  },
  {
    id: '2',
    img: '/cherlyquiuia_psicologia.png',
    title: 'Lic. Cherly Quiquia',
    profession: 'Pisocología y Terapia de Lenguaje',
  }  
]

export const PsicologiaInfantilPage = () => {
  return (
    // <Box  p='35px 50px 41px' display='flex' gap='30px' flexDirection='column' >
    <Box pt='8px' display='flex' gap='30px' flexDirection='column' >

      <ServiceDetail
        section1={{
          image:'fondo_psicologia.png',
          text: (
            <Typography 
              component='p' 
              fontSize={FontSize.PARAGRAPH} 
              color={ThemePalette.WHITE} 
              textAlign='justify'
            >
              Nuestros profesionales son psicólogos habilitados y colegiados especializados en manejo de la conducta, y emociones.
            </Typography>
          )
        }}
        section2={{
          title:'¿Cuándo pasar por psicología?',
          text: (
            <>
              <p>La decisión de si un niño debe pasar por psicología puede depender de varios factores, incluyendo el desarrollo emocional, social y cognitivo del niño, así como cualquier preocupación específica que los padres, cuidadores o maestros puedan tener.</p>
              <ul>
                <li>Problemas de conducta: Si un niño muestra cambios significativos en su comportamiento, como agresividad o retraimiento excesivo.</li>
                <li>Bajo rendimiento escolar: Si un niño está teniendo problemas en la escuela, ya sea académicamente o en términos de concentración, motivación o autoestima, un psicólogo puede ayudar a identificar posibles causas y soluciones.</li>
                <li>Dificultades de habilidades sociales</li>
                <li>Indicadores de retraso en el desarrollo: Si hay preocupaciones sobre el desarrollo del niño, como retrasos en el habla, la motricidad o el desarrollo social, un psicólogo infantil puede realizar evaluaciones para determinar si es necesario intervención adicional.</li>
                <li>Si ya cuenta con un diagnóstico del neurodesarrollo como TEA O TDHA.</li>
              </ul>
            </>
          ),
          image: 'serv_psicologia_blank.png'
        }}
        section3={{
          title: 'Profesionales',
          persons: itemData
        }}
      />
    </Box>
  )
}
