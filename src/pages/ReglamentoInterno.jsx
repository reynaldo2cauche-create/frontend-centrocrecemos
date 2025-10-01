

import React, { useState } from 'react'
import { useEffect } from 'react';



import  {initializePageScripts}  from '../utils/initScripts';

const ReglamentoInterno = () => {

      useEffect(() => {
             initializePageScripts();
           }, []); 
  const reglamentos = [
    {
      numero: 1,
      titulo: "Objetivo",
      contenido: "Establecer normas claras que promuevan una relación transparente y respetuosa entre el cliente y el centro, asegurando un servicio de calidad, ordenado y continuo."
    },
    {
      numero: 2,
      titulo: "Horarios de Atención",
      lista: [
        "Las sesiones se realizarán en el horario previamente coordinado.",
        "La puntualidad es fundamental para el adecuado desarrollo de las terapias.",
        "El retraso por parte del paciente no será compensado con tiempo adicional."
      ]
    },
    {
      numero: 3,
      titulo: "Asistencia y Puntualidad",
      lista: [
        "El paciente debe presentarse con mínimo 5 minutos de anticipación.",
        "La inasistencia sin previo aviso con al menos 24 horas será considerada como sesión tomada.",
        "Se permite reprogramar solo una vez por cada paquete de sesiones, siempre que se avise con anticipación mínima de 24 horas."
      ]
    },
    {
      numero: 4,
      titulo: "Pagos y Facturación",
      lista: [
        "Los pagos deben realizarse por adelantado, ya sea por paquete o sesión individual.",
        "Se entregará comprobante de pago (boleta/factura) a solicitud del cliente.",
        "Las promociones y descuentos aplican solo durante el tiempo establecido y no son acumulables."
      ]
    },
    {
      numero: 5,
      titulo: "Devoluciones",
      lista: [
        "No se realizan devoluciones por inasistencias, tardanzas o cancelaciones fuera del plazo permitido.",
        {
          texto: "En caso de retiro voluntario del programa terapéutico, el cliente podrá solicitar una devolución dentro de los 3 días hábiles posteriores al pago, siempre que:",
          sublista: [
            "No se haya iniciado ninguna sesión.",
            "No se haya generado informe ni evaluación.",
            "El paquete no haya sido usado parcial o totalmente."
          ]
        },
        "La solicitud debe ser por escrito al área administrativa.",
        "El reembolso, si aplica, se realizará dentro de un plazo de 15 días hábiles, por el mismo medio en que se realizó el pago."
      ]
    },
    {
      numero: 6,
      titulo: "Compromiso Terapéutico",
      lista: [
        "Los resultados de las terapias dependen del cumplimiento del plan terapéutico, la frecuencia de sesiones y la colaboración de los padres/tutores.",
        "El seguimiento del paciente incluye entrevistas, evaluaciones periódicas y coordinación con los padres.",
        "En caso de requerir derivación a otro profesional, se informará oportunamente."
      ]
    },
    {
      numero: 7,
      titulo: "Conducta y Respeto",
      lista: [
        "Se espera una actitud respetuosa hacia el personal del centro.",
        "No se permitirá el ingreso a personas en estado inconveniente.",
        "No se permiten grabaciones de sesiones sin autorización previa."
      ]
    },
    {
      numero: 8,
      titulo: "Información y Privacidad",
      lista: [
        "Los datos personales y clínicos del paciente son confidenciales.",
        "El centro cumple con la Ley N° 29733 de Protección de Datos Personales.",
        "El uso de la información se limita únicamente a fines terapéuticos, administrativos y legales."
      ]
    },
    {
      numero: 9,
      titulo: "Comunicación",
      lista: [
        "Toda coordinación se realiza a través del área de admisión o vía WhatsApp oficial.",
        "Cualquier cambio de horario, terapeuta o tipo de servicio será comunicado con anticipación.",
        "Se recomienda mantener contacto activo con el centro para el seguimiento continuo del paciente."
      ]
    },
    {
      numero: 10,
      titulo: "Evaluaciones e Informes",
      lista: [
        "Las evaluaciones se entregan en un plazo de 5 a 10 días hábiles luego de concluido el proceso evaluativo.",
        "Se pueden entregar en formato físico o digital, según requerimiento del cliente.",
        "El informe es válido por un tiempo determinado (usualmente 3 a 6 meses)."
      ]
    }
  ];

  const renderListItem = (item) => {
    if (typeof item === 'string') {
      return <li key={item}>{item}</li>;
    }
    return (
      <li key={item.texto}>
        {item.texto}
        {item.sublista && (
          <ul className="nested-list">
            {item.sublista.map((subitem, idx) => (
              <li key={idx}>{subitem}</li>
            ))}
          </ul>
        )}
      </li>
    );
  };

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
          max-width: 700px;
          margin: 0 auto;
        }

        .reglamento-section {
          padding: 80px 0;
          background-color: var(--background-color);
        }

        .intro-text {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 60px;
          font-size: 1.1rem;
          color: var(--default-color);
          line-height: 1.8;
        }

        .intro-text strong {
          color: var(--heading-color);
          font-weight: 600;
        }

        .reglamento-item {
          background: var(--surface-color);
          border-radius: 15px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border-left: 5px solid var(--accent-color);
        }

        .reglamento-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .reglamento-number {
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

        .reglamento-item h3 {
          color: var(--heading-color);
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 25px;
          font-family: var(--heading-font);
        }

        .reglamento-item p {
          color: var(--default-color);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .reglamento-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .reglamento-list li {
          padding: 12px 0 12px 40px;
          position: relative;
          color: var(--default-color);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .reglamento-list li:before {
          content: "•";
          position: absolute;
          left: 15px;
          color: var(--accent-color);
          font-size: 1.5rem;
          font-weight: bold;
        }

        .nested-list {
          padding-left: 30px;
          margin-top: 10px;
        }

        .nested-list li {
          padding: 8px 0 8px 35px;
          font-size: 1rem;
        }

        .nested-list li:before {
          content: "◦";
          font-size: 1.3rem;
        }

        .highlight-box {
          background: color-mix(in srgb, var(--accent-color), transparent 92%);
          border-radius: 10px;
          padding: 25px;
          margin: 25px 0;
        }

        .highlight-box p {
          margin: 0;
          color: var(--heading-color);
          font-weight: 500;
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

          .reglamento-item {
            padding: 25px;
          }

          .reglamento-item h3 {
            font-size: 1.5rem;
          }

          .reglamento-list li {
            font-size: 1rem;
          }
        }
      `}</style>

      <main className="main">
        <div className="page-title-custom">
          <div className="container text-center">
            <h1 data-aos="fade-down">Reglamento Interno para Clientes</h1>
            <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
              Centro de Terapias CRECEMOS
            </p>
          </div>
        </div>

        <section className="reglamento-section">
          <div className="container">
            <div className="intro-text" data-aos="fade-up">
              <p>
                El <strong>Centro de Terapias Crecemos</strong> agradece la confianza de sus pacientes y familias. 
                Con el objetivo de brindar un servicio terapéutico de calidad, seguro y ordenado, se establece el 
                siguiente reglamento interno de cumplimiento obligatorio:
              </p>
            </div>

            {reglamentos.map((reglamento, index) => (
              <div 
                key={reglamento.numero} 
                className="reglamento-item" 
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 50)}
              >
                <span className="reglamento-number">{reglamento.numero}</span>
                <h3>{reglamento.titulo}</h3>
                
                {reglamento.contenido && <p>{reglamento.contenido}</p>}
                
                {reglamento.lista && (
                  <ul className="reglamento-list">
                    {reglamento.lista.map((item, idx) => renderListItem(item))}
                  </ul>
                )}
              </div>
            ))}

            <div className="cta-section" data-aos="fade-up" data-aos-delay="600">
              <h3>¿Tienes alguna pregunta?</h3>
              <p>Estamos aquí para ayudarte. Contáctanos para cualquier consulta sobre nuestro reglamento.</p>
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

export default ReglamentoInterno;