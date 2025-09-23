import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MenuOutlined, Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import { AppBar, Box, Container, CssBaseline, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { pages } from './constants';
import { ThemePalette } from '../../theme/theme';
import { CButton } from '../Button';
import { listServicesAdultos, listServicesInfantil } from '../../pages/constants';

export const NavBar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleServicesToggle = () => setOpenServices(!openServices);

  const onClickItemMenu = (path) => {
    navigate(path);
    setMobileOpen(false); // Cierra el menú en móvil
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: mobileOpen ? 'rgba(255, 255, 255, 0.9)' : '#fff', // Opacidad cuando el menú está abierto
          padding: '2px 30px',
          position: 'fixed',
          transition: 'background-color 0.3s ease-in-out', // Animación suave
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ padding: '0px' }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography 
              noWrap 
              component="a"
              href="#" 
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img src='/logo-text-short.png' height={48} onClick={() => navigate('/')} />
            </Typography>

            {/* Botón de menú para móviles (cambia entre ☰ y X) */}
            <IconButton 
              onClick={handleDrawerToggle} 
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              {mobileOpen ? <Close /> : <MenuOutlined />}
            </IconButton>

            {/* Menú para escritorio */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: '12px', alignItems: 'center' }}>
              {pages.map((page) => (
                <div key={page.label}>
                  <CButton
                    onClick={() => onClickItemMenu(page.path)}
                    sx={{ my: 2, paddingTop: '8px', paddingBottom: '8px', borderRadius: '30px' }}
                    variant={page.background ? 'contained' : 'text'}
                    disableElevation
                  >
                    <Link to={page.path} style={{ textDecoration: 'none', color: page.background ? ThemePalette.WHITE : ThemePalette.BLACK_MEDIUM, fontWeight: '600' }}>
                      {page.label}
                    </Link>
                  </CButton>
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
            marginTop: '64px', // Ajusta según la altura de tu AppBar
            height: 'calc(100vh - 64px)', // Ajusta la altura para que no cubra la cabecera
            borderTop: '1px solid #ddd', // Línea separadora con la cabecera
            width: 280, // Ancho del Drawer
          }
        }}
      >
        <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Lista de opciones */}
          <List sx={{ flexGrow: 1 }}>
            {pages.map(page =>
              page.label !== "Servicios" ? (
                <ListItem button key={page.label} onClick={() => onClickItemMenu(page.path)}>
                  <ListItemText 
                    primary={page.label} 
                    sx={{ textAlign: 'right', pr: 2 }} // Alinea el texto más a la derecha
                  />
                </ListItem>
              ) : (
                <div key="services">
                  <ListItem button onClick={handleServicesToggle}>
                    <ListItemText primary="Servicios" sx={{ textAlign: 'right', pr: 2 }} />
                    {openServices ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  {/* Submenú de Servicios */}
                  <Collapse in={openServices}>
                    <List component="div" disablePadding>
                      {/* Área Infantil y Adolescentes */}
                      <ListItem button onClick={() => onClickItemMenu('/area-infantil-adolescentes')} sx={{ pl: 2 }}>
                        <ListItemText primary="Área Infantil y Adolescentes" sx={{ fontWeight: 'bold', textAlign: 'right', pr: 2 }} />
                      </ListItem>
                      {listServicesInfantil.map(service => (
                        <ListItem button key={service.id} onClick={() => onClickItemMenu(service.path)} sx={{ pl: 4 }}>
                          <ListItemText primary={service.text} sx={{ textAlign: 'right', pr: 2 }} />
                        </ListItem>
                      ))}

                      {/* Área Adultos */}
                      <ListItem button onClick={() => onClickItemMenu('/area-adultos')} sx={{ pl: 2 }}>
                        <ListItemText primary="Área Adultos" sx={{ fontWeight: 'bold', textAlign: 'right', pr: 2 }} />
                      </ListItem>
                      {listServicesAdultos.map(service => (
                        <ListItem button key={service.id} onClick={() => onClickItemMenu(service.path)} sx={{ pl: 4 }}>
                          <ListItemText primary={service.text} sx={{ textAlign: 'right', pr: 2 }} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              )
            )}
          </List>
        </Box>
      </Drawer>

      <Toolbar id="back-to-top-anchor" />
      <Outlet />
    </>
  );
};
