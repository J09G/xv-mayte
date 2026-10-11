/**
 * RSVP de los XV de Mayte → Google Sheets
 *
 * Pega este código en Extensiones > Apps Script de tu hoja de cálculo
 * y despliégalo como "Aplicación web" (ver README.md).
 */

const HOJA = "Confirmaciones";
const ENCABEZADOS = ["Fecha", "Nombre", "¿Asiste?", "Teléfono", "Mensaje", "Invitación"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const datos = JSON.parse(e.postData.contents);
    const nombre = limpiar(datos.nombre, 80);
    if (!nombre) return responder({ ok: false, error: "Falta el nombre" });

    const asiste = datos.asiste === "No" ? "No" : "Sí";

    obtenerHoja().appendRow([
      new Date(),
      nombre,
      asiste,
      limpiar(datos.telefono, 20),
      limpiar(datos.mensaje, 300),
      limpiar(datos.invitado, 50),
    ]);

    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permite probar en el navegador que la URL funciona.
function doGet() {
  return responder({ ok: true, mensaje: "RSVP activo" });
}

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
    hoja.appendRow(ENCABEZADOS);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight("bold");
    hoja.setFrozenRows(1);
  }
  return hoja;
}

// Recorta el texto y evita que se interprete como fórmula en la hoja.
function limpiar(valor, max) {
  let texto = String(valor == null ? "" : valor).trim().slice(0, max);
  if (/^[=+\-@]/.test(texto)) texto = "'" + texto;
  return texto;
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
