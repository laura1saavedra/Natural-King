const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function CartSvg() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l2.5 11a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6.2"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>
}

function ShieldSvg() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="m8 12 2.5 2.5L16 9"/></svg>
}

function LeafSvg() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 3C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-17Z"/><path d="M3 21c4-5 8-8 14-12"/></svg>
}

function TrashSvg() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"/></svg>
}

function LockSvg() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>
}

function BenefitIcon({ type }) {
  if (type === 'leaf') return <LeafSvg />
  if (type === 'shield') return <ShieldSvg />
  if (type === 'money') return <span aria-hidden="true">$</span>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 7 9-5 9 5v10l-9 5-9-5zM3 7l9 5 9-5M12 12v10M7.5 4.5l9 5"/></svg>
}

export default function CartPage({ items, onQuantityChange, onRemove }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  )

  return (
    <div className="cart-page" id="carrito">
      <header className="cart-page__topbar">
        <div className="cart-page__title-wrap">
          <span className="cart-page__title-icon"><CartSvg /></span>
          <div>
            <h1>Tu carrito</h1>
          </div>
        </div>
        <div className="cart-page__safe"><ShieldSvg /><span><strong>Compra 100% segura</strong><small>Tus datos están protegidos</small></span></div>
      </header>

      <nav className="product-breadcrumb cart-page__breadcrumb" aria-label="Ruta de navegación">
        <a href="#inicio"><span aria-hidden="true">⌂</span> Inicio</a>
        <span aria-hidden="true">›</span>
        <a href="#productos">Productos</a>
        <span aria-hidden="true">›</span>
        <span>Carrito de compras</span>
      </nav>

      <div className="cart-page__layout">
        <section className="cart-products" aria-label="Productos en el carrito">
          <div className="cart-products__head"><strong>Producto</strong><strong>Precio</strong><strong>Cantidad</strong><strong>Subtotal</strong><span /></div>
          {items.length ? items.map(({ product, quantity }) => (
            <article className="cart-product-row" key={product.id}>
              <div className="cart-product-row__product"><img src={product.imageUrl || '/img/icono.png'} alt=""/><span><strong>{product.name}</strong><small>{product.category?.name || 'Kit completo'}</small></span></div>
              <strong className="cart-product-row__price" data-label="Precio">{priceFormatter.format(Number(product.price))}</strong>
              <div className="cart-product-row__quantity" aria-label={`Cantidad de ${product.name}`}>
                <button type="button" onClick={() => onQuantityChange(product.id, quantity - 1)} disabled={quantity <= 1} aria-label="Disminuir cantidad">−</button>
                <output>{quantity}</output>
                <button type="button" onClick={() => onQuantityChange(product.id, quantity + 1)} aria-label="Aumentar cantidad">+</button>
              </div>
              <strong className="cart-product-row__subtotal" data-label="Subtotal">{priceFormatter.format(Number(product.price) * quantity)}</strong>
              <button className="cart-product-row__remove" type="button" onClick={() => onRemove(product.id)} aria-label={`Eliminar ${product.name}`}><TrashSvg /></button>
            </article>
          )) : <div className="cart-products__empty"><CartSvg /><h2>Tu carrito está vacío</h2><p>Explora nuestros productos y encuentra tu kit ideal.</p></div>}
          <a className="cart-page__continue" href="#productos"><span>‹</span>Seguir comprando</a>
        </section>

        <aside className="cart-order-column">
          <section className="cart-order-summary" aria-labelledby="cart-summary-title">
            <h2 id="cart-summary-title">Resumen del pedido</h2>
            <p>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
            <div className="cart-order-summary__rows">
              <div><span>Subtotal</span><strong>{priceFormatter.format(subtotal)}</strong></div>
              <div><span>Envío</span><strong className="cart-order-green">Gratis</strong></div>
              <div><span>Descuento</span><strong className="cart-order-green">{priceFormatter.format(0)}</strong></div>
            </div>
            <div className="cart-order-total"><strong>Total</strong><b>{priceFormatter.format(subtotal)}</b></div>
            <a className={`cart-finish${!items.length ? ' cart-finish--disabled' : ''}`} href={items.length ? '#checkout' : '#productos'}><LockSvg />{items.length ? 'Finalizar compra' : 'Agregar productos'}</a>
            <div className="cart-payment-logos"><span>Aceptamos:</span><b>VISA</b><i className="mastercard"/><b className="amex">AMEX</b><b className="pse">pse</b></div>
          </section>

          <section className="cart-free-shipping">
            <div><LeafSvg /><span><strong>¡Buenas noticias!</strong><p>Tu envío es gratis por compras superiores a <b>$80.000</b></p></span></div>
            <div className="cart-free-shipping__progress"><i style={{ width: subtotal >= 80000 ? '100%' : `${Math.min(100, subtotal / 800)}%` }} /></div>
            <p>Te faltan <strong>{priceFormatter.format(Math.max(0, 80000 - subtotal))}</strong> para obtener envío gratis</p>
          </section>
        </aside>
      </div>

      <section className="cart-page__benefits" aria-label="Beneficios">
        <div><BenefitIcon type="leaf"/><span><strong>Ecológicos</strong><p>Productos de baja toxicidad que cuidan el planeta.</p></span></div>
        <div><BenefitIcon type="shield"/><span><strong>Seguros</strong><p>Fórmulas seguras para tu familia y mascotas.</p></span></div>
        <div><BenefitIcon type="money"/><span><strong>Económicos</strong><p>Kits completos que te ahorran tiempo y dinero.</p></span></div>
        <div><BenefitIcon type="box"/><span><strong>Prácticos</strong><p>Todo lo que necesitas en un solo paquete.</p></span></div>
      </section>
    </div>
  )
}
