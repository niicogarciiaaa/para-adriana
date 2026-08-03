/**
 * Toda la personalización de la página vive aquí.
 * Cambia estos valores y la página se actualiza sola: no hace falta tocar nada más.
 */
const CONFIG = {
  // Nombre de la cumpleañera (aparece en el título grande)
  nombre: "Adriana",

  // Años que cumple. Ponlo a null si prefieres no mostrar la edad.
  edad: 18,

  // Frase que aparece bajo el nombre
  subtitulo: "Hoy es tu día ❤️",

  // Texto del botón que abre la página
  textoBoton: "Ábreme",

  // Tarjetas cortas antes de la carta.
  // Si dejas la lista vacía, la sección no aparece.
  mensajes: [],

  // Fotos de la galería.
  // Copia tus imágenes dentro de assets/fotos/ y pon aquí la ruta y el pie de foto.
  // Si dejas la lista vacía, la sección de fotos no aparece.
  fotos: [
    // { src: "assets/fotos/1.jpg", pie: "Aquel día" },
    // { src: "assets/fotos/2.jpg", pie: "Y aquel otro" },
  ],

  // La carta. Cada elemento de "parrafos" aparece por separado al hacer scroll.
  carta: {
    titulo: "Quería decirte una cosa",
    parrafos: [
      "Hoy por fin llegan tus 18, así que espero que disfrutes muchísimo de tu día y que te lo pases genial, porque te lo mereces de verdad.",
      "La verdad es que no se me da muy bien escribir este tipo de cosas, y creo que se nota un poco en la redacción, pero aun así quería intentarlo.",
      "También quería aprovechar para darte las gracias por todo lo que has hecho por mí estas semanas. Sé que no hace mucho que nos conocemos, pero aun así has conseguido estar ahí para mí en momentos en los que lo necesitaba. Gracias por escucharme, por preocuparte por mí, por hacerme reír cuando estaba de bajón y por sacar siempre tiempo para mí. Puede que para ti sean cosas pequeñas, pero para mí significan muchísimo.",
      "La verdad es que me alegro un montón de que la vida nos haya cruzado. En muy poco tiempo te has convertido en alguien importante para mí y cada día que paso contigo hace que tenga todavía más claro que eres una persona increíble. Me encanta hablar contigo, hacer el tonto contigo y escucharte, de verdad, es de lo que más me gusta.",
      "Espero que hoy sonrías mucho, que disfrutes de cada momento y que este cumpleaños sea tan especial como tú. Gracias por todo, de verdad. Y, sobre todo, gracias por ser tú. ❤️",
    ],
    // Pon aquí tu nombre si quieres firmarla. Déjalo en null para no firmar.
    firma: null,
  },

  // Música de fondo (opcional).
  // Guarda un mp3 en assets/ y pon aquí su ruta, por ejemplo "assets/cancion.mp3".
  // Déjalo en null para no mostrar el botón de música.
  musica: null,
};
