import SectionHeading from "./components/SectionHeading";

const services = [
  {
    title: "Auditoría basada en ML",
    description:
      "Detección automática de anomalías, riesgos y oportunidades de ahorro con modelos explicables.",
  },
  {
    title: "Desarrollo de software",
    description:
      "POCs y soluciones a medida para automatizar el proceso auditado y reducir tiempos de cierre.",
  },
  {
    title: "Cumplimiento y seguridad",
    description:
      "Evaluación de controles, GDPR y mapeo de riesgos con enfoque en OWASP Top 10.",
  },
];

const kpis = [
  { label: "Reducción de tiempo", value: "-45%" },
  { label: "Riesgos detectados", value: "+32%" },
  { label: "Procesos automatizados", value: "18" },
];

const steps = [
  "Recolección segura de datos y contexto del negocio.",
  "Modelado ML, validación y explicabilidad.",
  "POC y plan de automatización de procesos.",
  "Entrega de dashboard, formación y roadmap.",
];

const App = () => (
  <div>
    <header className="container" style={{ padding: "24px 0" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>AuditAI</strong>
        <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
          <a href="#servicios">Servicios</a>
          <a href="#casos">Resultados</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>
    </header>

    <section className="container hero">
      <div style={{ display: "grid", gap: "20px" }}>
        <span className="badge">Auditoría inteligente con IA</span>
        <h1 style={{ fontSize: "46px", fontWeight: 800 }}>
          Detectamos oportunidades de optimización y automatizamos procesos críticos.
        </h1>
        <p style={{ fontSize: "18px", color: "#475569" }}>
          Combinamos ML, análisis avanzado y consultoría en seguridad para reducir riesgos y costos sin
          comprometer el cumplimiento.
        </p>
        <div className="cta">
          <a className="button button-primary" href="#contacto">
            Solicitar auditoría
          </a>
          <a className="button button-outline" href="#casos">
            Ver resultados
          </a>
        </div>
        <div className="tag-list">
          <span className="tag">OWASP Top 10</span>
          <span className="tag">GDPR &amp; ISO 27001</span>
          <span className="tag">MLOps + Observabilidad</span>
        </div>
      </div>
      <div className="hero-card">
        <p style={{ fontSize: "14px", opacity: 0.7 }}>Resumen ejecutivo</p>
        <h3 style={{ fontSize: "26px", marginTop: "12px" }}>
          Plataforma SaaS ligera + microservicio ML aislado
        </h3>
        <ul style={{ marginTop: "16px", display: "grid", gap: "12px", fontSize: "15px" }}>
          <li>Frontend React/TypeScript con accesibilidad AA.</li>
          <li>Backend modular con arquitectura por capas.</li>
          <li>API segura con rate limiting y CSP.</li>
          <li>Microservicio ML con /predict y /explain.</li>
        </ul>
      </div>
    </section>

    <section id="servicios" className="section">
      <div className="container">
        <SectionHeading
          kicker="Servicios"
          title="Auditoría, automatización y cumplimiento"
          subtitle="Soluciones modulares diseñadas para reducir riesgos y acelerar la toma de decisiones."
        />
        <div className="grid grid-3" style={{ marginTop: "32px" }}>
          {services.map((service) => (
            <article key={service.title} className="card">
              <h3 style={{ fontSize: "20px", fontWeight: 700 }}>{service.title}</h3>
              <p style={{ marginTop: "12px", color: "#475569" }}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="casos" className="section" style={{ background: "#f1f5f9" }}>
      <div className="container">
        <SectionHeading
          kicker="Casos y resultados"
          title="Métricas comparables antes y después"
          subtitle="Resultados anónimos basados en auditorías reales en logística, finanzas y retail."
        />
        <div className="grid grid-3" style={{ marginTop: "32px" }}>
          {kpis.map((kpi) => (
            <article key={kpi.label} className="card">
              <div className="kpi">{kpi.value}</div>
              <p style={{ marginTop: "8px", color: "#475569" }}>{kpi.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="proceso" className="section">
      <div className="container">
        <SectionHeading
          kicker="Proceso"
          title="De la auditoría a la automatización"
          subtitle="Cada fase está diseñada para cumplir requisitos regulatorios y maximizar el impacto."
        />
        <div className="grid" style={{ marginTop: "32px" }}>
          {steps.map((step, index) => (
            <article key={step} className="card">
              <strong>Paso {index + 1}</strong>
              <p style={{ marginTop: "8px", color: "#475569" }}>{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="contacto" className="section" style={{ background: "#0f172a", color: "#e2e8f0" }}>
      <div className="container" style={{ display: "grid", gap: "32px" }}>
        <SectionHeading
          kicker="Contacto"
          title="Solicita una demo segura"
          subtitle="Recibe un diagnóstico inicial y acceso a nuestra plataforma SaaS de auditoría."
        />
        <form className="form" aria-label="Formulario de contacto">
          <label>
            Empresa
            <input className="input" type="text" name="empresa" placeholder="Nombre de la empresa" />
          </label>
          <label>
            Email corporativo
            <input className="input" type="email" name="email" placeholder="correo@empresa.com" />
          </label>
          <label>
            Descripción del caso
            <textarea className="textarea" name="descripcion" placeholder="Cuéntanos tus objetivos" />
          </label>
          <button type="submit" className="button button-primary">
            Solicitar demo
          </button>
        </form>
      </div>
    </section>

    <footer className="container footer">
      <p>AuditAI · Auditoría inteligente con ML/AI · Seguridad y cumplimiento primero.</p>
    </footer>
  </div>
);

export default App;
