import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import WhatsAppFloat from "../components/whatsapp/WhatsappButton";

export default function BasicLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header / Navbar */}
      <Navbar />

      {/* Contenido dinámico - SIN Container de MUI */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          pt: 0,
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Float Button - Fuera del flujo normal */}
      <WhatsAppFloat />
    </Box>
  );
}