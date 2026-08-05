import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const suggestions = [
  { id: 'hogar', name: 'Kit de limpieza para el hogar', price: 55000, image: '/img/kit-hogar.png' },
  { id: 'aseo', name: 'Kit de aseo completo', price: 35000, image: '/img/kit-aseo.png' },
  { id: 'viaje', name: 'Kit personal de viaje', price: 25000, image: '/img/kitPersonal.png' },
]

const priceFormatter = new Intl.NumberFormat('es-CO')

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H7" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  )
}

export default function CartDrawer({ quantity, onQuantityChange, onClose }) {
  const [extras, setExtras] = useState({})
  const closeButtonRef = useRef(null)

  const extrasTotal = suggestions.reduce(
    (total, product) => total + product.price * (extras[product.id] || 0),
    0,
  )
  const itemCount = quantity + Object.values(extras).reduce((total, value) => total + value, 0)
  const subtotal = quantity * 74500 + extrasTotal

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  function addExtra(id) {
    setExtras((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  }

  const drawer = (
    <div className="cart-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-drawer__header">
          <h2 id="cart-title">Tu carrito</h2>
          <button ref={closeButtonRef} className="cart-drawer__close" type="button" onClick={onClose} aria-label="Cerrar carrito">
            <span aria-hidden="true" />
          </button>
        </header>

        <div className="cart-confirmation" role="status">
          <span className="cart-confirmation__check" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-9" /></svg>
          </span>
          <div>
            <h3>¡Producto agregado al carrito!</h3>
            <p>Kit de limpieza personal fue agregado correctamente.</p>
          </div>
        </div>

        {quantity > 0 ? (
          <article className="cart-line-item">
            <img src="/img/kitPersonal.png" alt="Kit de limpieza personal" />
            <div className="cart-line-item__details">
              <h3>Kit de limpieza personal</h3>
              <strong>${priceFormatter.format(74500)}</strong>
            </div>
            <div className="cart-line-item__actions">
              <div className="cart-quantity" aria-label="Cantidad del kit personal">
                <button type="button" onClick={() => onQuantityChange(Math.max(1, quantity - 1))} aria-label="Disminuir cantidad">−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => onQuantityChange(quantity + 1)} aria-label="Aumentar cantidad">+</button>
              </div>
              <button className="cart-remove" type="button" onClick={() => onQuantityChange(0)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" /></svg>
                Eliminar
              </button>
            </div>
          </article>
        ) : (
          <p className="cart-empty">El kit fue eliminado del carrito.</p>
        )}

        <section className="cart-suggestions" aria-labelledby="suggestions-title">
          <h3 id="suggestions-title">También te puede interesar</h3>
          <div className="cart-suggestions__grid">
            {suggestions.map((product) => (
              <article className="cart-suggestion" key={product.id}>
                <img src={product.image} alt="" />
                <h4>{product.name}</h4>
                <div>
                  <strong>${priceFormatter.format(product.price)}</strong>
                  <button type="button" onClick={() => addExtra(product.id)} aria-label={`Agregar ${product.name} al carrito`}>
                    {extras[product.id] ? <span className="cart-suggestion__count">{extras[product.id]}</span> : '+'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="cart-summary">
          <div><span>Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</span><strong>${priceFormatter.format(subtotal)}</strong></div>
          <div><span>Envío</span><strong className="cart-summary__free">Gratis</strong></div>
          <div className="cart-summary__total"><span>Total</span><strong>${priceFormatter.format(subtotal)}</strong></div>
        </div>

        <div className="cart-drawer__buttons">
          <button className="cart-drawer__checkout" type="button" onClick={onClose}>
            <CartIcon /> Ir al carrito
          </button>
          <button className="cart-drawer__continue" type="button" onClick={onClose}>Seguir comprando</button>
        </div>
      </aside>
    </div>
  )

  return createPortal(drawer, document.body)
}
