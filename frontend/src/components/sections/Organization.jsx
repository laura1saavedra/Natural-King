const Icon = ({ name }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    finance: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /><path d="m3 7 6-4 6 6 6-5" /></>,
    operations: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.55v-.1A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.1 15a1.7 1.7 0 0 0-1.5-1H2.5V10h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06L6.56 4.2l.06.06A1.7 1.7 0 0 0 8.5 4.6a1.7 1.7 0 0 0 1-1.5V3h4.05v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 18.95 9a1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.05 1Z" /></>,
    marketing: <><path d="m3 11 13-5v12L3 14v-3Z" /><path d="M16 10a4 4 0 0 0 0 4" /><path d="m5 14 1.5 6h3L8 15" /><path d="M20 9v6" /></>,
    accounting: <><rect x="4" y="2.5" width="16" height="19" rx="2" /><path d="M7.5 6.5h9" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18.5h.01M12 18.5h4" /></>,
    logistics: <><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    commercial: <><path d="M4 10v10h16V10" /><path d="M3 5h18l-2 5a3 3 0 0 1-4 0 3 3 0 0 1-6 0 3 3 0 0 1-4 0L3 5Z" /><path d="M9 20v-5h6v5" /></>,
    customer: <><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13H2.5v5H6v-5H4ZM20 13h1.5v5H18v-5h2Z" /><path d="M18 19c-1 1.3-2.8 2-5 2" /><circle cx="11.5" cy="21" r=".75" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

const RoleCard = ({ icon, children, className = '' }) => (
  <article className={`org-card ${className}`}>
    <span className="org-card__icon"><Icon name={icon} /></span>
    <h3>{children}</h3>
  </article>
)

export default function Organization() {
  return (
    <section className="org-section" id="organigrama" aria-labelledby="organigrama-title">
      <div className="org-decoration org-decoration--right" aria-hidden="true" />
      <div className="org-decoration org-decoration--left" aria-hidden="true" />

      <header className="org-heading">
        <p>NUESTRO ORGANIGRAMA</p>
        <h2 id="organigrama-title">Trabajamos en equipo</h2>
      </header>

      <div className="org-chart" aria-label="Estructura organizacional de Natural King S.A.S.">
        <div className="org-company">NATURAL KING S.A.S.</div>
        <div className="org-general">
          <span className="org-general__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4" /><path d="M4.5 21v-2.5A5.5 5.5 0 0 1 10 13h4a5.5 5.5 0 0 1 5.5 5.5V21h-15Z" />
            </svg>
          </span>
          <strong>Gerente General</strong>
        </div>

        <div className="org-branches">
          <div className="org-column">
            <RoleCard icon="finance" className="org-card--primary">Director Financiero <span>(CFO)</span></RoleCard>
            <RoleCard icon="accounting">Contador General</RoleCard>
          </div>

          <div className="org-column">
            <RoleCard icon="operations" className="org-card--primary">Gerente de Operaciones</RoleCard>
            <RoleCard icon="logistics">Gerente de Logística</RoleCard>
          </div>

          <div className="org-column">
            <RoleCard icon="marketing" className="org-card--primary">Gerente de Marketing</RoleCard>
            <RoleCard icon="commercial">Gerente Comercial</RoleCard>
          </div>
        </div>

        <div className="org-customer-wrap">
          <RoleCard icon="customer" className="org-card--customer">Coordinador de Atención al Cliente</RoleCard>
        </div>
      </div>
    </section>
  )
}
