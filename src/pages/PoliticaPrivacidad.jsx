import React, { useState } from 'react'
import { useEffect } from 'react';



import  {initializePageScripts}  from '../utils/initScripts';

const PoliticaPrivacidad = () => {

  useEffect(() => {
         initializePageScripts();
       }, []); 


  const politicas = [
    {
      numero: 1,
      titulo: "Finalidad del documento",
      contenido: "Esta política tiene por finalidad informar a los pacientes, padres de familia, representantes legales y usuarios en general sobre la forma en que tratamos sus datos personales, conforme a lo establecido en la Ley N.º 29733 – Ley de Protección de Datos Personales y su reglamento."
    },
    {
      numero: 2,
      titulo: "Responsable del tratamiento",
      contenido: "Contigo Crecemos E.I.R.L., con RUC N.º 20601074380 y domicilio en Mz. W1 Lote 5, Urb. El Pinar, Comas – Lima – Perú, es el titular del banco de datos personales."
    },
    {
      numero: 3,
      titulo: "Datos recopilados",
      lista: [
        "Nombre completo, DNI, fecha de nacimiento, dirección",
        "Teléfono y correo electrónico",
        "Información médica, terapéutica y psicológica",
        "Historial de sesiones, evaluaciones e informes",
        "Datos de contacto de padres o apoderados",
        "Información sobre pagos y facturación"
      ]
    },
    {
      numero: 4,
      titulo: "Finalidad del tratamiento",
      contenido: "Los datos personales son utilizados para:",
      lista: [
        "Registrar y gestionar la atención terapéutica",
        "Mantener la historia clínica actualizada",
        "Programar citas y seguimientos clínicos",
        "Elaborar informes de evaluación y evolución",
        "Realizar comunicación con tutores o responsables",
        "Realizar procesos administrativos y contables",
        "Supervisar la calidad del servicio"
      ]
    },
    {
      numero: 5,
      titulo: "Consentimiento",
      contenido: "El ingreso voluntario de información en nuestros formularios y la firma del consentimiento informado constituyen aceptación expresa para el tratamiento de sus datos personales."
    },
    {
      numero: 6,
      titulo: "Conservación de los datos",
      contenido: "Los datos serán almacenados hasta por 5 años después de finalizada la atención, salvo que se solicite formalmente su eliminación con autorización firmada."
    },
    {
      numero: 7,
      titulo: "Seguridad y confidencialidad",
      contenido: "Aplicamos medidas técnicas, organizativas y legales para proteger la confidencialidad e integridad de los datos. El acceso está restringido al personal autorizado."
    },
    {
      numero: 8,
      titulo: "Derechos del titular",
      lista: [
        "Rectificación: Solo puede ser solicitada a través del área de Admisión.",
        "Eliminación: Debe firmarse una autorización del Centro.",
        "Acceso: El acceso a historias clínicas completas está restringido y sujeto a revisión por el Centro."
      ]
    },
    {
      numero: 9,
      titulo: "Transferencia de datos",
      contenido: "Los datos no serán compartidos salvo:",
      lista: [
        "Requerimientos judiciales o legales",
        "Coordinación con instituciones educativas o médicas (con autorización)",
        "Envío de informes a responsables legales autorizados"
      ]
    },
    {
      numero: 10,
      titulo: "Modificaciones",
      contenido: "Los cambios a esta política serán publicados oportunamente a través de nuestros canales oficiales."
    },
    {
      numero: 11,
      titulo: "Aceptación",
      infoBox: true
    }
  ];

  return (
    <>
      <style>{`
        .page-title-custom {
          background: linear-gradient(135deg, #2d465e, #0d83fd);
          padding: 140px 20px 80px;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .page-title-custom h1 {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: var(--contrast-color);
        }

        .page-title-custom .subtitle {
          font-size: 1.1rem;
          opacity: 0.95;
          max-width: 800px;
          margin: 0 auto 15px;
        }

        .page-title-custom .update-date {
          font-size: 0.95rem;
          opacity: 0.85;
          font-style: italic;
        }

        .politica-section {
          padding: 80px 0;
          background-color: var(--background-color);
        }

        .intro-box {
          background: color-mix(in srgb, var(--accent-color), transparent 95%);
          border-left: 5px solid var(--accent-color);
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 50px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.06);
        }

        .intro-box p {
          font-size: 1.05rem;
          line-height: 1.8;
          margin: 0;
          color: var(--default-color);
        }

        .intro-box strong {
          color: var(--heading-color);
          font-weight: 700;
        }

        .politica-item {
          background: var(--surface-color);
          border-radius: 15px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border-left: 5px solid var(--accent-color);
        }

        .politica-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .politica-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: var(--accent-color);
          color: var(--contrast-color);
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .politica-item h3 {
          color: var(--heading-color);
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 25px;
          font-family: var(--heading-font);
        }

        .politica-item p {
          color: var(--default-color);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .politica-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .politica-list li {
          padding: 12px 0 12px 40px;
          position: relative;
          color: var(--default-color);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .politica-list li:before {
          content: "•";
          position: absolute;
          left: 15px;
          color: var(--accent-color);
          font-size: 1.5rem;
          font-weight: bold;
        }

        .info-box {
          background: color-mix(in srgb, var(--accent-color), transparent 92%);
          border-radius: 10px;
          padding: 25px;
          margin: 20px 0;
        }

        .info-box p {
          margin: 0;
          color: var(--heading-color);
          font-weight: 500;
          font-size: 1.05rem;
        }

        .empresa-info {
          background: var(--heading-color);
          color: var(--contrast-color);
          border-radius: 15px;
          padding: 35px;
          margin-bottom: 40px;
          text-align: center;
        }

        .empresa-info h4 {
          color: var(--contrast-color);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .empresa-info p {
          color: var(--contrast-color);
          font-size: 1.05rem;
          margin: 8px 0;
          line-height: 1.8;
        }

        .empresa-info strong {
          font-weight: 600;
        }

        .alert-section {
          background: color-mix(in srgb, var(--accent-color), transparent 90%);
          border-radius: 15px;
          padding: 30px;
          margin: 40px 0;
          text-align: center;
          border: 2px dashed var(--accent-color);
        }

        .alert-section i {
          font-size: 3rem;
          color: var(--accent-color);
          margin-bottom: 15px;
        }

        .alert-section h4 {
          color: var(--heading-color);
          font-size: 1.6rem;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .alert-section p {
          color: var(--default-color);
          font-size: 1.1rem;
          margin: 0;
          line-height: 1.7;
        }

        .cta-section {
          background: color-mix(in srgb, var(--accent-color), transparent 95%);
          padding: 60px 20px;
          text-align: center;
          margin-top: 40px;
          border-radius: 15px;
        }

        .cta-section h3 {
          color: var(--heading-color);
          font-size: 2rem;
          margin-bottom: 20px;
          font-family: var(--heading-font);
        }

        .cta-section p {
          font-size: 1.1rem;
          color: var(--default-color);
          margin-bottom: 30px;
        }

        .btn-custom {
          background: var(--accent-color);
          border: none;
          color: var(--contrast-color);
          padding: 15px 40px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .btn-custom:hover {
          background: color-mix(in srgb, var(--accent-color), black 15%);
          color: var(--contrast-color);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(194, 99, 249, 0.4);
        }

        @media (max-width: 768px) {
          .page-title-custom h1 {
            font-size: 2rem;
          }

          .politica-item {
            padding: 25px;
          }

          .politica-item h3 {
            font-size: 1.5rem;
          }

          .politica-list li {
            font-size: 1rem;
          }

          .empresa-info {
            padding: 25px;
          }
        }
      `}</style>

      <main className="main">
        <div className="page-title-custom">
          <div className="container text-center">
            <h1 data-aos="fade-down">Política de Privacidad y Tratamiento de Datos Personales</h1>
            <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
              Centro de Terapias CRECEMOS
            </p>
            <p className="update-date" data-aos="fade-up" data-aos-delay="150">
              Fecha de actualización: 29/09/2025
            </p>
          </div>
        </div>

        <section className="politica-section">
          <div className="container">
            <div className="empresa-info" data-aos="fade-up">
              <h4>
                <i className="bi bi-building me-2"></i>
                Responsable del Tratamiento
              </h4>
              <p><strong>CONTIGO CRECEMOS E.I.R.L.</strong></p>
              <p><strong>RUC:</strong> 20601074380</p>
              <p><strong>Dirección:</strong> Mz. W1 Lote 5, Urb. El Pinar, Parcela H</p>
              <p>Comas – Lima – Perú</p>
            </div>

            <div className="intro-box" data-aos="fade-up" data-aos-delay="100">
              <p>
                <strong>CONTIGO CRECEMOS E.I.R.L.</strong> se compromete con la protección de los datos personales 
                de sus pacientes y usuarios, conforme a lo establecido en la <strong>Ley N.º 29733 - Ley de Protección 
                de Datos Personales</strong>, su reglamento, y demás normativa aplicable.
              </p>
            </div>

            {politicas.map((politica, index) => (
              <div 
                key={politica.numero} 
                className="politica-item" 
                data-aos="fade-up" 
                data-aos-delay={150 + (index * 50)}
              >
                <span className="politica-number">{politica.numero}</span>
                <h3>{politica.titulo}</h3>
                
                {politica.contenido && <p>{politica.contenido}</p>}
                
                {politica.lista && (
                  <ul className="politica-list">
                    {politica.lista.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {politica.infoBox && (
                  <div className="info-box">
                    <p>
                      <i className="bi bi-check-circle-fill me-2"></i>
                      El uso de nuestros servicios implica la aceptación de esta política de privacidad.
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="alert-section" data-aos="fade-up" data-aos-delay="700">
              <i className="bi bi-shield-check"></i>
              <h4>Tu privacidad es nuestra prioridad</h4>
              <p>
                Cumplimos estrictamente con la Ley N.º 29733 de Protección de Datos Personales del Perú.
                Tus datos están seguros con nosotros.
              </p>
            </div>

            <div className="cta-section" data-aos="fade-up" data-aos-delay="750">
              <h3>¿Tienes dudas sobre tus datos?</h3>
              <p>Contáctanos si necesitas ejercer tus derechos o tienes consultas sobre esta política.</p>
              <a href="contactanos" className="btn-custom">
                <i className="bi bi-envelope me-2"></i>
                Contactar
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PoliticaPrivacidad;