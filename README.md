# Página de cumpleaños 🎂

Una página web para felicitar un cumpleaños. HTML, CSS y JavaScript sin dependencias:
se abre haciendo doble clic en `index.html`.

## Cómo personalizarla

Todo lo editable está en [`config.js`](config.js). No hace falta tocar nada más:

| Campo | Para qué sirve |
| --- | --- |
| `nombre` | Nombre grande de la portada |
| `edad` | Años que cumple (`null` para no mostrarlo) |
| `subtitulo` | Frase bajo el nombre |
| `textoBoton` | Texto del botón de la portada |
| `mensajes` | Tarjetas cortas antes de la carta (vacía = no se muestra la sección) |
| `fotos` | Galería de recuerdos (vacía = no se muestra la sección) |
| `carta` | Título, párrafos y firma de la carta |
| `musica` | Ruta a un `.mp3` de fondo (`null` para ocultar el botón) |

### La carta

Cada elemento de `carta.parrafos` es un párrafo, y aparecen uno a uno al hacer
scroll. `carta.firma` es opcional: con `null` no se muestra.

### Añadir fotos

1. Copia las imágenes en `assets/fotos/`.
2. Añádelas a la lista `fotos` de `config.js`:

```js
fotos: [
  { src: "assets/fotos/1.jpg", pie: "Aquel día" },
  { src: "assets/fotos/2.jpg", pie: "Y aquel otro" },
],
```

### La música

Hay dos formas, en `musica`:

**Un archivo propio** (`musica.archivo`). Se deja en la carpeta del proyecto y se
pone su nombre exacto. Al abrir la página intenta sonar sola; si el navegador lo
bloquea, el botón de abajo a la derecha la activa. Si el archivo no está, el botón
no aparece y no pasa nada más. Vale `.mp3`, `.m4a` y también `.mp4` (se usa solo
su pista de audio).

Los archivos de audio y vídeo están en `.gitignore` a propósito: subir una canción
con derechos a un repo público sería distribuirla.

**El reproductor de Spotify** (`musica.spotify`). Se pega el enlace de la canción
(Compartir → Copiar enlace) y aparece el reproductor oficial al final de la carta:

```js
spotify: "https://open.spotify.com/track/XXXXXXXXXXXXXXXXXXXXXX",
```

Esta es la opción buena si vas a publicar la página en internet.

## Qué tiene

- Portada con un regalo que se abre y confeti
- Nombre animado letra a letra, globos subiendo y cielo estrellado
- La carta, párrafo a párrafo, apareciendo al hacer scroll
- Tarjetas de mensajes, galería de fotos y música (opcionales)
- Adaptada a móvil y respeta `prefers-reduced-motion`

## Verla en el navegador

Doble clic en `index.html`, o con un servidor local:

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>.

## Publicarla en internet (GitHub Pages)

El repo trae el despliegue automático en `.github/workflows/deploy.yml`: cada vez
que subes algo a `main`, la página se publica sola.

Lo único que hay que hacer una vez, tras crear el repo en GitHub:

1. **Settings → Pages → Source**: elegir **GitHub Actions**.
2. Esperar a que termine el workflow (pestaña **Actions**).

La página queda en `https://<usuario>.github.io/<repo>/`.

Recuerda que la música está en `.gitignore`, así que la versión publicada sale sin
canción. Para que suene online, usa `musica.spotify` con el enlace de Spotify.
