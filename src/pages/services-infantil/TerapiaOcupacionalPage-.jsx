import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { FontSize, ThemePalette } from '../../theme/theme'
import { TitleSection } from '../../components/TitleSection/TitleSection'
import { TypeTitleSection } from '../../constants/TitleSection.constant'
import { ServiceDetail } from '../../components/ServiceDetail/ServiceDetail'

const itemData = [
  {
    id: '1',
    img: '/katyacordova_ocupacional.png',
    title: 'Lic. Katya Olivares',
    profession: 'Terapeuta Ocupacional',
  }
]

const textDetail = 'Nuestros profesionales son tecnólogos médicos especializados en terapia de lenguaje que brindan al menor: evaluaciones, diagnóstico, pronóstico, programación y tratamiento preventivo en las deficiencias, relacionadas con el habla, lenguaje, voz, y deglución.'

export const TerapiaOcupacionalPage = () => {
  return (
    <Box  pt='8px' display='flex' gap='30px' flexDirection='column' >

      <ServiceDetail
        section1={{
          image:'fondo_terapia_ocupacional.png',
          text: (
            <Typography 
              component='p' 
              fontSize={FontSize.PARAGRAPH} 
              color={ThemePalette.WHITE} 
              textAlign='justify'
            >
              Nuestros profesionales son tecnólogos médicos. Se encarga de analizar el procesamiento sensorial, desarrollo de habilidades y comportamientos que impacta en la autonomía del niño.
            </Typography>
          )
        }}
        section2={{
          title:'¿Cuándo pasar por terapia ocupacional?',
          text: (
            <>
              <p>La un niño puede necesitar pasar por terapia ocupacional cuando enfrenta dificultades en áreas como habilidades motoras, integración sensorial, autocuidado o participación en actividades cotidianas. La terapia ocupacional puede proporcionar intervenciones para ayudar al niño a desarrollar las habilidades necesarias para tener éxito en su vida diaria.</p>
              <ul>
                <li>Dificultades motoras: con habilidades motoras finas ( agarrar objetos, escribir , abotonarse) o habilidades motoras gruesas (caminar, correr, saltar) para mejorar su coordinación y destreza.</li>
                <li>Dificultades sensoriales: Los niños que tienen hipersensibilidad o hiposensibilidad a estímulos sensoriales, como el tacto, el sonido, el movimiento o el equilibrio, para aprender a regular y procesar la información sensorial de manera más efectiva. </li>
                <li>Problemas de integración sensorial: Algunos niños tienen dificultades para integrar y organizar la información sensorial que reciben, lo que puede afectar su capacidad para participar en actividades cotidianas.</li>
                <li>Dificultades en el autocuidado: como vestirse, comer, cepillarse los dientes o usar el baño ,para desarrollar habilidades de autocuidado y fomentar la independencia.</li>
                <li>Necesidades especiales: como trastornos del espectro autista, parálisis cerebral, síndrome de Down u otras condiciones médicas o del desarrollo</li>
              </ul>
            </>
          ),
          image: 'serv_terapia_ocupacional_blank.png'
        }}
        section3={{
          title: 'Profesionales',
          persons: itemData
        }}
      />
    </Box>
  )
}
