"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("sesionActiva"));
    if (
      !usuarioActual ||
      usuarioActual.nickname !== "admin" ||
      usuarioActual.password !== "adminadmin"
    ) {
      router.replace("/inicio-sesion");
      return;
    }

    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosGuardados);
  }, [router]);

  const confirmarEliminacion = (nickname) => {
    if (nickname === "admin") {
      toast.warning("No puedes eliminar al usuario administrador");
      return;
    }
    setUsuarioAEliminar(nickname);
    setMostrarModal(true);
  };

  const eliminarUsuario = () => {
    const nuevosUsuarios = usuarios.filter(
      (u) => u.nickname !== usuarioAEliminar
    );
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    toast.success(`Usuario "${usuarioAEliminar}" eliminado`);
    setMostrarModal(false);
    setUsuarioAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModal(false);
    setUsuarioAEliminar(null);
  };

  return (
    <main className="max-w-4xl mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      {usuarios.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <ul className="space-y-4">
          {usuarios
            .filter((usuario) => usuario.nickname !== "admin") // ocultar admin
            .map((usuario) => (
              <li
                key={usuario.nickname}
                className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  {/* Foto del usuario */}
                  {usuario.foto && (
                    <img
                      src={usuario.foto}
                      alt={`Foto de ${usuario.nombre}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}

                  <div>
                    <p className="font-medium">{usuario.nombre}</p>
                    <p className="text-sm text-gray-600">{usuario.nickname}</p>
                  </div>
                </div>

                <button
                  onClick={() => confirmarEliminacion(usuario.nickname)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
      )}

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Confirmar eliminación
            </h2>
            <p className="mb-6">
              ¿Estás seguro de que deseas eliminar al usuario{" "}
              <strong>{usuarioAEliminar}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelarEliminacion}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarUsuario}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
