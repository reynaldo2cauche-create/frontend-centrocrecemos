import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import  BasicLayout  from '../layouts/BasicLayout';
import  HomePage  from '../pages/HomePage';
import { ErrorPage } from '../pages/ErrorPage';
import  Servicios  from '../pages/Services';
import  UsPage  from '../pages/UsPage';
import { Staff } from '../pages/Staff';
import { ContactUs } from '../pages/ContactUs';
import { AreaInfantilPage } from '../pages/areas/AreaInfantilPage';
import { Loading } from '../components/Loading/Loading';
import  TerapiaLenguajePage  from '../pages/services-infantil/TerapiaLenguajePage';
import  TerapiaOcupacionalPage  from '../pages/services-infantil/TerapiaOcupacionalPage';
import  PsicologiaInfantilPage  from '../pages/services-infantil/PsicologiaInfantilPage';
import  EvaluacionPsicologicaColegioPage  from '../pages/services-infantil/EvaluacionPsicPage';
import  OrientacionVocacionalPage  from '../pages/services-infantil/OrientacionVocacionalPage';
import { AreaAdultosPage } from '../pages/areas/AreaAdultosPage';
import { AdultoPsicologiaIndividualPage } from '../pages/service-adulto/AdultoPsicologiaIndividualPage';
import  AdultoTerapiaParejaPage  from '../pages/service-adulto/AdultoTerapiaParejaPage';
import  AdultoTerapiaFamiliarPage  from '../pages/service-adulto/AdultoTerapiaFamiliarPage';
import  AdultoTerapiaLenguajePage  from '../pages/service-adulto/AdultoTerapiaLenguajePage';
import { TerminosCondiciones } from '../pages/TerminosCondiciones';
import { TrabajaNosotros } from '../pages/TrabajaNosotros';
import  TerapiaAprendizajePage  from '../pages/services-infantil/TerapiaAprendizajePage';
import { ListaPacientes } from '../pages/ListaPacientes';
import Preguntas from '../pages/Preguntas';
import { ReportesEvaluaciones } from '../pages/ReportesEvaluaciones';
import RegistroPacientePage from '../pages/RegistroPacientePage';
import EditarPacientePage from '../pages/EditarPacientePage';
import  AdultoEvalPsicolUniverPage  from '../pages/service-adulto/AdultoEvalPsicolUniverPage';
import TopMenu from '../components/TopMenu';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import Usuarios from '../pages/Usuarios';
import Agenda from '../pages/Agenda';
import ReglamentoInterno from '../pages/ReglamentoInterno';
import PoliticaPrivacidad from '../pages/PoliticaPrivacidad';
import Mantenimiento from '../pages/Mantenimiento';


export const AppRouter = () => {
  const location = useLocation();
  
  // Ocultar NavBar/TopMenu en todas las rutas de intranet y en editar-paciente
  const shouldHideNavBar = location.pathname.startsWith('/intranet') || location.pathname.startsWith('/editar-paciente/');

  return (
    <>
      {/* ELIMINADO: El NavBar ya está en BasicLayout */}
      <Routes>
        <Route path="/intranet" element={<Login />} />
        <Route path="/intranet/lista-pacientes" element={
          <PrivateRoute>
            <ListaPacientes />
          </PrivateRoute>
        } />
        <Route path="/intranet/reportes-evaluaciones" element={
          <PrivateRoute>
            <ReportesEvaluaciones />
          </PrivateRoute>
        } />
        <Route path="/intranet/usuarios" element={
          <PrivateRoute>
            <Usuarios />
          </PrivateRoute>
        } />
        <Route path="/intranet/agenda" element={
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
        } />
        
        <Route path="/editar-paciente/:id" element={<><TopMenu /><EditarPacientePage /></>} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="nosotros" element={<UsPage />} />
          <Route path="servicios" element={<Servicios/>} />
          <Route path="staff" element={<Staff />} />
          <Route path="contactanos" element={<ContactUs />} />
          <Route path="area-infantil-adolescentes" element={<AreaInfantilPage />} /> 
          <Route path="area-adultos" element={<AreaAdultosPage />} /> 
          <Route path="infantil-terapia-lenguaje" element={<TerapiaLenguajePage />} />      
          <Route path="infantil-terapia-ocupacional" element={<TerapiaOcupacionalPage />} />      
          <Route path="infantil-terapia-aprendizaje" element={<TerapiaAprendizajePage />} />      
          <Route path="infantil-psicologia-infantil" element={<PsicologiaInfantilPage />} />      
          <Route path="infantil-evaluacion-psicologica-colegio" element={<EvaluacionPsicologicaColegioPage />} />      
          <Route path="infantil-orientacion-vocacional" element={<OrientacionVocacionalPage />} />      
          <Route path="adulto-psicologia-individual" element={<AdultoPsicologiaIndividualPage />} />
          <Route path="adulto-terapia-pareja" element={<AdultoTerapiaParejaPage />} />
          <Route path="adulto-terapia-familiar" element={<AdultoTerapiaFamiliarPage />} />
          <Route path="adulto-terapia-lenguaje" element={<AdultoTerapiaLenguajePage />} />
          <Route path="adulto-evaluacion-psicologica-universidad" element={<AdultoEvalPsicolUniverPage />} />
          <Route path="terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="mantenimiento" element={<Mantenimiento />} />
          <Route path="reglamento-interno" element={<ReglamentoInterno />} />
          <Route path="politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="trabaja-nosotros" element={<TrabajaNosotros />} />
          <Route path="registro-paciente" element={<RegistroPacientePage />} />
          <Route path="loading" element={<Loading />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}