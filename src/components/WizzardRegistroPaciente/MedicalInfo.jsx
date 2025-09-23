import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const MedicalInfo = ({ onNext, onBack }) => {
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useFormContext();

  const onSubmit = (data) => {
    console.log('Datos médicos enviados:', data);
    onNext(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ 
        mt: 3, 
        p: 4, 
        borderRadius: 2, 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#fff',
      }}
    >
      
      {/* Diagnósitco Médico */}
      <TextField
        label="Diagnósitco Médico"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 3 }}
        {...register('diagnosticoMedico', { required: 'Campo obligatorio' })}
        error={!!errors.diagnosticoMedico}
        helperText={errors.diagnosticoMedico?.message}
        value={watch('diagnosticoMedico') || ''}
        onChange={e => setValue('diagnosticoMedico', e.target.value.toUpperCase())}
        inputProps={{
          style: { textTransform: 'uppercase' }
        }}
      />

      {/* Alergias conocidas */}
        <TextField
          label="Alergias conocidas"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
          {...register('alergias', { required: 'Campo obligatorio' })}
          error={!!errors.alergias}
          helperText={errors.alergias?.message}
          value={watch('alergias') || ''}
          onChange={e => setValue('alergias', e.target.value.toUpperCase())}
          inputProps={{
            style: { textTransform: 'uppercase' }
          }}
        />

      {/* Medicamentos actuales */}
      <TextField
        label="Medicamentos actuales"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 3 }}
        {...register('medicamentos', { required: 'Campo obligatorio' })}
        error={!!errors.medicamentos}
        helperText={errors.medicamentos?.message}
        value={watch('medicamentos') || ''}
        onChange={e => setValue('medicamentos', e.target.value.toUpperCase())}
        inputProps={{
          style: { textTransform: 'uppercase' }
        }}
      />

      {/* Botones de navegación */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onBack}
          sx={{ textTransform: 'none', px: 4 }}
        >
          Atrás
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none', px: 4 }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default MedicalInfo;
