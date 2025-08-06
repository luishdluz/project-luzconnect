"use client";

function Registro() {
  return (
    <div className="flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md shadow-lg border border-[#E5E7EB]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#3b7878]">
          Registro
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Nombre completo:</label>
          <input type="text" className="w-full p-2 border rounded mt-1" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nombre de usuario:</label>
          <input type="text" className="w-full p-2 border rounded mt-1" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Contraseña:</label>
          <input type="password" className="w-full p-2 border rounded mt-1" />
        </div>

        <button
          type="submit"
          className="w-full bg-[#04b3bb] hover:bg-[#039ea6] text-white font-semibold py-2 px-4 rounded"
        >
          Registrarse
        </button>

        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/inicio-sesion" className="text-blue-600 underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}

export default Registro;
