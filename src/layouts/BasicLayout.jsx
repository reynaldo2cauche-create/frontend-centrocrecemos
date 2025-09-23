
import { NavBar } from '../components/NavBar/NavBar'
import { Footer } from '../components/Footer/Footer';
import { Fab, styled } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { ScrollTop } from '../components/ScrollTop/ScrollTop';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

const BoxCarousel = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    backgroundSize: '100% 100%',
  },
  [theme.breakpoints.up('sm')]: {
    backgroundSize: 'contain',
  }
}));

const renderItem = (data) =>  (
  <BoxCarousel key={data.title} sx={{
    backgroundImage: `url(${data.image})`,
    height: '48px',
    // height:'100vh',
    // backgroundPosition: 'center',
    width: '100%',
    backgroundRepeat: 'no-repeat',
  }} />
)

const items = [
  {
    title: 'Image 1',
    image: '/noticias-1.png'
  },
  // {
  //   title: 'Image 2',
  //   image: '/img1_noticia.jpg'
  // },
  // {
  //   title: 'Image 3',
  //   image: '/img2_noticia.jpg'
  // },
  // {
  //   title: 'Image 4',
  //   image: '/img1_noticia.jpg'
  // },
]

export const BasicLayout = () => (
  <>
    {/* <Carousel height='43px' indicators={false} >
      {
        items.map( (item) => renderItem(item) )
      }
    </Carousel> */}

    <NavBar />
    <Footer />
    <Fab aria-label='Add' sx={fabStyle} color='success' onClick={() => window.open('https://api.whatsapp.com/send?phone=+51957064401&text=Hola%20%F0%9F%91%8B,%20vengo%20de%20la%20p%C3%A1gina%20web%20del%20Centro%20Crecemos%20%F0%9F%8C%9F.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20terapias%20%F0%9F%A7%A9.', '_blank')}>
      <WhatsApp fontSize='large' />
    </Fab>
    <ScrollTop />
  </>
)
