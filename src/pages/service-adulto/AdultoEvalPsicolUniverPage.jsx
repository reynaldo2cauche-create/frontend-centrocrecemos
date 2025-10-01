import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import  {initializePageScripts}  from '../../utils/initScripts';


 const AdultoEvalPsicolUniverPage = () => {


   useEffect(() => {
       initializePageScripts();
     }, []); 


  return (
    <main>
      {/* Título de la página */}
      <div className="page-title page-title-custom" data-aos="fade">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>

        <div className="container text-center">
          <h1 className="section-title text-center">
            Evaluación Psicológica Universitaria
          </h1>
          <p className="page-subtitle">
            En Centro de Terapias CRECEMOS ofrecemos un servicio especializado
            de Evaluación Psicológica para ingreso o permanencia universitaria,
            dirigido a estudiantes que requieren presentar un informe profesional
            ante instituciones educativas superiores.
          </p>
         <nav className="breadcrumbs mt-3">
          <ol>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li className="current">Evaluación Psicológica Universitaria</li>
          </ol>
        </nav>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="eval-psicologica-universitaria"
        className="features section"
      >
        <div className="container">
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-tabs"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#eval-tab-1"
                >
                  <h4>¿Qué es?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#eval-tab-2"
                >
                  <h4>¿Cuándo solicitarlo?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#eval-tab-3"
                >
                  <h4>¿Qué incluye?</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#eval-tab-4"
                >
                  <h4>¿Por qué elegirnos?</h4>
                </a>
              </li>
            </ul>
          </div>

          <div
            className="tab-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Qué es */}
            <div className="tab-pane fade active show" id="eval-tab-1">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                  <h3>Evaluación Psicológica Universitaria</h3>
                  <p className="fst-italic">
                    Nuestro proceso está diseñado para ser claro, confidencial y
                    alineado con los requerimientos de cada universidad.
                    Contamos con psicólogos colegiados y capacitados en
                    evaluación vocacional, emocional y cognitiva, garantizando
                    un diagnóstico ético y confiable.
                  </p>
                  <p
                    className="fw-bold fst-italic"
                    style={{ color: "var(--accent-color)" }}
                  >
                    🎓 Orientamos tu futuro con respaldo profesional.
                  </p>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src="/assets/img/servicios/queesevaluacionuniversidad.webp"
                    alt="Evaluación Psicológica Universitaria"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Cuándo acudir */}
            <div className="tab-pane fade" id="eval-tab-2">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                  <h3>¿Cuándo solicitar este servicio?</h3>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i> Para cumplir con un
                      requisito de ingreso a la universidad.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Cuando la universidad
                      solicite una evaluación por razones académicas o
                      emocionales.
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i> Para tomar decisiones
                      sobre cambio de carrera, manejo del estrés u organización
                      del tiempo.
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src="/assets/img/servicios/cuandoirevapsicouniversidad.jpg"
                    alt="Cuándo solicitar Evaluación Psicológica Universitaria"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Qué incluye */}
            <div className="tab-pane fade" id="eval-tab-3">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                  <h3>¿Qué incluye?</h3>
                  <ul>
                    <li><i className="bi bi-check2-all"></i> Entrevista clínica.</li>
                    <li><i className="bi bi-check2-all"></i> Pruebas psicológicas actualizadas.</li>
                    <li><i className="bi bi-check2-all"></i> Informe psicológico oficial.</li>
                    <li><i className="bi bi-check2-all"></i> Recomendaciones personalizadas.</li>
                  </ul>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src="/assets/img/servicios/incluyeevapsicouniversidad.webp"
                    alt="Qué incluye Evaluación Psicológica Universitaria"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Por qué elegirnos */}
            <div className="tab-pane fade" id="eval-tab-4">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                  <h3>¿Por qué elegirnos?</h3>
                  <ul>
                    <li><i className="bi bi-check2-all"></i> Atención rápida y empática.</li>
                    <li><i className="bi bi-check2-all"></i> Informes con estándares profesionales.</li>
                    <li><i className="bi bi-check2-all"></i> Acompañamiento durante todo el proceso.</li>
                  </ul>
                  <div className="mt-4">
                    <p>
                      <i className="bi bi-calendar-check-fill"></i> 📍 Agenda tu
                      cita y prepárate para tu futuro universitario con
                      seguridad.
                    </p>
                    <a
                      href="https://api.whatsapp.com/send?phone=+51957064401&text=Hola.%20Deseo%20información%20sobre%20la%20Evaluación%20Psicológica%20Universitaria."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning fw-bold mt-2"
                    >
                      <i className="bi bi-whatsapp"></i> Reservar Cita
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src="/assets/img/servicios/porqueelegirnospsicouniversidad.webp"
                    alt="Por qué elegirnos Evaluación Psicológica Universitaria"
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
            <p>Conoce a las especialistas encargadas de las evaluaciones.</p>
          </div>

          <div className="row justify-content-center">
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
export default AdultoEvalPsicolUniverPage;
