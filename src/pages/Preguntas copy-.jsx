import React, { useState } from 'react';
import './Preguntas.css';

const Preguntas = () => {
  const [paso, setPaso] = useState(1);
  const [datosNino, setDatosNino] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    grado: '',
    motivoVisita: '',
    otrosCampos: ''
  });
  const [respuestas, setRespuestas] = useState([]);
  const [puntajeTotal, setPuntajeTotal] = useState(0);

  const preguntas = [
    {
      id: 1,
      pregunta: "¿Con qué frecuencia el niño muestra interés en actividades grupales?",
      opciones: [
        { valor: 3, texto: "Siempre" },
        { valor: 2, texto: "Frecuentemente" },
        { valor: 1, texto: "A veces" },
        { valor: 0, texto: "Nunca" }
      ]
    },
    {
      id: 2,
      pregunta: "¿El niño mantiene contacto visual durante las conversaciones?",
      opciones: [
        { valor: 3, texto: "Siempre" },
        { valor: 2, texto: "Frecuentemente" },
        { valor: 1, texto: "A veces" },
        { valor: 0, texto: "Nunca" }
      ]
    },
    {
      id: 3,
      pregunta: "¿Puede seguir instrucciones simples sin dificultad?",
      opciones: [
        { valor: 3, texto: "Siempre" },
        { valor: 2, texto: "Frecuentemente" },
        { valor: 1, texto: "A veces" },
        { valor: 0, texto: "Nunca" }
      ]
    },
    {
      id: 4,
      pregunta: "¿Expresa sus emociones de manera adecuada?",
      opciones: [
        { valor: 3, texto: "Siempre" },
        { valor: 2, texto: "Frecuentemente" },
        { valor: 1, texto: "A veces" },
        { valor: 0, texto: "Nunca" }
      ]
    },
    {
      id: 5,
      pregunta: "¿Completa las tareas asignadas en el tiempo esperado?",
      opciones: [
        { valor: 3, texto: "Siempre" },
        { valor: 2, texto: "Frecuentemente" },
        { valor: 1, texto: "A veces" },
        { valor: 0, texto: "Nunca" }
      ]
    }
  ];

  return (
    <div className="contenedor">
      <h1>Evaluación Infantil</h1>
      
      <div className="pasos">
        <span className={`paso ${paso === 1 ? 'activo' : ''}`}>Registro</span>
        <span className={`paso ${paso === 2 ? 'activo' : ''}`}>Cuestionario</span>
        <span className={`paso ${paso === 3 ? 'activo' : ''}`}>Resultados</span>
      </div>

      {paso === 1 && (
        <RegistroNino 
          datosNino={datosNino}
          setDatosNino={setDatosNino}
          siguientePaso={() => setPaso(2)}
        />
      )}

      {paso === 2 && (
        <Cuestionario
          preguntas={preguntas}
          respuestas={respuestas}
          setRespuestas={setRespuestas}
          setPuntajeTotal={setPuntajeTotal}
          siguientePaso={() => setPaso(3)}
          pasoAnterior={() => setPaso(1)}
        />
      )}

      {paso === 3 && (
        <Resultados
          datosNino={datosNino}
          respuestas={respuestas}
          preguntas={preguntas}
          puntajeTotal={puntajeTotal}
          pasoAnterior={() => setPaso(2)}
        />
      )}
    </div>
  );
};

const RegistroNino = ({ datosNino, setDatosNino, siguientePaso }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    siguientePaso();
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Registro del Niño</h2>
      <div className="campo">
        <label>Nombres:</label>
        <input
          required
          type="text"
          value={datosNino.nombres}
          onChange={(e) => setDatosNino({...datosNino, nombres: e.target.value})}
        />
      </div>
      <div className="campo">
        <label>Apellidos:</label>
        <input
          required
          type="text"
          value={datosNino.apellidos}
          onChange={(e) => setDatosNino({...datosNino, apellidos: e.target.value})}
        />
      </div>
      <div className="campo">
        <label>Edad:</label>
        <input
          required
          type="number"
          min="0"
          max="18"
          value={datosNino.edad}
          onChange={(e) => setDatosNino({...datosNino, edad: e.target.value})}
        />
      </div>
      <div className="campo">
        <label>Grado:</label>
        <input
          required
          type="text"
          value={datosNino.grado}
          onChange={(e) => setDatosNino({...datosNino, grado: e.target.value})}
        />
      </div>
      <div className="campo">
        <label>Motivo de la visita:</label>
        <textarea
          required
          value={datosNino.motivoVisita}
          onChange={(e) => setDatosNino({...datosNino, motivoVisita: e.target.value})}
        />
      </div>
      <div className="campo">
        <label>Otros campos (opcional):</label>
        <textarea
          value={datosNino.otrosCampos}
          onChange={(e) => setDatosNino({...datosNino, otrosCampos: e.target.value})}
        />
      </div>
      <button type="submit">Siguiente</button>
    </form>
  );
};

