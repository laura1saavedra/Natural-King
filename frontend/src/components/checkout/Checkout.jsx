import { useState } from 'react'
import { api } from '../../services/api.js'

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const cityDepartments = {
  Bogotá: 'Cundinamarca',
  Medellín: 'Antioquia',
  Cali: 'Valle del Cauca',
  Barranquilla: 'Atlántico',
}

const requiredFieldMessages = {
  recipientName: 'Ingresa tu nombre completo.',
  recipientEmail: 'Ingresa tu correo electrónico.',
  recipientPhone: 'Ingresa tu teléfono o WhatsApp.',
  documentType: 'Selecciona el tipo de documento.',
  documentNumber: 'Ingresa tu número de documento.',
  shippingLine1: 'Ingresa la dirección de entrega.',
  shippingCity: 'Selecciona la ciudad de entrega.',
  shippingNeighborhood: 'Ingresa tu barrio o localidad.',
}

function Icon({ name, className = '' }) {
  const paths = {
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h3l2.6 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6.2"/></>,
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>,
    card: <><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9h19M6 15h4"/></>,
    check: <path d="m6 12 4 4 8-9"/>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M2 9h20M7.5 9C5 9 4 7.7 4 6.3 4 5 5 4 6.3 4 8.4 4 10.5 7.2 12 9M16.5 9C19 9 20 7.7 20 6.3 20 5 19 4 17.7 4 15.6 4 13.5 7.2 12 9"/></>,
    store: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0M9 20v-6h6v6"/></>,
    bank: <><path d="M3 9 12 4l9 5M4 10h16M5 19h14M3 22h18M7 10v9M12 10v9M17 10v9"/></>,
    money: <><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V4h11v3M12 10v6M9.5 12h5"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    shield: <><path d="M12 2 20 5v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="m8 12 2.5 2.5L16 9"/></>,
    leaf: <><path d="M20 3C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-17Z"/><path d="M3 21c4-5 8-8 14-12"/></>,
  }
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function OptionCard({ group, value, selected, onSelect, icon, title, children, logos }) {
  return (
    <label className={`checkout-option${selected === value ? ' checkout-option--selected' : ''}`}>
      <input type="radio" name={group} value={value} checked={selected === value} onChange={() => onSelect(value)} />
      <span className="checkout-radio" aria-hidden="true" />
      <Icon name={icon} />
      <span className="checkout-option__copy">
        <strong>{title}</strong>
        {children && <small>{children}</small>}
        {logos}
      </span>
    </label>
  )
}

export default function Checkout({ items, onOrderCreated }) {
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment] = useState('cash')
  const [showNotes, setShowNotes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [createdOrder, setCreatedOrder] = useState(null)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
  const shippingCost = shipping === 'express' ? 8900 : 0
  const total = subtotal + shippingCost

  async function submitOrder(event) {
    event.preventDefault()
    if (!items.length || isSubmitting) return

    const formElement = event.currentTarget
    const validationErrors = {}

    Object.entries(requiredFieldMessages).forEach(([name, message]) => {
      const field = formElement.elements.namedItem(name)
      if (!field || !String(field.value).trim()) validationErrors[name] = message
    })

    const emailField = formElement.elements.namedItem('recipientEmail')
    if (emailField?.value && emailField.validity.typeMismatch) {
      validationErrors.recipientEmail = 'Ingresa un correo electrónico válido.'
    }

    setFieldErrors(validationErrors)

    if (Object.keys(validationErrors).length) {
      setError('')
      const firstInvalidField = formElement.elements.namedItem(Object.keys(validationErrors)[0])
      firstInvalidField?.focus()
      firstInvalidField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const form = new FormData(event.currentTarget)
    const shippingCity = form.get('shippingCity')
    setIsSubmitting(true)
    setError('')

    try {
      const order = await api('/orders', {
        method: 'POST',
        body: JSON.stringify({
          recipientName: form.get('recipientName'),
          recipientEmail: form.get('recipientEmail'),
          recipientPhone: form.get('recipientPhone'),
          documentType: form.get('documentType'),
          documentNumber: form.get('documentNumber'),
          shippingLine1: form.get('shippingLine1'),
          shippingCity,
          shippingDepartment: cityDepartments[shippingCity],
          shippingNeighborhood: form.get('shippingNeighborhood'),
          shippingInstructions: form.get('shippingInstructions'),
          shippingMethod: shipping,
          paymentMethod: payment,
          items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        }),
      })
      setCreatedOrder(order)
      onOrderCreated()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function validationProps(name) {
    const hasError = Boolean(fieldErrors[name])
    return {
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${name}-error` : undefined,
      onChange: () => {
        if (!hasError) return
        setFieldErrors((current) => {
          const next = { ...current }
          delete next[name]
          return next
        })
      },
    }
  }

  function fieldError(name) {
    return fieldErrors[name]
      ? <small className="checkout-field__error" id={`${name}-error`} role="alert">{fieldErrors[name]}</small>
      : null
  }

  if (createdOrder) {
    return (
      <div className="checkout-page" id="checkout">
        <section className="checkout-card checkout-confirmation" role="status">
          <Icon name="check" />
          <h1>¡Pedido recibido!</h1>
          <p>Tu número de pedido es <strong>{createdOrder.number}</strong>.</p>
          <p>Total: <strong>{formatter.format(Number(createdOrder.total))}</strong>. El pago quedó pendiente hasta completar el método seleccionado.</p>
          <a className="pay-button" href="#productos">Volver a productos</a>
        </section>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="checkout-page" id="checkout">
        <section className="checkout-card checkout-confirmation">
          <Icon name="cart" />
          <h1>Tu carrito está vacío</h1>
          <p>Agrega al menos un producto antes de continuar.</p>
          <a className="pay-button" href="#productos">Ver productos</a>
        </section>
      </div>
    )
  }

  return (
    <div className="checkout-page" id="checkout">
      <nav className="checkout-progress" aria-label="Progreso de compra">
        <a className="checkout-step checkout-step--done" href="#carrito" aria-label="Volver al carrito"><span>1</span><Icon name="cart"/><strong>Carrito</strong></a>
        <i />
        <div className="checkout-step checkout-step--active"><span>2</span><Icon name="truck"/><strong>Envío</strong></div>
        <i />
        <div className="checkout-step"><span>3</span><Icon name="card"/><strong>Pago</strong></div>
        <i />
        <div className="checkout-step checkout-step--confirmation"><span><Icon name="check"/></span><strong>Confirmación</strong></div>
      </nav>

      <form className="checkout-layout" id="checkout-form" onSubmit={submitOrder} noValidate>
        <div className="checkout-main">
          <div className="checkout-card">
            <section className="checkout-section" aria-labelledby="shipping-info-title">
              <header><Icon name="truck"/><div><h1 id="shipping-info-title">Información de envío</h1><p>Completa tus datos para recibir tu pedido.</p></div></header>
              {Object.keys(fieldErrors).length > 0 && (
                <p className="checkout-validation-summary" role="alert">Revisa los campos resaltados y completa la información solicitada.</p>
              )}
              <div className="checkout-fields">
                <label className="checkout-field checkout-field--wide"><span>Nombre completo <b>*</b></span><input name="recipientName" required autoComplete="name" placeholder="Ej. Laura Valentina Saavedra" {...validationProps('recipientName')} />{fieldError('recipientName')}</label>
                <label className="checkout-field checkout-field--wide"><span>Correo electrónico <b>*</b></span><input name="recipientEmail" type="email" required autoComplete="email" placeholder="Ej. laura@email.com" {...validationProps('recipientEmail')} />{fieldError('recipientEmail')}</label>
                <label className="checkout-field"><span>Teléfono / WhatsApp <b>*</b></span><input name="recipientPhone" type="tel" required autoComplete="tel" placeholder="Ej. 300 123 4567" {...validationProps('recipientPhone')} />{fieldError('recipientPhone')}</label>
                <label className="checkout-field"><span>Tipo de documento <b>*</b></span><select name="documentType" required defaultValue="cc" {...validationProps('documentType')}><option value="cc">Cédula de ciudadanía</option><option value="ce">Cédula de extranjería</option><option value="passport">Pasaporte</option></select>{fieldError('documentType')}</label>
                <label className="checkout-field"><span>Número de documento <b>*</b></span><input name="documentNumber" required inputMode="numeric" placeholder="Ej. 1234567890" {...validationProps('documentNumber')} />{fieldError('documentNumber')}</label>
                <label className="checkout-field checkout-field--wide"><span>Dirección de entrega <b>*</b></span><input name="shippingLine1" required autoComplete="street-address" placeholder="Ej. Calle 123 # 45-67, Apto 101" {...validationProps('shippingLine1')} />{fieldError('shippingLine1')}</label>
                <label className="checkout-field checkout-field--city"><span>Ciudad <b>*</b></span><select name="shippingCity" required defaultValue="" {...validationProps('shippingCity')}><option value="" disabled>Selecciona tu ciudad</option>{Object.keys(cityDepartments).map((city) => <option key={city}>{city}</option>)}</select>{fieldError('shippingCity')}</label>
                <label className="checkout-field"><span>Barrio / Localidad <b>*</b></span><input name="shippingNeighborhood" required placeholder="Ej. Chapinero" {...validationProps('shippingNeighborhood')} />{fieldError('shippingNeighborhood')}</label>
              </div>
              <button className="checkout-notes-toggle" type="button" onClick={() => setShowNotes((value) => !value)} aria-expanded={showNotes}>¿Indicaciones adicionales?</button>
              {showNotes && <label className="checkout-field checkout-notes"><span>Indicaciones para la entrega</span><textarea name="shippingInstructions" rows="3" placeholder="Ej. Dejar en portería" /></label>}
            </section>

            <section className="checkout-section checkout-choice-section" aria-labelledby="shipping-method-title">
              <header><Icon name="gift"/><div><h2 id="shipping-method-title">Método de envío</h2><p>Selecciona la opción de entrega que prefieras.</p></div></header>
              <div className="checkout-options checkout-options--three">
                <OptionCard group="shipping" value="standard" selected={shipping} onSelect={setShipping} icon="truck" title="Envío estándar">Entrega de 2 a 4 días hábiles<em>Gratis</em></OptionCard>
                <OptionCard group="shipping" value="express" selected={shipping} onSelect={setShipping} icon="truck" title="Envío express">Entrega de 24 a 48 horas<em>$8.900</em></OptionCard>
                <OptionCard group="shipping" value="pickup" selected={shipping} onSelect={setShipping} icon="store" title="Recoger en punto">Recoge tu pedido en un punto cercano<em>Gratis</em></OptionCard>
              </div>
            </section>

            <section className="checkout-section checkout-choice-section" aria-labelledby="payment-method-title">
              <header><Icon name="card"/><div><h2 id="payment-method-title">Método de pago</h2><p>Elige el medio de pago que más te convenga.</p></div></header>
              <div className="checkout-options checkout-options--four">
                <OptionCard group="payment" value="card" selected={payment} onSelect={setPayment} icon="card" title="Tarjeta de crédito / débito" logos={<span className="card-logos"><b>VISA</b><i /><i /><b>AMEX</b></span>} />
                <OptionCard group="payment" value="pse" selected={payment} onSelect={setPayment} icon="bank" title="PSE" />
                <OptionCard group="payment" value="cash" selected={payment} onSelect={setPayment} icon="money" title="Contra entrega">Paga al recibir tu pedido</OptionCard>
                <OptionCard group="payment" value="transfer" selected={payment} onSelect={setPayment} icon="bank" title="Transferencia bancaria" />
              </div>
            </section>
          </div>

          <div className="checkout-benefits">
            <div><Icon name="lock"/><span><strong>Compra segura</strong><small>Tus datos están protegidos</small></span></div>
            <div><Icon name="truck"/><span><strong>Envíos a todo el país</strong><small>Llegamos hasta tu puerta</small></span></div>
            <div><Icon name="leaf"/><span><strong>Productos ecológicos</strong><small>Cuidado para ti y el planeta</small></span></div>
          </div>
        </div>

        <aside className="order-summary" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">Resumen de tu pedido</h2>
          <div className="order-summary__heading"><span>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span><a href="#carrito">Editar carrito</a></div>
          <div className="order-products">
            {items.map(({ product, quantity }) => <article key={product.id}><img src={product.imageUrl || '/img/icono.png'} alt=""/><div><strong>{product.name}</strong><small>{quantity} {quantity === 1 ? 'unidad' : 'unidades'}</small></div><b>{formatter.format(Number(product.price) * quantity)}</b></article>)}
          </div>
          <div className="order-totals">
            <div><span>Subtotal</span><b>{formatter.format(subtotal)}</b></div>
            <div><span>Envío</span><b className="order-green">{shippingCost ? formatter.format(shippingCost) : 'Gratis'}</b></div>
            <div><span>Descuento</span><b className="order-green">{formatter.format(0)}</b></div>
            <div className="order-total"><strong>Total a pagar</strong><b>{formatter.format(total)}</b></div>
          </div>
          <div className="secure-box"><Icon name="shield"/><div><strong>Compra segura</strong><p>El servidor verificará nuevamente precios y existencias antes de crear el pedido.</p></div></div>
          {error && <p className="checkout-submit-error" role="alert">{error}</p>}
          <button className="pay-button" type="submit" disabled={isSubmitting}><Icon name="lock"/>{isSubmitting ? 'Creando pedido...' : 'Confirmar pedido'}</button>
          <p className="order-terms">Al continuar, aceptas nuestros <a href="#terminos">Términos y Condiciones</a><br/>y la <a href="#privacidad">Política de Privacidad.</a></p>
        </aside>
      </form>
    </div>
  )
}
