import { useEffect, useState } from "react"
import axios from "axios"
import { Box, Divider, Grid, Paper, Typography } from "@mui/material"
import { FontSize, ThemePalette } from "../theme/theme"
import { BoxCarousel } from "./HomePage"
import { useNavigate } from "react-router-dom"

export const UsPage = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const renderItem = (data) =>  (    
    <BoxCarousel key={data.title} sx={{
      backgroundImage: `url(${data.image})`,
      height:'100vh',
      // backgroundPosition: 'center',
      width: '100%',
      backgroundRepeat: 'no-repeat'
    }} />
  )

  useEffect(() => {
    // Hacer solicitud a la API de NestJS
    axios.get('https://crecemos.com.pe/backend_centroterapias/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
      {/* Nuestra Historia */}      
      <Grid container p='35px 50px 41px' rowSpacing='20px' columnSpacing='40px' sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT_CARD }}>

        <Grid item xs={12} md={6} display='flex' justifyContent='center'>
          <img src='/terapias.jpg' width='100%' />
        </Grid>
        <Grid item xs={12} md={6} component='div' display='flex' flexDirection='column' gap='60px'>
          {/* <TitleSection 
            title='Nuestra Historia'
            classname={TypeTitleSection.WHITE}
          />   */}
          <Box>
            <Typography 
              component='h2' 
              fontSize={FontSize.TITLE_SECTION} 
              color={ThemePalette.WHITE} 
              fontWeight='bold' 
              textAlign='center'
            >
              NUESTRA HISTORIA
            </Typography>
            <Divider sx={{ backgroundColor: ThemePalette.WHITE, width: '150px', margin: 'auto' }} />
          </Box>
          
          <Typography 
            component='p' 
            textAlign='justify' 
            fontSize={FontSize.PARAGRAPH} 
            color={ThemePalette.WHITE}
            >
              Somos una institución que desde su fundación en
              el 2016 ha logrado una trayectoria exitosa con
              progreso en beneficio de todos sus pacientes.
              Nos hemos especializado en brindar terapias de
              rehabilitación para niños, adolescentes y adultos,
              teniendo hasta el momento más de <strong>2,000
              pacientes atendidos y más de 30 mil sesiones de
              terapia realizadas.</strong> Nos caracteriza una atención confiable con
              <strong>profesionales capacitados y actualizados</strong> en cada
              área que te brindan una <strong>terapia efectiva y sobre
              todo un trato humano y cálido.</strong>
          </Typography>         
        </Grid>
      </Grid>      

      {/* <Grid container marginTop='20px'>
        <Grid item xs={6} component='div' display='flex' flexDirection='column' gap='25px' justifyContent='center'>
          <Typography component='h2' fontSize='26px' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold'>CONOCE NUESTRA HISTORIA</Typography>
          <Typography component='p'>Somos una institución de salud especializada en el diagnóstico y tratamiento de trastornos del neurodesarrollo y discapacidad infantil. Tenemos 35 años de experiencia, más de 100,000 niños atendidos y 5 millones de consultas y terapias realizadas.</Typography>          
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='center'>
          <img src='/terapias.jpg' width={570} height={321} />
        </Grid>
        
      </Grid> */}

      <Grid container p='10px 50px 41px' columnSpacing='50px' rowGap='30px' >

        {/* <Grid item xs={12} md={6}> */}
        <Grid item xs={12} md={6} rowSpacing='10px' display='flex' flexDirection='column'>

          <Box display='flex' justifyContent='center'>
            <img src='/mision.jpg' width={220} />
          </Box>
          
          <Box display='flex' flexDirection='column' gap='5px'>
            <Typography component='h2' fontSize={FontSize.TITLE_SECTION} color={ThemePalette.PURPLE_LIGHT} fontWeight='bold' textAlign='center'>Misión</Typography>
            <Typography component='p' textAlign='center' fontSize={FontSize.PARAGRAPH} padding='0px 50px'>Brindar rehabilitación terapéutica integral a niños y adultos mediante terapias efectivas con profesionales actualizados en cada área.</Typography>
          </Box>
          
        </Grid>
        <Grid item xs={12} md={6} rowSpacing={4} display='flex' flexDirection='column' gap='10px'>
          <Box display='flex' justifyContent='center'>
            <img src='/vision.jpg' width={220} height={220} />
          </Box>

          <Box display='flex' flexDirection='column' gap='5px'>
            <Typography component='h2' fontSize={FontSize.TITLE_SECTION} color={ThemePalette.PURPLE_LIGHT} fontWeight='bold' textAlign='center'>Visión</Typography>
            <Typography component='p' textAlign='center' fontSize={FontSize.PARAGRAPH} padding='0px 50px'>Ser la institución líder e innovadora que logre brindar tratamiento terapéutico a niños y adultos en Lima Norte.</Typography>
          </Box>
        </Grid>
        
        {/* </Grid>         */}
        

        {/* <Grid item xs={12} md={6} >
          <Typography component='h2' fontSize={FontSize.TITLE_SECTION} color={ThemePalette.PURPLE_LIGHT} fontWeight='bold' textAlign='center'>+2 años de servicio</Typography>
          <Typography component='p' textAlign='justify' fontSize={FontSize.PARAGRAPH}>Nos sentimos comprometidos con nuestros clientes, trabajadores, proveedores, la sociedad y el medio ambiente. Este modelo de empresa es el que imponemos y vivimos cada día</Typography>
          <CButton 
            size="small" 
            variant='contained' 
            color='info' 
            sx={{ p: '10px 25px', display: 'flex', justifyContent: 'center' }} 
            sxDiv={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} 
            onClick={() => navigate('/contactanos')}
            backgroundColor={ThemePalette.PURPLE_LIGHT}
          >Contáctanos</CButton>
        </Grid> */}
      </Grid>

      
    </>
  )
  
}
