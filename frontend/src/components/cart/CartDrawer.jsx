import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { api } from '../../services/api.js'

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H7" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  )
}

export default function CartDrawer({
  items,
  lastAddedProduct,
  onAddProduct,
  onQuantityChange,
  onRemove,
  onClose,
  onGoToCart,
  onContinueShopping,
}) {
  const [catalog, setCatalog] = useState([])
  const closeButtonRef = useRef(null)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  )
  const cartProductIds = new Set(items.map((item) => item.product.id))
  const suggestions = catalog
    .filter((product) => product.slug !== 'kit-viaje-esencial' && !cartProductIds.has(product.id))
    .slice(0, 3)

  useEffect(() => {
    const controller = new AbortController()

    api('/products', { signal: controller.signal })
      .then(setCatalog)
      .catch((error) => {
        if (error.name !== 'AbortError') setCatalog([])
      })

    return () => controller.abort()
  }, [])

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

        {lastAddedProduct && (
          <div className="cart-confirmation" role="status">
            <span className="cart-confirmation__check" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-9" /></svg>
            </span>
            <div>
              <h3>¡Producto agregado al carrito!</h3>
              <p>{lastAddedProduct.name} fue agregado correctamente.</p>
            </div>
          </div>
        )}

        {items.length ? items.map(({ product, quantity }) => (
          <article className="cart-line-item" key={product.id}>
            <img src={product.imageUrl || '/img/icono.png'} alt={product.name} />
            <div className="cart-line-item__details">
              <h3>{product.name}</h3>
              <strong>{priceFormatter.format(Number(product.price))}</strong>
            </div>
            <div className="cart-line-item__actions">
              <div className="cart-quantity" aria-label={`Cantidad de ${product.name}`}>
                <button type="button" onClick={() => onQuantityChange(product.id, quantity - 1)} disabled={quantity <= 1} aria-label="Disminuir cantidad">−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => onQuantityChange(product.id, quantity + 1)} aria-label="Aumentar cantidad">+</button>
              </div>
              <button className="cart-remove" type="button" onClick={() => onRemove(product.id)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" /></svg>
                Eliminar
              </button>
            </div>
          </article>
        )) : (
          <p className="cart-empty">Tu carrito está vacío.</p>
        )}

        {suggestions.length > 0 && (
          <section className="cart-suggestions" aria-labelledby="suggestions-title">
            <h3 id="suggestions-title">También te puede interesar</h3>
            <div className="cart-suggestions__grid">
              {suggestions.map((product) => (
                <article className="cart-suggestion" key={product.id}>
                  <img src={product.imageUrl || '/img/icono.png'} alt="" />
                  <h4>{product.name}</h4>
                  <div>
                    <strong>{priceFormatter.format(Number(product.price))}</strong>
                    <button type="button" onClick={() => onAddProduct(product, 1)} aria-label={`Agregar ${product.name} al carrito`}>
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="cart-summary">
          <div><span>Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</span><strong>{priceFormatter.format(subtotal)}</strong></div>
          <div><span>Envío</span><strong className="cart-summary__free">Gratis</strong></div>
          <div className="cart-summary__total"><span>Total</span><strong>{priceFormatter.format(subtotal)}</strong></div>
        </div>

        <div className="cart-drawer__buttons">
          <button className="cart-drawer__checkout" type="button" onClick={onGoToCart} disabled={!items.length}>
            <CartIcon /> Ir al carrito
          </button>
          <button className="cart-drawer__continue" type="button" onClick={onContinueShopping}>Seguir comprando</button>
        </div>
      </aside>
    </div>
  )

  return createPortal(drawer, document.body)
}
