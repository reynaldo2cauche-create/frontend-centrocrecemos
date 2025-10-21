import React, { useState, useEffect } from 'react';
import archivosOficialesService from '../services/archivosOficialesService';

const VerificarDocumentos = () => {
  const [codigo, setCodigo] = useState('');
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('idle');
  const [estadoTexto, setEstadoTexto] = useState('Esperando código…');

  // Validar documento
  const validarDocumentoHandler = async (codigoValidar) => {
    setLoading(true);
    setError('');
    setDocumento(null);
    setEstado('idle');
    setEstadoTexto('Validando...');

    try {
      const response = await archivosOficialesService.validarDocumento(codigoValidar);
      const data = response.data;
   

      // ✅ Validación corregida usando el campo activo
      if (!data.valido) {
        setEstado('error');
        setEstadoTexto('Documento inválido');
      } else if (data.paciente.activo === false) {
        setEstado('warning');
        setEstadoTexto('Paciente inactivo');
      } else if (!data.vigente) {
        setEstado('error');
        setEstadoTexto('Documento expirado');
      } else {
        setEstado('success');
        setEstadoTexto('Documento válido');
      }

      setDocumento(data);

    } catch (err) {
      console.error('Error completo:', err);
      
      let errorMessage = 'Documento no encontrado. Verifique el código e intente nuevamente.';
      
      if (err.response) {
        const status = err.response.status;
        if (status === 404) {
          errorMessage = 'Documento no encontrado. Verifique el código.';
        } else if (status === 500) {
          errorMessage = 'Error del servidor. Intente más tarde.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = 'Error de conexión. Verifique su internet.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setEstado('error');
      setEstadoTexto('Error en validación');
      setDocumento(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SOLUCIÓN DEFINITIVA: Formatear fecha sin conversión de zona horaria
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No especificado';
    
    try {
      // Parsear la fecha manualmente (viene como YYYY-MM-DD desde el backend)
      const [year, month, day] = dateStr.split('-').map(Number);
      
      // Array de nombres de meses en español
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      
      // Formatear manualmente sin ninguna conversión de zona horaria
      return `${day} de ${meses[month - 1]} de ${year}`;
      
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateStr;
    }
  };

  // Validar desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigoUrl = params.get('code');
    if (codigoUrl) {
      setCodigo(codigoUrl);
      validarDocumentoHandler(codigoUrl);
    }
  }, []);

  const handleValidar = (e) => {
    e.preventDefault();
    
    setDocumento(null);
    setError('');
    setEstado('idle');
    setEstadoTexto('Validando...');
    
    const codigoNormalizado = codigo.trim().toUpperCase();

    if (!/^CTC-[A-Z0-9]{3,50}$/.test(codigoNormalizado)) {
      setError('Formato de código inválido. Use: CTC-XXXXX (mínimo 3 caracteres después de CTC-)');
      setEstado('error');
      setEstadoTexto('Código inválido');
      return;
    }

    validarDocumentoHandler(codigoNormalizado);
  };

 
const handleImprimirComprobante = () => {
    const printWindow = window.open('', '_blank', 'width=1000,height=800,scrollbars=yes,resizable=yes');
    
    const printContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Comprobante de Validación - CTC</title>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            color: #1a1a1a;
            background: #ffffff;
            padding: 30px;
            max-width: 900px;
            margin: 0 auto;
          }
          
          .comprobante-container {
            border: 3px solid #1a365d;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            background: #ffffff;
          }
          
          .header {
            background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-bottom: 4px solid #A3C644;
          }
          
          .institution-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          
          .institution-subtitle {
            font-size: 16px;
            font-weight: 500;
            opacity: 0.9;
          }
          
          .status-banner {
            text-align: center;
            padding: 20px;
            margin: 25px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 22px;
            border: 3px solid;
            background: ${estado === 'success' ? '#f0fdf4' : 
                        estado === 'warning' ? '#fffbeb' : 
                        '#fef2f2'};
            border-color: ${estado === 'success' ? '#22c55e' : 
                          estado === 'warning' ? '#f59e0b' : 
                          '#dc2626'};
            color: ${estado === 'success' ? '#166534' : 
                    estado === 'warning' ? '#92400e' : 
                    '#dc2626'};
          }
          
          .document-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            padding: 30px;
          }
          
          .document-section {
            padding: 25px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            background: #f8fafc;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #2d3748;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #cbd5e0;
          }
          
          .field {
            margin-bottom: 15px;
          }
          
          .field-label {
            font-size: 13px;
            font-weight: 600;
            color: #4a5568;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 5px;
          }
          
          .field-value {
            font-size: 15px;
            font-weight: 600;
            color: #1a202c;
          }
          
          .code-highlight {
            font-family: 'Courier New', monospace;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #1a365d;
            background: #edf2f7;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            margin: 10px 0;
            border: 2px solid #cbd5e0;
          }
          
          .verification-section {
            text-align: center;
            padding: 30px;
            margin: 25px;
            border: 2px dashed #a0aec0;
            border-radius: 10px;
            background: #f7fafc;
          }
          
          .verification-url {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #2d3748;
            background: #edf2f7;
            padding: 12px;
            border-radius: 8px;
            margin: 15px 0;
            word-break: break-all;
            border: 1px solid #cbd5e0;
          }
          
          .footer {
            background: #1a365d;
            color: white;
            padding: 25px;
            text-align: center;
            border-top: 4px solid #A3C644;
          }
          
          .footer-text {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 5px;
          }
          
          .legal-note {
            font-size: 12px;
            color: #718096;
            line-height: 1.4;
            margin-top: 25px;
            text-align: center;
            padding: 0 20px;
          }
          
          .print-controls {
            text-align: center;
            padding: 25px;
            background: #f7fafc;
            border-top: 1px solid #e2e8f0;
          }
          
          .print-button {
            background: #1a365d;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 10px;
          }
          
          .print-button:hover {
            background: #2d3748;
            transform: translateY(-2px);
          }
          
          .close-button {
            background: #718096;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 10px;
          }
          
          .close-button:hover {
            background: #4a5568;
          }
          
          @media print {
            .print-controls {
              display: none;
            }
            
            body {
              padding: 0;
            }
            
            .comprobante-container {
              border: none;
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="comprobante-container">
          <div class="header">
            <div class="institution-name">CENTRO DE TERAPIAS CRECEMOS</div>
            <div class="institution-subtitle">COMPROBANTE DE VALIDACIÓN OFICIAL</div>
          </div>
          
          <div class="status-banner">
            ${estadoTexto.toUpperCase()}
          </div>
          
          <div class="document-grid">
            <div class="document-section">
              <div class="section-title">INFORMACIÓN DEL DOCUMENTO</div>
              <div class="field">
                <span class="field-label">Código de Validación</span>
                <div class="code-highlight">${documento.codigo}</div>
              </div>
              <div class="field">
                <span class="field-label">Tipo de Documento</span>
                <div class="field-value">${documento.tipoDocumento}</div>
              </div>
              <div class="field">
                <span class="field-label">Terapeuta Responsable</span>
                <div class="field-value">${documento.terapeuta.nombres} ${documento.terapeuta.apellidos}</div>
              </div>
              <div class="field">
                <span class="field-label">Fecha de Emisión</span>
                <div class="field-value">${formatDate(documento.fechaEmision)}</div>
              </div>
              <div class="field">
                <span class="field-label">Vigencia del Documento</span>
                <div class="field-value">
                  ${documento.fechaVigencia 
                    ? (documento.vigente 
                        ? `Válido hasta el ${formatDate(documento.fechaVigencia)}`
                        : `Expiró el ${formatDate(documento.fechaVigencia)}`)
                    : 'Sin fecha de vencimiento'
                  }
                </div>
              </div>
            </div>
            
            <div class="document-section">
              <div class="section-title">INFORMACIÓN DEL PACIENTE</div>
              <div class="field">
                <span class="field-label">Nombre Completo</span>
                <div class="field-value">
                  <strong>${documento.paciente.nombres} ${documento.paciente.apellidos}</strong>
                </div>
              </div>
              <div class="field">
                <span class="field-label">Documento de Identidad</span>
                <div class="field-value">DNI ${documento.paciente.dni}</div>
              </div>
              <div class="field">
                <span class="field-label">Estado del Paciente</span>
                <div class="field-value">
                  ${documento.paciente.activo ? 'ACTIVO' : 'INACTIVO'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="verification-section">
            <div class="field-label">URL DE VERIFICACIÓN OFICIAL</div>
            <div class="verification-url">${documento.urlVerificacion}</div>
            <div style="font-size: 13px; color: #4a5568; margin-top: 10px;">
              Utilice este enlace o escanee el código QR para validar la autenticidad del documento
            </div>
          </div>
          
          <div class="legal-note">
            <strong>Nota Legal:</strong> Este documento ha sido verificado electrónicamente por el 
            Centro de Terapias Crecemos. La información mostrada corresponde al estado del documento 
            al momento de la consulta. Fecha y hora de verificación: ${new Date().toLocaleDateString('es-PE', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}.
          </div>
          
          <div class="footer">
            <div class="footer-text">Centro de Terapias Crecemos</div>
            <div class="footer-text">Sistema de Validación Oficial</div>
            <div class="footer-text">www.crecemos.com.pe/validar</div>
          </div>
        </div>
        
        <div class="print-controls">
          <button class="print-button" onclick="window.print()">
            🖨️ Imprimir Comprobante
          </button>
          <button class="close-button" onclick="window.close()">
            Cerrar Ventana
          </button>
        </div>
        
        <script>
          // Enfocar la ventana para impresión
          window.focus();
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };


  const handleCompartir = async () => {
    if (!documento) return;
    
    const url = `${window.location.origin}${window.location.pathname}?code=${encodeURIComponent(documento.codigo)}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Validador – CTC',
          text: 'Verificación de documento',
          url: url
        });
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="verificar-documentos-wrapper">
    
      {/* Header */}
      <header className="verificar-header">
        <div className="verificar-header-inner">
          <div className="verificar-brand">
            <div className="verificar-logo">CTC</div>
            <div className="verificar-brand-text">
              <h1>Validador de Documentos</h1>
              <p>Verifica emisión, vigencia y estado del paciente</p>
            </div>
          </div>
          <a className="verificar-link-web" href="https://www.crecemos.com.pe" target="_blank" rel="noreferrer">
            www.crecemos.com.pe
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="verificar-main-content">
        <div className="verificar-grid-layout">
          {/* Panel de búsqueda */}
          <div className="verificar-panel">
            <div className="verificar-panel-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 8h10M7 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h2>Validar por código</h2>
            </div>

            <form onSubmit={handleValidar}>
              <label htmlFor="code" className="verificar-form-label">Código del documento</label>
              <input
                id="code"
                className={`verificar-input ${error && estado === 'error' ? 'verificar-input-invalid' : ''}`}
                placeholder="Ej: CTC-E7BI959S"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                autoComplete="off"
              />
              <div className="verificar-helper-text">
                También puedes abrir esta página con <strong>?code=CTC-E7BI959S</strong> y validará automáticamente.
              </div>

              <button type="submit" className="verificar-btn-validar" disabled={loading}>
                {loading ? 'Validando...' : 'Validar'}
              </button>
            </form>

            <div className="verificar-info-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p>
                Sistema de validación oficial del <strong>Centro de Terapias Crecemos</strong>. 
                Verifica la autenticidad de certificados y documentos emitidos.
              </p>
            </div>
          </div>

          {/* Panel de resultado */}
          <div className="verificar-panel">
            <div className="verificar-result-header">
              <div className={`verificar-status-badge ${
                estado === 'success' ? 'verificar-status-success' : 
                estado === 'warning' ? 'verificar-status-warning' : 
                estado === 'error' ? 'verificar-status-error' : 
                'verificar-status-idle'
              }`}>
                {estadoTexto}
              </div>
              <span className="verificar-tipo-badge">
                {documento ? documento.tipoDocumento || '—' : '—'}
              </span>
            </div>

            <div className="verificar-result-content">
              {!documento && !error && (
                <div className="verificar-alert verificar-alert-info">
                  Ingrese un código válido o use un enlace con <code>?code=...</code>.
                </div>
              )}

              {error && (
                <div className="verificar-alert verificar-alert-error">
                  <strong>Error:</strong> {error}
                  <br />
                  <small>Código: <code>{codigo.trim().toUpperCase()}</code></small>
                </div>
              )}

              {documento && (
                <>
                  <div className="verificar-info-cards">
                    {/* Card 1: Información del documento */}
                    <div className="verificar-info-card">
                      <div className="verificar-card-label">Código</div>
                      <div className="verificar-card-value verificar-code-value">{documento.codigo}</div>
                      <div className="verificar-card-divider"></div>
                      <div className="verificar-card-label">Tipo de documento</div>
                      <div className="verificar-card-value">{documento.tipoDocumento}</div>
                      <div className="verificar-card-label">Terapeuta</div>
                      <div className="verificar-card-value">
                        {`${documento.terapeuta.nombres} ${documento.terapeuta.apellidos}`}
                      </div>
                    </div>

                    {/* Card 2: Información del paciente */}
                    <div className="verificar-info-card">
                      <div className="verificar-card-label">Paciente</div>
                      <div className="verificar-card-value">
                        <strong>
                          {`${documento.paciente.nombres} ${documento.paciente.apellidos}`}
                        </strong>
                        <br />
                        <span className="verificar-dni-text">
                          DNI {documento.paciente.dni}
                        </span>
                      </div>
                      <div className="verificar-card-label">Estado del paciente</div>
                      <div className="verificar-card-value">
                        <span className={documento.paciente.activo ? 'verificar-estado-activo' : 'verificar-estado-inactivo'}>
                          ● {documento.paciente.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        {documento.paciente.estado && (
                          <span style={{ marginLeft: '8px', fontSize: '0.9em', color: '#666' }}>
                            ({documento.paciente.estado})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card 3: Vigencia */}
                    <div className="verificar-info-card">
                      <div className="verificar-card-label">Fecha de emisión</div>
                      <div className="verificar-card-value">{formatDate(documento.fechaEmision)}</div>
                      <div className="verificar-card-label">Vigencia</div>
                      <div className="verificar-card-value">
                        {documento.fechaVigencia 
                          ? (documento.vigente 
                              ? `Válido hasta el ${formatDate(documento.fechaVigencia)}`
                              : `Expiró el ${formatDate(documento.fechaVigencia)}`)
                          : 'Sin fecha de vencimiento'
                        }
                      </div>
                    </div>

                    {/* Card 4: Verificación */}
                    <div className="verificar-info-card">
                      <div className="verificar-card-label">Verificación</div>
                      <div className="verificar-card-value verificar-verification-url">
                        {documento.urlVerificacion}
                      </div>
                      <p className="verificar-card-note">
                        Use este enlace en el QR del documento para validar su procedencia.
                      </p>
                    </div>
                  </div>

                  {documento.paciente.activo === false && (
                    <div className="verificar-alert verificar-alert-warning">
                      El paciente figura como <strong>inactivo</strong>. La institución receptora puede 
                      requerir confirmación adicional.
                    </div>
                  )}

                  {!documento.vigente && (
                    <div className="verificar-alert verificar-alert-error">
                      Este documento <strong>ha expirado</strong> conforme a la política de vigencias.
                    </div>
                  )}

                  {!documento.valido && (
                    <div className="verificar-alert verificar-alert-error">
                      Este documento <strong>no es válido</strong> en el sistema.
                    </div>
                  )}
                </>
              )}
            </div>

            {documento && (
              <div className="verificar-actions-bar">
                <button className="verificar-btn-secondary" onClick={handleImprimirComprobante}>
                  🖨️ Imprimir
                </button>
                <button className="verificar-btn-secondary" onClick={handleCompartir}>
                  📤 Compartir
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificarDocumentos;