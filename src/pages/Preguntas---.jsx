import React, { useState, useEffect } from 'react';
import './Preguntas.css';
import { guardarTest, getInstituciones, getSecciones, getGrados, getTrabajadores } from '../services/evaluacionService';

const Preguntas = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    terapia: ''
  });

  const [activeTab, setActiveTab] = useState('descripcion');
  const [datosEvaluacion, setDatosEvaluacion] = useState({
    nombreEstudiante: '',
    grado: '',
    seccion: '',
    fecha: new Date().toLocaleDateString('en-CA'),
    nombreEvaluador: '',
    institucionEducativa: '',
    puntajes: {
      expresionOral: '',
      semantica: '',
      pragmatica: '',
      morfosintaxis: '',
      comprensionOral: ''
    },
    observaciones: {
      expresionOral: '',
      semantica: '',
      pragmatica: '',
      morfosintaxis: '',
      comprensionOral: ''
    },
    requiereDerivacion: null
  });

  const [instituciones, setInstituciones] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  
  const [cargandoInstituciones, setCargandoInstituciones] = useState(false);
  const [cargandoSecciones, setCargandoSecciones] = useState(false);
  const [cargandoGrados, setCargandoGrados] = useState(false);
  const [cargandoTrabajadores, setCargandoTrabajadores] = useState(false);
  
  const [errorInstituciones, setErrorInstituciones] = useState(null);
  const [errorSecciones, setErrorSecciones] = useState(null);
  const [errorGrados, setErrorGrados] = useState(null);
  const [errorTrabajadores, setErrorTrabajadores] = useState(null);

  const handleInputChange = (field, value) => {
    setDatosEvaluacion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePuntajeChange = (area, value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 2)) {
      setDatosEvaluacion(prev => ({
        ...prev,
        puntajes: {
          ...prev.puntajes,
          [area]: value
        }
      }));
    }
  };

  const calcularPuntajeTotal = () => {
    const puntajes = Object.values(datosEvaluacion.puntajes);
    return puntajes.reduce((total, puntaje) => total + (Number(puntaje) || 0), 0);
  };

  const [selectedScore, setSelectedScore] = useState(null);
  const [criterios, setCriterios] = useState({
    0: 'No logra elaborar un discurso, oraciones sueltas o incompletas.',
    1: 'Responde poco clara o incompleta.',
    2: 'Responde coherente y propone una acción apropiada.'
  });

  const [scores, setScores] = useState({
    lenguajeExpresivo: null,
    semantica: null,
    pragmatica: null,
    morfosintaxis: null,
    comprensionAuditiva: null,
    comprensionLectora: null
  });

  const [selectedScores, setSelectedScores] = useState({});

  const handleScoreSelect = (section, score) => {
    setScores(prev => ({
      ...prev,
      [section]: score
    }));
  };

  const handleNavigation = (direction) => {
    const tabs = ['descripcion', 'registro', 'test'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'next' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin1234') {
      setIsAuthenticated(true);
      // Establecer la pestaña activa según la terapia seleccionada
      if (credentials.terapia === 'TE3') {
        setActiveTab('descripcionTE3');
      } else {
        setActiveTab('descripcion');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Estados para el cronómetro
  const [elapsedTime, setElapsedTime] = useState(0); // Tiempo transcurrido en segundos
  const [isRunning, setIsRunning] = useState(false);

  // Efecto para el cronómetro
  useEffect(() => {
    let timer;
    if (isRunning && activeTab === 'test') {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, activeTab]);

  // Función para formatear el tiempo
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Iniciar el cronómetro cuando se autentica
  useEffect(() => {
    if (isAuthenticated) {
      setIsRunning(true);
    }
  }, [isAuthenticated]);

  const [evaluacionTE3, setEvaluacionTE3] = useState({
    lenguajeExpresivo: {
      descripcionImagen: null, // 0, 1, 2
      pronunciacion: null, // 0, 2
    },
    semantica: {
      definicionPalabras: null, // 0, 1
      palabraRelacionada: null, // 0, 1
    },
    pragmatica: {
      situacionSocial: null, // 0, 1, 2
    },
    morfosintaxis: {
      repeticionOracion: null, // 0, 1, 2
    },
    comprensionAuditiva: {
      instruccionDoble: null, // 0, 1
      ejecucionIndicaciones: null, // 0, 1
      comprensionFrases: null, // 0, 1
    }
  });

  const handleScoreSelectTE3 = (seccion, subseccion, valor) => {
    setEvaluacionTE3(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [subseccion]: parseInt(valor)
      }
    }));
  };

  const prepararPayloadTE3 = () => ({
    tipo_evaluacion: "TE3",
    datos_estudiante: {
      nombre_estudiante: datosEvaluacion.nombreEstudiante,
      institucion_id: parseInt(datosEvaluacion.institucionEducativa),
      grado_id: parseInt(datosEvaluacion.grado),
      seccion_id: parseInt(datosEvaluacion.seccion),
      evaluador_id: parseInt(datosEvaluacion.nombreEvaluador),
      fecha: new Date(datosEvaluacion.fecha).toISOString(),
      tiempo_evaluacion: elapsedTime
    },
    resultados: {
      descripcion_imagen: evaluacionTE3.lenguajeExpresivo.descripcionImagen,
      pronunciacion: evaluacionTE3.lenguajeExpresivo.pronunciacion,
      definicion_palabras: evaluacionTE3.semantica.definicionPalabras,
      palabra_relacionada: evaluacionTE3.semantica.palabraRelacionada,
      situacion_social: evaluacionTE3.pragmatica.situacionSocial,
      repeticion_oracion: evaluacionTE3.morfosintaxis.repeticionOracion,
      instruccion_doble: evaluacionTE3.comprensionAuditiva.instruccionDoble,
      ejecucion_indicaciones: evaluacionTE3.comprensionAuditiva.ejecucionIndicaciones,
      comprension_frases: evaluacionTE3.comprensionAuditiva.comprensionFrases
    }
  });

  const calcularPuntajeTotalTE3 = () => {
    let total = 0;
    
    // Lenguaje Expresivo (max 4 puntos)
    total += evaluacionTE3.lenguajeExpresivo.descripcionImagen || 0;
    total += evaluacionTE3.lenguajeExpresivo.pronunciacion || 0;
    
    // Semántica (max 2 puntos)
    total += evaluacionTE3.semantica.definicionPalabras || 0;
    total += evaluacionTE3.semantica.palabraRelacionada || 0;
    
    // Pragmática (max 2 puntos)
    total += evaluacionTE3.pragmatica.situacionSocial || 0;
    
    // Morfosintaxis (max 2 puntos)
    total += evaluacionTE3.morfosintaxis.repeticionOracion || 0;
    
    // Comprensión Auditiva (max 3 puntos)
    total += evaluacionTE3.comprensionAuditiva.instruccionDoble || 0;
    total += evaluacionTE3.comprensionAuditiva.ejecucionIndicaciones || 0;
    total += evaluacionTE3.comprensionAuditiva.comprensionFrases || 0;
    
    return total;
  };

  const [evaluacionTE5, setEvaluacionTE5] = useState({
    lenguajeExpresivo: {
      descripcionImagen: null, // 0, 1, 2
    },
    semantica: {
      definicionPalabras: null, // 0, 1, 2
    },
    pragmatica: {
      situacionSocial: null, // 0, 1, 2
    },
    morfosintaxis: {
      repeticionOracion: null, // 0, 1, 2
    },
    comprensionAuditiva: {
      instruccionDoble: null, // 0, 1, 2
    },
    comprensionLectora: {
      pregunta1: null, // 'correcto' o 'incorrecto'
      pregunta2: null, // 'correcto' o 'incorrecto'
      pregunta3: null, // 'correcto' o 'incorrecto'
    }
  });

  const handleScoreSelectTE5 = (seccion, subseccion, valor) => {
    setEvaluacionTE5(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [subseccion]: valor
      }
    }));
  };

  const calcularPuntajeTotalTE5 = () => {
    let total = 0;
    
    // Lenguaje Expresivo (max 2 puntos)
    total += evaluacionTE5.lenguajeExpresivo.descripcionImagen || 0;
    
    // Semántica (max 2 puntos)
    total += evaluacionTE5.semantica.definicionPalabras || 0;
    
    // Pragmática (max 2 puntos)
    total += evaluacionTE5.pragmatica.situacionSocial || 0;
    
    // Morfosintaxis (max 2 puntos)
    total += evaluacionTE5.morfosintaxis.repeticionOracion || 0;
    
    // Comprensión Auditiva (max 2 puntos)
    total += evaluacionTE5.comprensionAuditiva.instruccionDoble || 0;
    
    // Comprensión Lectora (max 3 puntos, 1 punto por cada respuesta correcta)
    total += evaluacionTE5.comprensionLectora.pregunta1 || 0;
    total += evaluacionTE5.comprensionLectora.pregunta2 || 0;
    total += evaluacionTE5.comprensionLectora.pregunta3 || 0;
    
    return total;
  };


  const prepararPayloadTE5 = () => ({
    tipo_evaluacion: "TE5",
    datos_estudiante: {
      nombre_estudiante: datosEvaluacion.nombreEstudiante,
      institucion_id: parseInt(datosEvaluacion.institucionEducativa),
      grado_id: parseInt(datosEvaluacion.grado),
      seccion_id: parseInt(datosEvaluacion.seccion),
      evaluador_id: parseInt(datosEvaluacion.nombreEvaluador),
      fecha: datosEvaluacion.fecha,
      tiempo_evaluacion: elapsedTime
    },
    resultados: {
      descripcion_imagen: evaluacionTE5.lenguajeExpresivo.descripcionImagen,
      definicion_palabras: evaluacionTE5.semantica.definicionPalabras,
      situacion_social: evaluacionTE5.pragmatica.situacionSocial,
      repeticion_oracion: evaluacionTE5.morfosintaxis.repeticionOracion,
      instruccion_doble: evaluacionTE5.comprensionAuditiva.instruccionDoble,
      pregunta1: evaluacionTE5.comprensionLectora.pregunta1,
      pregunta2: evaluacionTE5.comprensionLectora.pregunta2,
      pregunta3: evaluacionTE5.comprensionLectora.pregunta3
    }
  });

  const interpretarPuntajeTE5 = (puntaje) => {
    if (puntaje >= 13) {
      return {
        nivel: "Dentro de lo esperado",
        accion: "Sin indicios de dificultad significativa"
      };
    } else if (puntaje >= 9) {
      return {
        nivel: "Riesgo leve",
        accion: "Observar, posible monitoreo"
      };
    } else {
      return {
        nivel: "Riesgo moderado-alto",
        accion: "Derivar a la evaluación"
      };
    }
  };

  const handleGuardarTest = async () => {
    try {
      const payload = credentials.terapia === 'TE3' ? prepararPayloadTE3() : prepararPayloadTE5();
      const response = await guardarTest(payload);
      
      // Si llegamos aquí, significa que la petición fue exitosa
      setModalMessage('La evaluación se ha guardado correctamente');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar:', error);
      setModalMessage('Error al guardar la evaluación');
      setShowModal(true);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      // Cargar instituciones
      setCargandoInstituciones(true);
      try {
        const dataInstituciones = await getInstituciones();
        setInstituciones(dataInstituciones);
      } catch (error) {
        setErrorInstituciones('Error al cargar las instituciones');
        console.error('Error:', error);
      } finally {
        setCargandoInstituciones(false);
      }

      // Cargar secciones
      setCargandoSecciones(true);
      try {
        const dataSecciones = await getSecciones();
        setSecciones(dataSecciones);
      } catch (error) {
        setErrorSecciones('Error al cargar las secciones');
        console.error('Error:', error);
      } finally {
        setCargandoSecciones(false);
      }

      // Cargar grados
      setCargandoGrados(true);
      try {
        const dataGrados = await getGrados();
        setGrados(dataGrados);
      } catch (error) {
        setErrorGrados('Error al cargar los grados');
        console.error('Error:', error);
      } finally {
        setCargandoGrados(false);
      }

      // Cargar trabajadores
      setCargandoTrabajadores(true);
      try {
        const dataTrabajadores = await getTrabajadores();
        setTrabajadores(dataTrabajadores);
      } catch (error) {
        setErrorTrabajadores('Error al cargar los trabajadores');
        console.error('Error:', error);
      } finally {
        setCargandoTrabajadores(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isAuthenticated) {
        e.preventDefault();
        e.returnValue = '';
        return 'Si cierra o actualiza la página, se perderá toda la información ingresada. ¿Está seguro?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated]);

  return (
    <div className="preguntas-container">
      {!isAuthenticated ? (
        <div className="auth-modal">
          <div className="auth-content">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Usuario:</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Terapia:</label>
                <select
                  value={credentials.terapia}
                  onChange={(e) => setCredentials({...credentials, terapia: e.target.value})}
                  required
                >
                  <option value="">Seleccione una terapia</option>
                  <option value="TE3">Terapia de Lenguaje (1° y 2° grado)</option>
                  <option value="TE5">Terapia de Lenguaje (5° y 6° grado)</option>
                  {/* <option value="TO">Terapia Ocupacional</option>
                  <option value="TF">Terapia Física</option>
                  <option value="TP">Terapia Psicológica</option> */}
                </select>
              </div>
              <button type="submit" className="login-button">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="timer-container">
            {formatTime(elapsedTime)}
          </div>
          <div className="evaluacion-container">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'descripcion' || activeTab === 'descripcionTE3' ? 'active' : ''}`}
                onClick={() => setActiveTab(credentials.terapia === 'TE3' ? 'descripcionTE3' : 'descripcion')}
              >
                Descripción General
              </button>
              <button 
                className={`tab ${activeTab === 'registro' ? 'active' : ''}`}
                onClick={() => setActiveTab('registro')}
              >
                Hoja de Registro
              </button>
              <button 
                className={`tab ${activeTab === 'test' ? 'active' : ''}`}
                onClick={() => setActiveTab('test')}
              >
                Test Detallado
              </button>
            </div>

            {(activeTab === 'descripcion' && credentials.terapia === 'TE5') && (
              <div className="prueba-descripcion">
                <h1>PRUEBA DE LENGUAJE – NIVEL PRIMARIA (5° y 6° GRADO)</h1>
                
                <div className="prueba-info">
                  <p><strong>Duración:</strong> 15 minutos por niño(a)</p>
                  <p><strong>Finalidad:</strong> Detección temprana de dificultades en el lenguaje para derivación a evaluación especializada.</p>
                </div>

                <div className="areas-container">
                  <h2 className="areas-titulo">ÁREAS A EVALUAR</h2>

                  <div className="area">
                    <h3>1. Expresión Oral</h3>
                    <p>Evaluar la capacidad del niño(a) para organizar y expresar ideas de forma coherente y fluida.</p>
                    <p><em>Actividad:</em> Narración de historias o experiencia personal.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Narración de historias), ELCE (Producción oral espontánea).</p>
                  </div>

                  <div className="area">
                    <h3>2. Semántica</h3>
                    <p>Evaluar el uso y comprensión del vocabulario, así como relaciones semánticas.</p>
                    <p><em>Actividad:</em> Definiciones, sinónimos, uso contextual de palabras.</p>
                    <p><strong>Referencia:</strong> ELCE (Vocabulario y relaciones léxicas), CELF-5 (Definiciones), PLON (Denominación).</p>
                  </div>

                  <div className="area">
                    <h3>3. Pragmática</h3>
                    <p>Evaluar el uso del lenguaje en contextos sociales y la adecuación conversacional.</p>
                    <p><em>Actividad:</em> Responder a situaciones hipotéticas.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Pragmática), ELCE (Competencia pragmática), PLON.</p>
                  </div>

                  <div className="area">
                    <h3>4. Morfosintaxis</h3>
                    <p>Evaluar el uso correcto de estructuras gramaticales y concordancia.</p>
                    <p><em>Actividad:</em> Completar, corregir y crear oraciones.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Formulación y estructura), ELCE, PLON.</p>
                  </div>

                  <div className="area">
                    <h3>5. Comprensión Oral</h3>
                    <p>Evaluar la comprensión de textos orales y la capacidad para responder preguntas.</p>
                    <p><em>Actividad:</em> Escuchar un texto breve y responder preguntas.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Comprensión auditiva), ELCE, PLON.</p>
                  </div>
                </div>

                <div className="navigation-buttons">
                  <div></div>
                  <button 
                    className="nav-button next"
                    onClick={() => handleNavigation('next')}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'descripcionTE3' && credentials.terapia === 'TE3') && (
              <div className="prueba-descripcion">
                <h1>PRUEBA DE LENGUAJE – NIVEL PRIMARIA (1° y 2° GRADO)</h1>
                
                <div className="prueba-info">
                  <p><strong>Duración:</strong> 10 minutos por niño(a)</p>
                  <p><strong>Finalidad:</strong> Detección temprana de dificultades en el lenguaje para derivación a evaluación especializada.</p>
                </div>

                <div className="areas-container">
                  <h2 className="areas-titulo">ÁREAS A EVALUAR</h2>

                  <div className="area">
                    <h3>1. Expresión Oral</h3>
                    <p>Evaluar la capacidad del niño(a) para organizar y expresar ideas de forma coherente y fluida.</p>
                    <p><em>Actividad:</em> Narración libre o experiencia personal.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Narración de historias), ELCE (Producción oral espontánea).</p>
                  </div>

                  <div className="area">
                    <h3>2. Semántica</h3>
                    <p>Evaluar el uso y comprensión del vocabulario, así como relaciones semánticas.</p>
                    <p><em>Actividad:</em> Definiciones, sinónimos, uso contextual de palabras.</p>
                    <p><strong>Referencia:</strong> ELCE (Vocabulario y relaciones léxicas), CELF-5 (Definiciones), PLON (Denominación).</p>
                  </div>

                  <div className="area">
                    <h3>3. Pragmática</h3>
                    <p>Evaluar el uso del lenguaje en contextos sociales y la adecuación conversacional.</p>
                    <p><em>Actividad:</em> Responder a situaciones hipotéticas.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Pragmática), ELCE (Competencia pragmática), PLON.</p>
                  </div>

                  <div className="area">
                    <h3>4. Morfosintaxis</h3>
                    <p>Evaluar el uso correcto de estructuras gramaticales y concordancia.</p>
                    <p><em>Actividad:</em> Completar, corregir y crear oraciones.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Formulación y estructura), ELCE, PLON.</p>
                  </div>

                  <div className="area">
                    <h3>5. Comprensión Oral</h3>
                    <p>Evaluar la comprensión de textos orales y la capacidad para responder preguntas.</p>
                    <p><em>Actividad:</em> Escuchar un texto breve y responder preguntas.</p>
                    <p><strong>Referencia:</strong> CELF-5 (Comprensión auditiva), ELCE, PLON.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'registro' && (
              <div className="hoja-observacion">
                <h1 className="hoja-titulo">HOJA DE REGISTRO</h1>
                <div className="datos-principales">
                  <div className="fila">
                    <div className="campo">
                      <label>Nombre del estudiante:</label>
                      <input
                        type="text"
                        value={datosEvaluacion.nombreEstudiante}
                        onChange={(e) => handleInputChange('nombreEstudiante', e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Institución Educativa:</label>
                      <select
                        value={datosEvaluacion.institucionEducativa}
                        onChange={(e) => handleInputChange('institucionEducativa', e.target.value)}
                        disabled={cargandoInstituciones}
                      >
                        <option value="">Seleccione una institución</option>
                        {instituciones.map((institucion) => (
                          <option key={institucion.id} value={institucion.id}>
                            {institucion.nombre}
                          </option>
                        ))}
                      </select>
                      {errorInstituciones && <span className="error-mensaje">{errorInstituciones}</span>}
                      {cargandoInstituciones && <span>Cargando instituciones...</span>}
                    </div>
                  </div>

                  <div className="fila">
                    <div className="campo">
                      <label>Grado:</label>
                      <select
                        value={datosEvaluacion.grado}
                        onChange={(e) => handleInputChange('grado', e.target.value)}
                        disabled={cargandoGrados}
                      >
                        <option value="">Seleccione un grado</option>
                        {grados.map((grado) => (
                          <option key={grado.id} value={grado.id}>
                            {grado.nombre}
                          </option>
                        ))}
                      </select>
                      {errorGrados && <span className="error-mensaje">{errorGrados}</span>}
                      {cargandoGrados && <span>Cargando grados...</span>}
                    </div>
                    <div className="campo">
                      <label>Sección:</label>
                      <select
                        value={datosEvaluacion.seccion}
                        onChange={(e) => handleInputChange('seccion', e.target.value)}
                        disabled={cargandoSecciones}
                      >
                        <option value="">Seleccione una sección</option>
                        {secciones.map((seccion) => (
                          <option key={seccion.id} value={seccion.id}>
                            {seccion.nombre}
                          </option>
                        ))}
                      </select>
                      {errorSecciones && <span className="error-mensaje">{errorSecciones}</span>}
                      {cargandoSecciones && <span>Cargando secciones...</span>}
                    </div>
                  </div>

                  <div className="fila">
                    <div className="campo">
                      <label>Nombre del evaluador:</label>
                      <select
                        value={datosEvaluacion.nombreEvaluador}
                        onChange={(e) => handleInputChange('nombreEvaluador', e.target.value)}
                        disabled={cargandoTrabajadores}
                      >
                        <option value="">Seleccione un evaluador</option>
                        {trabajadores.map((trabajador) => (
                          <option key={trabajador.id} value={trabajador.id}>
                            Lic. {trabajador.nombres} {trabajador.apellidos}
                          </option>
                        ))}
                      </select>
                      {errorTrabajadores && <span className="error-mensaje">{errorTrabajadores}</span>}
                      {cargandoTrabajadores && <span>Cargando evaluadores...</span>}
                    </div>
                    <div className="campo">
                      <label>Fecha:</label>
                      <input
                        type="date"
                        value={datosEvaluacion.fecha}
                        onChange={(e) => handleInputChange('fecha', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="navigation-buttons">
                  <button 
                    className="nav-button prev"
                    onClick={() => handleNavigation('prev')}
                  >
                    ← Anterior
                  </button>
                  <button 
                    className="nav-button next"
                    onClick={() => handleNavigation('next')}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div className="test-container">
                <div className="test-header">
                  <h1>
                    <span className="icon">📋</span> 
                    TEST BREVE DE LENGUAJE ORAL (10 MIN)
                  </h1>
                  <div className="test-info">
                    <p>Para niños de {credentials.terapia === 'TE3' ? '1° y 2°' : '5° y 6°'} de primaria</p>
                    <p><strong>Objetivo:</strong> Detección rápida de posibles dificultades en el habla y lenguaje</p>
                    <p><strong>Aplicación:</strong> Individual</p>
                  </div>
                </div>

                {credentials.terapia === 'TE3' ? (
                  <div className="test-sections">
                    {/* Sección 1: Lenguaje Expresivo */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">1.</span> 
                        LENGUAJE EXPRESIVO
                      </h2>
                      <div className="item">
                        <h3>Item 1.1: Descripción de imagen (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Mira esta imagen y cuéntame todo lo que está pasando."</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-2`}
                                  name={`puntaje-0`} 
                                  value="2"
                                  checked={evaluacionTE3.lenguajeExpresivo.descripcionImagen === 2}
                                  onChange={(e) => handleScoreSelectTE3('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-2`}>
                                  Habla con fluidez, describe 3 o más elementos con coherencia y orden.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-1`}
                                  name={`puntaje-0`} 
                                  value="1"
                                  checked={evaluacionTE3.lenguajeExpresivo.descripcionImagen === 1}
                                  onChange={(e) => handleScoreSelectTE3('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-1`}>
                                  Respuesta poco organizada o con pobres ideas evidentes.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-0`}
                                  name={`puntaje-0`} 
                                  value="0"
                                  checked={evaluacionTE3.lenguajeExpresivo.descripcionImagen === 0}
                                  onChange={(e) => handleScoreSelectTE3('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-0`}>
                                  No logra elaborar un discurso, oraciones sueltas o incompletas.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>1.2: Pronunciación (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Mira esta imagen y dime ¿Qué es?"</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-2`}
                                  name={`puntaje-0`} 
                                  value="2"
                                  checked={evaluacionTE3.lenguajeExpresivo.pronunciacion === 2}
                                  onChange={(e) => handleScoreSelectTE3('lenguajeExpresivo', 'pronunciacion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-2`}>
                                  Habla con precisión articulatoria
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-0`}
                                  name={`puntaje-0`} 
                                  value="0"
                                  checked={evaluacionTE3.lenguajeExpresivo.pronunciacion === 0}
                                  onChange={(e) => handleScoreSelectTE3('lenguajeExpresivo', 'pronunciacion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-0`}>
                                  Presenta errores fonéticos o fonológicos
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 2: Semántica */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">2.</span> 
                        SEMÁNTICA (VOCABULARIO)
                      </h2>
                      <div className="item">
                        <h3>Item 2.1: Definición de palabras (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>Define las siguientes palabras: martillo, hablar</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-2`}
                                  name={`puntaje-1`} 
                                  value="1"
                                  checked={evaluacionTE3.semantica.definicionPalabras === 1}
                                  onChange={(e) => handleScoreSelectTE3('semantica', 'definicionPalabras', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-2`}>
                                  Define con precisión
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-0`}
                                  name={`puntaje-1`} 
                                  value="0"
                                  checked={evaluacionTE3.semantica.definicionPalabras === 0}
                                  onChange={(e) => handleScoreSelectTE3('semantica', 'definicionPalabras', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-0`}>
                                  No define o definición inadecuada
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Item 2.2: Palabra relacionada (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Mira y escucha con atención, y luego dime las dos palabras que están más relacionadas"</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-2`}
                                  name={`puntaje-1`} 
                                  value="1"
                                  checked={evaluacionTE3.semantica.palabraRelacionada === 1}
                                  onChange={(e) => handleScoreSelectTE3('semantica', 'palabraRelacionada', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-2`}>
                                  Elige las dos palabras correctas
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-0`}
                                  name={`puntaje-1`} 
                                  value="0"
                                  checked={evaluacionTE3.semantica.palabraRelacionada === 0}
                                  onChange={(e) => handleScoreSelectTE3('semantica', 'palabraRelacionada', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-0`}>
                                  Elige incorrecto o no responde
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 3: Pragmática */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">3.</span> 
                        PRAGMÁTICA (USO SOCIAL)
                      </h2>
                      <div className="item">
                        <h3>Item 3.1: Respuesta ante situación social (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>Si un niño te empuja dentro del aula, ¿Qué harías tú?</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-2-2`}
                                  name={`puntaje-2`} 
                                  value="2"
                                  checked={evaluacionTE3.pragmatica.situacionSocial === 2}
                                  onChange={(e) => handleScoreSelectTE3('pragmatica', 'situacionSocial', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-2-2`}>
                                  Muestra comprensión social y propone una acción apropiada
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-2-1`}
                                  name={`puntaje-2`} 
                                  value="1"
                                  checked={evaluacionTE3.pragmatica.situacionSocial === 1}
                                  onChange={(e) => handleScoreSelectTE3('pragmatica', 'situacionSocial', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-2-1`}>
                                  Respuesta poco clara o incompleta
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-2-0`}
                                  name={`puntaje-2`} 
                                  value="0"
                                  checked={evaluacionTE3.pragmatica.situacionSocial === 0}
                                  onChange={(e) => handleScoreSelectTE3('pragmatica', 'situacionSocial', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-2-0`}>
                                  No comprende la situación o responde fuera de contexto
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 4: Morfosintaxis */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">4.</span> 
                        MORFOSINTAXIS
                      </h2>
                      <div className="item">
                        <h3>Item 4.1: Repetición de oración completa (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>Repite esta frase exactamente como la digo.</p>
                          <p><strong>Frase:</strong> "El perro blanco grande se comió toda la comida del gato."</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-3-2`}
                                  name={`puntaje-3`} 
                                  value="2"
                                  checked={evaluacionTE3.morfosintaxis.repeticionOracion === 2}
                                  onChange={(e) => handleScoreSelectTE3('morfosintaxis', 'repeticionOracion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-3-2`}>
                                  Repite correctamente toda la oración
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-3-1`}
                                  name={`puntaje-3`} 
                                  value="1"
                                  checked={evaluacionTE3.morfosintaxis.repeticionOracion === 1}
                                  onChange={(e) => handleScoreSelectTE3('morfosintaxis', 'repeticionOracion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-3-1`}>
                                  Comete 1-2 errores (omisiones, tiempos verbales)
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-3-0`}
                                  name={`puntaje-3`} 
                                  value="0"
                                  checked={evaluacionTE3.morfosintaxis.repeticionOracion === 0}
                                  onChange={(e) => handleScoreSelectTE3('morfosintaxis', 'repeticionOracion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-3-0`}>
                                  Repite menos de la mitad o no logra estructurarla
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 5: Comprensión Auditiva */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">5.</span> 
                        COMPRENSIÓN AUDITIVA
                      </h2>
                      <div className="item">
                        <h3>Item 5.1: Instrucción doble (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Cuando diga YA, toca cabeza y luego tu oreja"</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-4-2`}
                                  name={`puntaje-4`} 
                                  value="1"
                                  checked={evaluacionTE3.comprensionAuditiva.instruccionDoble === 1}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'instruccionDoble', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-4-2`}>
                                  Ejecuta correctamente
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-4-0`}
                                  name={`puntaje-4`} 
                                  value="0"
                                  checked={evaluacionTE3.comprensionAuditiva.instruccionDoble === 0}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'instruccionDoble', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-4-0`}>
                                  No ejecuta
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Item 5.2: Ejecución de indicaciones (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Señala el círculo grande y el círculo pequeño"</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-5-2`}
                                  name={`puntaje-5`} 
                                  value="1"
                                  checked={evaluacionTE3.comprensionAuditiva.ejecucionIndicaciones === 1}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'ejecucionIndicaciones', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-5-2`}>
                                  Ejecuta correctamente
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-5-0`}
                                  name={`puntaje-5`} 
                                  value="0"
                                  checked={evaluacionTE3.comprensionAuditiva.ejecucionIndicaciones === 0}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'ejecucionIndicaciones', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-5-0`}>
                                  No ejecuta
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Item 5.3: Comprensión de frases (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>Señala: "La niña está subiendo por el poste y el niño está columpiándose"</p>
                        </div>
                        <div className="puntaje">
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-6-2`}
                                  name={`puntaje-6`} 
                                  value="1"
                                  checked={evaluacionTE3.comprensionAuditiva.comprensionFrases === 1}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'comprensionFrases', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-6-2`}>
                                  Ejecuta correctamente
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-6-0`}
                                  name={`puntaje-6`} 
                                  value="0"
                                  checked={evaluacionTE3.comprensionAuditiva.comprensionFrases === 0}
                                  onChange={(e) => handleScoreSelectTE3('comprensionAuditiva', 'comprensionFrases', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-6-0`}>
                                  No ejecuta
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="test-sections">
                    {/* Sección 1: Lenguaje Expresivo */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">1.</span> 
                        LENGUAJE EXPRESIVO
                      </h2>
                      <div className="item">
                        <h3>Item 1.1: Descripción de imagen (1 minuto)</h3>
                        <p className="italic">Muestra una imagen compleja (niños en un parque, una calle con varias acciones, etc.)</p>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Mira esta imagen y cuéntame todo lo que está pasando."</p>
                        </div>
                        <div className="puntaje">
                          
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-2`}
                                  name={`puntaje-0`} 
                                  value="2"
                                  checked={evaluacionTE5.lenguajeExpresivo.descripcionImagen === 2}
                                  onChange={(e) => handleScoreSelectTE5('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-2`}>
                                  Habla con fluidez, describe 3 o más elementos con coherencia y orden.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-1`}
                                  name={`puntaje-0`} 
                                  value="1"
                                  checked={evaluacionTE5.lenguajeExpresivo.descripcionImagen === 1}
                                  onChange={(e) => handleScoreSelectTE5('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-1`}>
                                  Respuesta poco organizada o con pobres ideas evidentes.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-0-0`}
                                  name={`puntaje-0`} 
                                  value="0"
                                  checked={evaluacionTE5.lenguajeExpresivo.descripcionImagen === 0}
                                  onChange={(e) => handleScoreSelectTE5('lenguajeExpresivo', 'descripcionImagen', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-0-0`}>
                                  No logra elaborar un discurso, oraciones sueltas o incompletas.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 2: Semántica */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">2.</span> 
                        SEMÁNTICA (VOCABULARIO)
                      </h2>
                      <div className="item">
                        <h3>Item 2.1: Definición de palabras (1 minuto)</h3>
                        <p><strong>Palabras:</strong> bicicleta y responsabilidad</p>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"¿Qué es una bicicleta?" / "¿Qué es la responsabilidad?"</p>
                        </div>
                        <div className="puntaje">
                          
                          
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-2`}
                                  name={`puntaje-1`} 
                                  value="2"
                                  checked={evaluacionTE5.semantica.definicionPalabras === 2}
                                  onChange={(e) => handleScoreSelectTE5('semantica', 'definicionPalabras', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-2`}>
                                  Define con precisión o acierta al concepto principal.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-1-1`}
                                  name={`puntaje-1`} 
                                  value="1"
                                  checked={evaluacionTE5.semantica.definicionPalabras === 1}
                                  onChange={(e) => handleScoreSelectTE5('semantica', 'definicionPalabras', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-1-1`}>
                                  No define o la definición es inadecuada.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 3: Pragmática */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">3.</span> 
                        PRAGMÁTICA (USO SOCIAL)
                      </h2>
                      <div className="item">
                        <h3>Item 3.1: Respuesta ante situación social (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Si un amigo nuevo llega a la clase y no conoce a nadie, ¿qué harías tú?"</p>
                        </div>
                        <div className="puntaje">
                          
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-2-2`}
                                  name={`puntaje-2`} 
                                  value="2"
                                  checked={evaluacionTE5.pragmatica.situacionSocial === 2}
                                  onChange={(e) => handleScoreSelectTE5('pragmatica', 'situacionSocial', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-2-2`}>
                                  Respuesta coherente social y propone una acción apropiada.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-2-1`}
                                  name={`puntaje-2`} 
                                  value="1"
                                  checked={evaluacionTE5.pragmatica.situacionSocial === 1}
                                  onChange={(e) => handleScoreSelectTE5('pragmatica', 'situacionSocial', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-2-1`}>
                                  Respuesta poco clara o incompleta.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 4: Morfosintaxis */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">4.</span> 
                        MORFOSINTAXIS
                      </h2>
                      <div className="item">
                        <h3>Item 4.1: Repetición de oración compleja (1 minuto)</h3>
                        <p><strong>Frase:</strong> "El perro que estaba durmiendo debajo de la mesa se despertó cuando oyó un ruido fuerte."</p>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Repite esta frase exactamente como la digo."</p>
                        </div>
                        <div className="puntaje">
                          
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-3-2`}
                                  name={`puntaje-3`} 
                                  value="2"
                                  checked={evaluacionTE5.morfosintaxis.repeticionOracion === 2}
                                  onChange={(e) => handleScoreSelectTE5('morfosintaxis', 'repeticionOracion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-3-2`}>
                                  Repite correctamente toda la oración.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-3-1`}
                                  name={`puntaje-3`} 
                                  value="1"
                                  checked={evaluacionTE5.morfosintaxis.repeticionOracion === 1}
                                  onChange={(e) => handleScoreSelectTE5('morfosintaxis', 'repeticionOracion', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-3-1`}>
                                  Comete 1-2 errores (omisiones, tiempos verbales).
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 5: Comprensión Auditiva */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">5.</span> 
                        COMPRENSIÓN AUDITIVA
                      </h2>
                      <div className="item">
                        <h3>Item 5.1: Instrucción doble (1 minuto)</h3>
                        <div className="instruccion">
                          <strong>Instrucción:</strong>
                          <p>"Cuando diga YA, levanta la mano izquierda y luego toca tu nariz."</p>
                        </div>
                        <div className="puntaje">
                          
                          <div className="puntaje-descripcion">
                            <p><strong>Criterios:</strong></p>
                            <div className="criterios-radio">
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-4-2`}
                                  name={`puntaje-4`} 
                                  value="2"
                                  checked={evaluacionTE5.comprensionAuditiva.instruccionDoble === 2}
                                  onChange={(e) => handleScoreSelectTE5('comprensionAuditiva', 'instruccionDoble', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-4-2`}>
                                  Ejecuta ambos pasos correctamente.
                                </label>
                              </div>
                              <div className="criterio-option">
                                <input 
                                  type="radio" 
                                  id={`puntaje-4-1`}
                                  name={`puntaje-4`} 
                                  value="1"
                                  checked={evaluacionTE5.comprensionAuditiva.instruccionDoble === 1}
                                  onChange={(e) => handleScoreSelectTE5('comprensionAuditiva', 'instruccionDoble', parseInt(e.target.value))}
                                />
                                <label htmlFor={`puntaje-4-1`}>
                                  Ejecuta sólo una parte.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sección 6: Comprensión Lectora y Oral */}
                    <section className="test-section">
                      <h2>
                        <span className="section-number">6.</span> 
                        COMPRENSIÓN LECTORA Y ORAL
                      </h2>
                      <div className="item">
                        <h3>Item 6.1: Escucha y responde (2 minutos)</h3>
                        <div className="texto-breve">
                          <p><strong>Texto breve (lee el adulto):</strong></p>
                          <p className="italic">"Laura fue a la biblioteca el viernes por la tarde. Sacó un libro de aventuras y otro de animales. Luego se encontró con su amiga Marta en el parque".</p>
                        </div>
                        
                        <div className="preguntas">
                          <p><strong>Preguntas:</strong></p>
                          <ol>
                            <li>
                              <p>¿Qué día fue Laura a la biblioteca?</p>
                              <div className="opciones">
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta1" 
                                    value="1"
                                    checked={evaluacionTE5.comprensionLectora.pregunta1 === 1}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta1', parseInt(e.target.value))}
                                  /> Correcto 
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta1" 
                                    value="0"
                                    checked={evaluacionTE5.comprensionLectora.pregunta1 === 0}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta1', parseInt(e.target.value))}
                                  /> Incorrecto 
                                </label>
                              </div>
                            </li>
                            <li>
                              <p>¿Qué tipo de libros sacó?</p>
                              <div className="opciones">
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta2" 
                                    value="1"
                                    checked={evaluacionTE5.comprensionLectora.pregunta2 === 1}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta2', parseInt(e.target.value))}
                                  /> Correcto
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta2" 
                                    value="0"
                                    checked={evaluacionTE5.comprensionLectora.pregunta2 === 0}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta2', parseInt(e.target.value))}
                                  /> Incorrecto 
                                </label>
                              </div>
                            </li>
                            <li>
                              <p>¿Dónde se encontró con Marta?</p>
                              <div className="opciones">
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta3" 
                                    value="1"
                                    checked={evaluacionTE5.comprensionLectora.pregunta3 === 1}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta3', parseInt(e.target.value))}
                                  /> Correcto
                                </label>
                                <label>
                                  <input 
                                    type="radio" 
                                    name="pregunta3" 
                                    value="0"
                                    checked={evaluacionTE5.comprensionLectora.pregunta3 === 0}
                                    onChange={(e) => handleScoreSelectTE5('comprensionLectora', 'pregunta3', parseInt(e.target.value))}
                                  /> Incorrecto 
                                </label>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                <div className="navigation-buttons">
                  <button 
                    className="nav-button prev"
                    onClick={() => handleNavigation('prev')}
                  >
                    ← Anterior
                  </button>
                  
                  <div></div>
                </div>
              </div>
            )}
          </div>
          
        </>
      )}
      {isAuthenticated && activeTab === 'test' && (
        <button 
          className="save-button"
          onClick={handleGuardarTest}
        >
          Guardar Evaluación
        </button>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-confirmacion">
            <h2>{modalMessage.includes('correctamente') ? '¡Éxito!' : 'Error'}</h2>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preguntas;

