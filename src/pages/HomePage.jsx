import React, { useEffect } from 'react';
import  {initializePageScripts}  from '../utils/initScripts';

export default function HomePage() {
 useEffect(() => {

    initializePageScripts();
     const tabs = document.querySelectorAll('.quick-tab');
  const contents = document.querySelectorAll('.area-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const area = tab.getAttribute('data-area');
      
      // Remover active de todos
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Activar tab seleccionado
      tab.classList.add('active');
      
      // Activar contenido con delay para la animación
      const targetContent = document.getElementById(`${area}-content`);
      
      // Remover el atributo data-aos temporalmente
      const cards = targetContent.querySelectorAll('[data-aos]');
      cards.forEach(card => {
        card.classList.remove('aos-animate');
      });
      
      // Activar el contenido
      targetContent.classList.add('active');
      
      // Forzar reflow y re-animar
      setTimeout(() => {
        cards.forEach(card => {
          card.classList.add('aos-animate');
        });
      }, 50);
    });
  });
       
}, []);

  return (
    <main className="main">
      {/* Hero Section */}
      <section id="hero" className="hero section" style={{ paddingTop: '150px' }}>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <div className="company-badge mb-4">
                  <i className="bi bi-heart-fill me-2"></i>
                  Tu bienestar es nuestra prioridad
                </div>

                <h1 className="mb-4">
                  Centro de Terapia <br />
                  y Desarrollo <br />
                  <span className="accent-text">Crecemos</span>
                </h1>

                <p className="mb-4 mb-md-5">
                  Brindamos atención especializada en terapia psicológica, desarrollo personal 
                  y bienestar emocional. Nuestro equipo de profesionales te acompaña en tu 
                  proceso de crecimiento y sanación.
                </p>

                <div className="hero-buttons">
                  <a href="/contactanos" className="btn btn-primary me-0 me-sm-2 mx-1">Reservar Cita</a>
                  <a href="#" className="btn btn-link mt-2 mt-sm-0 glightbox">
                    <i className="bi bi-play-circle me-1"></i>
                    Conoce Más
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image" data-aos="zoom-out" data-aos-delay="300">
                <img src="/assets/img/index/hero.png" alt="Terapia y Bienestar" className="img-fluid" />

                <div className="customers-badge">
                  <div className="customer-avatars">
                    <img src="/assets/img/avatar-1.webp" alt="Paciente 1" className="avatar" />
                    <img src="/assets/img/avatar-2.webp" alt="Paciente 2" className="avatar" />
                    <img src="/assets/img/avatar-3.webp" alt="Paciente 3" className="avatar" />
                    <img src="/assets/img/avatar-4.webp" alt="Paciente 4" className="avatar" />
                    <img src="/assets/img/avatar-5.webp" alt="Paciente 5" className="avatar" />
                    <span className="avatar more">500+</span>
                  </div>
                  <p className="mb-0 mt-2">Más de 500 personas han confiado en nuestros servicios especializados</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="stat-content">
                  <h4>1000+ Pacientes</h4>
                  <p className="mb-0">Atendidos exitosamente</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="stat-content">
                  <h4>8+ Años</h4>
                  <p className="mb-0">De experiencia profesional</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <div className="stat-content">
                  <h4>98% Satisfacción</h4>
                  <p className="mb-0">De nuestros pacientes</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-chat-heart"></i>
                </div>
                <div className="stat-content">
                  <h4>24/7 Apoyo</h4>
                  <p className="mb-0">Seguimiento continuo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Quick Section */}
      <section className="services-quick">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Servicios Especializados</h2>
            <p>Accede directamente a la información detallada de cada servicio</p>
          </div>

          <div className="quick-tabs">
            <button className="quick-tab active" data-area="infantil">Infantil y Adolescentes</button>
            <button className="quick-tab" data-area="adultos">Adultos</button>
          </div>

          <div className="area-content active" id="infantil-content" data-aos="fade-up">
            <div className="services-mini-grid" data-aos="fade-up">
              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <h6>Terapia de Lenguaje</h6>
                <p>Mejora del habla y comunicación</p>
                <a href="/infantil-terapia-lenguaje" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-person-workspace"></i>
                </div>
                <h6>Terapia Ocupacional</h6>
                <p>Desarrollo de habilidades motoras</p>
                <a href="/infantil-terapia-ocupacional" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-book"></i>
                </div>
                <h6>Terapia de Aprendizaje</h6>
                <p>Estrategias de aprendizaje</p>
                <a href="/infantil-terapia-aprendizaje" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-heart"></i>
                </div>
                <h6>Psicología Infantil</h6>
                <p>Apoyo emocional y conductual</p>
                <a href="/infantil-psicologia-infantil" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-clipboard-data"></i>
                </div>
                <h6>Evaluación Psicológica</h6>
                <p>Para colegio e institución</p>
                <a href="/infantil-evaluacion-psicologica-colegio" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-compass"></i>
                </div>
                <h6>Orientación Vocacional</h6>
                <p>Elección de carrera profesional</p>
                <a href="/infantil-orientacion-vocacional" className="btn-mini-service">Ver Detalles</a>
              </div>
            </div>
          </div>

          <div className="area-content" id="adultos-content" >
            <div className="services-mini-grid" data-aos="fade-up">
              <div className="service-mini-card" >
                <div className="mini-icon">
                  <i className="bi bi-person-check"></i>
                </div>
                <h6>Psicoterapia Individual</h6>
                <p>Bienestar personal y emocional</p>
                <a href="/adulto-psicologia-individual" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h6>Terapia de Pareja</h6>
                <p>Fortalecimiento de la relación</p>
                <a href="/adulto-terapia-pareja" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h6>Terapia Familiar</h6>
                <p>Convivencia armoniosa familiar</p>
                <a href="/adulto-terapia-familiar" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-mic"></i>
                </div>
                <h6>Terapia de Lenguaje</h6>
                <p>Rehabilitación del habla adultos</p>
                <a href="/adulto-terapia-lenguaje" className="btn-mini-service">Ver Detalles</a>
              </div>

              <div className="service-mini-card">
                <div className="mini-icon">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <h6>Evaluación Universitaria</h6>
                <p>Para ingreso o permanencia</p>
                <a href="/adulto-evaluacion-psicologica-universidad" className="btn-mini-service">Ver Detalles</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recomendaciones Section */}
      <section id="recomendaciones" className="testimonials section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Recomendaciones</h2>
          <p>Contenido educativo y consejos profesionales para padres y pacientes</p>
        </div>

        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial-item">
                <img src="/assets/img/avatar-4.webp" className="testimonial-img" alt="¿Cuándo llevar al psicólogo?" />
                <h3>¿Cuándo debo llevar a mi hijo al psicólogo?</h3>
                <h4>Psicología Infantil</h4>
                <div className="stars">
                  <i className="bi bi-play-circle"></i>
                  <span className="ms-2">Video educativo</span>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>Nuestra licenciada en psicología infantil te enseña a reconocer cuándo necesitas llevar a tu hijo a consulta psicológica.</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <a className="mt-3 btn-getstarted" href="https://www.youtube.com/watch?v=pwWZEl8m1Go&t=1s" target="_blank" rel="noopener noreferrer">Ver Video</a>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-item">
                <img src="/assets/img/avatar-1.webp" className="testimonial-img" alt="TEA - Signos de Alerta" />
                <h3>TEA - Signos de Alerta y Tratamiento</h3>
                <h4>Trastorno del Espectro Autista</h4>
                <div className="stars">
                  <i className="bi bi-play-circle"></i>
                  <span className="ms-2">Video educativo</span>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>Conoce cuáles son los SIGNOS DE ALERTA Y TRATAMIENTO en el autismo.</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <a className="mt-3 btn-getstarted" href="https://www.youtube.com/watch?v=37K-l2eBwAk&t=1s" target="_blank" rel="noopener noreferrer">Ver Video</a>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-item">
                <img src="/assets/img/avatar-2.webp" className="testimonial-img" alt="Desarrollo del Lenguaje" />
                <h3>Signos de Alerta en el Desarrollo del Lenguaje</h3>
                <h4>Lic. Merlin Fernández</h4>
                <div className="stars">
                  <i className="bi bi-play-circle"></i>
                  <span className="ms-2">Video educativo</span>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>Lic.Merlin Fernández te muestra los signos de alerta que debes saber para detectar a tiempo retrasos en el desarrollo del lenguaje de tu niño.</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <a className="mt-3 btn-getstarted" href="https://www.youtube.com/watch?v=iD0CY3QFlp4&t=208s" target="_blank" rel="noopener noreferrer">Ver Video</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="400">
            <a href="#" className="me-0 me-sm-2 mx-1">Ver Más Recomendaciones</a>
          </div>
        </div>
      </section>

     {/* Alianzas Section */}
