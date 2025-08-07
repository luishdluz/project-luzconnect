"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Historias from "@/components/Historias";

export default function Muro() {
  const pathname = usePathname();
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [textoNuevaPublicacion, setTextoNuevaPublicacion] = useState("");
  const [imagenNuevaPublicacion, setImagenNuevaPublicacion] = useState(null);

  const [usuariosHistorias, setUsuariosHistorias] = useState([]);
  const [textosHumanosJson, setTextosHumanosJson] = useState([]);
  const [fotosPublicaciones, setFotosPublicaciones] = useState([]);

  useEffect(() => {
    fetch("/data/datosTexto/datos.json")
      .then((res) => res.json())
      .then((data) => setTextosHumanosJson(data));
    fetch("/data/datosTexto/fotos.json")
      .then((res) => res.json())
      .then((data) => setFotosPublicaciones(data));
  }, []);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const [resPosts, resUsuarios] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts?_limit=10"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);
        if (!resPosts.ok || !resUsuarios.ok)
          throw new Error("Error al obtener datos");

        const posts = await resPosts.json();
        const usuarios = await resUsuarios.json();

        // Espera a que los textos y fotos estén cargados
        if (textosHumanosJson.length === 0 || fotosPublicaciones.length === 0)
          return;

        const publicacionesConUsuario = posts.map((post, index) => {
          const usuario = usuarios[index % usuarios.length];
          return {
            id: post.id,
            titulo: post.title,
            cuerpo: textosHumanosJson[index % textosHumanosJson.length],
            usuario: {
              nombre: usuario?.name || "Usuario Desconocido",
              foto: `https://i.pravatar.cc/150?img=${(usuario?.id % 70) + 1}`,
            },
            fotoPublicacion:
              fotosPublicaciones[index % fotosPublicaciones.length],
            likes: 0,
          };
        });

        setPublicaciones(publicacionesConUsuario);
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    }

    if (textosHumanosJson.length > 0 && fotosPublicaciones.length > 0) {
      obtenerDatos();
    }
  }, [textosHumanosJson, fotosPublicaciones]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => {
        const usuarios = data.results.map((u) => ({
          nombre: `${u.name.first} ${u.name.last}`,
          foto: u.picture.large,
        }));
        setUsuariosHistorias(usuarios);
      });
  }, []);

  const toggleLike = (id) => {
    setPublicaciones((prev) =>
      prev.map((pub) =>
        pub.id === id ? { ...pub, likes: pub.likes + 1 } : pub
      )
    );
  };

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setImagenNuevaPublicacion(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  const manejarNuevaPublicacion = (e) => {
    e.preventDefault();
    if (!textoNuevaPublicacion.trim()) return;

    const usuarioSesion = JSON.parse(localStorage.getItem("sesionActiva"));

    const nuevaPub = {
      id: Date.now(),
      titulo: "",
      cuerpo: textoNuevaPublicacion,
      usuario: {
        nombre: usuarioSesion?.nombre || "Tú",
        foto: usuarioSesion?.foto || "",
      },
      fotoPublicacion: imagenNuevaPublicacion,
      likes: 0,
    };

    setPublicaciones((prev) => [nuevaPub, ...prev]);
    setTextoNuevaPublicacion("");
    setImagenNuevaPublicacion(null);
  };

  if (cargando) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Cargando publicaciones...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pt-20 h-screen flex flex-col">
      <Historias usuarios={usuariosHistorias} />
      <form
        onSubmit={manejarNuevaPublicacion}
        className="bg-white p-4 rounded-lg shadow mb-4 sticky top-[64px] z-10"
      >
        <textarea
          placeholder="¿Qué estás pensando?"
          value={textoNuevaPublicacion}
          onChange={(e) => setTextoNuevaPublicacion(e.target.value)}
          className="w-full resize-none border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#04b3bb]"
          rows={3}
          required
        />

        <div className="flex items-center justify-between">
          <label className="cursor-pointer text-[#04b3bb] hover:underline">
            Subir foto
            <input
              type="file"
              accept="image/*"
              onChange={manejarArchivo}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-[#04b3bb] text-white px-4 py-2 rounded-md hover:bg-[#0398a0] transition"
          >
            Publicar
          </button>
        </div>

        {imagenNuevaPublicacion && (
          <img
            src={imagenNuevaPublicacion}
            alt="Vista previa"
            className="mt-4 max-h-60 object-contain rounded-md mx-auto"
          />
        )}
      </form>

      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
        {publicaciones.map((pub) => (
          <article
            key={pub.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <header className="flex items-center gap-3 mb-3">
              <img
                src={pub.usuario.foto}
                alt={pub.usuario.nombre}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="font-semibold">{pub.usuario.nombre}</h2>
            </header>

            <p className="mb-3 whitespace-pre-line">{pub.cuerpo}</p>

            {pub.fotoPublicacion && (
              <img
                src={pub.fotoPublicacion}
                alt="Imagen de publicación"
                className="rounded-md max-h-96 object-contain mb-3"
              />
            )}

            <button
              onClick={() => toggleLike(pub.id)}
              className="self-start text-[#04b3bb] font-semibold hover:underline"
            >
              👍 Me gusta {pub.likes > 0 && `(${pub.likes})`}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
