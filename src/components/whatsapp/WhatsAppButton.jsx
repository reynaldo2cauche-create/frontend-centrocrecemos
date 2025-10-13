import React from 'react';


const WhatsAppFloat = ({ 
  phoneNumber = "51957064401", 
  message = "Hola 👋, vengo de la página web del Centro Crecemos 🌱. Me gustaría recibir más información sobre sus servicios de terapias",
  tooltipText = "¿Necesitas ayuda? Escríbenos"
}) => {
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="whatsapp-float">
      <a 
        href={whatsappUrl}
        className="whatsapp-button" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg 
          className="whatsapp-icon" 
          viewBox="0 0 32 32" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.245 1.407 1.414-5.27-0.322-0.527c-1.334-2.182-2.037-4.694-2.037-7.248 0-7.653 6.227-13.88 13.88-13.88s13.88 6.227 13.88 13.88c0 7.653-6.227 13.88-13.88 13.88zM21.803 18.693c-0.29-0.147-1.721-0.85-1.988-0.947-0.267-0.097-0.461-0.147-0.655 0.147s-0.753 0.947-0.923 1.141c-0.17 0.194-0.34 0.218-0.631 0.072-0.29-0.147-1.224-0.451-2.332-1.438-0.862-0.768-1.444-1.717-1.614-2.008s-0.018-0.451 0.128-0.597c0.131-0.131 0.29-0.34 0.437-0.51 0.147-0.17 0.194-0.29 0.29-0.485 0.097-0.194 0.049-0.364-0.024-0.51s-0.655-1.578-0.898-2.162c-0.236-0.568-0.476-0.491-0.655-0.5-0.17-0.008-0.364-0.010-0.558-0.010s-0.51 0.072-0.777 0.364c-0.267 0.29-1.019 0.996-1.019 2.428s1.043 2.817 1.188 3.011c0.147 0.194 2.063 3.148 4.998 4.417 0.698 0.301 1.244 0.481 1.668 0.617 0.701 0.218 1.339 0.187 1.843 0.113 0.562-0.084 1.721-0.703 1.964-1.382 0.243-0.679 0.243-1.261 0.17-1.382s-0.267-0.194-0.558-0.34z" 
            fill="currentColor"
          />
        </svg>
      </a>
      <div className="whatsapp-tooltip">{tooltipText}</div>
    </div>
  );
};

export default WhatsAppFloat;