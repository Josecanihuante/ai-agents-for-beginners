const statusEl = document.getElementById("model-status");
const rowCountEl = document.getElementById("row-count");
const modeEl = document.getElementById("mode");
const detailEl = document.getElementById("detail");

const stored = localStorage.getItem("audit_mvp_result");
if (!stored) {
  statusEl.textContent = "Carga un análisis desde la landing.";
  detailEl.textContent = "No hay resultados disponibles.";
} else {
  const data = JSON.parse(stored);
  statusEl.textContent = "Último análisis cargado correctamente.";
  rowCountEl.textContent = data.rows;
  modeEl.textContent = data.mode === "time_series" ? "Serie de tiempo" : "Regresión";

  if (data.mode === "time_series") {
    const forecastLines = data.forecasts
      .map((item) => `Periodo ${item.period}: ${item.value.toFixed(2)}`)
      .join("\n");
    detailEl.textContent = [
      `Variable objetivo: ${data.target}`,
      `Columna de tiempo: ${data.time_column}`,
      `Última observación: ${data.last_observation.toFixed(2)}`,
      `Proyecciones:`,
      forecastLines,
    ].join("\n");
  } else {
    const coefLines = Object.entries(data.coefficients)
      .map(([feature, value]) => `${feature}: ${value.toFixed(4)}`)
      .join("\n");
    const corrLines = Object.entries(data.correlations)
      .map(([feature, value]) => `${feature}: ${value.toFixed(4)}`)
      .join("\n");
    detailEl.textContent = [
      `Variable objetivo: ${data.target}`,
      `Intercepto: ${data.intercept.toFixed(4)}`,
      `R²: ${data.r2.toFixed(4)}`,
      `Coeficientes:`,
      coefLines,
      `Correlaciones:`,
      corrLines,
    ].join("\n");
  }
}
