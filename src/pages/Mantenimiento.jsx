import React, { useState } from 'react'
import { useEffect } from 'react';



import  {initializePageScripts}  from '../utils/initScripts';

const Mantenimiento = () => {
      useEffect(() => {
             initializePageScripts();
           }, []); 
 return (
    <>
      <style>{`
        .maintenance-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          color: var(--default-color);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
        }

        .maintenance-container {
          text-align: center;
          max-width: 600px;
          background: var(--surface-color);
          padding: 60px 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .icon-container {
          margin-bottom: 30px;
          position: relative;
        }

        .icon-wrapper {
          display: inline-block;
          position: relative;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .icon-container i {
          font-size: 120px;
          background: linear-gradient(135deg, var(--accent-color) 0%, #9b4dca 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 10px 20px rgba(194, 99, 249, 0.3));
        }

        .dots {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--accent-color) 0%, #9b4dca 100%);
          border-radius: 50%;
          opacity: 0.1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
        }

        .maintenance-container h1 {
          font-size: 42px;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 18px;
          color: var(--default-color);
          margin-bottom: 30px;
          opacity: 0.8;
          line-height: 1.6;
        }

        .progress-container {
          margin: 40px 0;
          padding: 30px;
          background: linear-gradient(135deg, 
            color-mix(in srgb, var(--accent-color), transparent 95%) 0%, 
            color-mix(in srgb, var(--accent-color), transparent 98%) 100%);
          border-radius: 15px;
          border: 2px solid color-mix(in srgb, var(--accent-color), transparent 85%);
        }

        .progress-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--heading-color);
          margin-bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .progress-text i {
          color: var(--accent-color);
          font-size: 20px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: var(--default-color);
        }

        .feature i {
          color: var(--accent-color);
          font-size: 22px;
        }

        .btn-home {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 40px;
          padding: 15px 35px;
          background: linear-gradient(135deg, var(--accent-color) 0%, #9b4dca 100%);
          color: var(--contrast-color);
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(194, 99, 249, 0.3);
        }

        .btn-home:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(194, 99, 249, 0.4);
          color: var(--contrast-color);
        }

        .btn-home i {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .maintenance-container {
            padding: 40px 30px;
          }

          .maintenance-container h1 {
            font-size: 32px;
          }

          .subtitle {
            font-size: 16px;
          }

          .icon-container i {
            font-size: 80px;
          }

          .features {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>

      <div className="maintenance-wrapper">
        <div className="maintenance-container">
          <div className="icon-container">
            <div className="dots"></div>
            <div className="icon-wrapper">
              <i className="bi bi-gear-fill"></i>
            </div>
          </div>
          
          <h1>Sección en Desarrollo</h1>
          <p className="subtitle">
            Estamos trabajando para ofrecerte la mejor experiencia. 
            Esta sección estará disponible muy pronto.
          </p>

          <div className="progress-container">
            <div className="progress-text">
              <i className="bi bi-arrow-repeat"></i>
              Trabajando en nuevas funcionalidades
            </div>
          </div>

          <div className="features">
            <div className="feature">
              <i className="bi bi-check-circle-fill"></i>
              <span>Próximamente</span>
            </div>
            <div className="feature">
              <i className="bi bi-lightning-fill"></i>
              <span>Mejor experiencia</span>
            </div>
            <div className="feature">
              <i className="bi bi-shield-check"></i>
              <span>Calidad garantizada</span>
            </div>
          </div>

          <a href="/" className="btn-home">
            <i className="bi bi-house-fill"></i>
            Volver al Inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default Mantenimiento;