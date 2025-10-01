// src/pages/services-adultos/TerapiaParejaPage.jsx
import React from "react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  {initializePageScripts}  from '../../utils/initScripts';
 const AdultoTerapiaParejaPage = () => {

   useEffect(() => {
         initializePageScripts();
  }, []); 
  
  return (
    <main>
      {/* Page Title */}
      <div className="page-title page-title-custom" data-aos="fade">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>

        <div className="container text-center">
          <h1 className="section-title text-center">Terapia de Pareja</h1>
          <p className="page-subtitle">
            Acompañamos a las parejas en la mejora de su comunicación, el
            fortalecimiento de la confianza y la resolución de conflictos,
            promoviendo relaciones saludables y duraderas con el apoyo de
            especialistas en terapia de pareja.
          </p>
          <nav className="breadcrumbs mt-3">
            <ol>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li className="current">Terapia de Pareja</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Features Section */}
      <section id="terapia-pareja" className="features section">
        <div className="container">
          <div className="d-flex justify-content-center">
            <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#pareja-tab-1"
                >
                  <h4>¿Qué es la Terapia de Pareja?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#pareja-tab-2"
                >
                  <h4>¿Cuándo acudir?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#pareja-tab-3"
                >
                  <h4>¿Cómo trabajamos?</h4>
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
            {/* Qué es */}
            <div
              className="tab-pane fade active show"
              id="pareja-tab-1"
            >
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Terapia de Pareja</h3>
                  <p className="fst-italic">
                    La relación de pareja enfrenta diversos desafíos a lo largo
                    del tiempo, desde problemas de comunicación hasta conflictos
                    emocionales o cambios en la dinámica familiar. Nuestra
                    terapia está diseñada para ayudar a fortalecer la relación,
                    mejorar la convivencia y fomentar un vínculo más saludable.
                  </p>
                  <p>
                    💻 Sesiones <strong>presenciales</strong> y{" "}
                    <strong>virtuales</strong> disponibles.
                  </p>
                  <p
                    className="fw-bold fst-italic"
                    style={{ color: "var(--accent-color)" }}
                  >
                    ❤️ ¡No esperes a que los problemas se agraven! Agenda una
                    consulta y empieza a fortalecer tu relación.
                  </p>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/queesterapiapeareja.jpg"
                    alt="Terapia de Pareja"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Cuándo acudir */}
            <div className="tab-pane fade" id="pareja-tab-2">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>¿Cuándo acudir a terapia de pareja?</h3>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i> Dificultades en la
                      comunicación y frecuentes malentendidos.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Conflictos constantes
                      sin solución efectiva.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Falta de confianza o
                      situaciones de infidelidad.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Pérdida de conexión
                      emocional o afectiva.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Estrés por cambios
                      familiares o laborales.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Diferencias en la
                      crianza de los hijos o toma de decisiones.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Sensación de
                      estancamiento en la relación.
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/cuandoirterapiaparema.jpg"
                    alt="Cuándo acudir a Terapia de Pareja"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Cómo trabajamos */}
            <div className="tab-pane fade" id="pareja-tab-3">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>¿Cómo trabajamos?</h3>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i> Evaluación inicial:
                      identificamos los principales problemas y necesidades de
                      la pareja.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Terapia basada en
                      técnicas efectivas de comunicación y resolución de
                      conflictos.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Desarrollo de
                      estrategias para fortalecer la relación y recuperar la
                      confianza.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Espacios de escucha
                      activa y empatía para mejorar la convivencia.
                    </li>
                  </ul>
                  <div className="mt-4">
                    <p>
                      <i className="bi bi-calendar-check-fill"></i> Reserva tu
                      cita ahora mismo y comienza tu proceso de cambio.
                    </p>
                    <a
                      href="https://api.whatsapp.com/send?phone=+51957064401&text=%E2%9D%A4%EF%B8%8F%20%C2%A1Hola!%20Estoy%20interesado%20en%20la%20terapia%20de%20pareja,%20%C2%BFme%20pueden%20dar%20detalles?"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-warning fw-bold mt-2"
                    >
                      <i className="bi bi-whatsapp"></i> Reservar Cita
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/procesoterapiapareja.jpg"
                    alt="Cómo trabajamos en Terapia de Pareja"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profesionales */}
      <section
        id="team"
        className="team-area section-padding"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="section-title text-center">
            <h2>Profesionales</h2>
            <p>
              Conoce a las especialistas encargadas de brindar las terapias de
              pareja.
            </p>
          </div>

          <div className="row justify-content-center">
            {/* Lic. Giselle Burgos */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="our-team">
                <img
                  src="/assets/img/servicios/Lic. Giselle (1).png"
                  alt="Lic. Giselle Burgos"
                  style={{ height: "300px" }}
                />
                <div className="team-content">
                  <h3 className="title">Lic. Giselle Burgos</h3>
                  <span className="post">Psicología</span>
                  <div className="credential-info">
                    <i className="bi bi-award-fill"></i>
                    <span className="credential-label">CPsP:</span>
                    <span className="credential-number">66683</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default AdultoTerapiaParejaPage;