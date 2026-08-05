import { useState } from 'react'

const includedItems = [
  ['Jabón para el cuerpo', '1 unidad'],
  ['Alcohol gel antibacterial', '1 unidad'],
  ['Bloqueador solar', '1 unidad'],
  ['Crema humectante', '1 unidad'],
  ['Cepillo de dientes', '1 unidad'],
  ['Crema dental', '1 unidad'],
  ['Hilo dental', '1 unidad'],
  ['Desodorante', '1 unidad'],
  ['Papel higiénico', '1 unidad'],
  ['Toalla pequeña', '1 unidad'],
]

const detailBenefits = [
  ['⌁', 'Ecológicos', 'Productos de baja toxicidad que cuidan el planeta.'],
  ['✓', 'Seguros', 'Fórmulas seguras para ti y tu familia.'],
  ['$', 'Económicos', 'Todo lo esencial reunido en un solo kit.'],
  ['◇', 'Prácticos', 'Listo para llevar y usar donde estés.'],
]

const galleryImages = [
  { src: '/img/kitPersonal.png', alt: 'Kit de limpieza personal completo' },
  { src: '/img/kit_personal/jabon.png', alt: 'Jabón para el cuerpo' },
  { src: '/img/kit_personal/gel%20antibacterial.png', alt: 'Alcohol gel antibacterial' },
  { src: '/img/kit_personal/bloqueador.png', alt: 'Bloqueador solar' },
  { src: '/img/kit_personal/crema.png', alt: 'Crema humectante' },
  { src: '/img/kit_personal/cepillo.png', alt: 'Cepillo de dientes' },
  { src: '/img/kit_personal/cremaDental.png', alt: 'Crema dental' },
  { src: '/img/kit_personal/hilo.png', alt: 'Hilo dental' },
  { src: '/img/kit_personal/desodorante.png', alt: 'Desodorante' },
  { src: '/img/kit_personal/papel.png', alt: 'Papel higiénico' },
  { src: '/img/kit_personal/toalla.png', alt: 'Toalla pequeña' },
]

const unitPrice = 74500
const priceFormatter = new Intl.NumberFormat('es-CO')

export default function ProductDetail({ onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  function addToCart() {
    setMessage(`${quantity} kit${quantity > 1 ? 's' : ''} agregado${quantity > 1 ? 's' : ''} al carrito`)
    onAddToCart(quantity)
  }

  return (
    <section className="product-detail" id="kit-personal" aria-labelledby="personal-kit-title">
      <nav className="product-breadcrumb" aria-label="Ruta de navegación">
        <a href="#inicio"><span aria-hidden="true">⌂</span> Inicio</a>
        <span aria-hidden="true">›</span>
        <a href="#productos">Productos</a>
        <span aria-hidden="true">›</span>
        <span>Kit de limpieza personal</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} />
          </div>
          <div className="product-gallery__thumbs" aria-label="Imágenes del producto">
            {galleryImages.map((image, index) => (
              <button
                className={selectedImage === index ? 'is-active' : ''}
                type="button"
                aria-label={`Ver ${image.alt.toLowerCase()}`}
                aria-pressed={selectedImage === index}
                onClick={() => setSelectedImage(index)}
                key={image.src}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail__content">
          <span className="product-detail__tag">Kit completo</span>
          <h1 id="personal-kit-title">Kit de limpieza personal</h1>
          <p className="product-detail__intro">Todo lo que necesitas para tu cuidado diario, en un solo kit práctico, seguro y amigable con el medio ambiente.</p>

          <div className="product-contents">
            <h2>
              <span className="product-contents__heading-icon" aria-hidden="true">
                <img src="/img/iconos/lista.png" alt="" />
              </span>
              Incluye:
            </h2>
            <ul>
              {includedItems.map(([name, amount]) => (
                <li key={name}>
                  <span className="product-contents__item">
                    <span className="product-contents__product-icon" aria-hidden="true">
                      <img src="/img/iconos/producto.png" alt="" />
                    </span>
                    {name}
                  </span>
                  <span>{amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-detail__eco">
            <span>♧ Fórmulas de baja toxicidad</span>
            <span>♻ Empaque reutilizable</span>
          </div>
        </div>

        <aside className="product-purchase" aria-label="Comprar kit de limpieza personal">
          <div className="product-purchase__summary">
            <div>
              <h2>Tu kit</h2>
              <p>Kit de limpieza personal</p>
            </div>
            <img src="/img/kitPersonal.png" alt="" aria-hidden="true" />
          </div>

          <p className="product-purchase__price" aria-live="polite">
            ${priceFormatter.format(unitPrice * quantity)}
          </p>

          <div className="quantity-selector" aria-label="Cantidad">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Disminuir cantidad">−</button>
            <output aria-live="polite">{quantity}</output>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar cantidad">+</button>
          </div>

          <button className="product-purchase__cart" type="button" onClick={addToCart}>
            <span aria-hidden="true">▰</span> Agregar al carrito
          </button>
          <button
            className={`product-purchase__favorite ${isFavorite ? 'is-active' : ''}`}
            type="button"
            onClick={() => setIsFavorite((value) => !value)}
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">♡</span> {isFavorite ? 'Agregado a favoritos' : 'Agregar a favoritos'}
          </button>

          <p className="product-purchase__status" aria-live="polite">{message}</p>

          <div className="product-purchase__benefits">
            <h3><span aria-hidden="true">♧</span> Beneficios</h3>
            <p>✓ Productos seguros para ti y tu familia</p>
            <p>✓ Prácticos y listos para usar</p>
            <p>✓ Cuidado personal responsable</p>
          </div>

          <div className="product-purchase__shipping">
            <span aria-hidden="true">▱</span>
            <div>
              <h3>Envíos a todo el país</h3>
              <p>Recibe tu kit en la puerta de tu hogar.</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="product-detail__benefit-strip" aria-label="Ventajas del kit">
        {detailBenefits.map(([icon, title, description]) => (
          <div key={title}>
            <span className="product-detail__benefit-icon" aria-hidden="true">{icon}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
