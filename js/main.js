(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const fecha = new Date(CONFIG.fecha);
  const ZONA = "America/Bogota";

  // Iconos de línea (Lucide, licencia ISC) + vestido dibujado a mano.
  const ICONOS = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    wine: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    utensils: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
    party: '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',
    drama: '<path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/>',
    martini: '<path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
    dress: '<circle cx="12" cy="3" r="1.6"/><path d="M10.3 5.2 9.6 7.5l.7 3h3.4l.7-3-.7-2.3"/><path d="M9.6 7.5c.8.6 3.9.6 4.8 0"/><path d="M10.3 10.5 6 22.5h12l-4.3-12"/><path d="M10 13.5c-.6 2.5-1.5 5.8-2 9M14 13.5c.6 2.5 1.5 5.8 2 9"/>',
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
    const ic = el("span", "timeline__icon");
    ic.dataset.icon = icono;
    li.appendChild(ic);
    li.appendChild(el("span", "timeline__evento", evento));
    li.appendChild(el("span", "timeline__hora", hora));
    li.appendChild(el("span", "timeline__line"));
    itinerario.appendChild(li);
  });

  pintarIconos(document);

  // ---------- Reproductor "Dale play" ----------
  const audio = $("#audio");
  const btnPlay = $("#btn-play");
  const progreso = $("#progreso");
  const label = $("#player-label");
  const pintarProgreso = () => progreso.style.setProperty("--p", `${progreso.value}%`);
  pintarProgreso();

  if (CONFIG.musica.archivo) audio.src = CONFIG.musica.archivo;

  function setPlayIcon(playing) {
    btnPlay.innerHTML = svg(playing ? "pause" : "play");
    btnPlay.classList.toggle("is-playing", playing);
    btnPlay.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");
    label.textContent = playing && CONFIG.musica.titulo ? CONFIG.musica.titulo : "Dale play";
  }

  btnPlay.addEventListener("click", () => {
    if (!CONFIG.musica.archivo) {
      label.textContent = "Pronto 🎶";
      return;
    }
    if (audio.paused) audio.play().catch(() => setPlayIcon(false));
    else audio.pause();
  });
  audio.addEventListener("play", () => setPlayIcon(true));
  audio.addEventListener("pause", () => setPlayIcon(false));
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    progreso.value = (audio.currentTime / audio.duration) * 100;
    pintarProgreso();
  });
  progreso.addEventListener("input", () => {
    pintarProgreso();
    if (audio.duration) audio.currentTime = (progreso.value / 100) * audio.duration;
  });
  $("#btn-prev").addEventListener("click", () => { audio.currentTime = 0; });
  $("#btn-next").addEventListener("click", () => {
    if (audio.duration) audio.currentTime = Math.min(audio.currentTime + 15, audio.duration - 0.5);
  });

  function toggle(btn, onChange) {
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      if (onChange) onChange(on);
    });
  }
  toggle($("#btn-repeat"), (on) => { audio.loop = on; });
  toggle($("#btn-heart"));
  toggle($("#btn-shuffle"));
  $("#btn-shuffle").setAttribute("aria-pressed", "false");

  // ---------- RSVP ----------
  const form = $("#form-rsvp");
  const estado = $("#rsvp-estado");
  const btnEnviar = $("#btn-enviar");
  const btnAbrir = $("#btn-abrir-rsvp");
  const selectPersonas = $("#select-personas");
  const maxPersonas = invitado ? invitado.cupos : CONFIG.rsvp.maxPersonas;

  btnAbrir.addEventListener("click", () => {
    const abrir = form.hidden;
    form.hidden = !abrir;
    btnAbrir.setAttribute("aria-expanded", String(abrir));
    if (abrir) form.nombre.focus();
  });

  for (let i = 1; i <= maxPersonas; i++) {
    const opt = el("option", null, String(i));
    opt.value = i;
    selectPersonas.appendChild(opt);
  }
  if (invitado) {
    form.nombre.value = invitado.nombre;
    selectPersonas.value = invitado.cupos;
  }

  form.querySelectorAll('input[name="asiste"]').forEach((radio) =>
    radio.addEventListener("change", () => {
      $("#campo-personas").hidden = form.asiste.value === "No";
    })
  );

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
      personas: form.asiste.value === "No" ? 0 : Number(selectPersonas.value),
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
      $("#campo-personas").hidden = false;
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
        : `Hola, soy ${nombre}. Confirmo mi asistencia a los 15 de ${CONFIG.quinceanera.nombre} con ${selectPersonas.value} persona(s) 🎉`;
      btn.href = `https://wa.me/${CONFIG.rsvp.whatsapp}?text=${encodeURIComponent(texto)}`;
    });
  }

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
