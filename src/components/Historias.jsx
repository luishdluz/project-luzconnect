"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const Historias = ({ usuarios }) => {
  const [mostrarHistoria, setMostrarHistoria] = useState(false);
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);

  const mostrarModal = (usuario) => {
    setHistoriaSeleccionada(usuario);
    setMostrarHistoria(true);

    setTimeout(() => {
      setMostrarHistoria(false);
      setHistoriaSeleccionada(null);
    }, 4000);
  };

  return (
    <div className="fixed right-4 top-20 w-40 flex flex-col items-center gap-4 z-50">
      {usuarios.map((usuario, index) => (
        <button
          key={index}
          onClick={() => mostrarModal(usuario)}
          className="rounded-full border-2 border-pink-500 p-1 hover:scale-105 transition-transform"
        >
          <Image
            src={usuario.foto}
            alt={usuario.nombre}
            width={64}
            height={64}
            className="rounded-full"
          />
        </button>
      ))}

      {mostrarHistoria && historiaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs relative flex flex-col items-center">
            {/* Botón de cerrar grande, fuera de la foto */}
            <button
              onClick={() => {
                setMostrarHistoria(false);
                setHistoriaSeleccionada(null);
              }}
              className="absolute -top-6 right-2 bg-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center text-3xl text-gray-700 hover:text-red-500 border-2 border-gray-300"
              aria-label="Cerrar"
              style={{ zIndex: 10 }}
            >
              ×
            </button>
            <Image
              src={historiaSeleccionada.foto}
              alt="Imagen de prueba"
              width={600}
              height={400}
              className="rounded"
            />
            <p className="text-center mt-2 font-semibold">
              {historiaSeleccionada.nombre}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

Historias.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      foto: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Historias;
