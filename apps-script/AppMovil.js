// ============================================================
// AppMovil.js — Entrega los datos del balance a la app del iPhone
// ============================================================
// La app (GitHub Pages) pide:  <URL de la web app>?formato=json&k=<código>
// y recibe el mismo JSON que ya usa el dashboard (getDatosParaDashboard).
// Sin el código correcto no entrega nada.
//
// Para conectarlo, al inicio de doGet(e) en Código.js se agrega:
//   if (e && e.parameter && e.parameter.formato === 'json') return responderAppMovil_(e);

function responderAppMovil_(e) {
  const codigo = PropertiesService.getScriptProperties().getProperty('APP_CODIGO');
  const k = (e && e.parameter && e.parameter.k) || '';
  let salida;
  if (!codigo || k !== codigo) {
    salida = { ok: false, error: 'Código de acceso incorrecto' };
  } else {
    salida = { ok: true, actualizado: new Date().toISOString(), datos: getDatosParaDashboard() };
  }
  return ContentService.createTextOutput(JSON.stringify(salida))
    .setMimeType(ContentService.MimeType.JSON);
}

// Correr UNA vez a mano: crea el código secreto y lo muestra en el registro.
// Si alguna vez se filtra el enlace, se vuelve a correr y el código viejo deja de servir.
function crearCodigoAppMovil() {
  const codigo = Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperty('APP_CODIGO', codigo);
  Logger.log('Código nuevo: ' + codigo);
  return codigo;
}
