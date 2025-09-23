import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const LoginModal = ({ open, onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (user === 'crecemos' && pass === 'crecemos123') {
      setError('');
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'secondary.main', textAlign: 'center', fontWeight: 'bold' }}>
        Iniciar Sesión
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={user}
            onChange={e => setUser(e.target.value)}
            sx={{ '& .MuiInputBase-input': { textTransform: 'lowercase' } }}
            autoFocus
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 5, fontWeight: 'bold' }}
            >
              Ingresar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;