<section id="alianzas" className="clients section">
  <div className="container" data-aos="fade-up" data-aos-delay="100">
    <div className="section-title text-center mb-5">
      <h2>Alianzas y Convenios</h2>
      <p>Gracias a nuestros <strong>convenios con universidades e instituciones</strong>, podemos garantizar una mayor viabilidad en la realización de <strong>prácticas profesionales y especializaciones</strong> enfocadas a mejorar su formación, brindando terapias actualizadas y efectivas. Así mismo nuestras alianzas con otras instituciones nos permite una adecuada derivación de nuestros pacientes.</p>
    </div>

    <div className="swiper init-swiper">
      <script type="application/json" className="swiper-config" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          loop: true,
          speed: 600,
          autoplay: {
            delay: 3000
          },
          slidesPerView: "auto",
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 40
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 60
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 80
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 100
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 120
            }
          }
        })
      }} />
      <div className="swiper-wrapper align-items-center">
        {[
          { img: '/assets/img/index/Logo alianzas.png', name: 'Vaxa - Desarrollo Web y Historias Clinicas' },
          { img: '/assets/img/index/san_marcos.png', name: 'Universidad Mayor de San Marcos' },
          { img: '/assets/img/index/villareal.png', name: 'Universidad Villareal' },
          { img: '/assets/img/index/cayetano.png', name: 'Universidad Cayetano Heredia' },
          { img: '/assets/img/index/logo_marcomedina.jpg', name: 'Doctor Marco Medina' },
          { img: '/assets/img/index/colegio.png', name: 'I.E.P Sor Ana De Los Ángeles' },
          { img: '/assets/img/index/logo_light.jpeg', name: 'Consultorio Dental Light' },
          { img: '/assets/img/index/mamalama.png', name: 'Mamalama' },
          { img: '/assets/img/index/logo-upn-nuevo.png', name: 'Universidad Privada del Norte' },
          { img: '/assets/img/index/logo_PEDIATRIKIS.png', name: 'Pediatriks' },
          { img: '/assets/img/index/fisioestudio360.png', name: 'Fisioestudio 360' }
        ].map((ally, index) => (
          <div key={index} className="swiper-slide text-center">
            <img src={ally.img} className="img-fluid" alt={ally.name} style={{ maxHeight: '80px', objectFit: 'contain' }} />
            <h6 className="mt-2">{ally.name}</h6>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  </div>
</section>

  
    </main>
  );
}