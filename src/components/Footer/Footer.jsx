import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Instagram,
  YouTube,

} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
 
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            
            {/* Columna 1: Información */}
            <div className="col-lg-3 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <img src="/logo-text-short.png" alt="Crecemos Logo" />
              </a>
              <div className="footer-contact pt-3">
                <p>Calle 48 Nro. 234 Urbanización El Pinar, Comas 15316</p>
                <p>Lima, Perú</p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a href="tel:+51957064401">
                    <span>+51 957 064 401</span>
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>
                  <a href="mailto:info@crecemos.com.pe?subject=Consulta%20desde%20la%20web&body=Hola,%20quisiera%20más%20información%20sobre...">
                    {' '}<span>info@crecemos.com.pe</span>
                  </a>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="https://www.facebook.com/CentrodeTerapiasCrecemos" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook" />
                </a>
                <a href="https://www.instagram.com/centro_crecemos/" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram" />
                </a>
                <a href="https://www.youtube.com/@centrodeterapiacrecemos677" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube" />
                </a>
                <a href="https://www.tiktok.com/@centrocrecemos" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-tiktok" />
                </a>
              </div>
            </div>

            {/* Columna 2: Enlaces */}
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Enlaces Útiles</h4>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/servicios">Servicios</a></li>
                <li><a href="/staff">Especialistas</a></li>
                <li><a href="/contactanos">Contacto</a></li>
              </ul>
            </div>

            {/* Columna 3: Horarios */}
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Horarios de Atención</h4>
              <ul>
                <li>Lunes - Viernes: 11:00 AM - 8:00 PM</li>
                <li>Sábados: 8:00 AM - 2:00 PM</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>

            {/* Columna 4: Legales */}
              <div className="col-lg-3 col-md-6 footer-links">
              <h4>Legales</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/registro-paciente'); }}>
                    Registro de Paciente
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/mantenimiento'); }}>
                    Trabaja con Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terminos-condiciones'); }}>
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/politica-privacidad'); }}>
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/reglamento-interno'); }}>
                    Reglamento Interno para Clientes
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename">Centro Crecemos</strong>{' '}
          <span>Todos los derechos reservados</span>
        </p>
        <div className="credits">
          Desarrollado por Vaxa |{' '}
          <a href="https://www.vaxa.com.pe" target="_blank" rel="noopener noreferrer">
            www.vaxa.com.pe
          </a>
        </div>
      </div>
    </footer>
  );
}