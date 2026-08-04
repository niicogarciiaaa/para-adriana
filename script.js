/**
 * Lógica de la página de cumpleaños.
 * Todo el contenido se lee de CONFIG (config.js).
 */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     Confeti
  ------------------------------------------------------- */
  const confeti = (() => {
    const canvas = $("confeti");
    const ctx = canvas.getContext("2d");
    const colores = ["#ffb4c6", "#ffd9a0", "#f6c76b", "#f4eefb", "#c9a0ff", "#9ad9ff"];
    let piezas = [];
    let animando = false;

    function ajustar() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function crear(cantidad, origen) {
      for (let i = 0; i < cantidad; i++) {
        piezas.push({
          x: origen ? origen.x : Math.random() * window.innerWidth,
          y: origen ? origen.y : -20 - Math.random() * window.innerHeight * 0.4,
          ancho: 6 + Math.random() * 7,
          alto: 8 + Math.random() * 10,
          color: colores[(Math.random() * colores.length) | 0],
          vx: (Math.random() - 0.5) * (origen ? 9 : 2.2),
          vy: origen ? -Math.random() * 11 - 3 : Math.random() * 2.5 + 1.8,
          giro: Math.random() * Math.PI * 2,
          vGiro: (Math.random() - 0.5) * 0.24,
          vida: 1,
        });
      }
      if (!animando) {
        animando = true;
        requestAnimationFrame(bucle);
      }
    }

    function bucle() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      piezas = piezas.filter((p) => {
        p.vy += 0.13;              // gravedad
        p.vx *= 0.995;             // rozamiento
        p.x += p.vx;
        p.y += p.vy;
        p.giro += p.vGiro;
        if (p.y > window.innerHeight * 0.72) p.vida -= 0.012;

        if (p.vida <= 0 || p.y > window.innerHeight + 60) return false;

        ctx.save();
        ctx.globalAlpha = Math.max(p.vida, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.giro);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.ancho / 2, -p.alto / 2, p.ancho, p.alto);
        ctx.restore();
        return true;
      });

      if (piezas.length) {
        requestAnimationFrame(bucle);
      } else {
        animando = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }

    ajustar();
    window.addEventListener("resize", ajustar);

    return {
      lluvia: (n = 140) => crear(n, null),
      estallido: (x, y, n = 60) => crear(n, { x, y }),
    };
  })();

  /* -------------------------------------------------------
     Contenido: hero
  ------------------------------------------------------- */
  function pintarHero() {
    document.title = `Feliz cumpleaños, ${CONFIG.nombre}`;

    // El nombre se parte en letras para animarlas una a una
    const nombre = $("nombre");
    [...CONFIG.nombre].forEach((caracter, i) => {
      const span = document.createElement("span");
      span.className = caracter === " " ? "letra letra--espacio" : "letra";
      span.textContent = caracter === " " ? " " : caracter;
      span.style.animationDelay = `${0.35 + i * 0.075}s`;
      nombre.appendChild(span);
    });

    if (CONFIG.edad !== null && CONFIG.edad !== undefined) {
      const edad = $("edad");
      edad.textContent = `${CONFIG.edad} años`;
      edad.hidden = false;
    }

    ajustarDegradado();
    window.addEventListener("resize", ajustarDegradado);

    $("subtitulo").textContent = CONFIG.subtitulo;
    $("btn-abrir").textContent = CONFIG.textoBoton;
  }

  /**
   * Cada letra lleva su propio degradado; se le da el ancho del nombre completo
   * y se desplaza según su posición para que el conjunto se vea continuo.
   */
  function ajustarDegradado() {
    const nombre = $("nombre");
    const ancho = nombre.offsetWidth;
    if (!ancho) return;

    nombre.querySelectorAll(".letra").forEach((letra) => {
      letra.style.backgroundSize = `${ancho}px 100%`;
      letra.style.backgroundPosition = `${-letra.offsetLeft}px 0`;
    });
  }

  function pintarGlobos() {
    if (sinMovimiento) return;
    const contenedor = document.querySelector(".globos");
    const colores = ["#ffb4c6", "#ffd9a0", "#c9a0ff", "#9ad9ff", "#f6c76b"];

    for (let i = 0; i < 12; i++) {
      const globo = document.createElement("div");
      globo.className = "globo";
      globo.style.left = `${Math.random() * 96}%`;
      globo.style.background = colores[i % colores.length];
      globo.style.animationDuration = `${11 + Math.random() * 9}s`;
      globo.style.animationDelay = `${Math.random() * 12}s`;

      // El tamaño se cambia con width/height: un transform inline lo pisaría
      // la animación, que también anima transform.
      const escala = 0.6 + Math.random() * 0.6;
      globo.style.width = `${44 * escala}px`;
      globo.style.height = `${56 * escala}px`;

      contenedor.appendChild(globo);
    }
  }

  /* -------------------------------------------------------
     Mensajes y fotos
  ------------------------------------------------------- */
  function pintarMensajes() {
    const mensajes = CONFIG.mensajes || [];
    if (!mensajes.length) return;

    const contenedor = $("tarjetas");
    $("seccion-mensajes").hidden = false;

    mensajes.forEach((mensaje, i) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta revelar";
      tarjeta.style.transitionDelay = `${i * 0.12}s`;
      tarjeta.innerHTML = `
        <span class="tarjeta__numero">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="tarjeta__titulo"></h3>
        <p class="tarjeta__texto"></p>`;
      tarjeta.querySelector(".tarjeta__titulo").textContent = mensaje.titulo;
      tarjeta.querySelector(".tarjeta__texto").textContent = mensaje.texto;
      contenedor.appendChild(tarjeta);
    });
  }

  function pintarFotos() {
    const fotos = CONFIG.fotos || [];
    if (!fotos.length) return;

    const seccion = $("seccion-fotos");
    const galeria = $("galeria");
    seccion.hidden = false;

    fotos.forEach((foto, i) => {
      const figura = document.createElement("figure");
      figura.className = "foto revelar";
      figura.style.transitionDelay = `${i * 0.08}s`;

      const img = document.createElement("img");
      img.src = foto.src;
      img.alt = foto.pie || "Recuerdo";
      img.loading = "lazy";
      figura.appendChild(img);

      if (foto.pie) {
        const pie = document.createElement("figcaption");
        pie.className = "foto__pie";
        pie.textContent = foto.pie;
        figura.appendChild(pie);
      }

      galeria.appendChild(figura);
    });
  }

  function pintarCarta() {
    const carta = CONFIG.carta;
    $("carta-titulo").textContent = carta.titulo;

    const cuerpo = $("carta-cuerpo");
    const parrafos = carta.parrafos || (carta.texto ? [carta.texto] : []);

    parrafos.forEach((texto, i) => {
      const p = document.createElement("p");
      p.className = "carta__parrafo revelar";
      p.style.transitionDelay = `${i * 0.14}s`;
      p.textContent = texto;
      cuerpo.appendChild(p);
    });

    if (carta.firma) {
      const firma = $("carta-firma");
      firma.textContent = carta.firma;
      firma.hidden = false;
    }
  }

  /* -------------------------------------------------------
     Aparición al hacer scroll
  ------------------------------------------------------- */
  function activarRevelado() {
    document
      .querySelectorAll(".seccion__titulo, .seccion__nota, .carta")
      .forEach((el) => el.classList.add("revelar"));

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("revelar--visible");
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));
  }

  /* -------------------------------------------------------
     Música
  ------------------------------------------------------- */
  /**
   * Saca el id de una URL de Spotify. Acepta el enlace tal cual lo copia la app,
   * con o sin los parámetros de detrás (?si=...).
   */
  function idDeSpotify(url) {
    const encontrado = String(url).match(/track\/([A-Za-z0-9]+)/);
    return encontrado ? encontrado[1] : null;
  }

  function activarSpotify() {
    const enlace = CONFIG.musica && CONFIG.musica.spotify;
    const id = enlace && idDeSpotify(enlace);
    if (!id) return;

    const contenedor = $("spotify");
    const marco = document.createElement("iframe");
    marco.src = `https://open.spotify.com/embed/track/${id}`;
    marco.title = "Reproductor de Spotify";
    marco.width = "100%";
    marco.height = "152";
    marco.loading = "lazy";
    marco.allow = "encrypted-media; clipboard-write; picture-in-picture";
    contenedor.appendChild(marco);
    contenedor.hidden = false;
  }

  function activarMusica() {
    const archivo = CONFIG.musica && CONFIG.musica.archivo;
    if (!archivo) return;

    const audio = $("audio");
    const boton = $("btn-musica");
    audio.src = archivo;
    audio.volume = 0.35;
    boton.hidden = false;

    if (CONFIG.musica.titulo) {
      $("musica-texto").textContent = CONFIG.musica.titulo;
    }

    // Si el mp3 todavía no está en assets/, mejor esconder el botón que
    // dejar uno que no hace nada.
    audio.addEventListener("error", () => {
      boton.hidden = true;
    });

    boton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(
          () => boton.setAttribute("aria-pressed", "true"),
          () => {} // el navegador puede bloquear la reproducción; no pasa nada
        );
      } else {
        audio.pause();
        boton.setAttribute("aria-pressed", "false");
      }
    });

    return audio;
  }

  /* -------------------------------------------------------
     Apertura
  ------------------------------------------------------- */
  function abrir(audio) {
    const portada = $("portada");
    const pagina = $("pagina");

    $("regalo").classList.add("regalo--abierto");
    pagina.hidden = false;
    ajustarDegradado(); // hasta ahora la página estaba oculta y no tenía medidas

    setTimeout(() => {
      portada.classList.add("portada--fuera");
      confeti.lluvia(170);
      if (audio) audio.play().then(
        () => $("btn-musica").setAttribute("aria-pressed", "true"),
        () => {}
      );
    }, 520);

    setTimeout(() => {
      portada.remove();
      document.body.style.overflow = "";
    }, 1400);
  }

  /* -------------------------------------------------------
     Arranque
  ------------------------------------------------------- */
  document.body.style.overflow = "hidden";

  pintarHero();
  pintarGlobos();
  pintarMensajes();
  pintarFotos();
  pintarCarta();
  activarRevelado();
  activarSpotify();
  const audio = activarMusica();

  $("btn-abrir").addEventListener("click", () => abrir(audio));
})();
