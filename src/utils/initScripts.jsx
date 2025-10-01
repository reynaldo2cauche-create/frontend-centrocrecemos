import AOS from 'aos';
import 'aos/dist/aos.css';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import PureCounter from '@srexi/purecounterjs';

export const initializePageScripts = () => {
  // AOS
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // GLightbox
  GLightbox({
    selector: '.glightbox'
  });

  // PureCounter
  new PureCounter();

  // Swiper
  const swiperElements = document.querySelectorAll(".init-swiper");
  swiperElements.forEach((swiperElement) => {
    const configElement = swiperElement.querySelector(".swiper-config");
    if (configElement) {
      try {
        const config = JSON.parse(configElement.innerHTML.trim());
        new Swiper(swiperElement, {
          ...config,
          modules: [Autoplay, Pagination]
        });
      } catch (error) {
        console.error('Error al inicializar Swiper:', error);
      }
    }
  });

  // FAQ Toggle
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  // Scrolled Class
  const toggleScrolled = () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('.header');
    if (selectHeader) {
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', toggleScrolled);
  toggleScrolled();

  // Navmenu Scrollspy
  const navmenulinks = document.querySelectorAll('.navmenu a');
  const navmenuScrollspy = () => {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  };
  
  window.addEventListener('scroll', navmenuScrollspy);
  navmenuScrollspy();



  

};