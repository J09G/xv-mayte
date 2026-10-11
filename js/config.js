/*
 * ============================================================
 *  CONFIGURACIÓN DE LA INVITACIÓN — edita SOLO este archivo
 * ============================================================
 */
const CONFIG = {
  quinceanera: {
    nombre: "Mayte",
    apellidos: "Gómez Tatis",
  },

  // Viernes 6 de noviembre de 2026, 8:30 p. m. (hora de Colombia)
  fecha: "2026-11-06T20:30:00-05:00",
  hora: "8:30 pm",

  frase:
    "Con el corazón lleno de ilusión, quiero invitarte a compartir conmigo una noche mágica, llena de amor, alegría y sueños. Tu presencia hará que este momento tan especial sea inolvidable.",

  despedida: ["Tu presencia es importante para mí", "¡Te espero!"],

  fotos: {
    portada: "img/portada.jpg",
    detalle: "img/detalle.jpg",
    final: "img/final.jpg",
  },

  // Canción del reproductor "Dale play". Sube el MP3 a img/ con este nombre.
  musica: {
    archivo: "img/cancion.mp3",
    titulo: "No crezcas más · Tercer Cielo",
  },

  // Fotos de la galería (ej. ["img/galeria/1.jpg", "img/galeria/2.jpg"]). Vacío = se oculta.
  galeria: [],

  // Link de la carpeta de Google Drive donde los invitados suben sus fotos.
  // Vacío = el botón dice "Disponible el día de la fiesta".
  subirFotosUrl: "",

  hashtag: "#MisXVMayte",

  ubicacion: {
    lugar: "Salón de eventos Los Heroicos Club Social",
    direccion: "Cra. 64 #29-35, Las Delicias, Cartagena de Indias",
    mapsUrl: "", // opcional: link exacto de Google Maps del salón
  },

  // icono: users | wine | music | camera | utensils | party | drama | martini
  itinerario: [
    { icono: "users", evento: "Recepción de invitados", hora: "8:30 - 9:00 pm" },
    { icono: "wine", evento: "Entrada y brindis", hora: "9:00 - 9:30 pm" },
    { icono: "music", evento: "Cambio de zapatilla y vals", hora: "9:30 - 10:00 pm" },
    { icono: "camera", evento: "Fotos", hora: "10:00 - 10:30 pm" },
    { icono: "utensils", evento: "Cena", hora: "10:30 - 11:00 pm" },
    { icono: "party", evento: "Que empiece la fiesta", hora: "11:00 - 12:00 pm" },
    { icono: "drama", evento: "Hora loca", hora: "12:00 - 1:00 am" },
    { icono: "martini", evento: "Happy hour", hora: "1:00 - 2:00 am" },
  ],

  vestimenta: {
    tipo: "Formal",
    mujeres: "Vestido largo",
    hombres: "Camisa y pantalón",
  },

  regalos: {
    titulo: "Lluvia de sobres",
  },

  rsvp: {
    // URL de la implementación de Google Apps Script (ver README). CAMBIAR
    scriptUrl: "",
    // Número para el botón de respaldo, con indicativo y sin "+" (ej. "573001234567").
    whatsapp: "",
  },

  // Invitaciones personalizadas: compartir el link con ?inv=clave
  // ej. https://.../?inv=familia-perez
  invitados: {
    "familia-perez": { nombre: "Familia Pérez", cupos: 4 }, // ejemplo
  },
};
