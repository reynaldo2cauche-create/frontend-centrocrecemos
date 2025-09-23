import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Add, ArrowDropDown, KeyboardArrowDown, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, Container, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, alpha, styled } from '@mui/material'
import { pages } from './constants'
import { ThemePalette } from '../../theme/theme';
import { CButton } from '../Button';
import { listServicesAdultos, listServicesInfantil } from '../../pages/constants';

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
  };

  return (
    <>
      <CssBaseline />
      {/* <AppBar sx={{ backgroundColor: '#fff', padding: '2px 30px', top: '43px'}} position='absolute'> */}
      <AppBar sx={{ backgroundColor: '#fff', padding: '2px 30px'}} >
        <Container maxWidth="xl" disableGutters sx={{ padding: '0px' }}>
          <Toolbar disableGutters sx={{
            justifyContent: 'space-between'
          }}>
            <Typography noWrap component="a"
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
            </Typography>

            {/* View Movil */}
            
            <Typography noWrap component="a"
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
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', maxWidth: 'auto' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#a34292"
              >
                <MenuOutlined />
              </IconButton>
              <Menu    
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'none',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'none',
                }}
                marginThreshold={0}
                PaperProps={{
                  style: {
                    width: "70%",
                    maxWidth: "100%",
                    height: '100%',
                    backgroundColor: ThemePalette.PURPLE_LIGHT_CARD
                  }
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
                
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} 
                    sx={{ display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-start', 
                      borderBottom: `1px solid ${ Number(page.key) === pages.length ? 'none': '#c9c0c0' }`,
                      justifyContent: 'center' 
                    }}
                  >
                    {
                      page.background ? (
                        <CButton
                        variant={page.background ? 'contained': 'text'}
                        backgroundColor={ThemePalette.SKYBLUE_MEDIUM}
                        sx={{
                          borderRadius: '30px',
                          marginTop: '10px'
                        }}
                        >
                          <Link to={page.path} onClick={handleCloseNavMenu}  style={{ textDecoration: 'none', color: '#fef6f6'}}>{page.label}</Link>
                        </CButton>
                      ) : (
                        <Typography fontWeight='bold' textAlign="center"  display='flex' alignItems='center' width='100%' justifyContent='space-between'>
                          {

                            !page.menu ? (
                              <Link to={page.path} onClick={handleCloseNavMenu}  style={{ textDecoration: 'none', color: '#fef6f6'}}>{page.label}</Link>
                            ) : (
                              <>
                                <Typography color='#fef6f6' fontWeight='bold' >{page.label}</Typography>
                                <IconButton                          
                                // onClick={() => setShowMenuMovil(true)}
                                onClick={() => setShowMenuMovil(!showMenuMovil)}
                                sx={{
                                  color: '#fef6f6'
                                }}
                                >
                                  <ArrowDropDown />
                                </IconButton>
                              </>
                            )
                          }

                          
                          
                        </Typography>
                      )
                    }
                    { page.menu && 
                        showMenuMovil && (
                          <Box display='flex' flexDirection='column' gap='10px' width='100%' pl='10px'>
                            <Typography borderBottom='1px solid #c9c0c0' color='#fef6f6' fontWeight='600' onClick={() => onClickItemMenu(`/area-infantil-adolescentes`)}>Área Infantil y Adolescentes</Typography>
                            <Typography color='#fef6f6' fontWeight='600' onClick={() => onClickItemMenu(`/area-adultos`)}>Área Adultos</Typography>
                          </Box>    
                        )
                      }
                  </MenuItem>
                ))}
              </Menu>
            </Box>

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
      <Toolbar id="back-to-top-anchor" />
      <Outlet />
      {/* <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop> */}
    </>
  )
}
