import React, { useState } from 'react';


const LibroReclamaciones: React.FC = () => {
  const [formData, setFormData] = useState({
    // Datos del consumidor
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    domicilio: '',
    departamento: '',
    provincia: '',
    distrito: '',
    telefono: '',
    email: '',
    
    // Datos del bien contratado
    bienContratado: '',
    montoReclamo: '',
    detalleBien: '',
    
    // Detalle del reclamo
    tipoReclamo: 'queja',
    detalleReclamo: '',
    pedidoConsumidor: '',
    
    // Fecha y lugar
    fechaHecho: '',
    lugarHecho: '',
    
    // Documentos adjuntos
    documentos: [] as File[],
    
    // Aceptación de términos
    aceptaTerminos: false,
    autorizaProcesamiento: false
  });

  const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 
    'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco',
    'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima',
    'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura',
    'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documentos: Array.from(e.target.files!)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos del reclamo:', formData);
    alert('Su reclamo ha sido registrado exitosamente. Nos pondremos en contacto con usted.');
  };

  return (
    <main className="main libro-reclamaciones-page">
      {/* Hero Section */}
      <section className="page-title-custom libro-reclamaciones-hero">
        <div className="container">
          <div className="text-center">
            <h1>Libro de Reclamaciones</h1>
            <p className="page-subtitle">
              En <strong>Centro de Terapia y Desarrollo Crecemos</strong> nos importa tu satisfacción. 
              Registra tu reclamo, queja o sugerencia a través de este formulario oficial.
            </p>
            
          </div>
        </div>
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
      </section>

      {/* Form Section */}
      <section className="terminos-section libro-reclamaciones-section">
        <div className="container">
          <div className="libro-intro-box">
            <p>
              <strong>Importante:</strong> De acuerdo con el Decreto Legislativo N° 295 y la Ley N° 29571, 
              todos los establecimientos comerciales deben contar con un Libro de Reclamaciones a disposición 
              de los consumidores. Su reclamo será atendido en un plazo máximo de 15 días hábiles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="libro-form-item">
            <div className="libro-form-number">1</div>
            <h3>Datos del Consumidor</h3>
            
            <div className="row g-4">
              <div className="col-md-6">
                <label className="libro-form-label">Tipo de Documento *</label>
                <select 
                  className="libro-form-select"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="DNI">DNI</option>
                  <option value="CE">Carnet de Extranjería</option>
                  <option value="PASAPORTE">Pasaporte</option>
                  <option value="RUC">RUC</option>
                </select>
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Número de Documento *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Nombres *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Apellidos *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-12">
                <label className="libro-form-label">Domicilio *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="domicilio"
                  value={formData.domicilio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label className="libro-form-label">Departamento *</label>
                <select 
                  className="libro-form-select"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  {departamentos.map(depto => (
                    <option key={depto} value={depto}>{depto}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4">
                <label className="libro-form-label">Provincia *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-4">
                <label className="libro-form-label">Distrito *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Teléfono / Celular *</label>
                <input
                  type="tel"
                  className="libro-form-control"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Correo Electrónico *</label>
                <input
                  type="email"
                  className="libro-form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>

          <form className="libro-form-item">
            <div className="libro-form-number">2</div>
            <h3>Detalle del Bien o Servicio Contratado</h3>
            
            <div className="row g-4">
              <div className="col-md-6">
                <label className="libro-form-label">Bien o Servicio Contratado *</label>
                <select 
                  className="libro-form-select"
                  name="bienContratado"
                  value={formData.bienContratado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="terapia_psicologica">Terapia Psicológica</option>
                  <option value="terapia_lenguaje">Terapia de Lenguaje</option>
                  <option value="terapia_ocupacional">Terapia Ocupacional</option>
                  <option value="evaluacion_psicologica">Evaluación Psicológica</option>
                  <option value="orientacion_vocacional">Orientación Vocacional</option>
                  <option value="terapia_pareja">Terapia de Pareja</option>
                  <option value="terapia_familiar">Terapia Familiar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Monto Reclamado (S/)</label>
                <input
                  type="number"
                  className="libro-form-control"
                  name="montoReclamo"
                  value={formData.montoReclamo}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div className="col-12">
                <label className="libro-form-label">Detalle del Bien o Servicio *</label>
                <textarea
                  className="libro-form-control"
                  name="detalleBien"
                  value={formData.detalleBien}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Describa detalladamente el bien o servicio por el cual presenta el reclamo..."
                />
              </div>
            </div>
          </form>

          <form className="libro-form-item">
            <div className="libro-form-number">3</div>
            <h3>Detalle del Reclamo</h3>
            
            <div className="row g-4">
              <div className="col-md-6">
                <label className="libro-form-label">Tipo de Reclamo *</label>
                <select 
                  className="libro-form-select"
                  name="tipoReclamo"
                  value={formData.tipoReclamo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="queja">Queja</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="sugerencia">Sugerencia</option>
                </select>
              </div>
              
              <div className="col-md-6">
                <label className="libro-form-label">Fecha del Hecho *</label>
                <input
                  type="date"
                  className="libro-form-control"
                  name="fechaHecho"
                  value={formData.fechaHecho}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-12">
                <label className="libro-form-label">Lugar del Hecho *</label>
                <input
                  type="text"
                  className="libro-form-control"
                  name="lugarHecho"
                  value={formData.lugarHecho}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Consultorio principal, Sede Miraflores, etc."
                />
              </div>
              
              <div className="col-12">
                <label className="libro-form-label">Detalle del Reclamo *</label>
                <textarea
                  className="libro-form-control"
                  name="detalleReclamo"
                  value={formData.detalleReclamo}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  placeholder="Describa detalladamente los hechos que motivan su reclamo, incluyendo fechas, horarios, personas involucradas y cualquier información relevante..."
                />
              </div>
              
              <div className="col-12">
                <label className="libro-form-label">Pedido del Consumidor *</label>
                <textarea
                  className="libro-form-control"
                  name="pedidoConsumidor"
                  value={formData.pedidoConsumidor}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="¿Qué solución espera obtener con este reclamo? (devolución, cambio, disculpas, compensación, etc.)"
                />
              </div>
            </div>
          </form>

          <form className="libro-form-item">
            <div className="libro-form-number">4</div>
            <h3>Documentos Adjuntos</h3>
            
            <div className="libro-info-box">
              <p>
                <i className="bi bi-info-circle me-2"></i>
                Puede adjuntar documentos que respalden su reclamo (fotos, facturas, contratos, 
                correos electrónicos, etc.). Formatos aceptados: PDF, JPG, PNG (Máximo 5MB por archivo).
              </p>
            </div>
            
            <div className="mb-3">
              <label className="libro-form-label">Adjuntar Documentos</label>
              <input
                type="file"
                className="libro-form-control"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <div className="libro-form-text">
                Puede seleccionar múltiples archivos. Límite: 5MB por archivo.
              </div>
            </div>
            
            {formData.documentos.length > 0 && (
              <div className="libro-alert libro-alert-info">
                <strong>Archivos seleccionados:</strong>
                <ul className="mb-0 mt-2">
                  {formData.documentos.map((file, index) => (
                    <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          <form className="libro-form-item">
            <div className="libro-form-number">5</div>
            <h3>Declaraciones y Consentimiento</h3>
            
            <div className="libro-alert-section">
              <i className="bi bi-shield-check"></i>
              <h4>Protección de Datos Personales</h4>
              <p>
                Sus datos personales serán protegidos de acuerdo con la Ley N° 29733 - Ley de Protección 
                de Datos Personales y serán utilizados exclusivamente para la atención de su reclamo.
              </p>
            </div>
            
            <div className="mb-4">
              <div className="libro-form-check">
                <input
                  className="libro-form-check-input"
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleInputChange}
                  required
                />
                <label className="libro-form-check-label">
                  <strong>Declaro bajo juramento que la información proporcionada es veraz y exacta.</strong> 
                  Soy consciente que las declaraciones falsas pueden acarrear responsabilidades legales.
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="libro-form-check">
                <input
                  className="libro-form-check-input"
                  type="checkbox"
                  name="autorizaProcesamiento"
                  checked={formData.autorizaProcesamiento}
                  onChange={handleInputChange}
                  required
                />
                <label className="libro-form-check-label">
                  <strong>Autorizo el tratamiento de mis datos personales</strong> para los fines relacionados 
                  con la atención de mi reclamo, de acuerdo con la Ley de Protección de Datos Personales.
                </label>
              </div>
            </div>
          </form>

          <div className="libro-actions text-center mt-5">
            <button type="submit" className="btn-custom me-3" onClick={handleSubmit}>
              <i className="bi bi-send-check me-2"></i>
              Enviar Reclamo
            </button>
            
          </div>

          {/* Información de Contacto */}
       
        <div className="libro-contact-box mt-5">
        <h4>Información de Contacto</h4>
        <ul>
            <li>
            <i className="bi bi-building"></i>
            <strong>Centro de Terapia y Desarrollo Crecemos</strong>
            </li>
            <li>
            <i className="bi bi-telephone"></i>
            <strong>Teléfono:</strong> 934 005 200
            </li>
            <li>
            <i className="bi bi-envelope"></i>
            <strong>Email:</strong> info@crecemos.com.pe
            </li>
          <li>
            <i className="bi bi-clock"></i>
            <div>
                <strong>Horario de Atención:</strong><br/>
                Lunes a Viernes: 11:00 AM - 8:00 PM<br/>
                Sábados: 8:00 AM - 2:00 PM<br/>
                Domingos: Cerrado
            </div>
            </li>
            <li>
            <i className="bi bi-geo-alt"></i>
            <strong>Dirección:</strong> Lima, Perú
            </li>
        </ul>
        </div>
        </div>
      </section>
    </main>
  );
};

export default LibroReclamaciones;