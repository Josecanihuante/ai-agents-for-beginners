const form = document.getElementById("ml-form");
const resultsPanel = document.getElementById("ml-results");
const output = document.getElementById("ml-output");

const renderOutput = (data) => {
  output.innerHTML = "";

  if (data.mode === "time_series") {
    const forecastLines = data.forecasts
      .map((item) => `Periodo ${item.period}: ${item.value.toFixed(2)}`)
      .join("\n");

    output.textContent = [
      `Modo: Serie de tiempo (AR1)`,
      `Variable objetivo: ${data.target}`,
      `Última observación: ${data.last_observation.toFixed(2)}`,
      `Intercepto: ${data.intercept.toFixed(4)}`,
      `Coeficiente: ${data.coefficient.toFixed(4)}`,
      `Proyección:`,
      forecastLines,
    ].join("\n");
    return;
  }

  const coefLines = Object.entries(data.coefficients)
    .map(([feature, value]) => `${feature}: ${value.toFixed(4)}`)
    .join("\n");
  const corrLines = Object.entries(data.correlations)
    .map(([feature, value]) => `${feature}: ${value.toFixed(4)}`)
    .join("\n");

  output.textContent = [
    `Modo: Regresión lineal`,
    `Variable objetivo: ${data.target}`,
    `Intercepto: ${data.intercept.toFixed(4)}`,
    `R²: ${data.r2.toFixed(4)}`,
    `Coeficientes:`,
    coefLines,
    `Correlaciones:`,
    corrLines,
  ].join("\n");
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultsPanel.classList.remove("active");
  output.textContent = "Procesando análisis...";

  const formData = new FormData();
  const fileInput = document.getElementById("file");
  formData.append("file", fileInput.files[0]);
  formData.append("target_column", document.getElementById("target").value);
  formData.append("feature_columns", document.getElementById("features").value);
  formData.append("time_column", document.getElementById("time").value);
  formData.append("forecast_periods", document.getElementById("periods").value);

  try {
    const response = await fetch("/api/ml/analyze", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail || "Error desconocido");
    }

    localStorage.setItem("audit_mvp_result", JSON.stringify(payload));
    renderOutput(payload);
    resultsPanel.classList.add("active");
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
    resultsPanel.classList.add("active");
  }
});
