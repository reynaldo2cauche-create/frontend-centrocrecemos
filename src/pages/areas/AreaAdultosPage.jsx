import React, { useReducer, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion';
import { FontSize, ThemePalette } from '../../theme/theme'
import { listServices, listServicesAdultos, listServicesInfantil } from '../constants';
import { CButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const HOVER_ACTIVE = "HOVER_ACTIVE"
const HOVER_INACTIVE = "HOVER_INACTIVE"

const BoxExperiences = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

const CBox = styled(Box)(() => {
  return (
    ({
      '&:hover': {
        // backgroundColor: ThemePalette.PURPLE_LIGHT,
        backgroundColor: ThemePalette.SKYBLUE_MEDIUM,
        color: 'green'
        
      },
      '&:hover span': {
        color: ThemePalette.WHITE
      }
    })
  )})
;

const formReducer = (state, action) => {
  switch (action.type) {
    case HOVER_ACTIVE: {
      return {
        options: state.options.map(res => (
          {
            ...res,
            isHover: action.id === res.id
          }
        ))
      }
    }

    case HOVER_INACTIVE: {
      return {
        options: state.options.map(res => (
          {
            ...res,
            isHover: !action.id === res.id
          }
        ))
      }
    }

    default:
      return state
  }
}

export const AreaAdultosPage = () => {
  const navigate = useNavigate();

  const [services, dispatchServices] = useReducer(formReducer, {
    options: listServicesAdultos.map((res) => (
      {
        ...res,
        isHover: false
      }
    ))
  })

  return (
    <Grid container marginTop='20px' p='10px 50px' rowGap='30px'>
      <Grid item xs={12}>
        <Box>
          <Typography 
            component='h2' 
            fontSize={FontSize.TITLE_SECTION} 
            color={ThemePalette.PURPLE_LIGHT} 
            fontWeight='bold' 
            textAlign='center'
          >
            Servicios Adultos
          </Typography>
          <Divider sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT, width: '120px', margin: 'auto' }} />
        </Box>
        <Typography pt='10px' component='div' textAlign='justify'>Contamos con un grupo humano de profesionales con amplia experiencia en prevención, detección e intervención de niños, niñas y adolescentes. Nuestra labor la realizamos en un área de 240mt2, distribuidos estratégicamente, con una infraestructura idónea y con un equipamiento necesario para que las atenciones se lleven a cabo en condiciones óptimas.</Typography>  
      </Grid>
      {/* Servicios */}
      {/* <Box p='35px 50px 41px' component="div" flexDirection="column" display="flex" gap="25px" > */}
      <Grid container justifyContent='center' spacing='20px'>
        {
          services.options.map((res) => (
            <Grid item xs={12} sm={6} md={4} key={res.id} display='flex' flexDirection='column' gap='10px' justifyContent='center' alignItems='center' 
              
            >
              <Box bgcolor={ThemePalette.PURPLE_HARD} padding='10px' borderRadius='20px'>
                
                <img src={res.image} alt={res.title} width='230px'  height='260px' style={{ borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigate(res.path)} />

                <CBox display='flex' gap='10px' alignItems='center' justifyContent='center' bgcolor={ThemePalette.WHITE}
                  margin='auto' borderRadius='35px' padding='0px 10px' sx={{ cursor: 'pointer' }} width='230px'
                  onClick={() => navigate(res.path)} 
                  onMouseEnter={() => (
                    dispatchServices({
                      type: HOVER_ACTIVE,
                      id: res.id
                    })
                  )}
                  onMouseLeave={() => (
                    dispatchServices({
                      type: HOVER_INACTIVE,
                      id: res.id
                    })
                  )}
                >
                  <img src={res.isHover ? res.iconButtonHover : res.iconButton}  width='50px' style={{ color: 'red' }}/>
                  <Typography component='span' fontSize={FontSize.TEXT_BUTTON_AREA_INFANTIL} color={ThemePalette.PURPLE_LIGHT_CARD} fontWeight='bold'
                    textAlign='center'
                  >{res.text}</Typography>
                </CBox>
              </Box>
              

              {/* <Box textAlign='center' pt='10px'>
                <CButton 
                  size="small" 
                  variant='contained' 
                  color='info' 
                  sx={{ p: '10px 25px' }} 
                  onClick={() => navigate('/terapia-lenguaje')}
                  backgroundColor={ThemePalette.SKYBLUE_MEDIUM}
                >{res.title}</CButton>
              
              </Box> */}
            </Grid>  
          ))
        }
      </Grid>
    </Grid>
  )
}
