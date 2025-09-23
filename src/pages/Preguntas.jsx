import React, { useState, useEffect } from 'react';
import './Preguntas.css';
import { guardarTest, getInstituciones, getSecciones, getGrados, getTrabajadores, getTiposTest, getEstructuraTest } from '../services/evaluacionService';
import { login } from '../services/authService';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

const Preguntas = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    terapia: ''
  });

  const [activeTab, setActiveTab] = useState('descripcion');
  const [datosEvaluacion, setDatosEvaluacion] = useState({
    nombreEstudiante: '',
    apellidosEstudiante: '',
    grado: '',
    seccion: '',
    fecha: new Date().toLocaleDateString('en-CA'),
    nombreEvaluador: '',
    institucionEducativa: '',
  });

  // Estados para la estructura dinámica del test
  const [estructuraTest, setEstructuraTest] = useState({
    tipoTest: null,
    grupos: []
  });
  const [cargandoEstructura, setCargandoEstructura] = useState(false);
  const [errorEstructura, setErrorEstructura] = useState(null);
  const [respuestas, setRespuestas] = useState({});

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

  const [tiposTest, setTiposTest] = useState([]);
  const [cargandoTiposTest, setCargandoTiposTest] = useState(false);
  const [errorTiposTest, setErrorTiposTest] = useState(null);
  const [tipoTestSeleccionado, setTipoTestSeleccionado] = useState('');

  const [registroError, setRegistroError] = useState('');
  const [testError, setTestError] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState(null);

  // Verificar sesión al cargar el componente
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('token');
      const sessionExpiry = localStorage.getItem('sessionExpiry');
      const tipoTest = localStorage.getItem('tipoTest');
      
      if (token && sessionExpiry && new Date().getTime() < parseInt(sessionExpiry)) {
        setIsAuthenticated(true);
        if (tipoTest) {
          setTipoTestSeleccionado(tipoTest);
        }
      } else {
        // Si la sesión expiró, limpiar todo
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('sessionExpiry');
        localStorage.removeItem('tipoTest');
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Cargar tipos de test
  useEffect(() => {
    const fetchTiposTest = async () => {
      setCargandoTiposTest(true);
      try {
        const data = await getTiposTest();
        setTiposTest(data);
      } catch (error) {
        setErrorTiposTest('No se pudo cargar los tipos de test');
      } finally {
        setCargandoTiposTest(false);
      }
    };
    fetchTiposTest();
  }, []);

  // Cargar estructura del test según el tipo seleccionado
  useEffect(() => {
    if (!tipoTestSeleccionado || !isAuthenticated) return;
    const fetchEstructura = async () => {
      setCargandoEstructura(true);
      try {
        const data = await getEstructuraTest(tipoTestSeleccionado);
        setEstructuraTest(data);
      } catch (error) {
        setErrorEstructura('No se pudo cargar la estructura del test');
        console.error('Error:', error);
      } finally {
        setCargandoEstructura(false);
      }
    };
    fetchEstructura();
  }, [tipoTestSeleccionado, isAuthenticated]);

  // Cargar datos del usuario y establecer evaluador
  useEffect(() => {
    const loadUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Asegurarse de que el evaluador se establezca
        setDatosEvaluacion(prev => ({
          ...prev,
          nombreEvaluador: parsedUser.id
        }));
      }
    };

    loadUserData();
  }, [isAuthenticated]); // Agregamos isAuthenticated como dependencia

  // Cargar datos después del login
  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  const handleInputChange = (field, value) => {
    // Si es nombre o apellidos, convertir a mayúsculas y permitir solo texto
    if (field === 'nombreEstudiante' || field === 'apellidosEstudiante') {
      // Remover caracteres que no sean letras o espacios
      const soloTexto = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      setDatosEvaluacion(prev => ({
        ...prev,
        [field]: soloTexto.toUpperCase()
      }));
    } else {
      setDatosEvaluacion(prev => ({
        ...prev,
        [field]: value
      }));
    }
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(credentials);
      
      // Guardar el token y la información del usuario
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Establecer tiempo de expiración (2 horas)
      const expiryTime = new Date().getTime() + (2 * 60 * 60 * 1000);
      localStorage.setItem('sessionExpiry', expiryTime.toString());
      
      setUser(data.user);
      // Establecer el evaluador inmediatamente después del login
      setDatosEvaluacion(prev => ({
        ...prev,
        nombreEvaluador: data.user.id
      }));
      
      setIsAuthenticated(true);
      setActiveTab('descripcion');
    } catch (error) {
      console.error('Error:', error);
      alert('Credenciales incorrectas');
    }
  };

  // Estados para el cronómetro
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && activeTab === 'test') {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, activeTab]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsRunning(true);
    }
  }, [isAuthenticated]);

  const handleRespuesta = (preguntaId, puntaje) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: puntaje
    }));
  };

  const calcularPuntajeTotal = () => {
    return Object.values(respuestas).reduce((total, puntaje) => total + (puntaje || 0), 0);
  };

  const prepararPayload = () => {
    // Datos del estudiante
    const estudiante = {
      nombre_estudiante: datosEvaluacion.nombreEstudiante.toUpperCase(),
      apellidos_estudiante: datosEvaluacion.apellidosEstudiante.toUpperCase(),
      institucion: parseInt(datosEvaluacion.institucionEducativa),
      grado: parseInt(datosEvaluacion.grado),
      seccion: parseInt(datosEvaluacion.seccion),
      evaluador: parseInt(datosEvaluacion.nombreEvaluador || user?.id),
      fecha: datosEvaluacion.fecha,
      tiempo_evaluacion: elapsedTime
    };

    // Recorrer todas las preguntas del test para armar los resultados
    const resultados = [];
    estructuraTest.grupos?.forEach(grupo => {
      grupo.preguntas_grupo.forEach(preguntaGrupo => {
        const preguntaId = preguntaGrupo.pregunta.id;
        const puntajeSeleccionado = respuestas[preguntaId];
        if (puntajeSeleccionado !== undefined) {
          // Buscar la opción seleccionada
          const opcionSeleccionada = preguntaGrupo.pregunta.opciones.find(
            op => op.puntaje === puntajeSeleccionado
          );
          if (opcionSeleccionada) {
            resultados.push({
              tipo_test: parseInt(estructuraTest.tipoTest?.id || tipoTestSeleccionado),
              pregunta: preguntaId,
              opcion: opcionSeleccionada.id,
              puntaje: puntajeSeleccionado
            });
          }
        }
      });
    });

    return {
      estudiante,
      resultados,
      tipo_test: parseInt(estructuraTest.tipoTest?.id || tipoTestSeleccionado)
    };
  };

  const handleGuardarTest = async () => {
    try {
      const payload = prepararPayload();
      const response = await guardarTest(payload);
      setPuntajeTotal(response.puntaje_total);
      setModalMessage('La evaluación se ha guardado correctamente');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar:', error);
      setModalMessage('Error al guardar la evaluación');
      setShowModal(true);
    }
  };

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

  const isRegistroCompleto = () => {
    return (
      datosEvaluacion.nombreEstudiante.trim() !== '' &&
      datosEvaluacion.apellidosEstudiante.trim() !== '' &&
      datosEvaluacion.institucionEducativa !== '' &&
      datosEvaluacion.grado !== '' &&
      datosEvaluacion.seccion !== '' &&
      datosEvaluacion.fecha !== '' &&
      (datosEvaluacion.nombreEvaluador !== '' || user?.id)
    );
  };

  const isTestCompleto = () => {
    // Contar solo las preguntas que tienen opciones (es decir, que requieren respuesta)
    let totalPreguntas = 0;
    estructuraTest.grupos?.forEach(grupo => {
      grupo.preguntas_grupo.forEach(preguntaGrupo => {
        if (preguntaGrupo.pregunta.opciones && preguntaGrupo.pregunta.opciones.length > 0) {
          totalPreguntas++;
        }
      });
    });
    // Contar respuestas dadas
    const totalRespuestas = Object.keys(respuestas).length;
    return totalRespuestas === totalPreguntas && totalPreguntas > 0;    
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    localStorage.removeItem('tipoTest');
    setIsAuthenticated(false);
    setActiveTab('descripcion');
    handleClose();
  };

  const handleTipoTestChange = (e) => {
    const nuevoTipo = e.target.value;
    if (activeTab === 'test' && Object.keys(respuestas).length > 0) {
      const confirmar = window.confirm('Si cambia de test se borrarán todas las opciones marcadas. ¿Desea continuar?');
      if (!confirmar) return;
      setRespuestas({});
    }
    setTipoTestSeleccionado(nuevoTipo);
  };

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
              <button type="submit" className="login-button">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="header-container">
            <div className="timer-container">
              {formatTime(elapsedTime)}
            </div>
            <div style={{ minWidth: 220, marginLeft: 24, marginRight: 24, display: 'flex', alignItems: 'center' }}>
              <select
                value={tipoTestSeleccionado}
                onChange={handleTipoTestChange}
                required
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid #bdbdbd',
                  fontSize: 15
                }}
              >
                <option value="">Seleccione un test</option>
                {tiposTest.map(test => (
                  <option key={test.id} value={test.id}>{test.nombre}</option>
                ))}
              </select>
              {cargandoTiposTest && <span style={{ fontSize: 13, marginLeft: 8 }}>Cargando tipos de test...</span>}
              {errorTiposTest && <span style={{ color: 'red', fontSize: 13, marginLeft: 8 }}>{errorTiposTest}</span>}
            </div>
            <div className="profile-container">
              <div className="user-info">
                <span className="user-name">{user?.nombres} {user?.apellidos}</span>
                <span className="user-role">{user?.rol}</span>
              </div>
              <IconButton
                onClick={handleProfileClick}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="primary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ExitToApp style={{ marginRight: 8 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </div>
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
                onClick={() => {
                  if (isRegistroCompleto()) setActiveTab('test');
                }}
                disabled={!isRegistroCompleto()}
                style={{ cursor: isRegistroCompleto() ? 'pointer' : 'not-allowed', opacity: isRegistroCompleto() ? 1 : 0.5 }}
              >
                Test Detallado
              </button>
            </div>

            {(activeTab === 'descripcion' || activeTab === 'descripcionTE3') && (
              <div className="prueba-descripcion">
                <h1>{estructuraTest.tipoTest?.descripcion || 'NIVEL PRIMARIA'}</h1>
                <div className="prueba-info">
                  <p><strong>Duración:</strong> {estructuraTest.tipoTest?.duracion || '10 minutos por niño(a)'}</p>
                  <p><strong>Finalidad:</strong> {estructuraTest.tipoTest?.finalidad || 'Detección temprana de dificultades en el lenguaje para derivación a evaluación especializada.'}</p>
                </div>
                <div className="areas-container">
                  <h2 className="areas-titulo">ÁREAS A EVALUAR</h2>
                  {estructuraTest.grupos?.map(grupo => (
                    <div key={grupo.id} className="area">
                      <h3>{grupo.nombre}</h3>
                      <p dangerouslySetInnerHTML={{ __html: grupo.descripcion }}></p>
                    </div>
                  ))}
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
                        pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]*"
                        title="Solo se permiten letras y espacios"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>
                    <div className="campo">
                      <label>Apellidos del estudiante:</label>
                      <input
                        type="text"
                        value={datosEvaluacion.apellidosEstudiante}
                        onChange={(e) => handleInputChange('apellidosEstudiante', e.target.value)}
                        pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]*"
                        title="Solo se permiten letras y espacios"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>
                  </div>
                  <div className="fila">
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
                        value={datosEvaluacion.nombreEvaluador || user?.id}
                        onChange={(e) => handleInputChange('nombreEvaluador', e.target.value)}
                        disabled={true}
                      >
                        <option value={user?.id}>
                          Lic. {user?.nombres} {user?.apellidos}
                        </option>
                      </select>
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
                {!isRegistroCompleto() && (
                  <div style={{ color: 'red', marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                    Por favor complete todos los campos antes de continuar.
                  </div>
                )}
                <div className="navigation-buttons">
                  <button 
                    className="nav-button prev"
                    onClick={() => handleNavigation('prev')}
                  >
                    ← Anterior
                  </button>
                  <button 
                    className="nav-button next"
                    onClick={() => {
                      if (isRegistroCompleto()) {
                        handleNavigation('next');
                      }
                    }}
                    disabled={!isRegistroCompleto()}
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
                    {estructuraTest.tipoTest?.titulo_test_detallado || 'TEST BREVE'}
                  </h1>
                  <div className="test-info">
                    <p>Para niños de {estructuraTest.tipoTest?.grados} de {estructuraTest.tipoTest?.nivel}</p>
                    <p><strong>Objetivo: </strong>{estructuraTest.tipoTest?.objetivo}</p>
                    <p><strong>Aplicación: </strong>{estructuraTest.tipoTest?.aplicacion}</p>
                  </div>
                </div>

                {cargandoEstructura && <p>Cargando estructura del test...</p>}
                {errorEstructura && <p style={{color: 'red'}}>{errorEstructura}</p>}
                {!cargandoEstructura && !errorEstructura && estructuraTest.grupos?.length > 0 && (
                  <div className="test-sections">
                    {estructuraTest.grupos.map((grupo) => (
                      <section key={grupo.id} className="test-section">
                        <h2 className="area-titulo">
                          <span className="section-number">{grupo.orden}.</span> {grupo.nombre.toUpperCase()}
                        </h2>
                        {grupo.nombre.toLowerCase().includes('lectora') || grupo.nombre.toLowerCase().includes('comprensión lectora') ? (
                          (() => {
                            const preguntaPrincipalLectora = grupo.preguntas_grupo.find(
                              g => g.pregunta.instruccion && g.pregunta.tiempo
                            );
                            const subPreguntas = grupo.preguntas_grupo.filter(
                              g => !g.pregunta.instruccion && !g.pregunta.tiempo
                            );
                            return (
                              <div className="item-compuesta">
                                <h3 className="item-titulo" style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 0 }}>
                                  {preguntaPrincipalLectora ? `Item ${grupo.orden}.${preguntaPrincipalLectora.orden}: ${preguntaPrincipalLectora.pregunta.nombre} ` : ''}
                                  <span style={{ fontWeight: 'normal', color: '#1976d2' }}>
                                    {preguntaPrincipalLectora && `(${preguntaPrincipalLectora.pregunta.tiempo})`}
                                  </span>
                                </h3>
                                <div style={{ background: '#f8fafd', borderLeft: '3px solid #4cafef', padding: 10, marginBottom: 10, marginTop: 8 }}>
                                  <strong>Texto breve (lee el adulto):</strong>
                                  <p style={{ margin: 0 }}>{preguntaPrincipalLectora && preguntaPrincipalLectora.pregunta.instruccion}</p>
                                </div>
                                <div style={{ marginBottom: 10, fontWeight: 'bold' }}>Preguntas:</div>
                                {subPreguntas.map((preguntaGrupo, idx) => (
                                  <div key={preguntaGrupo.id} style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                                    <div style={{ marginBottom: 6 }}>
                                      <span style={{ fontWeight: 'bold' }}>{idx + 1}.</span> {preguntaGrupo.pregunta.nombre}
                                    </div>
                                    <div className="criterios-radio">
                                      {preguntaGrupo.pregunta.opciones.map(opcion => (
                                        <div className="criterio-option" key={opcion.id} style={{ marginBottom: 5 }}>
                                          <input
                                            type="radio"
                                            name={`pregunta-${preguntaGrupo.pregunta.id}`}
                                            value={opcion.puntaje}
                                            checked={respuestas[preguntaGrupo.pregunta.id] === opcion.puntaje}
                                            onChange={() => handleRespuesta(preguntaGrupo.pregunta.id, opcion.puntaje)}
                                          />
                                          <label style={{ marginLeft: 6 }}>{opcion.descripcion}</label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()
                        ) : (
                          grupo.preguntas_grupo.map((preguntaGrupo) => (
                            <div key={preguntaGrupo.id} className="item">
                              <h3 className="item-titulo" style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 0 }}>
                                {`Item ${grupo.orden}.${preguntaGrupo.orden}: ${preguntaGrupo.pregunta.nombre} `}
                                <span style={{ fontWeight: 'normal', color: '#1976d2' }}>
                                  {preguntaGrupo.pregunta.tiempo ? `(${preguntaGrupo.pregunta.tiempo})` : ''}
                                </span>
                              </h3>
                              {preguntaGrupo.pregunta.instruccion && (
                                <div className="instruccion" style={{ background: '#f8fafd', borderLeft: '3px solid #4cafef', padding: 10, marginBottom: 10, marginTop: 8 }}>
                                  <strong>Instrucción:</strong>
                                  <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: preguntaGrupo.pregunta.instruccion }} />
                                </div>
                              )}
                              <div className="puntaje">
                                <p style={{ fontWeight: 'bold', marginBottom: 5 }}>Criterios:</p>
                                <div className="criterios-radio">
                                  {preguntaGrupo.pregunta.opciones.map(opcion => (
                                    <div className="criterio-option" key={opcion.id} style={{ marginBottom: 5 }}>
                                      <input
                                        type="radio"
                                        name={`pregunta-${preguntaGrupo.pregunta.id}`}
                                        value={opcion.puntaje}
                                        checked={respuestas[preguntaGrupo.pregunta.id] === opcion.puntaje}
                                        onChange={() => handleRespuesta(preguntaGrupo.pregunta.id, opcion.puntaje)}
                                      />
                                      <label style={{ marginLeft: 6 }}>{opcion.descripcion}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </section>
                    ))}
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
          {isAuthenticated && activeTab === 'test' && (
            <>
              {!isTestCompleto() && (
                <div style={{ color: 'red', marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                  Por favor responda todas las preguntas antes de guardar la evaluación.
                </div>
              )}
              <button 
                className="save-button"
                onClick={handleGuardarTest}
                disabled={!isTestCompleto()}
              >
                Guardar Evaluación
              </button>
            </>
          )}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-confirmacion">
                <h2>{modalMessage.includes('correctamente') ? '¡Éxito!' : 'Error'}</h2>
                <p>{modalMessage}</p>
                {modalMessage.includes('correctamente') && (
                  <p>Puntaje Total: {puntajeTotal}</p>
                )}
                <button onClick={() => {
                  setShowModal(false);
                  setActiveTab('descripcion');
                  setElapsedTime(0);
                  setDatosEvaluacion({
                    nombreEstudiante: '',
                    apellidosEstudiante: '',
                    grado: '',
                    seccion: '',
                    fecha: new Date().toLocaleDateString('en-CA'),
                    nombreEvaluador: '',
                    institucionEducativa: '',
                  });
                  setRespuestas({});
                  setRegistroError('');
                  setTestError('');
                  setPuntajeTotal(0);
                }}>
                  Aceptar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Preguntas;
