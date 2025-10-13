import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { initializePageScripts } from '../utils/initScripts';

export const TrabajaNosotros = () => {
  useEffect(() => {
    initializePageScripts();
    emailjs.init("89VA2AX2iodlkfUDp");
  }, []);

  const [formData, setFormData] = useState({
    specialty: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    subject: '',
    experience: '',
    cv: null
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false
  });
  const [showModal, setShowModal] = useState(false);

  // Validación inline
  const validateField = (name, value) => {
    switch(name){
      case 'firstName':
      case 'lastName':
        if(!value.trim()) return "Este campo es obligatorio.";
        break;
      case 'email':
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Por favor ingresa un correo válido.";
        break;
      case 'mobile':
        if(!/^\d{9}$/.test(value))
          return "El número debe tener exactamente 9 dígitos.";
        break;
      case 'specialty':
        if(!value) return "Debes seleccionar una especialidad.";
        break;
      case 'experience':
        if(!value.trim()) return "Debes describir tu experiencia laboral.";
        break;
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cv: "Solo se permiten archivos PDF o Word." }));
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cv: "El archivo no debe superar los 5MB." }));
        return;
      }
      
      setFormData(prev => ({ ...prev, cv: file }));
      setErrors(prev => ({ ...prev, cv: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const newErrors = {
      specialty: validateField('specialty', formData.specialty),
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      mobile: validateField('mobile', formData.mobile),
      experience: validateField('experience', formData.experience)
    };
    
    setErrors(newErrors);
    
    // Si hay errores, no enviar
    if(Object.values(newErrors).some(msg => msg)) return;
    
    setFormStatus({ loading: true, success: false });
    
    try {
      const templateParams = {
        to_email: 'info@crecemos.com.pe',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.mobile,
        specialty: formData.specialty,
        subject: formData.subject,
        experience: formData.experience,
        reply_to: formData.email
      };

      const response = await emailjs.send(
        'service_4z5rxtl',
        'template_6asz72w',
        templateParams
      );

      if(response.status === 200){
        setFormStatus({ loading: false, success: true });
        setFormData({ 
          specialty: '', 
          firstName: '', 
          lastName: '', 
          mobile: '', 
          email: '', 
          subject: '', 
          experience: '',
          cv: null 
        });
        setErrors({});
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      setFormStatus({ loading: false, success: false });
      alert("Error al enviar la postulación. Intenta nuevamente.");
    }
  };

  return (
    <main className="main">
      <div className="page-title" data-aos="fade">
        <div className="container">
          <h1>Únete a Nuestro Equipo</h1>
          <p className="page-subtitle">
            Postula para formar parte de nuestro equipo de especialistas en terapias de rehabilitación.
          </p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Inicio</a></li>
              <li className="current">Trabaja con Nosotros</li>
            </ol>
          </nav>
        </div>
      </div>

      <section id="job-application" className="job-application section light-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="application-form-container" data-aos="fade-up" data-aos-delay="200">
                <div className="form-header text-center mb-5">
                  <h3>Formulario de Postulación</h3>
                  <p className="text-muted">
                    Completa todos los campos requeridos para postular a una de nuestras especialidades.
                  </p>
                </div>

                <form className="application-form" onSubmit={handleSubmit}>
                  <div className="application-card mb-4">
                    <div className="card-header">
                      <h4>Información Personal</h4>
                    </div>
                    <div className="card-body">
                      <div className="row gy-4">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="firstName" className="form-label">Nombres *</label>
                            <input 
                              type="text" 
                              id="firstName"
                              name="firstName"
                              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                              placeholder="Ingresa tus nombres"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="lastName" className="form-label">Apellidos *</label>
                            <input 
                              type="text" 
                              id="lastName"
                              name="lastName"
                              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                              placeholder="Ingresa tus apellidos"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="mobile" className="form-label">Número Móvil *</label>
                            <input 
                              type="tel" 
                              id="mobile"
                              name="mobile"
                              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                              placeholder="Ej: 987654321"
                              value={formData.mobile}
                              onChange={handleChange}
                            />
                            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email" className="form-label">Correo Electrónico *</label>
                            <input 
                              type="email" 
                              id="email"
                              name="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              placeholder="tu.correo@ejemplo.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="application-card mb-4">
                    <div className="card-header">
                      <h4>Información Profesional</h4>
                    </div>
                    <div className="card-body">
                      <div className="row gy-4">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="specialty" className="form-label">Especialidad *</label>
                            <select 
                              id="specialty"
                              name="specialty"
                              className={`form-select ${errors.specialty ? 'is-invalid' : ''}`}
                              value={formData.specialty}
                              onChange={handleChange}
                            >
                              <option value="">Selecciona tu especialidad</option>
                              <option value="Psicología Infantil">Psicología Infantil</option>
                              <option value="Fisioterapia">Fisioterapia</option>
                              <option value="Terapia de Lenguaje">Terapia de Lenguaje</option>
                              <option value="Terapia Ocupacional">Terapia Ocupacional</option>
                              <option value="Estimulación Temprana">Estimulación Temprana</option>
                              <option value="Terapia Familiar">Terapia Familiar</option>
                              <option value="Psicopedagogía">Psicopedagogía</option>
                              <option value="Musicoterapia">Musicoterapia</option>
                              <option value="Otra">Otra especialidad</option>
                            </select>
                            {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="subject" className="form-label">Asunto</label>
                            <input 
                              type="text" 
                              id="subject"
                              name="subject"
                              className="form-control"
                              placeholder="Ej: Postulación para Terapeuta de Lenguaje"
                              value={formData.subject}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="experience" className="form-label">Experiencia Laboral *</label>
                            <textarea 
                              id="experience"
                              name="experience"
                              className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                              rows="6"
                              placeholder="Describe tu experiencia profesional, formación, especializaciones y logros relevantes..."
                              value={formData.experience}
                              onChange={handleChange}
                            ></textarea>
                            {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="cv" className="form-label">Curriculum Vitae (PDF o Word)</label>
                            <input 
                              type="file" 
                              id="cv"
                              name="cv"
                              className={`form-control ${errors.cv ? 'is-invalid' : ''}`}
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                            />
                            <div className="form-text">
                              Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 5MB.
                            </div>
                            {errors.cv && <div className="invalid-feedback">{errors.cv}</div>}
                            {formData.cv && (
                              <div className="file-selected mt-2">
                                <i className="bi bi-file-earmark-check text-success me-2"></i>
                                Archivo seleccionado: {formData.cv.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="application-actions text-center">
                    {formStatus.error && (
                      <div className="alert alert-danger">{formStatus.error}</div>
                    )}
                    {formStatus.success && !showModal && (
                      <div className="alert alert-success">
                        ¡Tu postulación ha sido enviada exitosamente!
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-check me-2"></i>
                          Enviar Postulación
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "20px", textAlign: "center", padding: "30px" }}>
              <div 
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#4caf50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}
              >
                <i className="bi bi-check2" style={{ fontSize: "40px", color: "#fff" }}></i>
              </div>
              <h4 style={{ marginBottom: "10px", color: "#2e7d32" }}>¡Postulación Enviada!</h4>
              <p style={{ color: "#555", fontSize: "15px" }}>
                Hemos recibido tu postulación y la revisaremos cuidadosamente. 
                Nos pondremos en contacto contigo si tu perfil coincide con nuestras necesidades.
              </p>
              <button 
                className="btn btn-success mt-3 px-4"
                style={{ borderRadius: "10px" }}
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};