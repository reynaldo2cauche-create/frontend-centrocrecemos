// hooks/useDetalleReclamo.js
import { useState, useEffect } from 'react';
import { libroReclamacionesService } from '../services/libroReclamacionesService';

export const useDetalleReclamo = (id) => {
  const [reclamo, setReclamo] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarDetalle = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [resultReclamo, resultDocumentos] = await Promise.all([
        libroReclamacionesService.obtenerDetalleReclamo(id),
        libroReclamacionesService.obtenerDocumentosReclamo(id)
      ]);

      if (resultReclamo.success) {
        setReclamo(resultReclamo.data);
      }

      if (resultDocumentos.success) {
        setDocumentos(resultDocumentos.data);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar detalle');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (estado, observacion = '') => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const usuarioId = user?.id;
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
      setError(err.message || 'Error al cambiar estado');
      return false;
    }
  };

  const responder = async (respuesta, observacion = '') => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const responsableRespuestaId = user?.id;
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
      setError(err.message || 'Error al responder reclamo');
      return false;
    }
  };

  const cerrar = async (observacion = '') => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const usuarioId = user?.id;
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
      setError(err.message || 'Error al cerrar reclamo');
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
      setError(err.message || 'Error al descargar documento');
      return false;
    }
  };

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  return {
    reclamo,
    documentos,
    loading,
    error,
    cambiarEstado,
    responder,
    cerrar,
    descargarDocumento,
    refrescar: cargarDetalle
  };
};