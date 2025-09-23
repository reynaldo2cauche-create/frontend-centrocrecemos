import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import { FontSize, ThemePalette } from '../theme/theme'
import { imgsAlianzas, items, itemsMov, listExperiences, listServices, listTestimonios } from './constants'
import { CButton } from '../components/Button';
import { TitleSection } from '../components/TitleSection/TitleSection';
import { TypeTitleSection } from '../constants/TitleSection.constant';
import { AdsClick } from '@mui/icons-material';
import Slider from 'react-slick';
import DialogNotice from '../components/DialogNotice/DialogNotice';

export const BoxCarousel = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    backgroundSize: '100% 100%',
  },
  [theme.breakpoints.up('sm')]: {
    backgroundSize: 'contain',
  }
}));

export const HomePage = () =>  {

  const navigate = useNavigate();
  const theme = useTheme();

  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  const renderItem = (data) =>  (
    <Box position='relative' height='100%' key={data.key}>
      <img  src={data.image} height='100%' width='100%'  />
      {
        data.key !== '1' && (
          <Button color='warning' variant='contained'
            sx={{
              position: 'absolute',
              top: '90%',
              left: '90%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              backgroundColor: '#ffb800',
              borderRadius: '20px',
              textTransform: 'initial',
              display: 'flex',
              gap: '10px',
              width: 'max-content',
              paddingTop: '11px',
              paddingBottom: '11px',
              '&:hover': {
                backgroundColor: '#ffb800',
                opacity: '0.9'
              },
            }}
            onClick={() => {
              console.log('onCLick')
              window.open(data.wspPath, '_blank')
            } }
          >
            {onlySmallScreen ? '' : 'Más Información' }
            <AdsClick onClick={() => console.log('adsclick')} />
          </Button>
        )
      }
      
    </Box>
    
  )

  // NOTICIAS POP UP, POR EL MOMENTO ESTA COMENTADO

  const [openDialogNotice, setOpenDialogNotice] = useState(false)  

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpenDialogNotice(true)
  //   }, 2000);
  // }, []) 
  
  return (
    <>      
      {/* <DialogNotice open={openDialogNotice} onClose={() => setOpenDialogNotice(false)} /> */}
      <Carousel 
        height={onlySmallScreen ? '365px' : '535px'}
        sx={{
          marginTop: '8px',
          ...(onlySmallScreen && {
            '& .MuiIconButton-root': {
              display: 'none !important'
            }
          })
        }}
      >
        {
          onlySmallScreen ? (
            itemsMov.map((item) => renderItem(item))
          ) : (
            items.map((item) => renderItem(item))
          )
        }
      </Carousel>
      

      {/* Servicios */}
      <Box p='15px 50px 41px' component="div" flexDirection="column" display="flex" gap="25px" bgcolor={ThemePalette.PURPLE_LIGHT}>
        
        <TitleSection 
          title='Nuestros servicios'
          classname={TypeTitleSection.PURPLE}
        />

        <Grid container spacing='20px'>
          {
            listServices.map((res) => (
              <Grid item md={4} xs={12} sm={6} key={res.id} >
                <Card sx={{ backgroundColor: ThemePalette.PURPLE_LIGHT_CARD, boxShadow: 'none' }} >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={res.image}
                    sx={{ borderRadius: '30px', width: '100%', height: '100%' }}
                  />
                  <CardContent sx={{ p: '0px', pt: '12px' }}>
                    <Typography gutterBottom component="div" textAlign='center' color={ThemePalette.WHITE} fontSize={FontSize.TITLE_PARAGRAPH}>
                      {res.title}
                    </Typography>
                    <Typography component='p' color={ThemePalette.WHITE} textAlign='center' fontSize={FontSize.PARAGRAPH}>
                      {res.detail}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', p: '0px', pt: '15px'}}>
                    <CButton 
                      size="small" 
                      variant='contained' 
                      color='info' 
                      sx={{ p: '10px 25px' }} 
                      onClick={() => navigate(`${res.path}`)}
                      backgroundColor={ThemePalette.SKYBLUE_MEDIUM}
                    >Más información</CButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>
      
      {/* Consejos o Recomendaciones */}
      <Box p='15px 50px 41px' component="div" flexDirection="column" display="flex" gap="25px">
        <TitleSection 
          title='Recomendaciones'
          classname={TypeTitleSection.WHITE}
        />

        <Grid container spacing='20px'>
          {
            listExperiences.map((res) => (
              <Grid item md={4} xs={12} sm={6} key={res.id}>
                <Card sx={{ boxShadow: 'none' }} key={res.id}>
                  <CardMedia
                    component="iframe"
                    alt="green iguana"
                    height="202"
                    src={res.path}
                    sx={{ borderRadius: '30px' }}
                  />
                  <CardContent sx={{ p: '0px', pt: '12px' }}>
                    <Typography color={ThemePalette.BLACK_MEDIUM} textAlign='justify' fontSize={FontSize.PARAGRAPH}>
                      {res.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      {/* HISTORIAS */}
      <Box p='15px 50px 41px' component="div" flexDirection="column" display="flex" gap="25px" bgcolor={ThemePalette.PURPLE_LIGHT}>
        <TitleSection 
          title='Testimonios'
          classname={TypeTitleSection.PURPLE}
        />

        <Grid container justifyContent='center'>
          {listTestimonios.map((res) => (
            <Grid item md={4} xs={12} sm={6} key={res.id}>
              <Card 
                sx={{ 
                  backgroundColor: '#ca7fc6',
                  boxShadow: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ p: 1 }}>
                  <CardMedia
                    component="iframe"
                    title={`Testimonio ${res.id}`}
                    height="250"
                    src={res.path}
                    sx={{ 
                      borderRadius: '15px',
                      border: 'none',
                    }}
                  />
                </Box>
                
                <CardContent 
                  sx={{ 
                    p: 2,
                    flex: 1,
                    background: 'linear-gradient(145deg, #d690d2 0%, #ca7fc6 100%)'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    color={ThemePalette.WHITE} 
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mb: 1
                    }}
                  >
                    🌟 Testimonio real de una madre agradecida 🌟
                  </Typography>
                  
                  <Typography 
                    color={ThemePalette.WHITE} 
                    sx={{ 
                      textAlign: 'justify',
                      fontSize: FontSize.PARAGRAPH,
                      lineHeight: 1.6,
                      '& strong': {
                        color: '#fff',
                        fontWeight: 600
                      }
                    }}
                  >
                    La Sra. Sofía, mamá de <strong>Benja</strong>, nos cuenta cómo el acompañamiento y la atención del Centro de Terapias Crecemos han sido claves en el avance y desarrollo de su pequeño. 
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 1 }}>
                      💙 👦
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1,
                        fontStyle: 'italic',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.9)'
                      }}
                    >
                      Una historia que inspira y reafirma nuestro compromiso con cada familia.
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Alianzas */}
      <Box p='15px 50px' component="div" display="flex" flexDirection="column" gap="20px">
        <TitleSection 
          title='Alianzas y Convenios'
          classname={TypeTitleSection.WHITE}
        />
        <Typography component="p" textAlign='justify'>
          Gracias a nuestros <strong>convenios con universidades e instituciones, </strong>
          podemos garantizar una mayor viabilidad en la realización de <strong>prácticas
          profesionales y especializaciones</strong> enfocadas a mejorar su formación,
          brindando terapias actualizadas y efectivas. Asi mismo nuestras alianzas
          con otras instituciones nos permite una adecuada derivación de nuestros
          pacientes.
        </Typography>
        <div className="slider-container">
          <Slider 
            {
              ...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 5,              
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
              }
            }
          >
            {
              imgsAlianzas.map((alianza) => (
                <Paper component="div"  sx={{
                  padding: '10px 30px', 
                  boxShadow: 'none'
                }} >
                  <img src={alianza.image} alt={alianza.title} height="160px" width='100%'/>
                  <Typography textAlign='center' color={ThemePalette.PURPLE_LIGHT} fontWeight='bold' fontSize='15px'>{alianza.title}</Typography>
                </Paper>
              ))
            }
          </Slider>
        </div>
      </Box>
    </>
  )
}
