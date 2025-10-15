import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormularioTrabaja from '../components/FormularioTrabaja/FormularioTrabaja';

const TrabajaNosotros = () => {
  return (
    <div>
      {/* Hero Section con estilo morado */}
      <section className="hero-trabaja">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center">
              <h1 className="hero-title">
                Únete a Nuestro Equipo
              </h1>
              <p className="hero-subtitle">
                Forma parte de un equipo comprometido con el bienestar emocional y psicológico de nuestros pacientes
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <span className="badge-custom">
                  <i className="bi bi-briefcase me-2"></i>Psicólogos
                </span>
                <span className="badge-custom">
                  <i className="bi bi-heart-pulse me-2"></i>Terapeutas
                </span>
                <span className="badge-custom">
                  <i className="bi bi-person-check me-2"></i>Especialistas
                </span>
                <span className="badge-custom">
                  <i className="bi bi-building me-2"></i>Administrativos
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Beneficios Section */}
      <section className="beneficios-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title-trabaja">
                ¿Por qué trabajar con nosotros?
              </h2>
              <p className="section-subtitle">
                Ofrecemos un ambiente de crecimiento profesional y personal
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="benefit-card text-center">
                <div className="benefit-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h5>Desarrollo Profesional</h5>
                <p>
                  Oportunidades de crecimiento y capacitación continua en tu área de especialización
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="benefit-card text-center">
                <div className="benefit-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h5>Ambiente Colaborativo</h5>
                <p>
                  Trabajo en equipo con profesionales comprometidos y apoyo mutuo
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="benefit-card text-center">
                <div className="benefit-icon">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h5>Impacto Social</h5>
                <p>
                  Contribuye al bienestar emocional de nuestra comunidad
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Formulario Section */}
      <FormularioTrabaja />
    </div>
  );
};

export default TrabajaNosotros;