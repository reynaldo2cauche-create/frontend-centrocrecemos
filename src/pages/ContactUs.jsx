import { useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import { FontSize, ThemePalette } from '../theme/theme'
import { AccessTime, Edit, LocationOn, MailOutline, PhoneInTalk } from '@mui/icons-material';
import { CButton } from '../components/Button';
import { useForm } from 'react-hook-form';
import emailjs from "@emailjs/browser";
import { useEffect } from 'react';
import  {initializePageScripts}  from '../utils/initScripts';
const defaultValues = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
  message: "",
};

const msgRequired = "Este campo es requerido";

export const ContactUs = () => {
  
  
   useEffect(() => {
          initializePageScripts();
        }, []); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    success: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', success: false });

    try {
      const response = await fetch('forms/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setFormStatus({ loading: false, error: '', success: true });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      setFormStatus({ 
        loading: false, 
        error: 'Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.', 
        success: false 
      });
    }
  };

  return (
    <main className="main">
      <div className="page-title" data-aos="fade">
        <div className="container">
          <h1>Contáctanos</h1>
          <p className="page-subtitle">
            Estamos aquí para resolver tus dudas y brindarte la mejor atención. Escríbenos o visítanos.
          </p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Inicio</a></li>
              <li className="current">Contacto</li>
            </ol>
          </nav>
        </div>
      </div>

      <section id="contact" className="contact section light-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-5">
              <div className="info-box" data-aos="fade-up" data-aos-delay="200">
                <h3>Información de Contacto</h3>
                <p>
                  En Centro Crecemos brindamos atención especializada en terapias de rehabilitación 
                  y desarrollo integral para niños y adultos.
                </p>

                <div className="info-item" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="content">
                    <h4>Nuestra Ubicación</h4>
                    <p>Calle 48 Nro. 234</p>
                    <p>Urbanización El Pinar, Comas 15316</p>
                    <p>Lima, Perú</p>
                  </div>
                </div>

                <div className="info-item" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-box">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="content">
                    <h4>Teléfonos</h4>
                    <p><strong>WhatsApp:</strong> +51 957 064 401</p>
                  </div>
                </div>

                <div className="info-item" data-aos="fade-up" data-aos-delay="500">
                  <div className="icon-box">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="content">
                    <h4>Correo Electrónico</h4>
                    <p>info@crecemos.com.pe</p>
                  </div>
                </div>

                <div className="info-item" data-aos="fade-up" data-aos-delay="600">
                  <div className="icon-box">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div className="content">
                    <h4>Horarios de Atención</h4>
                    <p><strong>Lunes - Viernes:</strong> 11:00 AM - 8:00 PM</p>
                    <p><strong>Sábados:</strong> 8:00 AM - 2:00 PM</p>
                    <p><strong>Domingos:</strong> Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
                <h3>Ponte en Contacto</h3>
                <p>
                  Completa el formulario y te contactaremos a la brevedad para brindarte información 
                  sobre nuestros servicios de terapia y rehabilitación.
                </p>

                <div className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Tu Nombre Completo" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="Tu Correo Electrónico" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input 
                        type="tel" 
                        className="form-control" 
                        name="phone" 
                        placeholder="Tu Número de Teléfono" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <select 
                        className="form-control" 
                        name="service" 
                        required
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Servicio de Interés</option>
                        <option value="psicologia-infantil">Psicología Infantil</option>
                        <option value="fisioterapia">Fisioterapia</option>
                        <option value="terapia-lenguaje">Terapia de Lenguaje</option>
                        <option value="terapia-ocupacional">Terapia Ocupacional</option>
                        <option value="estimulacion-temprana">Estimulación Temprana</option>
                        <option value="terapia-familiar">Terapia Familiar</option>
                        <option value="talleres-terapeuticos">Talleres Terapéuticos</option>
                        <option value="consulta-general">Consulta General</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="subject" 
                        placeholder="Asunto del Mensaje" 
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <textarea 
                        className="form-control" 
                        name="message" 
                        rows="6" 
                        placeholder="Cuéntanos sobre tu consulta o necesidad específica..." 
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12 text-center">
                      {formStatus.loading && (
                        <div className="loading">Enviando...</div>
                      )}
                      {formStatus.error && (
                        <div className="error-message">{formStatus.error}</div>
                      )}
                      {formStatus.success && (
                        <div className="sent-message">
                          ¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo pronto.
                        </div>
                      )}

                      <button 
                        type="button" 
                        className="btn" 
                        disabled={formStatus.loading}
                        onClick={handleSubmit}
                      >
                        Enviar Mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12" data-aos="fade-up" data-aos-delay="400">
                <div 
                  className="map-container" 
                  style={{ 
                    borderRadius: '15px', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                  }}
                >
                  <iframe 
                    src="https://maps.google.com/maps?q=Centro+de+Terapias+Crecemos,+Calle+48,+Urbanización+El+Pinar,+Comas+15316,+Lima,+Peru&t=&z=18&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Centro Crecemos - Calle 48, Urbanización El Pinar, Comas"
                  ></iframe>
                </div>
                <div className="text-center mt-3">
                  <p className="text-muted">
                    <i className="bi bi-geo-alt-fill"></i> 
                    <strong>Centro Crecemos:</strong> Calle 48 Nro. 234, Urbanización El Pinar, Comas 15316, Lima - Perú
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/Centro+de+Terapias+Crecemos+Calle+48+Urbanización+El+Pinar+Comas+Lima" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="bi bi-map"></i> Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
