import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Add, ArrowDropDown, Close, ExpandLess, ExpandMore, KeyboardArrowDown, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, Collapse, Container, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar, Typography, alpha, styled } from '@mui/material'
import { pages } from './constants'
import { ThemePalette } from '../../theme/theme';
import { CButton } from '../Button';
import { listServicesAdultos, listServicesInfantil } from '../../pages/constants';
import { Link as RouterLink } from 'react-router-dom';

// function ScrollTop(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (
//       (event.target).ownerDocument || document
//     ).querySelector('#back-to-top-anchor');

//     if (anchor) {
//       anchor.scrollIntoView({
//         block: 'center',
//       });
//     }
//   };

//   return (
//     <Fade in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{ position: 'fixed', bottom: 16, right: 16 }}
//       >
//         {children}
//       </Box>
//     </Fade>
//   );
// }

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export const NavBar = (props) => {

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [showMenuMovil, setShowMenuMovil] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleClick = (event, isMenu) => isMenu ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
  const handleClose = () => setAnchorEl(null);

  const onClickItemMenu = (path) => {
    navigate(path)
    setAnchorEl(null);
    setAnchorElNav(null)

    setMobileOpen(false); // Cierra el menú en móvil
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleServicesToggle = () => setOpenServices(!openServices);

  // const onClickItemMenu = (path) => {
  //   navigate(path);
  //   setMobileOpen(false); // Cierra el menú en móvil
  // };

  return (
    <>
      <CssBaseline />
      {/* <AppBar sx={{ backgroundColor: '#fff', padding: '2px 30px', top: '43px'}} position='absolute'> */}
      <AppBar sx={{ backgroundColor: '#fff', padding: '2px 30px'}} >
        <Container maxWidth="xl" disableGutters sx={{ padding: '0px' }}>
          <Toolbar disableGutters sx={{
            justifyContent: 'space-between'
          }}>
            {/* <Typography noWrap component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}> 
              <img src='/logo-text-short.png' height={48} onClick={() => navigate('/')} />
            </Typography> */}

            <Typography 
              noWrap 
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minWidth: '150px',
                '& img': {
                  display: 'block',
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain'
                }
              }}
            >
              <Box 
                component="img"
                src="/logo-text-short.png"
                alt="Logo Crecemos"
                onClick={() => navigate('/')}
                sx={{
                  cursor: 'pointer'
                }}
              />
            </Typography>

            {/* View Movil */}
            
            {/* <Typography noWrap component="a"
              href="#" sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              <img src='/logo-text-short.png' width={120} height={48} />
            </Typography> */}

            {/* Botón de menú para móviles (cambia entre ☰ y X) */}
            <IconButton 
              onClick={handleDrawerToggle} 
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              {mobileOpen ? <Close /> : <MenuOutlined />}
            </IconButton>

            

            {/* View Desktoop */}            
            <Box 
              sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: '12px', alignItems: 'center' }}
            >
              {pages.map((page) => (
                <div key={page.label}>
                  <CButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleClick(event, page.menu)}
                    sx={{ my: 2, paddingTop: '8px', paddingBottom: '8px', borderRadius: '30px' }}
                    variant={page.background ? 'contained': 'text'}
                    disableElevation
                    endIcon={page.menu && <KeyboardArrowDown />}
                    isOnHoverMenu={page.menu}
                  >
                    {
                      !page.menu ? (
                        <Link to={page.path} style={{ textDecoration: 'none', color: page.background ? ThemePalette.WHITE: ThemePalette.BLACK_MEDIUM, fontWeight: '600'}}>
                          {page.label}
                        </Link>
                      ) : <Typography component='span' fontSize='0.875rem' color={ThemePalette.BLACK_MEDIUM} fontWeight='600'>{page.label}</Typography>
                    }
                  </CButton>
                  {
                    page.menu && (
                      <StyledMenu
                        id="basic-menu"
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {/* <MenuItem onClick={() => onClickItemMenu('/area-infantil-adolescentes')}>Area Infantil y Adolescentes</MenuItem> */}

                        <Box display='flex' gap='10px' margin='20px'>
                          <Box display='flex' flexDirection='column' gap='10px'>
                            <Typography fontWeight='bold' pl='10px' color={ThemePalette.PURPLE_LIGHT} sx={{
                              textDecoration: 'underline', cursor: 'pointer'
                            }} onClick={() => onClickItemMenu(`/area-infantil-adolescentes`)} >Área Infantil y Adolescentes</Typography>
                            <Box display='flex' gap='5px' flexDirection='column'>
                              {
                                listServicesInfantil.map(inf => (
                                  <MenuItem key={inf.id} onClick={() => onClickItemMenu(`${inf.path}`)} sx={{
                                    color: ThemePalette.BLACK_MEDIUM
                                  }}
                                  >{inf.text}</MenuItem>
                                ))
                              }
                            </Box>
                          </Box>

                          <Box display='flex' flexDirection='column' gap='10px'>
                            <Typography fontWeight='bold' pl='10px' color={ThemePalette.PURPLE_LIGHT} sx={{
                              textDecoration: 'underline', cursor: 'pointer'
                            }} onClick={() => onClickItemMenu(`/area-adultos`)}>Área Adultos</Typography>
                            <Box display='flex' gap='5px' flexDirection='column'>
                              {
                                listServicesAdultos.map(inf => (
                                  <MenuItem key={inf.id} onClick={() => onClickItemMenu(`${inf.path}`)} sx={{
                                    color: ThemePalette.BLACK_MEDIUM
                                  }}>{inf.text}</MenuItem>
                                ))
                              }
                            </Box>
                          </Box>
                          
                        </Box>                        
                        {/* <MenuItem onClick={() => onClickItemMenu('/talleres-terapeuticos')}>Talleres Terapeúticos</MenuItem> */}
                      </StyledMenu>
                    )
                  }
                </div>
            ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer para móviles (lado derecho) */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            marginTop: '64px',
            height: 'calc(100vh - 64px)',
            borderTop: '1px solid #ddd',
            width: 300,
            paddingX: 1,
          }
        }}
      >
        <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List sx={{ flexGrow: 1 }}>
            {pages.map(page => (
              page.label !== "Servicios" ? (
                <>
                  <ListItem button key={page.label} onClick={() => onClickItemMenu(page.path)}>
                    <ListItemText primary={page.label} sx={{ textAlign: 'right', pr: 2 }} />
                  </ListItem>
                  <Divider />
                </>
              ) : (
                <>
                  <ListItem button onClick={handleServicesToggle}>
                    <ListItemText primary="Servicios" sx={{ textAlign: 'right', pr: 2, fontWeight: 'bold' }} />
                    {openServices ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openServices} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button onClick={() => onClickItemMenu('/area-infantil-adolescentes')} sx={{ pl: 2, fontWeight: 'bold' }}>
                        <ListItemText primary="Área Infantil y Adolescentes" sx={{ textAlign: 'right', pr: 2, fontWeight: 'bold' }} />
                      </ListItem>
                      {listServicesInfantil.map(service => (
                        <ListItem button key={service.id} onClick={() => onClickItemMenu(service.path)} sx={{ pl: 4 }}>
                          <ListItemText primary={service.text} sx={{ textAlign: 'right', pr: 2 }} />
                        </ListItem>
                      ))}
                      <Divider />
                      <ListItem button onClick={() => onClickItemMenu('/area-adultos')} sx={{ pl: 2 }}>
                        <ListItemText primary="Área Adultos" sx={{ textAlign: 'right', pr: 2, fontWeight: 'bold' }} />
                      </ListItem>
                      {listServicesAdultos.map(service => (
                        <ListItem button key={service.id} onClick={() => onClickItemMenu(service.path)} sx={{ pl: 4 }}>
                          <ListItemText primary={service.text} sx={{ textAlign: 'right', pr: 2 }} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                  <Divider />
                </>
              )
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar 
        id="back-to-top-anchor" 
        sx={{ 
          minHeight: { xs: '20px', sm: '30px' },
          height: { xs: '20px', sm: '30px' }
        }} 
      />
      <Outlet />
      {/* <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop> */}
    </>
  )
}
