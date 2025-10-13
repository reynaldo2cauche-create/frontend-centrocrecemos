// pages/Admin/DetalleReclamoPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { libroReclamacionesService } from '../../services/libroReclamacionesService';
import { DetalleReclamo } from '../../page/DetalleReclamo';
import { DocumentosReclamo } from '../../components/Admin/DocumentosReclamo';
import { AccionesReclamo } from '../../components/Admin/AccionesReclamo';

export const DetalleReclamo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reclamo, setReclamo] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  const cargarDetalle = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [resultReclamo, resultDocumentos] = await Promise.all([
        libroReclamacionesService.obtenerDetalleReclamo(id),
        libroReclamacionesService.obtenerDocumentosReclamo(id)
      ]);

      if (resultReclamo.success) {
        setReclamo(resultReclamo.data);
      } else {
        setError(resultReclamo.message || 'Error al cargar el reclamo');
      }

      if (resultDocumentos.success) {
        setDocumentos(resultDocumentos.data);
      }
    } catch (err) {
      setError('Error de conexión al cargar el detalle');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (estado, observacion = '') => {
    try {
      const usuarioId = JSON.parse(localStorage.getItem('user')).id;
      const result = await libroReclamacionesService.cambiarEstado(
        id, 
        estado, 
        usuarioId, 
        observacion
      );

      if (result.success) {
        setReclamo(result.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      return false;
    }
  };

  const responderReclamo = async (respuesta, observacion = '') => {
    try {
      const responsableRespuestaId = JSON.parse(localStorage.getItem('user')).id;
      const result = await libroReclamacionesService.responderReclamo(
        id,
        respuesta,
        responsableRespuestaId,
        observacion
      );

      if (result.success) {
        setReclamo(result.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al responder reclamo:', err);
      return false;
    }
  };

  const cerrarReclamo = async (observacion = '') => {
    try {
      const usuarioId = JSON.parse(localStorage.getItem('user')).id;
      const result = await libroReclamacionesService.cerrarReclamo(
        id,
        usuarioId,
        observacion
      );

      if (result.success) {
        setReclamo(result.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al cerrar reclamo:', err);
      return false;
    }
  };

  const descargarDocumento = async (documentoId) => {
    try {
      const blob = await libroReclamacionesService.descargarDocumento(documentoId);
      
      // Crear URL temporal para descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `documento-${documentoId}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      console.error('Error al descargar documento:', err);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información del reclamo...</p>
        </div>
      </div>
    );
  }

  if (error || !reclamo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error al cargar el reclamo</h2>
          <p className="text-red-600 mb-4">{error || 'Reclamo no encontrado'}</p>
          <button
            onClick={() => navigate('/admin/reclamos')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/reclamos')}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al listado
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Reclamo #{reclamo.numeroReclamo}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                reclamo.estado === 'RECIBIDO' ? 'bg-yellow-100 text-yellow-800' :
                reclamo.estado === 'EN_REVISION' ? 'bg-blue-100 text-blue-800' :
                reclamo.estado === 'RESPONDIDO' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {reclamo.estado.replace('_', ' ')}
              </span>
              <span className="text-gray-600">
                Registrado: {new Date(reclamo.fecha_registro).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <AccionesReclamo
            reclamo={reclamo}
            onEstadoChange={cambiarEstado}
            onResponder={responderReclamo}
            onCerrar={cerrarReclamo}
            onRefrescar={cargarDetalle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <DetalleReclamo reclamo={reclamo} />
          
          {/* Respuesta del administrador */}
          {reclamo.respuesta && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Respuesta del Centro</h3>
              <div className="prose prose-green max-w-none">
                <p className="text-green-700 whitespace-pre-wrap">{reclamo.respuesta}</p>
              </div>
              {reclamo.fecha_respuesta && (
                <p className="text-green-600 text-sm mt-3">
                  Respondido: {new Date(reclamo.fecha_respuesta).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Columna derecha - Documentos e información adicional */}
        <div className="space-y-6">
          <DocumentosReclamo
            documentos={documentos}
            onDescargar={descargarDocumento}
          />
        </div>
      </div>
    </div>
  );
};