"use client";

import { Home, User, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const rutasConMenu = ["/muro", "/perfil", "/admin"];
  const mostrarMenu = rutasConMenu.includes(pathname);

  // Carga usuario al montar el componente
  useEffect(() => {
    cargarUsuario();
  }, []);

  // Carga usuario cada vez que cambia la ruta para actualizar datos
  useEffect(() => {
    cargarUsuario();
  }, [pathname]);

  function cargarUsuario() {
    const sesion = localStorage.getItem("sesionActiva");
    if (sesion) {
      try {
        const usuario = JSON.parse(sesion);
        setUsuario(usuario);
      } catch (e) {
        console.error("Error al leer la sesión:", e);
      }
    } else {
      setUsuario(null);
    }
  }

  const manejarCerrarSesion = () => {
    localStorage.removeItem("sesionActiva");
    router.push("/inicio-sesion");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/muro"
          className="text-xl font-bold text-[#04b3bb] cursor-pointer"
        >
          LuzConnect
        </Link>

        {mostrarMenu && (
          <>
            {/* Botón hamburguesa en móviles */}
            <button
              className="sm:hidden text-gray-700"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>

            {/* Menú horizontal en pantallas grandes */}
            <nav className="hidden sm:flex space-x-6 items-center">
              {/* Ocultar "Inicio" cuando ya estás en /muro */}
              {pathname !== "/muro" && pathname !== "/admin" && (
                <Link
                  href="/muro"
                  className="text-gray-700 hover:text-[#04b3bb] flex items-center gap-1"
                >
                  <Home size={20} />
                  Inicio
                </Link>
              )}

              {/* Mostrar foto y nombre cuando estás en /muro */}
              {pathname === "/muro" && usuario && (
                <button
                  onClick={() => router.push("/perfil")}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#04b3bb] bg-transparent border-none p-0"
                  aria-label="Ir al perfil"
                >
                  <img
                    src={usuario.foto}
                    alt="Foto de perfil"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{usuario.nombre}</span>
                </button>
              )}

              {/* Mostrar botón perfil solo si NO estamos en /perfil ni en /muro */}
              {pathname == "/home" && (
                <Link
                  href="/perfil"
                  className="text-gray-700 hover:text-[#04b3bb] flex items-center gap-1"
                >
                  <User size={20} />
                  Perfil
                </Link>
              )}

              <button
                onClick={manejarCerrarSesion}
                className="text-gray-700 hover:text-[#04b3bb] flex items-center gap-1 bg-transparent border-none p-0"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </nav>
          </>
        )}
      </div>

      {/* Menú desplegable para móvil */}
      {mostrarMenu && menuAbierto && (
        <nav className="sm:hidden bg-white border-t border-gray-200 px-4 pb-3">
          {pathname !== "/muro" && pathname !== "/admin" && (
            <Link
              href="/muro"
              className="block py-2 text-gray-700 hover:text-[#04b3bb] flex items-center gap-2"
            >
              <Home size={20} />
              Inicio
            </Link>
          )}

          {pathname === "/muro" && usuario && (
            <button
              onClick={() => router.push("/perfil")}
              className="block py-2 text-gray-700 hover:text-[#04b3bb] flex items-center gap-2 bg-transparent border-none p-0"
              aria-label="Ir al perfil"
            >
              <img
                src={usuario.foto}
                alt="Foto de perfil"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{usuario.nombre}</span>
            </button>
          )}

          {pathname == "/home" && (
            <Link
              href="/perfil"
              className="block py-2 text-gray-700 hover:text-[#04b3bb] flex items-center gap-2"
            >
              <User size={20} />
              Perfil
            </Link>
          )}

          <button
            onClick={manejarCerrarSesion}
            className="block w-full text-left py-2 text-gray-700 hover:text-[#04b3bb] flex items-center gap-2 bg-transparent border-none p-0"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </nav>
      )}
    </header>
  );
}
