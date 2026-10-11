(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const fecha = new Date(CONFIG.fecha);
  const ZONA = "America/Bogota";

  // Iconos de línea (Lucide, licencia ISC).
  const ICONOS = {
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    shuffle: '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
    skipBack: '<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',
    skipForward: '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    repeat: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  };

  function svg(nombre) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre] || ""}</svg>`;
  }

  function pintarIconos(raiz) {
    raiz.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = svg(node.dataset.icon);
    });
  }

  // Crea un elemento con texto (nunca innerHTML con datos).
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // ---------- Invitado personalizado (?inv=clave) ----------
  const clave = new URLSearchParams(location.search).get("inv");
  const invitado = clave && Object.prototype.hasOwnProperty.call(CONFIG.invitados, clave)
    ? CONFIG.invitados[clave]
    : null;

  if (invitado) {
    const saludo = $("#saludo");
    saludo.textContent = `${invitado.nombre}, tienen ${invitado.cupos} ${invitado.cupos === 1 ? "lugar reservado" : "lugares reservados"} 💛`;
    saludo.hidden = false;
  }

  // ---------- Textos ----------
  const textos = {
    nombre: CONFIG.quinceanera.nombre,
    apellidos: CONFIG.quinceanera.apellidos,
    frase: CONFIG.frase,
    hora: CONFIG.hora,
    lugar: CONFIG.ubicacion.lugar,
    direccion: CONFIG.ubicacion.direccion,
    vestimentaTipo: CONFIG.vestimenta.tipo,
    mujeres: CONFIG.vestimenta.mujeres,
    hombres: CONFIG.vestimenta.hombres,
    regalosTitulo: CONFIG.regalos.titulo,
    hashtag: CONFIG.hashtag,
    inicial: CONFIG.quinceanera.nombre.charAt(0),
  };
  document.querySelectorAll("[data-bind]").forEach((node) => {
    node.textContent = textos[node.dataset.bind] ?? "";
  });

  const despedida = $("#despedida");
  CONFIG.despedida.forEach((linea, i) => {
    if (i) despedida.appendChild(el("br"));
    despedida.appendChild(document.createTextNode(linea));
  });

  // ---------- Fotos ----------
  [["#foto-portada", "portada"], ["#foto-detalle", "detalle"], ["#foto-final", "final"]].forEach(([sel, foto]) => {
    const img = $(sel);
    if (CONFIG.fotos[foto]) img.src = CONFIG.fotos[foto];
    else img.hidden = true;
  });
  $("#foto-detalle").loading = "lazy";
  $("#foto-final").loading = "lazy";

  // Destellos dorados sobre la foto de portada
  const framePortada = $("#frame-portada");
  for (let i = 0; i < 14; i++) {
    const chispa = el("span", "sparkle");
    chispa.style.left = `${Math.random() * 100}%`;
    chispa.style.top = `${Math.random() * 100}%`;
    chispa.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
    chispa.style.setProperty("--s", (0.5 + Math.random()).toFixed(2));
    framePortada.appendChild(chispa);
  }

  // ---------- Galería + visor ----------
  const galeria = CONFIG.galeria || [];
  if (galeria.length) {
    const grid = $("#galeria-fotos");
    galeria.forEach((src, i) => {
      const btn = el("button", "gallery__item");
      btn.setAttribute("aria-label", `Ver foto ${i + 1}`);
      const img = el("img");
      img.src = src;
      img.alt = `Foto ${i + 1} de ${CONFIG.quinceanera.nombre}`;
      img.loading = "lazy";
      btn.appendChild(img);
      btn.addEventListener("click", () => abrirVisor(i));
      grid.appendChild(btn);
    });
    $("#galeria").hidden = false;
  }

  const visor = $("#lightbox");
  const visorImg = $("#lb-img");
  let fotoActual = 0;
  function mostrarFoto(i) {
    fotoActual = (i + galeria.length) % galeria.length;
    visorImg.src = galeria[fotoActual];
    visorImg.alt = `Foto ${fotoActual + 1} de ${galeria.length}`;
  }
  function abrirVisor(i) {
    mostrarFoto(i);
    visor.hidden = false;
    document.body.classList.add("is-locked");
    $("#lb-cerrar").focus();
  }
  function cerrarVisor() {
    visor.hidden = true;
    document.body.classList.remove("is-locked");
  }
  $("#lb-cerrar").addEventListener("click", cerrarVisor);
  $("#lb-prev").addEventListener("click", () => mostrarFoto(fotoActual - 1));
  $("#lb-next").addEventListener("click", () => mostrarFoto(fotoActual + 1));
  visor.addEventListener("click", (e) => { if (e.target === visor) cerrarVisor(); });
  document.addEventListener("keydown", (e) => {
    if (visor.hidden) return;
    if (e.key === "Escape") cerrarVisor();
    if (e.key === "ArrowLeft") mostrarFoto(fotoActual - 1);
    if (e.key === "ArrowRight") mostrarFoto(fotoActual + 1);
  });
  let toqueX = null;
  visor.addEventListener("touchstart", (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener("touchend", (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) mostrarFoto(fotoActual + (dx < 0 ? 1 : -1));
    toqueX = null;
  });

  // ---------- Subir fotos de la fiesta ----------
  if (CONFIG.subirFotosUrl) {
    $("#btn-subir-fotos").href = CONFIG.subirFotosUrl;
  } else {
    $("#btn-subir-fotos").hidden = true;
    $("#subir-fotos-pronto").hidden = false;
  }

  // ---------- Fecha (siempre en hora de Colombia) ----------
  const parte = (opciones) => new Intl.DateTimeFormat("es-CO", { timeZone: ZONA, ...opciones }).format(fecha);
  $("#dia-semana").textContent = parte({ weekday: "long" });
  $("#fecha-dia").textContent = parte({ day: "2-digit" });
  $("#fecha-mes").textContent = parte({ month: "2-digit" });
  $("#fecha-anio").textContent = parte({ year: "2-digit" });

  // ---------- Cuenta regresiva ----------
  const pad = (n) => String(n).padStart(2, "0");
  let timer;
  function tick() {
    const diff = fecha - new Date();
    if (diff <= 0) {
      $("#countdown").hidden = true;
      $("#countdown-done").hidden = false;
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    $("#cd-dias").textContent = pad(Math.floor(s / 86400));
    $("#cd-horas").textContent = pad(Math.floor((s % 86400) / 3600));
    $("#cd-min").textContent = pad(Math.floor((s % 3600) / 60));
    $("#cd-seg").textContent = pad(s % 60);
  }
  timer = setInterval(tick, 1000);
  tick();

  // ---------- Ubicación ----------
  const u = CONFIG.ubicacion;
  $("#btn-mapa").href = u.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${u.lugar}, ${u.direccion}`)}`;

  // ---------- Itinerario ----------
  const itinerario = $("#lista-itinerario");
  CONFIG.itinerario.forEach(({ icono, evento, hora }) => {
    const li = el("li");
    const ic = el("img", "timeline__icon");
    ic.src = `img/iconos/${icono}.png`;
    ic.alt = "";
    ic.loading = "lazy";
    li.appendChild(ic);
    li.appendChild(el("span", "timeline__evento", evento));
    li.appendChild(el("span", "timeline__hora", hora));
    li.appendChild(el("span", "timeline__line"));
    itinerario.appendChild(li);
  });

  pintarIconos(document);

  // ---------- Vestimenta: colores a evitar ----------
  $("#vestimenta-evitar").textContent = CONFIG.vestimenta.evitar || "";
  const colores = $("#colores-evitar");
  (CONFIG.vestimenta.coloresEvitar || []).forEach((color) => {
    const c = el("span", "swatch");
    c.style.background = color;
    colores.appendChild(c);
  });

  // ---------- Fecha límite para confirmar ----------
  if (CONFIG.rsvp.fechaLimite) {
    $("#rsvp-limite").textContent = `Máximo hasta el ${CONFIG.rsvp.fechaLimite}`;
  }

  // ---------- Reproductor "Dale play" ----------
  const audio = $("#audio");
  const btnPlay = $("#btn-play");
  const progreso = $("#progreso");
  const label = $("#player-label");
  const pintarProgreso = () => progreso.style.setProperty("--p", `${progreso.value}%`);
  pintarProgreso();

  // La música puede venir de YouTube (sin descargar nada) o de un MP3.
  // Las dos fuentes exponen la misma interfaz: play, pause, seek, etc.
  let hayMusica = Boolean(CONFIG.musica.youtube || CONFIG.musica.archivo);
  let repetir = true;
  const motor = CONFIG.musica.youtube ? motorYouTube(CONFIG.musica.youtube) : motorAudio(CONFIG.musica.archivo);

  function sinMusica() {
    hayMusica = false;
    setPlayIcon(false);
  }

  function motorAudio(src) {
    if (src) audio.src = src;
    audio.addEventListener("error", sinMusica);
    audio.addEventListener("play", () => setPlayIcon(true));
    audio.addEventListener("pause", () => setPlayIcon(false));
    audio.addEventListener("ended", () => { if (repetir) { audio.currentTime = 0; audio.play(); } });
    return {
      play: () => audio.play().catch(() => { if (hayMusica) setPlayIcon(false); }),
      pause: () => audio.pause(),
      paused: () => audio.paused,
      time: () => audio.currentTime,
      duration: () => audio.duration || 0,
      seek: (t) => { audio.currentTime = t; },
    };
  }

  function motorYouTube(videoId) {
    let player = null;
    let listo = false;
    let pendiente = false;
    let sonando = false;

    // El reproductor de YouTube queda fuera de la vista: solo se usa el audio.
    const caja = el("div", "yt-oculto");
    caja.setAttribute("aria-hidden", "true");
    caja.appendChild(el("div")).id = "yt-player";
    document.body.appendChild(caja);

    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (anterior) anterior();
      player = new YT.Player("yt-player", {
        width: 200,
        height: 200,
        videoId,
        playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: () => {
            listo = true;
            if (pendiente) player.playVideo();
          },
          onStateChange: (e) => {
            sonando = e.data === YT.PlayerState.PLAYING;
            setPlayIcon(sonando);
            if (e.data === YT.PlayerState.ENDED && repetir) {
              player.seekTo(0, true);
              player.playVideo();
            }
          },
          onError: sinMusica,
        },
      });
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = sinMusica;
    document.head.appendChild(script);

    return {
      play: () => { if (listo) player.playVideo(); else pendiente = true; },
      pause: () => { pendiente = false; if (listo) player.pauseVideo(); },
      paused: () => !sonando && !pendiente,
      time: () => (listo ? player.getCurrentTime() : 0),
      duration: () => (listo ? player.getDuration() : 0),
      seek: (t) => { if (listo) player.seekTo(t, true); },
    };
  }

  function reproducir() {
    if (hayMusica) motor.play();
  }

  function setPlayIcon(playing) {
    btnPlay.innerHTML = svg(playing ? "pause" : "play");
    btnPlay.classList.toggle("is-playing", playing);
    btnPlay.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");
    if (!hayMusica) label.textContent = "Pronto 🎶";
    else label.textContent = playing && CONFIG.musica.titulo ? CONFIG.musica.titulo : "Dale play";
  }

  btnPlay.addEventListener("click", () => {
    if (!hayMusica) {
      label.textContent = "Pronto 🎶";
      return;
    }
    if (motor.paused()) reproducir();
    else motor.pause();
  });

  // Barra de progreso
  setInterval(() => {
    const d = motor.duration();
    if (!d || progreso.matches(":active")) return;
    progreso.value = (motor.time() / d) * 100;
    pintarProgreso();
  }, 500);
  progreso.addEventListener("input", () => {
    pintarProgreso();
    const d = motor.duration();
    if (d) motor.seek((progreso.value / 100) * d);
  });
  $("#btn-prev").addEventListener("click", () => motor.seek(0));
  $("#btn-next").addEventListener("click", () => {
    const d = motor.duration();
    if (d) motor.seek(Math.min(motor.time() + 15, d - 0.5));
  });

  function toggle(btn, onChange) {
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      if (onChange) onChange(on);
    });
  }
  toggle($("#btn-repeat"), (on) => { repetir = on; });
  toggle($("#btn-heart"));
  toggle($("#btn-shuffle"));
  $("#btn-shuffle").setAttribute("aria-pressed", "false");

  // ---------- RSVP ----------
  const form = $("#form-rsvp");
  const estado = $("#rsvp-estado");
  const btnEnviar = $("#btn-enviar");
  const btnAbrir = $("#btn-abrir-rsvp");

  btnAbrir.addEventListener("click", () => {
    const abrir = form.hidden;
    form.hidden = !abrir;
    btnAbrir.setAttribute("aria-expanded", String(abrir));
    // Al abrir el formulario ya no hace falta llamar la atención.
    btnAbrir.classList.toggle("is-open", abrir);
    if (abrir) form.nombre.focus();
  });

  if (invitado) form.nombre.value = invitado.nombre;

  function mostrarEstado(texto, tipo) {
    estado.textContent = texto;
    estado.className = `form__status ${tipo || ""}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const campoNombre = form.nombre.closest(".field");
    const nombre = form.nombre.value.trim();
    campoNombre.classList.toggle("is-invalid", !nombre);
    if (!nombre) {
      mostrarEstado("Escribe tu nombre, por favor.", "error");
      form.nombre.focus();
      return;
    }

    if (!CONFIG.rsvp.scriptUrl) {
      mostrarEstado("La confirmación en línea aún no está configurada.", "error");
      return;
    }

    const datos = {
      nombre,
      asiste: form.asiste.value,
      telefono: form.telefono.value.trim(),
      mensaje: form.mensaje.value.trim(),
      invitado: invitado ? clave : "",
    };

    btnEnviar.disabled = true;
    mostrarEstado("Enviando…");
    try {
      // Sin cabecera Content-Type (se envía como text/plain) para evitar
      // la petición previa CORS que Apps Script no responde.
      const res = await fetch(CONFIG.rsvp.scriptUrl, {
        method: "POST",
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Error desconocido");

      form.reset();
      mostrarEstado(
        datos.asiste === "Sí"
          ? `¡Gracias, ${nombre}! Te espero con mucha ilusión 💛`
          : `Gracias por avisarme, ${nombre}. ¡Te voy a extrañar!`,
        "ok"
      );
    } catch (err) {
      console.error(err);
      mostrarEstado("No pudimos enviar tu confirmación. Inténtalo de nuevo.", "error");
    } finally {
      btnEnviar.disabled = false;
    }
  });

  // ---------- Respaldo por WhatsApp ----------
  if (CONFIG.rsvp.whatsapp) {
    const btn = $("#btn-whatsapp");
    btn.hidden = false;
    btn.addEventListener("click", () => {
      const nombre = form.nombre.value.trim() || "(tu nombre)";
      const texto = form.asiste.value === "No"
        ? `Hola, soy ${nombre}. Lamentablemente no podré asistir a los 15 de ${CONFIG.quinceanera.nombre}.`
        : `Hola, soy ${nombre}. Confirmo mi asistencia a los 15 de ${CONFIG.quinceanera.nombre} 🎉`;
      btn.href = `https://wa.me/${CONFIG.rsvp.whatsapp}?text=${encodeURIComponent(texto)}`;
    });
  }

  // ---------- Sobre de entrada ----------
  // Abrir el sobre es un toque del invitado, así que el navegador sí deja
  // arrancar la música en ese momento.
  const intro = $("#intro");
  if (invitado) {
    const para = $("#intro-para");
    para.textContent = `Para: ${invitado.nombre}`;
    para.hidden = false;
  }
  $("#btn-abrir-sobre").addEventListener("click", () => {
    if (intro.classList.contains("is-opening")) return;
    intro.classList.add("is-opening");
    reproducir();
    const rapido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      intro.classList.add("is-gone");
      document.body.classList.remove("is-locked");
    }, rapido ? 0 : 1600);
    setTimeout(() => { intro.hidden = true; }, rapido ? 0 : 2400);
  });

  // ---------- Animación al hacer scroll ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((s) => observer.observe(s));
})();
