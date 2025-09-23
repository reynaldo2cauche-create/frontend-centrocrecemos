import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Snackbar, Alert } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import PersonalDataForm from './PersonalDataForm';
import AdditionalInfo from './AdditionalInfo';
import MedicalInfo from './MedicalInfo';
import ConsentForm from './ConsentForm';
import { createPaciente } from '../../services/pacienteService';
// import PersonalDataForm from './PersonalDataForm';
// import ContactDataForm from './ContactDataForm';
// import MedicalDataForm from './MedicalDataForm';
// import LifestyleForm from './LifestyleForm';
// import PsychologicalHistoryForm from './PsychologicalHistoryForm';

const WizardRegistroPaciente = ({ onClose, isPageView = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formData, setFormData] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  // Inicializamos el formulario con valores por defecto
  const methods = useForm({
    defaultValues: {
      // Datos Personales
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: '',
      tipoDocumento: '',
      numeroDocumento: '',
      sexo: '',
      distrito: '',
      direccion: '',
      celular: '',
      celular2: '',
      correo: '',
      // Información Adicional
      isResponsibleRequired: false,
      motivoConsulta: '',
      serviciosRequeridos: '',
      referidoPor: '',
      responsableNombre: '',
      responsableRelacion: '',
      responsableTelefono: '',
      responsableEmail: '',
      // Información Médica 
      diagnosticoMedico: '',
      medicamentos: '',
      alergias: '',
      // Consentimiento
      aceptaTerminos: false,
      autorizaInformacion: false
    }
  });

  const handleBack = () => {
    console.log('handleBack');
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    // Validar documento antes de continuar
    const currentValues = methods.getValues();
    const tipoDocumento = currentValues.tipoDocumento;
    const numeroDocumento = currentValues.numeroDocumento;

    // Validar longitud del documento según el tipo
    if (tipoDocumento === '1') { // DNI
      if (!numeroDocumento || numeroDocumento.length !== 8) {
        handleSnackbar({
          open: true,
          message: 'El DNI debe tener exactamente 8 dígitos',
          severity: 'error'
        });
        return;
      }
    } else if (tipoDocumento === '3') { // Carnet Extranjería
      if (!numeroDocumento || numeroDocumento.length < 9 || numeroDocumento.length > 12) {
        handleSnackbar({
          open: true,
          message: 'El Carnet de Extranjería debe tener entre 9 y 12 dígitos',
          severity: 'error'
        });
        return;
      }
    }

    // Si pasa la validación, continuar al siguiente paso
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (data) => {
    console.log('data', data);
    setFormData(data);
    setOpenConfirmDialog(true);
  };

  const handleConfirmSubmit = async (data) => {
    try {
      setLoading(true);
      // Calcular edad para saber si es menor de edad
      const calcularEdad = (fecha) => {
        if (!fecha) return null;
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
          edad--;
        }
        return edad;
      };
      const edad = calcularEdad(data.fechaNacimiento);
      const esMenor = edad !== null && edad < 18;

      // Verificar si es terapia de pareja
      const esTerapiaPareja = data.serviciosRequeridos === 8; // ID de Terapia de Pareja

      const payload = {
        // 📋 DATOS DEL PACIENTE PRINCIPAL
        paciente: {
          nombres: data.nombre,
          apellido_paterno: data.apellidoPaterno,
          apellido_materno: data.apellidoMaterno,
          fecha_nacimiento: data.fechaNacimiento,
          tipo_documento_id: parseInt(data.tipoDocumento),
          numero_documento: data.numeroDocumento,
          sexo_id: parseInt(data.sexo),
          distrito_id: parseInt(data.distrito),
          direccion: data.direccion,
          celular: data.celular,
          celular2: data.celular2,
          correo: data.correo,
          diagnostico_medico: data.diagnosticoMedico,
          alergias: data.alergias,
          medicamentos_actuales: data.medicamentos
        },

        // 🏥 INFORMACIÓN DEL SERVICIO
        servicio: {
          servicio_id: parseInt(data.serviciosRequeridos),
          motivo_consulta: data.motivoConsulta,
          referido_por: data.referidoPor
        },

        // 👨‍👩‍👧‍👦 INFORMACIÓN DEL RESPONSABLE (solo si es menor)
        responsable: esMenor ? {
          nombre: data.responsableNombre,
          apellido_paterno: data.responsableApellidoPaterno,
          apellido_materno: data.responsableApellidoMaterno,
          tipo_documento_id: data.responsableTipoDocumento,
          numero_documento: data.responsableNumeroDocumento,
          relacion_id: parseInt(data.responsableRelacion),
          telefono: data.responsableTelefono,
          email: data.responsableEmail
        } : null,

        // 💑 INFORMACIÓN DE LA PAREJA (solo si es terapia de pareja)
        pareja: esTerapiaPareja ? {
          nombres: data.parejaNombres,
          apellido_paterno: data.parejaApellidoPaterno,
          apellido_materno: data.parejaApellidoMaterno,
          tipo_documento_id: data.parejaTipoDocumento,
          numero_documento: data.parejaNumeroDocumento,
          celular: data.parejaCelular,
          direccion: data.parejaDireccion,
          email: data.parejaEmail
        } : null,

        // ✅ CONSENTIMIENTOS
        consentimientos: {
          acepta_terminos: data.aceptaTerminos,
          acepta_info_comercial: data.autorizaInformacion
        },

        // 🔐 METADATOS
        metadata: {
          recaptchaToken: captchaValue,
          user_id: 0
        }
      };

      console.log('Payload enviado:', payload);
      const response = await createPaciente(payload);
      setOpenSuccessDialog(true); // Mostrar modal de éxito
      // Limpiar el formulario y reiniciar el wizard después de 2 segundos
      setTimeout(() => {
        methods.reset();
        setActiveStep(0);
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
        setOpenSuccessDialog(false);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar el paciente:', error);
      // Aquí podrías mostrar un modal de error si lo deseas
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbar = ({ open, message, severity }) => {
    setOpenSnackbar(open);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ 
        width: '100%',
        maxWidth: isPageView ? '1200px' : '100%',
        margin: isPageView ? '0 auto' : '0',
        p: isPageView ? 3 : 0
      }}>
        {/* <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{
            mb: 4,
            '& .MuiStepLabel-label': {
              fontSize: isPageView ? '1rem' : '0.875rem'
            }
          }}
        >
          {['Datos Personales', 'Información Adicional', 'Información Médica', 'Consentimiento'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper> */}

        <Box
          sx={{
            width: '100%',
            overflowX: { xs: 'auto', sm: 'visible' },
            mb: 4,
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              width: '100%',
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1.05rem' },
                whiteSpace: 'normal', // Permite salto de línea
                textAlign: 'center',  // Centra el texto debajo del icono
                lineHeight: 1.2,
                maxWidth: { xs: 80, sm: 140 }, // Limita el ancho del label
                mx: 'auto',
              },
              '& .MuiStep-root': {
                flex: 1,
              },
            }}
          >
            {[
              'Datos Paciente',
              'Información Adicional',
              'Información Médica',
              'Consentimiento',
            ].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          </Box>

        <Box sx={{ 
          mt: 4,
          backgroundColor: isPageView ? 'transparent' : 'white',
          borderRadius: isPageView ? 0 : 2,
          boxShadow: isPageView ? 'none' : '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {activeStep === 0 && <PersonalDataForm onNext={handleNext} setSnackbar={handleSnackbar} />}
          {activeStep === 1 && <AdditionalInfo onNext={handleNext} onBack={handleBack} />}
          {activeStep === 2 && <MedicalInfo onNext={handleNext} onBack={handleBack} />}
          {activeStep === 3 && <ConsentForm onSubmit={handleConfirmSubmit} onBack={handleBack} captchaValue={captchaValue} setCaptchaValue={setCaptchaValue} />}
        </Box>

        {/* Modal de éxito */}
        <Dialog
          open={openSuccessDialog}
          onClose={() => setOpenSuccessDialog(false)}
          aria-labelledby="success-dialog-title"
          aria-describedby="success-dialog-description"
        >
          <DialogTitle id="success-dialog-title" sx={{ textAlign: 'center' }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              ¡Registro exitoso!
            </Box>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            El paciente fue registrado correctamente.
          </DialogContent>
        </Dialog>
      </Box>
      
      {/* Snackbar para mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default WizardRegistroPaciente;

