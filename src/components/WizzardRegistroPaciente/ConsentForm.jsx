import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Box, Button, CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

// const SITE_KEY = '6LdAwDErAAAAAMntfq1lMZZggms--K45BJE_JFQy'; // Tu clave de sitio v2 (checkbox)
const SITE_KEY = '6Lck2jErAAAAAPqJ463t1EaXqMjlyTO15JMVZSqs';

const ConsentForm = ({ onSubmit, onBack, captchaValue, setCaptchaValue }) => {
  const { register, formState: { errors }, watch, setValue, getValues, handleSubmit } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const handleFormSubmit = async (data) => {
    // if (!captchaValue) {
    //   setCaptchaError('Por favor, verifica que no eres un robot.');
    //   return;
    // }
    setCaptchaError('');
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ 
        mt: 3, 
        p: 3, 
        border: '1px solid #e0e0e0', 
        borderRadius: 2, 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            {...register('aceptaTerminos', { required: 'Debes aceptar los términos y condiciones' })}
            checked={watch('aceptaTerminos') || false}
            onChange={(e) => setValue('aceptaTerminos', e.target.checked)}
          />
        }
        label="Acepto los términos y condiciones de la empresa"
      />
      {errors.aceptaTerminos && <span style={{ color: 'red' }}>{errors.aceptaTerminos.message}</span>}
      
      <FormControlLabel
        control={
          <Checkbox
            checked={watch('autorizaInformacion') || false}
            onChange={(e) => setValue('autorizaInformacion', e.target.checked)}
          />
        }
        label="Autorizo el envío de información comercial"
      />

      <Box sx={{ my: 2 }}>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={value => {
            setCaptchaValue(value);
            setCaptchaError('');
          }}
        />
        {captchaError && <span style={{ color: 'red', display: 'block', marginTop: 8 }}>{captchaError}</span>}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Atrás
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Procesando...' : 'Finalizar'}
        </Button>
      </Box>
    </Box>
  );
};

export default ConsentForm;
