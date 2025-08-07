"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const sesion = localStorage.getItem("sesionActiva");
    if (!sesion) {
      router.replace("/inicio-sesion");
      return;
    }
    const usuarioActual = JSON.parse(sesion);
    setUsuario(usuarioActual);
    setNombre(usuarioActual.nombre || "");
    setPassword(usuarioActual.password || "");
    setFoto(usuarioActual.foto || null);
  }, [router]);

  if (!usuario) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setFoto(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  const manejarGuardar = () => {
    if (!nombre.trim() || !password.trim()) {
      toast.error("Nombre y contraseña no pueden estar vacíos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuariosActualizados = usuarios.map((u) => {
      if (u.nickname === usuario.nickname) {
        return {
          ...u,
          nombre: nombre.trim(),
          password: password.trim(),
          foto: foto,
          nickname: usuario.nickname,
        };
      }
      return u;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

    const usuarioActualizado = {
      ...usuario,
      nombre: nombre.trim(),
      password: password.trim(),
      foto: foto,
    };
    localStorage.setItem("sesionActiva", JSON.stringify(usuarioActualizado));
    setUsuario(usuarioActualizado);
    toast.success("Datos actualizados correctamente.");
  };

  const manejarEliminarCuenta = () => {
    toast.info(
      <div>
        ¿Estás seguro que quieres eliminar tu cuenta? Esta acción no se puede
        deshacer.
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              const usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];
              const usuariosRestantes = usuarios.filter(
                (u) => u.nickname !== usuario.nickname
              );
              localStorage.setItem(
                "usuarios",
                JSON.stringify(usuariosRestantes)
              );
              localStorage.removeItem("sesionActiva");
              toast.dismiss();
              router.push("/inicio-sesion");
            }}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col min-h-screen bg-gray-100 pt-20 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#04b3bb]">
          Perfil
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src={foto || "/default-avatar.png"}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <label className="cursor-pointer text-[#04b3bb] hover:underline">
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                onChange={manejarArchivo}
                className="hidden"
              />
            </label>
            <p className="text-lg font-semibold mt-2">{usuario.nickname}</p>
          </div>

          <label className="block mb-2 font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
          />

          <button
            onClick={manejarGuardar}
            className="w-full bg-[#04b3bb] text-white py-2 rounded-lg hover:bg-[#0398a0] transition mb-4"
          >
            Guardar cambios
          </button>

          <button
            onClick={manejarEliminarCuenta}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar cuenta
          </button>
        </div>
      </main>
    </>
  );
}
