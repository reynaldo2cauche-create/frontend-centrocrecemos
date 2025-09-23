// FormularioModal.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Email, Phone, FileUpload } from "@mui/icons-material";
import axios from "axios";
import { ThemePalette } from "../../theme/theme";

const FormularioTrabaja = ({ modalTitle = "Formulario de Postulación", onCloseModal, cargoPostular = "" }) => {
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Controlar la apertura del Snackbar
  const [responseMessage, setResponseMessage] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    if (file) formData.append("documento", file);

    try {
      const response = await axios.post("https://crecemos.com.pe/backend_centroterapias/postulaciones", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Si la respuesta es exitosa, muestra el mensaje de éxito
      setResponseMessage('Postulación guardada con éxito. ¡Gracias por postularte!');
      setResponseSuccess(true);
    } catch (error) {
      console.error("Error al enviar la postulación", error);
      setResponseMessage('Hubo un error al guardar la postulación. Intenta nuevamente.');
      setResponseSuccess(false);  
    }
    console.log('hola')
    setOpenSnackbar(true);
    // Cerrar el modal después de 2 segundos (cuando el Snackbar se está mostrando)
    setTimeout(() => {
      onCloseModal();  // Llama a la función para cerrar el modal
    }, 1000);  // Cierra el modal después de 2 segundos
  };

  return (
    <>
    <Dialog open onClose={onCloseModal} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: ThemePalette.BLACK_MEDIUM,
        }}
      >
        {modalTitle}
      </DialogTitle>
      <DialogContent >
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#555",
            marginBottom: 2,
            fontSize: "1rem",
          }}
        >
          Bienvenido a CentroCrecemos. Deje sus datos para poder contactarlo. Gracias por la postulación.
        </Typography>
        <Container
          sx={{
            padding: 3,
            backgroundColor: "#fafafa",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Campo Nombre */}
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  {...register("nombre", { required: "Este campo es obligatorio" })}
                  error={!!errors.nombre}
                  helperText={errors.nombre ? errors.nombre.message : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>

              {/* Campo Apellido */}
              <Grid item xs={12}>
                <TextField
                  label="Apellido"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  {...register("apellido", { required: "Este campo es obligatorio" })}
                  error={!!errors.apellido}
                  helperText={errors.apellido ? errors.apellido.message : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>

              {/* Campo Email */}
              <Grid item xs={12}>
                <TextField
                  label="Correo electrónico"
                  fullWidth
                  variant="outlined"
                  type="email"
                  color="primary"
                  {...register("email", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Email no válido",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>

              {/* Campo Teléfono */}
              <Grid item xs={12}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  variant="outlined"
                  type="tel"
                  color="primary"
                  {...register("telefono")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>

              {/* Campo Oculto: Cargo Postulado */}
              <input
                type="hidden"
                value={cargoPostular}
                {...register("cargo_postulado", { required: "Este campo es obligatorio" })}
              />

              {/* Campo de Cargar Archivos */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    backgroundColor: "#1976d2",
                    borderRadius: 3,
                    padding: 1,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  <FileUpload sx={{ marginRight: 1 }} />
                  Subir Documento
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>
                {file && (
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: 1,
                      textAlign: "center",
                      color: "#333",
                      fontStyle: "italic",
                    }}
                  >
                    Archivo seleccionado: {file.name}
                  </Typography>
                )}
              </Grid>

              {/* Botón de Enviar */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}  // Deshabilitar el botón mientras se envía el formulario
                    sx={{
                      padding: "12px 30px",
                      borderRadius: "50px",
                      fontWeight: "bold",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                    }}
                  >
                    {isSubmitting ? (  // Muestra el spinner mientras el formulario está enviando
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                      "Enviar Postulación"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
    </Dialog>

    {/* Snackbar para mostrar el mensaje de éxito o error */}
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}  // Se cierra automáticamente después de 6 segundos
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{
        vertical: 'top',  // Parte superior de la pantalla
        horizontal: 'right',  // Parte derecha de la pantalla
      }}
  >
    <Alert
      onClose={() => setOpenSnackbar(false)}
      severity={responseSuccess ? "success" : "error"}
      sx={{ width: '100%' }}
    >
      {responseMessage}
    </Alert>
  </Snackbar>
  </>

  );
};

export default FormularioTrabaja;
