"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InicioSesion() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const sesion = localStorage.getItem("sesionActiva");
    if (sesion) {
      router.replace("/muro");
    } else {
      setCargando(false);
    }
  }, [router]);

  const manejarInicioSesion = (e) => {
    e.preventDefault();
    setError("");

    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(usuariosGuardados);

    const usuarioEncontrado = usuariosGuardados.find(
      (u) => u.nickname === nickname && u.password === password
    );

    if (!usuarioEncontrado) {
      setError("Nickname o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));

    if (usuarioEncontrado.nickname === "admin") router.push("/admin");
    else router.push("/muro");
  };

  if (cargando) {
    // Aquí puedes poner un loader o devolver null para no mostrar nada
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Iniciar sesión
          </h1>

          <form onSubmit={manejarInicioSesion} className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

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

            <button
              type="submit"
              className="w-full py-2 bg-[#04b3bb] text-white rounded-xl hover:bg-[#0398a0] transition"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="text-[#04b3bb] hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