const Cuestionario = ({ preguntas, respuestas, setRespuestas, setPuntajeTotal, siguientePaso, pasoAnterior }) => {
  const handleRespuesta = (preguntaId, valor) => {
    const nuevasRespuestas = [...respuestas];
    const index = nuevasRespuestas.findIndex(r => r.preguntaId === preguntaId);
    
    if (index >= 0) {
      nuevasRespuestas[index].valor = valor;
    } else {
      nuevasRespuestas.push({ preguntaId, valor });
    }
    
    setRespuestas(nuevasRespuestas);
    const nuevoTotal = nuevasRespuestas.reduce((sum, resp) => sum + resp.valor, 0);
    setPuntajeTotal(nuevoTotal);
  };

  const puedeAvanzar = respuestas.length === preguntas.length;

  return (
    <div className="cuestionario">
      <h2>Cuestionario de Evaluación</h2>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id} className="pregunta">
          <p>{pregunta.pregunta}</p>
          <div className="opciones">
            {pregunta.opciones.map((opcion) => (
              <label key={opcion.valor} className="opcion-radio">
                <input
                  type="radio"
                  name={`pregunta-${pregunta.id}`}
                  value={opcion.valor}
                  onChange={() => handleRespuesta(pregunta.id, opcion.valor)}
                  checked={respuestas.find(r => r.preguntaId === pregunta.id)?.valor === opcion.valor}
                />
                {opcion.texto}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="botones">
        <button type="button" onClick={pasoAnterior}>Atrás</button>
        <button 
          type="button" 
          onClick={siguientePaso}
          disabled={!puedeAvanzar}
          className={!puedeAvanzar ? 'disabled' : ''}
        >
          Ver Resultados
        </button>
      </div>
      {!puedeAvanzar && (
        <p className="aviso">Por favor, responde todas las preguntas antes de continuar.</p>
      )}
    </div>
  );
};

const Resultados = ({ datosNino, respuestas, preguntas, puntajeTotal, pasoAnterior }) => {
  const puntajeMaximo = preguntas.length * 3;
  
  const getNivelResultado = (puntaje) => {
    const porcentaje = (puntaje / puntajeMaximo) * 100;
    if (porcentaje >= 75) return "Alto";
    if (porcentaje >= 50) return "Medio";
    return "Bajo";
  };

  const getMensajePersonalizado = (nivel) => {
    switch(nivel) {
      case "Alto":
        return "Excelente desempeño. El niño muestra un desarrollo muy positivo en las áreas evaluadas. Se recomienda continuar reforzando estas conductas positivas.";
      case "Medio":
        return "Buen desempeño general. Hay áreas con oportunidad de mejora. Se recomienda trabajar en los aspectos específicos donde se obtuvieron puntuaciones más bajas.";
      default:
        return "Se identifican áreas que requieren atención especial. Se recomienda una evaluación más detallada y la implementación de un plan de intervención específico.";
    }
  };

  const nivel = getNivelResultado(puntajeTotal);

  return (
    <div className="resultados">
      <h2>Resultados de la Evaluación</h2>
      
      <div className="datos-nino">
        <h3>Datos del Niño</h3>
        <p><strong>Nombres:</strong> {datosNino.nombres}</p>
        <p><strong>Apellidos:</strong> {datosNino.apellidos}</p>
        <p><strong>Edad:</strong> {datosNino.edad} años</p>
        <p><strong>Grado:</strong> {datosNino.grado}</p>
        <p><strong>Motivo de la visita:</strong> {datosNino.motivoVisita}</p>
        {datosNino.otrosCampos && (
          <p><strong>Información adicional:</strong> {datosNino.otrosCampos}</p>
        )}
      </div>

      <div className="resultado-final">
        <h3>Evaluación Final</h3>
        <p><strong>Puntaje Total:</strong> {puntajeTotal} de {puntajeMaximo} puntos</p>
        <p><strong>Nivel:</strong> {nivel}</p>
        <p className="mensaje">{getMensajePersonalizado(nivel)}</p>
      </div>

      <div className="resumen-respuestas">
        <h3>Resumen de Respuestas</h3>
        {preguntas.map(pregunta => {
          const respuesta = respuestas.find(r => r.preguntaId === pregunta.id);
          const opcionSeleccionada = pregunta.opciones.find(o => o.valor === respuesta?.valor);
          
          return (
            <div key={pregunta.id} className="respuesta-item">
              <p><strong>Pregunta:</strong> {pregunta.pregunta}</p>
              <p><strong>Respuesta:</strong> {opcionSeleccionada?.texto} ({respuesta?.valor} puntos)</p>
            </div>
          );
        })}
      </div>

      <button onClick={pasoAnterior}>Volver al Cuestionario</button>
    </div>
  );
};

export default Preguntas;
