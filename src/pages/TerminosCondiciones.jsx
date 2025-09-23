import React, { useState } from 'react'
import { Box, Chip, List, ListItem, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

export const TerminosCondiciones = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta si es una pantalla pequeña

  const [selectedChip, setSelectedChip] = useState('chip1');

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
  };

  const renderChipPolitica = (
    <>
      <Typography variant="h4" gutterBottom>
        Términos y Condiciones
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>CONTIGO CRECEMOS E.I.R.L.</strong>, identificado con RUC N.° 20601074380, con
        domicilio en MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS, pone a
        disposición de sus pacientes y usuarios (en adelante, "Usuarios") el sitio web y
        aplicaciones móviles relacionadas con la prestación de servicios terapéuticos (en
        adelante, "Plataforma"). Al acceder y utilizar la Plataforma, el Usuario declara haber
        leído, comprendido y aceptado estos Términos y Condiciones, así como la Política de
        Privacidad asociada.
      </Typography>
      <Typography variant="body1" paragraph>
        Si el Usuario no está de acuerdo con alguno de los términos aquí establecidos, deberá
        abstenerse de utilizar la Plataforma y sus servicios.
      </Typography>

      <Typography variant="h5" gutterBottom>
        1. Aceptación de los Términos
      </Typography>
      <Typography variant="body1" paragraph>
        El acceso y uso de la Plataforma implica la aceptación expresa e incondicional de los
        presentes Términos. El Usuario declara tener capacidad legal para aceptar estos términos
        y ser mayor de edad.
      </Typography>

      <Typography variant="h5" gutterBottom>
        2. Finalidad de la Plataforma
      </Typography>
      <Typography variant="body1" paragraph>
        La Plataforma tiene como objetivo:
      </Typography>
      <ul>
        <li>Facilitar el acceso a los servicios de terapias ofrecidos por <strong>Contigo Crecemos E.I.R.L.</strong></li>
        <li>Proporcionar información educativa y orientativa relacionada con temas de salud y bienestar.</li>
        <li>Brindar acceso a citas, evaluaciones y seguimiento de los servicios contratados.</li>
      </ul>
      <Typography variant="body1" paragraph>
        <strong>Nota:</strong> La información proporcionada en la Plataforma tiene carácter informativo y no reemplaza el diagnóstico o tratamiento profesional.
      </Typography>

      <Typography variant="h5" gutterBottom>
        3. Registro y Uso de la Plataforma
      </Typography>
      <ul>
        <li>
          El Usuario deberá crear una cuenta personal con un nombre de usuario y contraseña. Es
          responsable de mantener la confidencialidad de sus credenciales y de las actividades
          realizadas desde su cuenta.
        </li>
        <li>
          El Usuario deberá proporcionar información veraz, completa y actualizada. Contigo
          Crecemos E.I.R.L. no se responsabiliza por inconvenientes derivados de datos incorrectos o
          desactualizados.
        </li>
        <li>
          Está prohibido usar la Plataforma para fines ilegales, fraudulentos o contrarios al orden
          público y las buenas costumbres.
        </li>
      </ul>

      <Typography variant="h5" gutterBottom>
        4. Responsabilidades del Usuario
      </Typography>
      <ul>
        <li>Mantener sus dispositivos actualizados y contar con una conexión estable a internet para acceder a la Plataforma.</li>
        <li>No transmitir contenidos que puedan infringir derechos de terceros o que contengan virus informáticos u otros elementos dañinos.</li>
        <li>Reportar inmediatamente a <strong>Contigo Crecemos E.I.R.L.</strong> cualquier uso no autorizado de su cuenta.</li>
      </ul>

      <Typography variant="h5" gutterBottom>
        5. Limitación de Responsabilidad
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Contigo Crecemos E.I.R.L.</strong> no será responsable por:
      </Typography>
      <ul>
        <li>Fallas técnicas, interrupciones del servicio o errores que puedan ocurrir en la Plataforma.</li>
        <li>Daños directos, indirectos o incidentales derivados del uso o imposibilidad de uso de la Plataforma.</li>
        <li>Contenidos de terceros accesibles mediante enlaces en la Plataforma.</li>
      </ul>

      <Typography variant="h5" gutterBottom>
        6. Propiedad Intelectual
      </Typography>
      <Typography variant="body1" paragraph>
        Todos los derechos sobre la Plataforma, incluyendo marcas, logotipos, textos, gráficos,
        diseño y software, son propiedad exclusiva de <strong>Contigo Crecemos E.I.R.L.</strong> o de sus
        licenciantes. Queda prohibido copiar, reproducir, modificar o distribuir estos contenidos
        sin autorización expresa por escrito.
      </Typography>

      <Typography variant="h5" gutterBottom>
        7. Política de Protección de Datos
      </Typography>
      <Typography variant="body1" paragraph>
        El tratamiento de datos personales se realiza conforme a la Ley <strong>N.º 29733 – Ley de
        Protección de Datos Personales</strong> y su reglamento. Los datos recopilados serán utilizados
        exclusivamente para las finalidades vinculadas a la prestación de los servicios ofrecidos
        por la empresa.
      </Typography>
      <Typography variant="body1" paragraph>
        Para más información sobre el manejo de datos personales, consulte nuestra <strong>Política de Privacidad</strong> disponible en la Plataforma.
      </Typography>

      <Typography variant="h5" gutterBottom>
        8. Modificaciones de los Términos
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Contigo Crecemos E.I.R.L.</strong> se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán publicadas en la Plataforma y entrarán en vigor desde su publicación. Es responsabilidad del Usuario revisar periódicamente los Términos
        actualizados.
      </Typography>

      <Typography variant="h5" gutterBottom>
        9. Ley Aplicable y Jurisdicción
      </Typography>
      <Typography variant="body1" paragraph>
        Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia será
        sometida a los tribunales competentes de la ciudad de Lima Norte.
      </Typography>

      <Typography variant="h5" gutterBottom>
        10. Contacto
      </Typography>
      <Typography variant="body1" paragraph>
        Para consultas o dudas sobre estos Términos, el Usuario puede comunicarse a:
      </Typography>
      <ul>
        <li><strong>Correo electrónico:</strong> info@crecemos.com.pe</li>
        <li><strong>Teléfono:</strong> 957064401</li>
        <li><strong>Dirección:</strong> MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS.</li>
      </ul>
    </>
  )

  const renderTerminosCondiciones = (
    <>
      <Typography variant="h4" gutterBottom>
        Política de Privacidad y Tratamiento de Datos Personales
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>CONTIGO CRECEMOS E.I.R.L.</strong>, identificado con RUC N.º 20601074380, ubicado en MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS, se compromete con la protección de los datos personales de sus pacientes y usuarios, conforme a lo establecido en la Ley N.º 29733 - Ley de Protección de Datos Personales, su reglamento, y demás normativa aplicable.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Objetivo
      </Typography>
      <Typography variant="body1" paragraph>
        Esta política tiene como objetivo establecer los lineamientos para el adecuado tratamiento de los datos personales de nuestros usuarios, garantizando su confidencialidad y seguridad, en concordancia con las normativas legales peruanas.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Tratamiento de datos personales
      </Typography>
      <Typography variant="body1" paragraph>
        Contigo Crecemos E.I.R.L. está autorizado a tratar los datos personales de los pacientes y usuarios para:
      </Typography>
      <ul>
        <li>Cumplir con la relación contractual en la prestación de servicios terapéuticos.</li>
        <li>Compartir los datos con autoridades competentes y terceros autorizados por ley, en el marco de obligaciones legales.</li>
      </ul>
      <Typography variant="body1" paragraph>
        Los datos incluyen información proporcionada directamente por los usuarios o adquirida a través de medios legítimos. El tratamiento de datos sensibles relacionados con la salud se realiza únicamente con el consentimiento expreso de los titulares.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Finalidades adicionales
      </Typography>
      <Typography variant="body1" paragraph>
        Con el consentimiento del titular, los datos también podrán ser utilizados para:
      </Typography>
      <ul>
        <li>Realizar estudios de satisfacción y mejora continua de los servicios.</li>
        <li>Informar sobre campañas, promociones, y actividades relacionadas con nuestros servicios.</li>
      </ul>

      <Typography variant="h6" gutterBottom>
        4. Datos de menores de edad
      </Typography>
      <Typography variant="body1" paragraph>
        El tratamiento de datos de menores de edad requiere el consentimiento de sus representantes legales.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Derechos de los titulares
      </Typography>
      <Typography variant="body1" paragraph>
        Los titulares de datos personales tienen derecho a:
      </Typography>
      <ul>
        <li>Acceso: Conocer qué datos están almacenados y su finalidad.</li>
        <li>Rectificación: Actualizar o corregir datos inexactos.</li>
        <li>Cancelación: Solicitar la eliminación de datos cuando no sean necesarios.</li>
        <li>Oposición: Negarse al tratamiento por motivos personales legítimos.</li>
        <li>Revocación: Retirar el consentimiento para fines específicos.</li>
      </ul>
      
      <Typography variant="body1" paragraph>
        Para ejercer estos derechos, los usuarios pueden comunicarse a través del correo <b>info@crecemos.com.pe</b> o al teléfono <b>957064401</b>.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Uso de cookies
      </Typography>
      <Typography variant="body1" paragraph>
        El sitio web <b>www.crecemos.com.pe</b> utiliza cookies para optimizar la experiencia del usuario. Los navegadores pueden configurarse para aceptar o rechazar estas herramientas.
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Modificaciones a la política
      </Typography>
      <Typography variant="body1" paragraph>
        Contigo Crecemos E.I.R.L. se reserva el derecho de actualizar esta política en cualquier momento. La versión vigente estará disponible en el sitio web.
      </Typography>

      <Typography variant="h6" gutterBottom>
        8. Contacto
      </Typography>
      <Typography variant="body1" paragraph>
        Para consultas sobre esta política, puede comunicarse a:
      </Typography>
      <ul>
        <li><strong>Correo:</strong> info@crecemos.com.pe</li>
        <li><strong>Teléfono:</strong> 957064401</li>
        <li><strong>Dirección:</strong> MZA. W1 LOTE. 5 URB. EL PINAR PARCELA H, LIMA - LIMA - COMAS.</li>
      </ul>      
    </>
  )

  const renderReglamentoInterno = (
    <>
      <Typography variant="h4" gutterBottom>
        Reglamento Interno para Clientes
      </Typography>
      <Typography variant="h5" gutterBottom>
        Centro de Terapias CRECEMOS
      </Typography>
      <Typography variant="body1" paragraph>
        El Centro de Terapias Crecemos agradece la confianza de sus pacientes y familias. Con el objetivo de brindar un servicio terapéutico de calidad, seguro y ordenado, se establece el siguiente reglamento interno de cumplimiento obligatorio:
      </Typography>

      <Typography variant="h6" gutterBottom>1. Pagos y Agendamiento</Typography>
      <List>
        <ListItem><Typography variant="body1">Todas las citas deben ser pagadas como máximo un día antes, hasta las 7:30 p.m.</Typography></ListItem>
        <ListItem><Typography variant="body1">Si el pago no se realiza en el plazo indicado, la cita no será agendada.</Typography></ListItem>
        <ListItem><Typography variant="body1">Los pagos no son reembolsables en caso de inasistencias no justificadas.</Typography></ListItem>
        <ListItem><Typography variant="body1">Los informes de evaluación o evolución tienen un costo adicional y deben solicitarse con anticipación.</Typography></ListItem>
        <ListItem><Typography variant="body1">Los paquetes de sesiones tienen una vigencia de 60 días calendario desde la primera sesión. Las sesiones no utilizadas dentro de este plazo se considerarán vencidas.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>2. Faltas, Cancelaciones y Reprogramaciones</Typography>
      <List>
        <ListItem><Typography variant="body1">Las cancelaciones deben ser notificadas con al menos 24 horas de anticipación.</Typography></ListItem>
        <ListItem><Typography variant="body1">En caso de inasistencia sin aviso previo, la sesión será considerada como dictada y se perderá el derecho a reprogramación o reembolso.</Typography></ListItem>
        <ListItem><Typography variant="body1">Las cancelaciones de último momento también serán consideradas como sesiones dictadas.</Typography></ListItem>
        <ListItem><Typography variant="body1">En situaciones médicas de emergencia, el paciente deberá presentar un sustento médico válido para solicitar reprogramación.</Typography></ListItem>
        <ListItem><Typography variant="body1">El centro podrá ofrecer la posibilidad de reprogramar la sesión perdida con un 50% de descuento, válido por única vez y sujeto a disponibilidad.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>3. Tardanzas y Asistencia</Typography>
      <List>
        <ListItem><Typography variant="body1">Si el paciente llega tarde a su sesión, será atendido únicamente por el tiempo restante asignado.</Typography></ListItem>
        <ListItem><Typography variant="body1">No se repondrá el tiempo perdido por tardanza.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>4. Pacientes Menores de Edad</Typography>
      <List>
        <ListItem><Typography variant="body1">Los menores de edad deberán asistir siempre acompañados por un padre, madre o apoderado.</Typography></ListItem>
        <ListItem><Typography variant="body1">No está permitido dejar solos a los menores dentro del centro en ningún momento.</Typography></ListItem>
        <ListItem><Typography variant="body1">Se recomienda que el mismo acompañante asista a todas las sesiones para brindar continuidad al proceso terapéutico.</Typography></ListItem>
        <ListItem><Typography variant="body1">El responsable del menor debe organizar los horarios para garantizar su asistencia constante.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>5. Informes</Typography>
      <List>
        <ListItem><Typography variant="body1">Los informes terapéuticos (evaluación o evolución) tienen un costo adicional.</Typography></ListItem>
        <ListItem><Typography variant="body1">Deben solicitarse con un mínimo de 5 días hábiles de anticipación en el área de admisión o con el terapeuta tratante.</Typography></ListItem>
        <ListItem><Typography variant="body1">El tiempo de entrega será comunicado según el tipo de informe solicitado.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>6. Cambios de Terapeuta o Horario</Typography>
      <List>
        <ListItem><Typography variant="body1">El centro podrá reasignar terapeutas o ajustar los horarios de atención por razones operativas, licencias o imprevistos, asegurando siempre la continuidad del tratamiento.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>7. Uso de Imágenes y Videos</Typography>
      <List>
        <ListItem><Typography variant="body1">En determinados casos, se podrá solicitar autorización para tomar fotos o grabaciones con fines terapéuticos o institucionales.</Typography></ListItem>
        <ListItem><Typography variant="body1">Estas solo serán realizadas con el consentimiento informado y firmado por el responsable legal del paciente.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>8. Reuniones Clínicas</Typography>
      <List>
        <ListItem><Typography variant="body1">El centro podrá convocar a los padres o responsables a reuniones clínicas para brindar retroalimentación del proceso terapéutico.</Typography></ListItem>
        <ListItem><Typography variant="body1">Su participación activa es fundamental para reforzar los avances del tratamiento.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>9. Comportamiento y Convivencia</Typography>
      <List>
        <ListItem><Typography variant="body1">Se espera que todos los pacientes y acompañantes mantengan una conducta respetuosa y colaborativa con el personal del centro y otros usuarios.</Typography></ListItem>
        <ListItem><Typography variant="body1">Las faltas de respeto, agresiones verbales o físicas serán motivo de suspensión del servicio.</Typography></ListItem>
        <ListItem><Typography variant="body1">Cualquier daño a los equipos, mobiliario o instalaciones deberá ser asumido por el responsable.</Typography></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>10. Devoluciones</Typography>
      <List>
        <ListItem><Typography variant="body1">Los pagos no serán reembolsados salvo en casos excepcionales en los que el centro suspenda el servicio.</Typography></ListItem>
        <ListItem><Typography variant="body1">Toda solicitud de devolución deberá realizarse por escrito y será evaluada según el caso.</Typography></ListItem>
      </List>

      <Box mt={3}>
        <Typography variant="body1" paragraph>
          <span role="img" aria-label="ubicación">📍</span> Dirección: Mz. W1 Lote 5, Urb. El Pinar – Comas, Lima
        </Typography>
        <Typography variant="body1" paragraph>
          <span role="img" aria-label="whatsapp">📲</span> WhatsApp: +51 957 064 401
        </Typography>
        <Typography variant="body1" paragraph>
          <span role="img" aria-label="web">🌐</span> Web: www.crecemos.com.pe
        </Typography>
      </Box>
    </>
  )

  return (
    <Box display='flex' flexDirection='column' gap='30px'>
      <Box height='100%' mt='8px'>
        <img
          src={isMobile ? '/terminos_condic_movil.png' : '/terminos_condic_web.png'} 
          alt="Términos y Condiciones"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box display='flex' flexDirection='column' gap='40px' >
        <Stack direction="row" spacing={1} justifyContent='center' flexWrap='wrap' gap='10px'>
          <Chip label="POLÍTICA DE PRIVACIDAD" onClick={() => handleChipClick("chip1")} 
            sx={{
              backgroundColor: selectedChip === "chip1" ? "primary.main" : "grey.300",
              color: selectedChip === "chip1" ? "white" : "black",
              border: selectedChip === "chip1" ? "2px solid #1976d2" : "2px solid transparent",
              // transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              fontSize: '15px', p: '20px 10px',
              "&:hover": {
              backgroundColor: "primary.light", // Cambia el color en hover
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Agrega sombra
              transform: "scale(1.05)", // Aumenta ligeramente el tamaño
            },
            }}  
          />
          <Chip label="TÉRMINOS Y CONDICIONES" onClick={() => handleChipClick("chip2")} 
            sx={{
              backgroundColor: selectedChip === "chip2" ? "primary.main" : "grey.300",
              color: selectedChip === "chip2" ? "white" : "black",
              border: selectedChip === "chip2" ? "2px solid #1976d2" : "2px solid transparent",
              // transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              fontSize: '15px', p: '20px 10px',
              "&:hover": {
              backgroundColor: "primary.light", // Cambia el color en hover
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Agrega sombra
              transform: "scale(1.05)", // Aumenta ligeramente el tamaño
            },
            }}
          />
          <Chip label="REGLAMENTO INTERNO PARA CLIENTES" onClick={() => handleChipClick("chip3")} 
            sx={{
              backgroundColor: selectedChip === "chip3" ? "primary.main" : "grey.300",
              color: selectedChip === "chip3" ? "white" : "black",
              border: selectedChip === "chip3" ? "2px solid #1976d2" : "2px solid transparent",
              // transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              fontSize: '15px', p: '20px 10px',
              "&:hover": {
              backgroundColor: "primary.light", // Cambia el color en hover
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Agrega sombra
              transform: "scale(1.05)", // Aumenta ligeramente el tamaño
            },
            }}
          />
        </Stack>
        <Box sx={{ padding: { xs: 2, sm: '1px 100px' }, }}>
        {/* <Box
          sx={{
            marginTop: 4,
            padding: 2,
            // border: "1px solid",
            borderRadius: 2,
            minHeight: "50px", // Asegura que el Box no colapse al cambiar
            transition: "opacity 0.5s ease-in-out", // Efecto de transición
            opacity: selectedChip ? 1 : 0, // Cambia la opacidad
          }}
        > */}
          {selectedChip === "chip1" && (
            renderTerminosCondiciones
          )}
          {selectedChip === "chip2" && (            
            renderChipPolitica
          )}
           {selectedChip === "chip3" && (
            renderReglamentoInterno
          )}
          
        </Box>
      </Box>
      
    </Box>
  )
}
