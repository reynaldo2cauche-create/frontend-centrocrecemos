// services/libroReclamacionesService.js
import { API_BASE_URL } from './api';

class LibroReclamacionesService {
  // ===== MÉTODOS PÚBLICOS (sin autenticación) =====

  // Crear reclamo
  async crearReclamo(datosReclamo, archivos = []) {
    try {
      const formData = new FormData();
      
      // Agregar datos del formulario
      Object.keys(datosReclamo).forEach(key => {
        if (key === 'aceptaTerminos' || key === 'autorizaProcesamiento') {
          formData.append(key, datosReclamo[key] ? 'true' : 'false');
        } else {
          formData.append(key, datosReclamo[key]);
        }
      });

      // Agregar archivos
      archivos.forEach(archivo => {
        formData.append('archivos', archivo);
      });

      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error del servidor' }));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creando reclamo:', error);
      throw error;
    }
  }

  // ===== MÉTODOS ADMIN (requieren autenticación) =====

  // Obtener headers con autenticación
  getAuthHeaders(contentType = 'application/json') {
    const token = localStorage.getItem('access_token'); // CAMBIADO: access_token en lugar de token
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    
    return headers;
  }

  // Verificar autenticación
  checkAuth() {
    const token = localStorage.getItem('access_token'); // CAMBIADO: access_token en lugar de token
    if (!token) {
      throw new Error('Usuario no autenticado');
    }
    return token;
  }

  // Listar reclamos con filtros
  async listarReclamos(filtros = {}) {
    try {
      this.checkAuth();
      
      const queryParams = new URLSearchParams();
      Object.keys(filtros).forEach(key => {
        if (filtros[key] !== undefined && filtros[key] !== null && filtros[key] !== '') {
          queryParams.append(key, filtros[key]);
        }
      });

      const url = `${API_BASE_URL}/libro-reclamaciones?${queryParams}`;
      console.log('🔍 Consultando:', url);

      const response = await fetch(url, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token'); // CAMBIADO
          localStorage.removeItem('user');
          throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
        }
        
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Respuesta recibida:', data);
      return data;
    } catch (error) {
      console.error('❌ Error listando reclamos:', error);
      throw error;
    }
  }

  // Obtener detalle de reclamo
  async obtenerDetalleReclamo(id) {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo detalle:', error);
      throw error;
    }
  }

  // Obtener documentos del reclamo
  async obtenerDocumentosReclamo(id) {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}/documentos`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo documentos:', error);
      throw error;
    }
  }

  // Obtener estadísticas
  async obtenerEstadisticas() {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/estadisticas/general`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  // Actualizar reclamo
  async actualizarReclamo(id, datosActualizacion) {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(datosActualizacion)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error actualizando reclamo:', error);
      throw error;
    }
  }

  // Cambiar estado del reclamo
  async cambiarEstado(id, estado, usuarioId, observacion = '') {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}/estado`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          estado,
          usuarioId,
          observacion
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  }

  // Responder reclamo
  async responderReclamo(id, respuesta, responsableRespuestaId, observacion = '') {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}/responder`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          respuesta,
          responsableRespuestaId,
          observacion
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error respondiendo reclamo:', error);
      throw error;
    }
  }

  // Cerrar reclamo
  async cerrarReclamo(id, usuarioId, observacion = '') {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}/cerrar`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          usuarioId,
          observacion
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error cerrando reclamo:', error);
      throw error;
    }
  }

  // Eliminar reclamo
  async eliminarReclamo(id) {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error eliminando reclamo:', error);
      throw error;
    }
  }

  // Eliminar documento
  async eliminarDocumento(documentoId) {
    try {
      this.checkAuth();
      
      const response = await fetch(`${API_BASE_URL}/libro-reclamaciones/documento/${documentoId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error eliminando documento:', error);
      throw error;
    }
  }
}

export const libroReclamacionesService = new LibroReclamacionesService();