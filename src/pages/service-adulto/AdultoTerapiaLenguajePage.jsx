import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import  {initializePageScripts}  from '../../utils/initScripts';


 const AdultoTerapiaLenguajePage = () => {

    useEffect(() => {
         initializePageScripts();
       }, []);

 return (
    <main>
      {/* Título */}
      <div className="page-title page-title-custom" data-aos="fade">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>

        <div className="container text-center">
          <h1 className="section-title text-center">Terapia de Lenguaje en Adultos</h1>
          <p className="page-subtitle">
            La terapia de lenguaje en adultos está dirigida a personas que presentan
            dificultades en la comunicación, ya sea por trastornos neurológicos,
            accidentes cerebrovasculares, enfermedades degenerativas o problemas
            adquiridos.
          </p>
          <nav className="breadcrumbs mt-3">
            <ol>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li className="current">Terapia de Lenguaje en Adultos</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Features Section */}
      <section id="terapia-lenguaje-adultos" className="features section">
        <div className="container">
          {/* Tabs */}
          <div className="d-flex justify-content-center">
            <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
              <li className="nav-item">
                <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#lenguaje-tab-1">
                  <h4>¿Qué es la Terapia de Lenguaje en Adultos?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#lenguaje-tab-2">
                  <h4>¿Cuándo acudir?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#lenguaje-tab-3">
                  <h4>¿Cómo te ayudamos?</h4>
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
            {/* Qué es */}
            <div className="tab-pane fade active show" id="lenguaje-tab-1">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Terapia de Lenguaje en Adultos</h3>
                  <p className="fst-italic">
                    La terapia de lenguaje en adultos está dirigida a personas que presentan dificultades
                    en la comunicación, ya sea por trastornos neurológicos, accidentes cerebrovasculares,
                    enfermedades degenerativas o problemas adquiridos.
                  </p>
                  <p>
                    💻 Sesiones <strong>presenciales</strong> y <strong>virtuales</strong> disponibles.
                  </p>
                  <p className="fw-bold fst-italic" style={{ color: "var(--accent-color)" }}>
                    🗣️ ¡Mejora tu comunicación y calidad de vida con nuestra terapia especializada!
                  </p>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/queeslenguajeadulto.webp"
                    alt="Terapia de Lenguaje en Adultos"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Cuándo acudir */}
            <div className="tab-pane fade" id="lenguaje-tab-2">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>¿Cuándo acudir a terapia?</h3>
                  <ul>
                    <li><i className="bi bi-check2-all"></i> Dificultades en la pronunciación o articulación.</li>
                    <li><i className="bi bi-check2-all"></i> Problemas en la fluidez verbal (tartamudez).</li>
                    <li><i className="bi bi-check2-all"></i> Trastornos del lenguaje por accidentes cerebrovasculares o traumatismos.</li>
                    <li><i className="bi bi-check2-all"></i> Dificultades en la comprensión y expresión del lenguaje.</li>
                    <li><i className="bi bi-check2-all"></i> Pérdida de la voz o alteraciones en la comunicación.</li>
                    <li><i className="bi bi-check2-all"></i> Problemas de deglución o disfagia.</li>
                  </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/cuandoirlenguajeadulto.jpg"
                    alt="Cuándo acudir a Terapia de Lenguaje en Adultos"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Cómo ayudamos */}
            <div className="tab-pane fade" id="lenguaje-tab-3">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>¿Cómo te ayudamos?</h3>
                  <ul>
                    <li><i className="bi bi-check2-all"></i> Rehabilitación del habla y la comunicación.</li>
                    <li><i className="bi bi-check2-all"></i> Ejercicios para mejorar la articulación y fluidez verbal.</li>
                    <li><i className="bi bi-check2-all"></i> Estrategias para recuperar y fortalecer la voz.</li>
                    <li><i className="bi bi-check2-all"></i> Apoyo en la comprensión y producción del lenguaje.</li>
                    <li><i className="bi bi-check2-all"></i> Terapia para mejorar la deglución.</li>
                  </ul>
                  <div className="mt-4">
                    <p><i className="bi bi-calendar-check-fill"></i> Reserva tu cita ahora mismo.</p>
                    <a
                      href="https://api.whatsapp.com/send?phone=+51957064401&text=🗣️%20¡Hola!%20Estoy%20interesado%20en%20la%20terapia%20de%20lenguaje%20en%20adultos,%20¿me%20pueden%20dar%20detalles?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning fw-bold mt-2"
                    >
                      <i className="bi bi-whatsapp"></i> Reservar Cita
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="/assets/img/servicios/procesorlenguajeadulto.jpg"
                    alt="Cómo ayudamos en Terapia de Lenguaje en Adultos"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profesionales */}
      <section id="team" className="team-area section-padding" data-aos="fade-up">
        <div className="container">
          <div className="section-title text-center">
            <h2>Profesionales</h2>
            <p>Conoce a las especialistas encargadas de brindar las terapias de lenguaje.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="our-team">
                <img src="/assets/img/servicios/merlin.jpg" alt="Lic. Merlín Fernandez" />
                <div className="team-content">
                  <h3 className="title">Lic. Merlín Fernandez</h3>
                  <span className="post">Terapeuta de Lenguaje</span>
                  <div className="credential-info">
                    <i className="bi bi-award-fill"></i>
                    <span className="credential-label">CTMP</span>
                    <span className="credential-number">12937</span>
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
export default AdultoTerapiaLenguajePage;