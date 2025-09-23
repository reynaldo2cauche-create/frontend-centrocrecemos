import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'

export const DialogRegistroPaciente = ({
  open = false,
  handleClose = () => {}
}) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Registro de Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight='bold'>
            ** Datos Personales del Paciente
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullname"
            name="fullname"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Fecha de Nacimiento"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Documento de Identidad"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Sexo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Dirección Completa"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Telefono de contacto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
          />
          <br /><br />
          <DialogContentText fontWeight='bold'>
            ** Información Adicional
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="fullname"
            name="fullname"
            label="Motivo de consulta"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Servicios requeridos"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Referido por"
            type="text"
            fullWidth
            variant="standard"
          />        

          <br /><br />
          <DialogContentText fontWeight='bold'>
            ** Datos del Responsable (si es menor de edad)
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="fullname"
            name="fullname"
            label="Nombre completo del responsable"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Relación con el paciente"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Teléfono de contacto del responsable"
            type="text"
            fullWidth
            variant="standard"
          />     
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Correo electrónico del responsable"
            type="text"
            fullWidth
            variant="standard"
          />        

        </DialogContent>

        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type="button" onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
  )
}
