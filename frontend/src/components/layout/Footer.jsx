const SocialIcon = ({ children, label }) => (
  <span className="footer-social" aria-label={label} role="img">
    {children}
  </span>
)

export default function Footer() {
  const handleSubscribe = (event) => {
    event.preventDefault()
  }

  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer__content">
        <div className="site-footer__brand">
          <a className="site-footer__logo" href="#inicio" aria-label="Natural King, volver al inicio">
            <img src="/img/icono.png" alt="" aria-hidden="true" />
            <span>NATURALKING</span>
          </a>
          <p>Limpieza natural,<br />cuidado total.</p>

          <div className="site-footer__socials" aria-label="Redes sociales">
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 8.4H3.4V19h3.2V8.4ZM5 3a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 5 3Zm7 5.4H8.9V19H12v-5.2c0-1.4.3-2.7 2-2.7s1.7 1.6 1.7 2.8V19h3.2v-5.8c0-2.9-.6-5.1-4-5.1-1.6 0-2.6.9-3 1.7V8.4Z" /></svg>
            </SocialIcon>
            <SocialIcon label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.8 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3.2Z" /></svg>
            </SocialIcon>
          </div>
        </div>

        <div className="site-footer__contact">
          <h2>CONTACTO</h2>
          <p>Natural King S.A.S.</p>
          <p>Bogotá, Colombia</p>
        </div>

        <div className="site-footer__subscribe">
          <h2>SUSCRÍBETE</h2>
          <p>Recibe novedades y contenido sobre nuestras soluciones de limpieza y cuidado.</p>
          <form onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="footer-email">Tu correo electrónico</label>
            <input id="footer-email" name="email" type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" aria-label="Suscribirse">
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>

      <p className="site-footer__copyright">© 2026 NATURAL KING. Todos los derechos reservados.</p>
    </footer>
  )
}
