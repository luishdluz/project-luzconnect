"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Registro() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");

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

  const manejarRegistro = (e) => {
    e.preventDefault();
    setError("");

    if (!foto) {
      setError("Debes seleccionar una foto de perfil.");
      return;
    }

    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(usuariosGuardados);
    if (usuariosGuardados.some((u) => u.nickname === nickname)) {
      alert("El nickname ya está registrado, elige otro");
      return;
    }

    const usuarioNuevo = { nombre, nickname, password, foto };
    usuariosGuardados.push(usuarioNuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    router.push("/inicio-sesion");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Crear una cuenta
          </h1>

          <form onSubmit={manejarRegistro} className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nickname
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de perfil
              </label>
              <label className="w-full cursor-pointer px-4 py-2 bg-[#04b3bb] text-white rounded-xl text-center hover:bg-[#0398a0] transition">
                Subir foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarArchivo}
                  className="hidden"
                />
              </label>
              {foto && (
                <img
                  src={foto}
                  alt="Vista previa"
                  className="mt-2 h-24 w-24 object-cover rounded-full mx-auto"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#04b3bb] text-white rounded-xl hover:bg-[#0398a0] transition"
            >
              Registrarse
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/inicio-sesion"
              className="text-[#04b3bb] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
