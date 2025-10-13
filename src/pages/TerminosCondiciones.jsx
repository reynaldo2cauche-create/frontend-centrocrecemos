import React, { useState } from 'react'
import { useEffect } from 'react';



import  {initializePageScripts}  from '../utils/initScripts';

export const TerminosCondiciones = () => {
  useEffect(() => {
         initializePageScripts();
       }, []); 

  const terminos = [
    {
      numero: 1,
      titulo: "Aceptación de los Términos",
      contenido: "El acceso y uso de la Plataforma implica la aceptación expresa e incondicional de los presentes Términos. El Usuario declara tener capacidad legal para aceptar estos términos y ser mayor de edad."
    },
    {
      numero: 2,
      titulo: "Finalidad de la Plataforma",
      contenido: "La Plataforma tiene como objetivo:",
      lista: [
        "Facilitar el acceso a los servicios de terapias ofrecidos por Contigo Crecemos E.I.R.L.",
        "Proporcionar información educativa y orientativa relacionada con temas de salud y bienestar.",
        "Brindar acceso a citas, evaluaciones y seguimiento de los servicios contratados."
      ],
      nota: "La información proporcionada en la Plataforma tiene carácter informativo y no reemplaza el diagnóstico o tratamiento profesional."
    },
    {
      numero: 3,
      titulo: "Registro y Uso de la Plataforma",
      lista: [
        "El Usuario deberá crear una cuenta personal con un nombre de usuario y contraseña. Es responsable de mantener la confidencialidad de sus credenciales y de las actividades realizadas desde su cuenta.",
        "El Usuario deberá proporcionar información veraz, completa y actualizada. Contigo Crecemos E.I.R.L. no se responsabiliza por inconvenientes derivados de datos incorrectos o desactualizados.",
        "Está prohibido usar la Plataforma para fines ilegales, fraudulentos o contrarios al orden público y las buenas costumbres."
      ]
    },
    {
      numero: 4,
      titulo: "Responsabilidades del Usuario",
      lista: [
        "Mantener sus dispositivos actualizados y contar con una conexión estable a internet para acceder a la Plataforma.",
        "No transmitir contenidos que puedan infringir derechos de terceros o que contengan virus informáticos u otros elementos dañinos.",
        "Reportar inmediatamente a Contigo Crecemos E.I.R.L. cualquier uso no autorizado de su cuenta."
      ]
    },
    {
      numero: 5,
      titulo: "Limitación de Responsabilidad",
      contenido: "Contigo Crecemos E.I.R.L. no será responsable por:",
      lista: [
        "Fallas técnicas, interrupciones del servicio o errores que puedan ocurrir en la Plataforma.",
        "Daños directos, indirectos o incidentales derivados del uso o imposibilidad de uso de la Plataforma.",
        "Contenidos de terceros accesibles mediante enlaces en la Plataforma."
      ]
    },
    {
      numero: 6,
      titulo: "Propiedad Intelectual",
      contenido: "Todos los derechos sobre la Plataforma, incluyendo marcas, logotipos, textos, gráficos, diseño y software, son propiedad exclusiva de Contigo Crecemos E.I.R.L. o de sus licenciantes. Queda prohibido copiar, reproducir, modificar o distribuir estos contenidos sin autorización expresa por escrito."
    },
    {
      numero: 7,
      titulo: "Política de Protección de Datos",
      contenido: "El tratamiento de datos personales se realiza conforme a la Ley N.º 29733 – Ley de Protección de Datos Personales y su reglamento. Los datos recopilados serán utilizados exclusivamente para las finalidades vinculadas a la prestación de los servicios ofrecidos por la empresa.",
      nota: "Para más información sobre el manejo de datos personales, consulte nuestra Política de Privacidad disponible en la Plataforma."
    },
    {
      numero: 8,
      titulo: "Modificaciones de los Términos",
      contenido: "Contigo Crecemos E.I.R.L. se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán publicadas en la Plataforma y entrarán en vigor desde su publicación. Es responsabilidad del Usuario revisar periódicamente los Términos actualizados."
    },
    {
      numero: 9,
      titulo: "Ley Aplicable y Jurisdicción",
      contenido: "Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a los tribunales competentes de la ciudad de Lima Norte."
    },
    {
      numero: 10,
      titulo: "Contacto",
      contenido: "Para consultas o dudas sobre estos Términos, el Usuario puede comunicarse a:",
      contacto: true
    }
  ];

  return (
    <main className="main">
      <div className="page-title-custom">
        <div className="container text-center">
          <h1 data-aos="fade-down">Términos y Condiciones</h1>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
            Centro de Terapias CRECEMOS
          </p>
          <p className="update-date" data-aos="fade-up" data-aos-delay="150">
            Fecha de actualización: 29/09/2025
          </p>
        </div>
      </div>

      <section className="terminos-section">
        <div className="container">
          <div className="empresa-info" data-aos="fade-up">
            <h4>
              <i className="bi bi-building me-2"></i>
              Responsable de la Plataforma
            </h4>
            <p><strong>CONTIGO CRECEMOS E.I.R.L.</strong></p>
            <p><strong>RUC:</strong> 20601074380</p>
            <p><strong>Dirección:</strong> Mz. W1 Lote 5, Urb. El Pinar, Parcela H</p>
            <p>Comas – Lima – Perú</p>
          </div>

          <div className="intro-box" data-aos="fade-up" data-aos-delay="100">
            <p>
              <strong>CONTIGO CRECEMOS E.I.R.L.</strong>, identificado con RUC N.° 20601074380, con 
              domicilio en MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS, pone a 
              disposición de sus pacientes y usuarios (en adelante, "Usuarios") el sitio web y 
              aplicaciones móviles relacionadas con la prestación de servicios terapéuticos (en 
              adelante, "Plataforma"). Al acceder y utilizar la Plataforma, el Usuario declara haber 
              leído, comprendido y aceptado estos Términos y Condiciones, así como la Política de 
              Privacidad asociada.
            </p>
          </div>

          <div className="alert-section" data-aos="fade-up" data-aos-delay="150">
            <i className="bi bi-exclamation-triangle"></i>
            <h4>Importante</h4>
            <p>
              Si el Usuario no está de acuerdo con alguno de los términos aquí establecidos, deberá 
              abstenerse de utilizar la Plataforma y sus servicios.
            </p>
          </div>

          {terminos.map((termino, index) => (
            <div 
              key={termino.numero} 
              className="terminos-item" 
              data-aos="fade-up" 
              data-aos-delay={200 + (index * 50)}
            >
              <span className="terminos-number">{termino.numero}</span>
              <h3>{termino.titulo}</h3>
              
              {termino.contenido && <p>{termino.contenido}</p>}
              
              {termino.lista && (
                <ul className="terminos-list">
                  {termino.lista.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              
              {termino.nota && (
                <div className="info-box">
                  <p>
                    <i className="bi bi-info-circle-fill me-2"></i>
                    <strong>Nota:</strong> {termino.nota}
                  </p>
                </div>
              )}
              
              {termino.contacto && (
                <div className="contact-box">
                  <ul>
                    <li>
                      <i className="bi bi-envelope-fill"></i>
                      <strong>Correo electrónico:</strong> info@crecemos.com.pe
                    </li>
                    <li>
                      <i className="bi bi-telephone-fill"></i>
                      <strong>Teléfono:</strong> 957064401
                    </li>
                    <li>
                      <i className="bi bi-geo-alt-fill"></i>
                      <strong>Dirección:</strong> MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="cta-section" data-aos="fade-up" data-aos-delay="700">
            <h3>¿Necesitas ayuda?</h3>
            <p>Estamos aquí para resolver tus dudas sobre nuestros términos y condiciones.</p>
            <a href="contactanos" className="btn-custom">
              <i className="bi bi-envelope me-2"></i>
              Contactar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
