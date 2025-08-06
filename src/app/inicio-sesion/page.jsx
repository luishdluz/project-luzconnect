"use client";

export default function InicioSesion({ setUsuarioAutenticado }) {
  return (
    <main className="w-full pt-[64px] pb-[64px] bg-white">
      <section className="max-w-xl mx-auto px-4 py-6 bg-white shadow-lg rounded-md border border-[#E5E7EB]">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#3b7878]">
          Inicio de Sesión
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-[#04b3bb] hover:bg-[#039ea6] text-white font-semibold py-2 px-4 rounded"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-blue-600 underline">
            Regístrate aquí
          </a>
        </p>
      </section>
    </main>
  );
}
