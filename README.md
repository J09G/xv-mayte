# Mis XV · Mayte Gómez Tatis

Invitación web para los quince años de Mayte. Es HTML, CSS y JavaScript sin dependencias, y las confirmaciones (RSVP) se guardan en Google Sheets.

```
xv-mayte/
├── index.html          # Estructura de la página
├── css/styles.css      # Diseño (colores y fuentes en :root)
├── js/config.js        # ⭐ TODOS los datos de la fiesta: edita solo este archivo
├── js/main.js          # Lógica: cuenta regresiva, RSVP, mapas, música…
├── img/                # Fotos (portada, detalle, final) y canción
└── apps-script/rsvp.gs # "Backend" que guarda el RSVP en Google Sheets
```

## 1. Personalizar

1. Abre `js/config.js`. Ahí están la fecha, la ubicación, el itinerario, la vestimenta y los textos, tomados del diseño de Canva.
2. Las fotos actuales están recortadas de capturas de pantalla. Para mejor calidad, reemplaza `img/portada.jpg`, `img/detalle.jpg` e `img/final.jpg` por los originales, con los mismos nombres.
3. **Canción**: sube el MP3 a la carpeta `img/` con el nombre exacto **`cancion.mp3`**. En GitHub: entra a la carpeta `img` → **Add file → Upload files**. La música arranca cuando el invitado abre el sobre; mientras el archivo no exista, el reproductor dice "Pronto".
4. **Galería**: sube las fotos a `img/galeria/` y agrégalas en `galeria` de `config.js`, por ejemplo `["img/galeria/1.jpg", "img/galeria/2.jpg"]`.
5. **Fotos de los invitados**: crea una carpeta en Google Drive, compártela como **"Cualquier persona con el enlace" → Editor** y pega el link en `subirFotosUrl`. Mientras esté vacío, el botón dice "Disponible el día de la fiesta".
6. Los colores y las fuentes están en las variables de `:root`, al inicio de `css/styles.css`.

Para verla en tu computador, abre `index.html` en el navegador o ejecuta `npx serve .` en esta carpeta.

## 2. Conectar el RSVP con Google Sheets (unos 5 minutos)

1. Crea una hoja nueva en [sheets.new](https://sheets.new) y ponle de nombre **RSVP XV Mayte**.
2. En el menú, ve a **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `apps-script/rsvp.gs`. Guarda con 💾.
4. Haz clic en **Implementar → Nueva implementación**.
   - Tipo (⚙️): **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Haz clic en **Implementar** y autoriza los permisos. Google mostrará "Google no ha verificado esta app": ve a *Configuración avanzada → Ir a…*; es normal porque el script es tuyo.
6. Copia la **URL de la aplicación web** (termina en `/exec`) y pégala en `config.js`:

   ```js
   rsvp: { scriptUrl: "https://script.google.com/macros/s/XXXX/exec", ... }
   ```

7. Para probarla, abre esa URL en el navegador. Debe mostrar `{"ok":true,"mensaje":"RSVP activo"}`.

Las respuestas llegan a la pestaña **Confirmaciones**, que se crea sola con la primera confirmación.

> Si cambias el código del script, ve a **Implementar → Administrar implementaciones → ✏️ → Versión: Nueva**. Así la URL sigue siendo la misma.

## 3. Publicar gratis en GitHub Pages

1. El repositorio debe ser **público** (con GitHub gratis).
2. En el repo, ve a **Settings → Pages → Source: Deploy from a branch**, elige la rama `main` y la carpeta `/ (root)`.
3. En 1 o 2 minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Invitaciones personalizadas

En `config.js`, agrega a cada familia en `invitados`:

```js
invitados: {
  "familia-perez": { nombre: "Familia Pérez", cupos: 4 },
}
```

Luego compárteles el link con `?inv=familia-perez`. La invitación los saluda por su nombre, les muestra sus cupos y el formulario aparece con su nombre ya escrito.
