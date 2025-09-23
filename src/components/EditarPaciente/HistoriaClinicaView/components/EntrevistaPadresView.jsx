import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Save,
  FamilyRestroom,
  Description,
  Edit,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { calcularEdad } from '../../../../utils/date';
import { guardarEntrevistaPadres, obtenerEntrevistaPadres, actualizarEntrevistaPadres } from '../../../../services/entrevistaPadresService';
import { getGradosEscolares, getAtenciones, getRelacionPadres, getGeneros, getOcupaciones } from '../../../../services/catalogoService';

const EntrevistaPadresView = ({ paciente, user }) => {
  const [entrevistaPadres, setEntrevistaPadres] = useState({
    fecha: new Date().toISOString().split('T')[0],
    nombrePaciente: paciente?.nombres + ' ' + paciente?.apellido_paterno + ' ' + paciente?.apellido_materno || '',
    lugarNacimiento: '',
    fechaNacimiento: paciente?.fecha_nacimiento || '',
    edad: paciente?.edad?.toString() || '',
    sexo: paciente?.sexo || '',
    escolaridad: '',
    cantidadHermanos: '',
    hermanos: [],
    relacionEntrePadres: '',
    detalleRelacionPadres: '',
    tiempoJuego: '',
    tiempoDispositivos: '',
    antecedentesFamiliares: '',
    antecedentesMedicos: '',
    antecedentesPsiquiatricos: '',
    antecedentesToxicologicos: '',
    antecedentesPrenatales: '',
    desarrolloMotor: '',
    desarrolloLenguaje: '',
    alimentacion: '',
    sueno: '',
    controlEsfinteres: '',
    antecedentesMedicosNino: '',
    antecedentesEscolares: '',
    relacionPares: '',
    expresionEmocional: '',
    relacionAutoridad: '',
    juegosPreferidos: '',
    actividadesFavoritas: '',
    recomendaciones: ''
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [entrevistaExistente, setEntrevistaExistente] = useState(null);
  const [expandedEntrevista, setExpandedEntrevista] = useState(false);
  const [editando, setEditando] = useState(false);
  const [mostrarAgregarFamiliar, setMostrarAgregarFamiliar] = useState(false);
  const [tipoFamiliar, setTipoFamiliar] = useState('');
  const [familiares, setFamiliares] = useState([]);
  const [hermanos, setHermanos] = useState([]);
  const [gradosEscolares, setGradosEscolares] = useState([]);
  const [atenciones, setAtenciones] = useState([]);
  const [relacionPadres, setRelacionPadres] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [ocupaciones, setOcupaciones] = useState([]);

  // Cargar entrevista existente al montar el componente
  useEffect(() => {
    if (paciente?.id) {
      cargarEntrevistaExistente();
    }
  }, [paciente?.id]);

  // Cargar grados escolares, atenciones, relación padres, géneros y ocupaciones
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [grados, atencionesData, relacionPadresData, generosData, ocupacionesData] = await Promise.all([
          getGradosEscolares(),
          getAtenciones(),
          getRelacionPadres(),
          getGeneros(),
          getOcupaciones()
        ]);
        setGradosEscolares(grados);
        setAtenciones(atencionesData);
        setRelacionPadres(relacionPadresData);
        setGeneros(generosData);
        setOcupaciones(ocupacionesData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

  // Actualizar datos del paciente cuando cambie (solo si no estamos editando)
  useEffect(() => {
    if (paciente && !editando) {
      setEntrevistaPadres(prev => ({
        ...prev,
        nombrePaciente: `${paciente.nombres || ''} ${paciente.apellido_paterno || ''} ${paciente.apellido_materno || ''}`.trim(),
        fechaNacimiento: paciente.fecha_nacimiento || '',
        edad: paciente.edad?.toString() || '',
        sexo: paciente.sexo?.nombre || ''
      }));
    }
  }, [paciente, editando]);

  const cargarEntrevistaExistente = async () => {
    setLoading(true);
    try {
      const data = await obtenerEntrevistaPadres(paciente.id);
      if (data) {
        setEntrevistaExistente(data);
        setExpandedEntrevista(true);
      }
    } catch (error) {
      console.error('Error al cargar entrevista:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEntrevistaPadres(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const camposRequeridos = [
      // I. DATOS GENERALES
      { campo: 'escolaridad', nombre: 'Grado escolar' },
      { campo: 'motivoConsulta', nombre: 'Motivo de consulta' },
      { campo: 'derivacionInterna', nombre: 'Otras atenciones' },
      
      // II. HISTORIA FAMILIAR
      { campo: 'relacionEntrePadres', nombre: 'Relación entre los padres' },
      { campo: 'cantidadHermanos', nombre: 'Cantidad de hermanos' },
      { campo: 'tiempoJuego', nombre: 'Tiempo de juego' },
      { campo: 'tiempoDispositivos', nombre: 'Tiempo de dispositivos' },
      { campo: 'antecedentesFamiliares', nombre: 'Antecedentes familiares' },
      
      // III. HISTORIA DEL DESARROLLO
      { campo: 'antecedentesPrenatales', nombre: 'Antecedentes prenatales' },
      { campo: 'desarrolloMotor', nombre: 'Desarrollo motor' },
      { campo: 'desarrolloLenguaje', nombre: 'Desarrollo del lenguaje' },
      { campo: 'alimentacion', nombre: 'Alimentación' },
      { campo: 'sueno', nombre: 'Sueño' },
      { campo: 'controlEsfinteres', nombre: 'Control de esfínteres' },
      { campo: 'antecedentesMedicosNino', nombre: 'Antecedentes médicos del niño' },
      { campo: 'antecedentesEscolares', nombre: 'Antecedentes escolares' },
      
      // IV. ASPECTOS DE SOCIALIZACIÓN Y AFECTIVO
      { campo: 'relacionPares', nombre: 'Relación con pares' },
      { campo: 'expresionEmocional', nombre: 'Expresión emocional' },
      { campo: 'relacionAutoridad', nombre: 'Relación con figuras de autoridad' },
      
      // V. INTERESES Y PASATIEMPOS
      { campo: 'juegosPreferidos', nombre: 'Juegos preferidos' },
      { campo: 'actividadesFavoritas', nombre: 'Actividades favoritas' },
      
      // VI. RECOMENDACIONES
      { campo: 'recomendaciones', nombre: 'Recomendaciones' }
    ];

    const camposFaltantes = [];

    camposRequeridos.forEach(({ campo, nombre }) => {
      if (!entrevistaPadres[campo] || entrevistaPadres[campo].toString().trim() === '') {
        nuevosErrores[campo] = 'Este campo es obligatorio';
        camposFaltantes.push(nombre);
      }
    });

    // Validar campos condicionales de antecedentes familiares
    if (entrevistaPadres.antecedentesFamiliares === 'Si') {
      const camposAntecedentes = [
        { campo: 'antecedentesMedicos', nombre: 'Antecedentes médicos' },
        { campo: 'antecedentesPsiquiatricos', nombre: 'Antecedentes psiquiátricos' },
        { campo: 'antecedentesToxicologicos', nombre: 'Antecedentes toxicológicos' }
      ];

      camposAntecedentes.forEach(({ campo, nombre }) => {
        if (!entrevistaPadres[campo] || entrevistaPadres[campo].toString().trim() === '') {
          nuevosErrores[campo] = 'Este campo es obligatorio cuando hay antecedentes familiares';
          camposFaltantes.push(nombre);
        }
      });
    }

    // Validar campos de hermanos si hay hermanos
    if (entrevistaPadres.cantidadHermanos && parseInt(entrevistaPadres.cantidadHermanos) > 0) {
      hermanos.forEach((hermano, index) => {
        if (!hermano.nombre || hermano.nombre.trim() === '') {
          nuevosErrores[`hermano_${hermano.id}_nombre`] = 'Nombre del hermano es obligatorio';
          camposFaltantes.push(`Nombre del hermano ${index + 1}`);
        }
        if (!hermano.edad || hermano.edad.toString().trim() === '') {
          nuevosErrores[`hermano_${hermano.id}_edad`] = 'Edad del hermano es obligatoria';
          camposFaltantes.push(`Edad del hermano ${index + 1}`);
        }
        if (!hermano.sexo || hermano.sexo.toString().trim() === '') {
          nuevosErrores[`hermano_${hermano.id}_sexo`] = 'Sexo del hermano es obligatorio';
          camposFaltantes.push(`Sexo del hermano ${index + 1}`);
        }
      });
    }

    // Validar que se agregue al menos un miembro de la familia
    if (familiares.length === 0) {
      nuevosErrores.familiares = 'Debe agregar al menos un miembro de la familia';
      camposFaltantes.push('Miembros de la familia');
    }

    // Validar campos de familiares agregados
    familiares.forEach((familiar, index) => {
      if (!familiar.nombre || familiar.nombre.trim() === '') {
        nuevosErrores[`familiar_${familiar.id}_nombre`] = 'Nombre del familiar es obligatorio';
        camposFaltantes.push(`Nombre del familiar ${index + 1}`);
      }
      if (!familiar.edad || familiar.edad.toString().trim() === '') {
        nuevosErrores[`familiar_${familiar.id}_edad`] = 'Edad del familiar es obligatoria';
        camposFaltantes.push(`Edad del familiar ${index + 1}`);
      }
      if (!familiar.ocupacion || familiar.ocupacion.toString().trim() === '') {
        nuevosErrores[`familiar_${familiar.id}_ocupacion`] = 'Ocupación del familiar es obligatoria';
        camposFaltantes.push(`Ocupación del familiar ${index + 1}`);
      }
    });

    setErrors(nuevosErrores);
    
    if (camposFaltantes.length > 0) {
      setSnackbarMessage(`Faltan completar los siguientes campos: ${camposFaltantes.join(', ')}`);
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
    
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = async () => {
    console.log('user', user);
    console.log('paciente', paciente);
    console.log('entrevistaPadres', entrevistaPadres);
    if (!validarFormulario()) {
      return;
    }

    if (!user || !user.id) {
      setSnackbarMessage('Error: No se pudo obtener la información del usuario');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    setSaving(true);
    try {
      const dataToSend = {
        paciente_id: paciente.id,
        usuario_id: user.id,
        fecha: entrevistaPadres.fecha,
        escolaridad: entrevistaPadres.escolaridad,
        motivo_consulta: entrevistaPadres.motivoConsulta,
        otras_atenciones: entrevistaPadres.derivacionInterna,
        antecedentes_familiares: entrevistaPadres.antecedentesFamiliares,
        antecedentes_medicos: entrevistaPadres.antecedentesMedicos,
        antecedentes_psiquiatricos: entrevistaPadres.antecedentesPsiquiatricos,
        antecedentes_toxicologicos: entrevistaPadres.antecedentesToxicologicos,
        relacion_entre_padres: entrevistaPadres.relacionEntrePadres,
        detalle_relacion_padres: entrevistaPadres.detalleRelacionPadres,
        cantidad_hermanos: entrevistaPadres.cantidadHermanos,
        tiempo_juego: entrevistaPadres.tiempoJuego,
        tiempo_dispositivos: entrevistaPadres.tiempoDispositivos,
        hermanos: hermanos,
        familiares: familiares,
        antecedentes_prenatales: entrevistaPadres.antecedentesPrenatales,
        desarrollo_motor: entrevistaPadres.desarrolloMotor,
        desarrollo_lenguaje: entrevistaPadres.desarrolloLenguaje,
        alimentacion: entrevistaPadres.alimentacion,
        sueno: entrevistaPadres.sueno,
        control_esfinteres: entrevistaPadres.controlEsfinteres,
        antecedentes_medicos_nino: entrevistaPadres.antecedentesMedicosNino,
        antecedentes_escolares: entrevistaPadres.antecedentesEscolares,
        relacion_pares: entrevistaPadres.relacionPares,
        expresion_emocional: entrevistaPadres.expresionEmocional,
        relacion_autoridad: entrevistaPadres.relacionAutoridad,
        juegos_preferidos: entrevistaPadres.juegosPreferidos,
        actividades_favoritas: entrevistaPadres.actividadesFavoritas,
        recomendaciones: entrevistaPadres.recomendaciones
      };

      if (entrevistaExistente) {
        await actualizarEntrevistaPadres(entrevistaExistente.id, dataToSend);
        setSnackbarMessage('Entrevista actualizada correctamente');
      } else {
        await guardarEntrevistaPadres(dataToSend);
        setSnackbarMessage('Entrevista guardada correctamente');
      }

      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setEditando(false);
      await cargarEntrevistaExistente();
    } catch (error) {
      console.error('Error al guardar:', error);
      setSnackbarMessage('Error al guardar la entrevista');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setSaving(false);
    }
  };

  const handleNuevaEntrevista = () => {
    setEntrevistaExistente(null);
    setEditando(true);
    setExpandedEntrevista(false);
  };

  const handleEditar = () => {
    console.log('handleEditar - paciente:', paciente);
    console.log('handleEditar - entrevistaExistente:', entrevistaExistente);
    
    if (entrevistaExistente) {
      const nombreCompleto = `${paciente?.nombres || ''} ${paciente?.apellido_paterno || ''} ${paciente?.apellido_materno || ''}`.trim();
      console.log('nombreCompleto:', nombreCompleto);
      
      setEntrevistaPadres({
        fecha: entrevistaExistente.fecha?.split('T')[0] || new Date().toISOString().split('T')[0],
        nombrePaciente: nombreCompleto,
        fechaNacimiento: paciente?.fecha_nacimiento || '',
        edad: paciente?.edad?.toString() || '',
        sexo: paciente?.sexo?.nombre || '',
        escolaridad: entrevistaExistente.escolaridad || '',
        motivoConsulta: entrevistaExistente.motivoConsulta || '',
        derivacionInterna: entrevistaExistente.otrasAtenciones || '', // Mapear otrasAtenciones a derivacionInterna
        antecedentesFamiliares: entrevistaExistente.antecedentesFamiliares || '',
        antecedentesMedicos: entrevistaExistente.antecedentesMedicos || '',
        antecedentesPsiquiatricos: entrevistaExistente.antecedentesPsiquiatricos || '',
        antecedentesToxicologicos: entrevistaExistente.antecedentesToxicologicos || '',
        relacionEntrePadres: entrevistaExistente.relacionEntrePadres || '',
        detalleRelacionPadres: entrevistaExistente.detalleRelacionPadres || '',
        cantidadHermanos: entrevistaExistente.cantidadHermanos || '',
        tiempoJuego: entrevistaExistente.tiempoJuego || '',
        tiempoDispositivos: entrevistaExistente.tiempoDispositivos || '',
        antecedentesPrenatales: entrevistaExistente.antecedentesPrenatales || '',
        desarrolloMotor: entrevistaExistente.desarrolloMotor || '',
        desarrolloLenguaje: entrevistaExistente.desarrolloLenguaje || '',
        alimentacion: entrevistaExistente.alimentacion || '',
        sueno: entrevistaExistente.sueno || '',
        controlEsfinteres: entrevistaExistente.controlEsfinteres || '',
        antecedentesMedicosNino: entrevistaExistente.antecedentesMedicosNino || '',
        antecedentesEscolares: entrevistaExistente.antecedentesEscolares || '',
        relacionPares: entrevistaExistente.relacionPares || '',
        expresionEmocional: entrevistaExistente.expresionEmocional || '',
        relacionAutoridad: entrevistaExistente.relacionAutoridad || '',
        juegosPreferidos: entrevistaExistente.juegosPreferidos || '',
        actividadesFavoritas: entrevistaExistente.actividadesFavoritas || '',
        recomendaciones: entrevistaExistente.recomendaciones || ''
      });

      // Cargar hermanos y familiares
      if (entrevistaExistente.hermanos) {
        setHermanos(entrevistaExistente.hermanos.map(hermano => ({
          id: hermano.id,
          nombre: hermano.nombre,
          edad: hermano.edad.toString(),
          sexo: hermano.sexoId?.toString() || ''
        })));
      }
      
      if (entrevistaExistente.familiares) {
        setFamiliares(entrevistaExistente.familiares.map(familiar => ({
          id: familiar.id,
          tipo: familiar.tipo,
          nombre: familiar.nombre,
          edad: familiar.edad.toString(),
          ocupacion: familiar.ocupacionId?.toString() || ''
        })));
      }
    }
    setEditando(true);
  };

  const handleAgregarFamiliar = () => {
    setMostrarAgregarFamiliar(true);
    // Limpiar error de familiares cuando se agrega uno
    if (errors.familiares) {
      setErrors(prev => ({
        ...prev,
        familiares: ''
      }));
    }
  };

  const handleTipoFamiliarChange = (tipo) => {
    setTipoFamiliar(tipo);
    if (tipo) {
      const nuevoFamiliar = {
        id: Date.now(),
        tipo: tipo,
        nombre: '',
        edad: '',
        ocupacion: ''
      };
      setFamiliares([...familiares, nuevoFamiliar]);
      setMostrarAgregarFamiliar(false);
      setTipoFamiliar('');
      // Limpiar error de familiares cuando se agrega uno
      if (errors.familiares) {
        setErrors(prev => ({
          ...prev,
          familiares: ''
        }));
      }
    }
  };

  const handleFamiliarChange = (familiarId, field, value) => {
    setFamiliares(familiares.map(familiar => 
      familiar.id === familiarId 
        ? { ...familiar, [field]: value }
        : familiar
    ));
    // Limpiar error del campo
    const errorKey = `familiar_${familiarId}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleEliminarFamiliar = (familiarId) => {
    setFamiliares(familiares.filter(familiar => familiar.id !== familiarId));
  };

  // Funciones para manejar hermanos
  const handleCantidadHermanosChange = (cantidad) => {
    setEntrevistaPadres(prev => ({ ...prev, cantidadHermanos: cantidad }));
    
    // Crear array de hermanos basado en la cantidad
    const nuevaCantidad = parseInt(cantidad) || 0;
    const nuevosHermanos = [];
    
    for (let i = 0; i < nuevaCantidad; i++) {
      nuevosHermanos.push({
        id: i + 1,
        nombre: hermanos[i]?.nombre || '',
        edad: hermanos[i]?.edad || '',
        sexo: hermanos[i]?.sexo || ''
      });
    }
    
    setHermanos(nuevosHermanos);
  };

  const handleHermanoChange = (id, campo, valor) => {
    setHermanos(prev => 
      prev.map(hermano => 
        hermano.id === id ? { ...hermano, [campo]: valor } : hermano
      )
    );
    // Limpiar error del campo
    const errorKey = `hermano_${id}_${campo}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  // Lógica simple: si existe entrevista, mostrar vista resumida; si no, mostrar formulario
  const mostrarFormulario = !entrevistaExistente || editando;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3,
        p: 2,
        backgroundColor: '#fff3cd',
        borderRadius: 2,
        border: '1px solid #ffeaa7'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FamilyRestroom sx={{ color: '#856404', fontSize: 28 }} />
          <Button
            variant="text"
            sx={{
              color: '#856404',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            ENTREVISTA A PADRES
          </Button>
        </Box>
        {entrevistaExistente && !editando && (
          <Button
            variant="contained"
            size="small"
            startIcon={<Description />}
            sx={{
              backgroundColor: '#17a2b8',
              '&:hover': { backgroundColor: '#138496' }
            }}
          >
            Vista Completa
          </Button>
        )}
      </Box>

      {/* Contenido */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Cargando datos de la entrevista...</Typography>
        </Box>
      ) : mostrarFormulario ? (
        // FORMULARIO
        <Grid container spacing={3}>
            {/* I. DATOS GENERALES */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1
              }}>
                I. DATOS GENERALES
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.escolaridad}>
                <InputLabel>GRADO ESCOLAR ACTUAL</InputLabel>
                <Select
                  value={entrevistaPadres.escolaridad}
                  onChange={(e) => handleInputChange('escolaridad', e.target.value)}
                  label="GRADO ESCOLAR ACTUAL"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                  }}
                >
                  <MenuItem value="">Seleccionar grado</MenuItem>
                  {gradosEscolares.map((grado) => (
                    <MenuItem key={grado.id} value={grado.id}>
                      {grado.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.escolaridad && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.escolaridad}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="MOTIVO PRINCIPAL DE CONSULTA"
                multiline
                rows={4}
                value={entrevistaPadres.motivoConsulta}
                onChange={(e) => handleInputChange('motivoConsulta', e.target.value)}
                error={!!errors.motivoConsulta}
                helperText={errors.motivoConsulta}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#9575CD' },
                    '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.derivacionInterna}>
                <InputLabel>OTRAS ATENCIONES</InputLabel>
                <Select
                  value={entrevistaPadres.derivacionInterna}
                  onChange={(e) => handleInputChange('derivacionInterna', e.target.value)}
                  label="OTRAS ATENCIONES"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                  }}
                >
                  <MenuItem value="">Seleccionar</MenuItem>
                  {atenciones
                    .filter(atencion => atencion.activo)
                    .map((atencion) => (
                      <MenuItem key={atencion.id} value={atencion.id}>
                        {atencion.nombre}
                      </MenuItem>
                    ))}
                </Select>
                {errors.derivacionInterna && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.derivacionInterna}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* II. HISTORIA FAMILIAR */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1,
                mt: 4
              }}>
                II. HISTORIA FAMILIAR
              </Typography>
            </Grid>

            {/* Sección de agregar familiares */}
            <Grid item xs={12}>
              <Box sx={{ 
                p: 2, 
                border: errors.familiares ? '2px dashed #d32f2f' : '2px dashed #9575CD', 
                borderRadius: 2, 
                mb: 2,
                backgroundColor: errors.familiares ? 'rgba(211, 47, 47, 0.05)' : 'rgba(149, 117, 205, 0.05)',
                textAlign: 'center'
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: errors.familiares ? '#d32f2f' : '#9575CD', 
                  mb: 2, 
                  fontWeight: 600 
                }}>
                  Agregar miembros de la familia *
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleAgregarFamiliar}
                  sx={{ 
                    backgroundColor: errors.familiares ? '#d32f2f' : '#9575CD',
                    '&:hover': {
                      backgroundColor: errors.familiares ? '#b71c1c' : '#7B68EE'
                    }
                  }}
                >
                  Agregar Familiar +
                </Button>
                {errors.familiares && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.familiares}
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Select para tipo de familiar */}
            {mostrarAgregarFamiliar && (
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 2, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2, 
                  mb: 2,
                  backgroundColor: '#f8f9fa'
                }}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    mb: 2, 
                    fontWeight: 600 
                  }}>
                    Seleccionar tipo de familiar
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>TIPO DE FAMILIAR</InputLabel>
                    <Select
                      value={tipoFamiliar}
                      onChange={(e) => handleTipoFamiliarChange(e.target.value)}
                      label="TIPO DE FAMILIAR"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                      }}
                    >
                      <MenuItem value="">Seleccionar tipo</MenuItem>
                      <MenuItem value="Madre">Madre</MenuItem>
                      <MenuItem value="Padre">Padre</MenuItem>
                      <MenuItem value="Hermano">Hermano</MenuItem>
                      <MenuItem value="Hermana">Hermana</MenuItem>
                      <MenuItem value="Abuelo">Abuelo</MenuItem>
                      <MenuItem value="Abuela">Abuela</MenuItem>
                      <MenuItem value="Tío">Tío</MenuItem>
                      <MenuItem value="Tía">Tía</MenuItem>
                      <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            )}

            {/* Campos de familiares agregados */}
            {familiares.map((familiar) => (
              <React.Fragment key={familiar.id}>
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 2, 
                    mb: 2,
                    backgroundColor: '#f8f9fa'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        {familiar.tipo}
                      </Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleEliminarFamiliar(familiar.id)}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        ✕
                      </Button>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          label="NOMBRE COMPLETO"
                          value={familiar.nombre}
                          onChange={(e) => handleFamiliarChange(familiar.id, 'nombre', e.target.value)}
                          error={!!errors[`familiar_${familiar.id}_nombre`]}
                          helperText={errors[`familiar_${familiar.id}_nombre`]}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e0e0e0' },
                              '&:hover fieldset': { borderColor: '#9575CD' },
                              '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          required
                          label="EDAD"
                          type="number"
                          value={familiar.edad}
                          onChange={(e) => handleFamiliarChange(familiar.id, 'edad', e.target.value)}
                          error={!!errors[`familiar_${familiar.id}_edad`]}
                          helperText={errors[`familiar_${familiar.id}_edad`]}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e0e0e0' },
                              '&:hover fieldset': { borderColor: '#9575CD' },
                              '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth required error={!!errors[`familiar_${familiar.id}_ocupacion`]}>
                          <InputLabel>OCUPACIÓN</InputLabel>
                          <Select
                            value={familiar.ocupacion}
                            onChange={(e) => handleFamiliarChange(familiar.id, 'ocupacion', e.target.value)}
                            label="OCUPACIÓN"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                            }}
                          >
                            <MenuItem value="">Seleccionar</MenuItem>
                            {ocupaciones
                              .filter(ocupacion => ocupacion.activo)
                              .map((ocupacion) => (
                                <MenuItem key={ocupacion.id} value={ocupacion.id}>
                                  {ocupacion.nombre}
                                </MenuItem>
                              ))}
                          </Select>
                          {errors[`familiar_${familiar.id}_ocupacion`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                              {errors[`familiar_${familiar.id}_ocupacion`]}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </React.Fragment>
            ))}


            {/* Relación entre los padres - Mini sección */}
            <Grid item xs={12}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2, 
                mb: 2,
                backgroundColor: '#f8f9fa'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  Relación entre los padres
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required error={!!errors.relacionEntrePadres}>
                      <InputLabel>RELACIÓN ENTRE LOS PADRES</InputLabel>
                      <Select
                        value={entrevistaPadres.relacionEntrePadres}
                        onChange={(e) => handleInputChange('relacionEntrePadres', e.target.value)}
                        label="RELACIÓN ENTRE LOS PADRES"
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                        }}
                      >
                        <MenuItem value="">Seleccionar</MenuItem>
                        {relacionPadres
                          .filter(relacion => relacion.activo)
                          .map((relacion) => (
                            <MenuItem key={relacion.id} value={relacion.id}>
                              {relacion.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.relacionEntrePadres && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.relacionEntrePadres}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="DETALLE"
                      multiline
                      rows={3}
                      value={entrevistaPadres.detalleRelacionPadres || ''}
                      onChange={(e) => handleInputChange('detalleRelacionPadres', e.target.value)}
                      placeholder="Detalles adicionales sobre la relación entre los padres..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>


            {/* Hermanos */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.cantidadHermanos}>
                <InputLabel>CANTIDAD DE HERMANOS</InputLabel>
                <Select
                  value={entrevistaPadres.cantidadHermanos}
                  onChange={(e) => handleCantidadHermanosChange(e.target.value)}
                  label="CANTIDAD DE HERMANOS"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                  }}
                >
                  <MenuItem value="">Seleccionar</MenuItem>
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5+">5+</MenuItem>
                </Select>
                {errors.cantidadHermanos && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.cantidadHermanos}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Campos dinámicos de hermanos */}
            {hermanos.map((hermano) => (
              <React.Fragment key={hermano.id}>
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 2, 
                    mb: 2,
                    backgroundColor: '#f8f9fa'
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                      Hermano {hermano.id}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          label="NOMBRE"
                          value={hermano.nombre}
                          onChange={(e) => handleHermanoChange(hermano.id, 'nombre', e.target.value)}
                          error={!!errors[`hermano_${hermano.id}_nombre`]}
                          helperText={errors[`hermano_${hermano.id}_nombre`]}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e0e0e0' },
                              '&:hover fieldset': { borderColor: '#9575CD' },
                              '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          required
                          label="EDAD"
                          type="number"
                          value={hermano.edad}
                          onChange={(e) => handleHermanoChange(hermano.id, 'edad', e.target.value)}
                          error={!!errors[`hermano_${hermano.id}_edad`]}
                          helperText={errors[`hermano_${hermano.id}_edad`]}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e0e0e0' },
                              '&:hover fieldset': { borderColor: '#9575CD' },
                              '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth required error={!!errors[`hermano_${hermano.id}_sexo`]}>
                          <InputLabel>SEXO</InputLabel>
                          <Select
                            value={hermano.sexo}
                            onChange={(e) => handleHermanoChange(hermano.id, 'sexo', e.target.value)}
                            label="SEXO"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                            }}
                          >
                            <MenuItem value="">Seleccionar</MenuItem>
                            {generos
                              .filter(genero => genero.activo)
                              .map((genero) => (
                                <MenuItem key={genero.id} value={genero.id}>
                                  {genero.nombre}
                                </MenuItem>
                              ))}
                          </Select>
                          {errors[`hermano_${hermano.id}_sexo`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                              {errors[`hermano_${hermano.id}_sexo`]}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </React.Fragment>
            ))}

            {/* Mini sección - Tiempo de juego y dispositivos */}
            <Grid item xs={12}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2, 
                mb: 2,
                backgroundColor: '#f8f9fa'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  Tiempo de interacción
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="TIEMPO DE JUEGO QUE PASAN CON EL PACIENTE"
                      value={entrevistaPadres.tiempoJuego}
                      onChange={(e) => handleInputChange('tiempoJuego', e.target.value)}
                      error={!!errors.tiempoJuego}
                      helperText={errors.tiempoJuego}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="TIEMPO DE EXPOSICIÓN A DISPOSITIVOS ELECTRÓNICOS"
                      value={entrevistaPadres.tiempoDispositivos}
                      onChange={(e) => handleInputChange('tiempoDispositivos', e.target.value)}
                      error={!!errors.tiempoDispositivos}
                      helperText={errors.tiempoDispositivos}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Mini sección - Antecedentes familiares importantes */}
            <Grid item xs={12}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2, 
                mb: 2,
                backgroundColor: '#f8f9fa'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  Antecedentes familiares importantes
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth required error={!!errors.antecedentesFamiliares}>
                      <InputLabel>¿TIENE ANTECEDENTES FAMILIARES IMPORTANTES?</InputLabel>
                      <Select
                        value={entrevistaPadres.antecedentesFamiliares}
                        onChange={(e) => handleInputChange('antecedentesFamiliares', e.target.value)}
                        label="¿TIENE ANTECEDENTES FAMILIARES IMPORTANTES?"
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9575CD' }
                        }}
                      >
                        <MenuItem value="">Seleccionar</MenuItem>
                        <MenuItem value="Si">Sí</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                      {errors.antecedentesFamiliares && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.antecedentesFamiliares}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  {entrevistaPadres.antecedentesFamiliares === 'Si' && (
                    <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="MÉDICOS"
                      multiline
                      rows={3}
                      value={entrevistaPadres.antecedentesMedicos}
                      onChange={(e) => handleInputChange('antecedentesMedicos', e.target.value)}
                      placeholder="Detalles de antecedentes médicos familiares..."
                      error={!!errors.antecedentesMedicos}
                      helperText={errors.antecedentesMedicos}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="PSIQUIÁTRICOS"
                      multiline
                      rows={3}
                      value={entrevistaPadres.antecedentesPsiquiatricos}
                      onChange={(e) => handleInputChange('antecedentesPsiquiatricos', e.target.value)}
                      placeholder="Detalles de antecedentes psiquiátricos familiares..."
                      error={!!errors.antecedentesPsiquiatricos}
                      helperText={errors.antecedentesPsiquiatricos}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="TOXICOLÓGICOS"
                      multiline
                      rows={3}
                      value={entrevistaPadres.antecedentesToxicologicos}
                      onChange={(e) => handleInputChange('antecedentesToxicologicos', e.target.value)}
                      placeholder="Detalles de antecedentes toxicológicos familiares..."
                      error={!!errors.antecedentesToxicologicos}
                      helperText={errors.antecedentesToxicologicos}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#9575CD' },
                          '&.Mui-focused fieldset': { borderColor: '#9575CD' }
                        }
                      }}
                    />
                  </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            {/* III. HISTORIA DEL DESARROLLO */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1,
                mt: 4
              }}>
                III. HISTORIA DEL DESARROLLO
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                1. Antecedentes prenatales, perinatales Y POSTNATALES:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                value={entrevistaPadres.antecedentesPrenatales}
                onChange={(e) => handleInputChange('antecedentesPrenatales', e.target.value)}
                placeholder="Describa los antecedentes prenatales, perinatales y postnatales..."
                error={!!errors.antecedentesPrenatales}
                helperText={errors.antecedentesPrenatales}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                2. Desarrollo psicomotor, del lenguaje y conductas adaptativas:
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Motor (ej. sentarse, gateo, marcha):
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.desarrolloMotor}
                onChange={(e) => handleInputChange('desarrolloMotor', e.target.value)}
                placeholder="Describa el desarrollo motor..."
                error={!!errors.desarrolloMotor}
                helperText={errors.desarrolloMotor}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Lenguaje (primeras palabras, frases, comprensión, articulación):
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.desarrolloLenguaje}
                onChange={(e) => handleInputChange('desarrolloLenguaje', e.target.value)}
                placeholder="Describa el desarrollo del lenguaje..."
                error={!!errors.desarrolloLenguaje}
                helperText={errors.desarrolloLenguaje}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Alimentación:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.alimentacion}
                onChange={(e) => handleInputChange('alimentacion', e.target.value)}
                placeholder="Describa los hábitos alimentarios..."
                error={!!errors.alimentacion}
                helperText={errors.alimentacion}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Sueño:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.sueno}
                onChange={(e) => handleInputChange('sueno', e.target.value)}
                placeholder="Describa los patrones de sueño..."
                error={!!errors.sueno}
                helperText={errors.sueno}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Control de esfínteres:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.controlEsfinteres}
                onChange={(e) => handleInputChange('controlEsfinteres', e.target.value)}
                placeholder="Describa el control de esfínteres..."
                error={!!errors.controlEsfinteres}
                helperText={errors.controlEsfinteres}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                3. Antecedentes médicos del niño (hospitalizaciones, medicación, diagnósticos previos):
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                value={entrevistaPadres.antecedentesMedicosNino}
                onChange={(e) => handleInputChange('antecedentesMedicosNino', e.target.value)}
                placeholder="Describa los antecedentes médicos..."
                error={!!errors.antecedentesMedicosNino}
                helperText={errors.antecedentesMedicosNino}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                4. Antecedentes escolares (adaptación, desempeño, dificultades específicas):
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                value={entrevistaPadres.antecedentesEscolares}
                onChange={(e) => handleInputChange('antecedentesEscolares', e.target.value)}
                placeholder="Describa los antecedentes escolares..."
                error={!!errors.antecedentesEscolares}
                helperText={errors.antecedentesEscolares}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            {/* IV. ASPECTOS DE SOCIALIZACIÓN Y AFECTIVO */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1,
                mt: 4
              }}>
                IV. ASPECTOS DE SOCIALIZACIÓN Y AFECTIVO
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Relación con pares:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.relacionPares}
                onChange={(e) => handleInputChange('relacionPares', e.target.value)}
                placeholder="Describa la relación con pares..."
                error={!!errors.relacionPares}
                helperText={errors.relacionPares}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Expresión emocional Y Manejo de frustración:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.expresionEmocional}
                onChange={(e) => handleInputChange('expresionEmocional', e.target.value)}
                placeholder="Describa la expresión emocional y manejo de frustración..."
                error={!!errors.expresionEmocional}
                helperText={errors.expresionEmocional}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Relación con figuras de autoridad:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.relacionAutoridad}
                onChange={(e) => handleInputChange('relacionAutoridad', e.target.value)}
                placeholder="Describa la relación con figuras de autoridad..."
                error={!!errors.relacionAutoridad}
                helperText={errors.relacionAutoridad}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            {/* V. INTERESES Y PASATIEMPOS DEL PACIENTE */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1,
                mt: 4
              }}>
                V. INTERESES Y PASATIEMPOS DEL PACIENTE
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Juegos preferidos:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.juegosPreferidos}
                onChange={(e) => handleInputChange('juegosPreferidos', e.target.value)}
                placeholder="Describa los juegos preferidos..."
                error={!!errors.juegosPreferidos}
                helperText={errors.juegosPreferidos}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Actividades favoritas:
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                value={entrevistaPadres.actividadesFavoritas}
                onChange={(e) => handleInputChange('actividadesFavoritas', e.target.value)}
                placeholder="Describa las actividades favoritas..."
                error={!!errors.actividadesFavoritas}
                helperText={errors.actividadesFavoritas}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            {/* VI. RECOMENDACIONES */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                mb: 2,
                borderBottom: '2px solid #9575CD',
                pb: 1,
                mt: 4
              }}>
                VI. RECOMENDACIONES
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                value={entrevistaPadres.recomendaciones}
                onChange={(e) => handleInputChange('recomendaciones', e.target.value)}
                placeholder="Escriba las recomendaciones aquí..."
                error={!!errors.recomendaciones}
                helperText={errors.recomendaciones}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: 2
                  }
                }}
              />
            </Grid>

            {/* Botón Guardar */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGuardar}
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                  sx={{
                    backgroundColor: '#9575CD',
                    '&:hover': { backgroundColor: '#7B68EE' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  {saving ? 'Guardando...' : 'Guardar Entrevista'}
                </Button>
              </Box>
            </Grid>
          </Grid>
      ) : (
        // VISTA RESUMIDA
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {entrevistaExistente ? (
            <Box sx={{ 
              backgroundColor: 'white', 
              borderRadius: 2, 
              border: '1px solid #e0e0e0',
              overflow: 'hidden'
            }}>
              {/* Header de la entrevista */}
              <Box 
                onClick={() => setExpandedEntrevista(!expandedEntrevista)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#e9ecef' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FamilyRestroom sx={{ color: '#1976d2' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                      Entrevista a Padres
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Fecha: {entrevistaExistente.fecha ? new Date(entrevistaExistente.fecha).toLocaleDateString('es-PE') : 'No especificada'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditar();
                    }}
                    size="small"
                    sx={{ color: '#1976d2' }}
                  >
                    <Edit />
                  </IconButton>
                  {expandedEntrevista ? <ExpandLess /> : <ExpandMore />}
                </Box>
              </Box>

              {/* Contenido expandible */}
              <Collapse in={expandedEntrevista}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Información básica */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
                        Información Básica
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Paciente
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {paciente?.nombres} {paciente?.apellido_paterno} {paciente?.apellido_materno}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Lugar de nacimiento
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.lugarNacimiento || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Fecha de nacimiento
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {paciente?.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toLocaleDateString('es-PE') : 'No especificada'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Edad
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {paciente?.fecha_nacimiento ? calcularEdad(paciente.fecha_nacimiento) : 'No especificada'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Sexo
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {paciente?.sexo?.nombre || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Escolaridad
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.escolaridad ? 
                            gradosEscolares.find(g => g.id === entrevistaExistente.escolaridad)?.nombre || entrevistaExistente.escolaridad 
                            : 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Información Clínica */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        Información Clínica
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Motivo de consulta
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.motivoConsulta || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Otras atenciones
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.otrasAtenciones ? 
                            atenciones.find(a => a.id === entrevistaExistente.otrasAtenciones)?.nombre || entrevistaExistente.otrasAtenciones 
                            : 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* II. HISTORIA FAMILIAR */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        II. Historia Familiar
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Relación entre padres
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.relacionEntrePadres ? 
                            relacionPadres.find(r => r.id === entrevistaExistente.relacionEntrePadres)?.nombre || entrevistaExistente.relacionEntrePadres 
                            : 'No especificada'}
                        </Typography>
                        {entrevistaExistente.detalleRelacionPadres && (
                          <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem', mt: 0.5 }}>
                            {entrevistaExistente.detalleRelacionPadres}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Cantidad de hermanos
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.cantidadHermanos || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Hermanos */}
                    {entrevistaExistente.hermanos && entrevistaExistente.hermanos.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                            Hermanos
                          </Typography>
                        </Grid>
                        {entrevistaExistente.hermanos.map((hermano, index) => (
                          <Grid item xs={12} md={6} key={hermano.id}>
                            <Box sx={{ 
                              mb: 2, 
                              p: 2, 
                              border: '1px solid #e0e0e0', 
                              borderRadius: 2,
                              backgroundColor: '#f8f9fa'
                            }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                                Hermano {index + 1}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                                <strong>Nombre:</strong> {hermano.nombre}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                                <strong>Edad:</strong> {hermano.edad} años
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333' }}>
                                <strong>Sexo:</strong> {hermano.sexo?.nombre || 'No especificado'}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </>
                    )}

                    {/* Familiares */}
                    {entrevistaExistente.familiares && entrevistaExistente.familiares.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                            Familiares
                          </Typography>
                        </Grid>
                        {entrevistaExistente.familiares.map((familiar, index) => (
                          <Grid item xs={12} md={6} key={familiar.id}>
                            <Box sx={{ 
                              mb: 2, 
                              p: 2, 
                              border: '1px solid #e0e0e0', 
                              borderRadius: 2,
                              backgroundColor: '#f8f9fa'
                            }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                                {familiar.tipo}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                                <strong>Nombre:</strong> {familiar.nombre}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                                <strong>Edad:</strong> {familiar.edad} años
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#333' }}>
                                <strong>Ocupación:</strong> {familiar.ocupacion?.nombre || 'No especificada'}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </>
                    )}

                    {/* Tiempo de interacción */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        Tiempo de Interacción
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Tiempo de juego
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.tiempoJuego || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          Tiempo de dispositivos
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.tiempoDispositivos || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Antecedentes familiares */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        Antecedentes Familiares
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          ¿Tiene antecedentes familiares importantes?
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {entrevistaExistente.antecedentesFamiliares || 'No especificado'}
                        </Typography>
                      </Box>
                    </Grid>
                    {entrevistaExistente.antecedentesFamiliares === 'Si' && (
                      <>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                              Médicos
                            </Typography>
                            <Box sx={{
                              color: '#333',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'inherit'
                            }}>
                              {entrevistaExistente.antecedentesMedicos || 'No especificado'}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                              Psiquiátricos
                            </Typography>
                            <Box sx={{
                              color: '#333',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'inherit'
                            }}>
                              {entrevistaExistente.antecedentesPsiquiatricos || 'No especificado'}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                              Toxicológicos
                            </Typography>
                            <Box sx={{
                              color: '#333',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'inherit'
                            }}>
                              {entrevistaExistente.antecedentesToxicologicos || 'No especificado'}
                            </Box>
                          </Box>
                        </Grid>
                      </>
                    )}

                    {/* III. HISTORIA DEL DESARROLLO */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        III. Historia del Desarrollo
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          1. Antecedentes prenatales, perinatales y postnatales
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.antecedentesPrenatales || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          2. Desarrollo psicomotor, del lenguaje y conductas adaptativas
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Motor (ej. sentarse, gateo, marcha)
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.desarrolloMotor || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Lenguaje (primeras palabras, frases, comprensión, articulación)
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.desarrolloLenguaje || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Alimentación
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.alimentacion || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Sueño
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.sueno || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Control de esfínteres
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.controlEsfinteres || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          3. Antecedentes médicos del niño (hospitalizaciones, medicación, diagnósticos previos)
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.antecedentesMedicosNino || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          4. Antecedentes escolares (adaptación, desempeño, dificultades específicas)
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.antecedentesEscolares || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>

                    {/* IV. ASPECTOS DE SOCIALIZACIÓN Y AFECTIVO */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        IV. Aspectos de Socialización y Afectivo
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Relación con pares
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.relacionPares || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Expresión emocional y manejo de frustración
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.expresionEmocional || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Relación con figuras de autoridad
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.relacionAutoridad || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>

                    {/* V. INTERESES Y PASATIEMPOS */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        V. Intereses y Pasatiempos del Paciente
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Juegos preferidos
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.juegosPreferidos || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5 }}>
                          • Actividades favoritas
                        </Typography>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.actividadesFavoritas || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>

                    {/* VI. RECOMENDACIONES */}
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 2 }}>
                        VI. Recomendaciones
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{
                          color: '#333',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit'
                        }}>
                          {entrevistaExistente.recomendaciones || 'No especificado'}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </Box>
          ) : (
            <Box sx={{ 
              backgroundColor: 'white', 
              borderRadius: 2, 
              border: '1px solid #e0e0e0',
              p: 3,
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                No hay entrevista a padres registrada
              </Typography>
              <Button
                variant="contained"
                onClick={handleNuevaEntrevista}
                sx={{
                  backgroundColor: '#9575CD',
                  '&:hover': { backgroundColor: '#7B68EE' }
                }}
              >
                Crear Nueva Entrevista
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EntrevistaPadresView;
