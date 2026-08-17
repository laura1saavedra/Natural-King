import { useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api.js'

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

const detailGalleryImages = [
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

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const initialProduct = {
  id: 'catalog-kit-limpieza-personal',
  name: 'Kit de limpieza personal',
  slug: 'kit-limpieza-personal',
  description: 'Todo lo que necesitas para tu cuidado diario, en un solo kit práctico, seguro y amigable con el medio ambiente.',
  price: 74500,
  stock: 0,
  imageUrl: '/img/kitPersonal.png',
  category: { name: 'Cuidado personal' },
}

export default function ProductDetail({ onAddToCart }) {
  const [product, setProduct] = useState(initialProduct)
  const [hasLiveData, setHasLiveData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let retryTimer

    async function loadProduct() {
      try {
        const data = await api('/products/slug/kit-limpieza-personal', { signal: controller.signal })
        setProduct(data)
        setQuantity(data.stock > 0 ? 1 : 0)
        setHasLiveData(true)
        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setHasLiveData(false)
          setError('Intentando conectar con la API local...')
          retryTimer = window.setTimeout(loadProduct, 3000)
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadProduct()

    return () => {
      controller.abort()
      window.clearTimeout(retryTimer)
    }
  }, [])

  const galleryImages = useMemo(() => {
    return [
      {
        src: product.imageUrl || '/img/kitPersonal.png',
        alt: `${product.name} completo`,
      },
      ...detailGalleryImages,
    ]
  }, [product])

  function addToCart() {
    if (!hasLiveData || product.stock < 1) return

    setMessage(`${quantity} kit${quantity > 1 ? 's' : ''} agregado${quantity > 1 ? 's' : ''} al carrito`)
    onAddToCart(product, quantity)
  }

  const unitPrice = Number(product.price)
  const isOutOfStock = hasLiveData && product.stock < 1
  const canPurchase = hasLiveData && !isOutOfStock

  return (
    <section className="product-detail" id="kit_personal" aria-labelledby="personal-kit-title" aria-busy={isLoading}>
      <nav className="product-breadcrumb" aria-label="Ruta de navegación">
        <a href="#inicio"><span aria-hidden="true">⌂</span> Inicio</a>
        <span aria-hidden="true">›</span>
        <a href="#productos">Productos</a>
        <span aria-hidden="true">›</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img
              className={`product-gallery__image ${selectedImage === 0 ? 'product-gallery__image--kit' : 'product-gallery__image--product'}`}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
            />
            <span className="product-gallery__badge">Kit completo</span>
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
          <span className="product-detail__tag">{product.category.name}</span>
          <h1 id="personal-kit-title">{product.name}</h1>
          <p className="product-detail__intro">{product.description}</p>

          <div className="product-detail__highlights" aria-label="Características principales">
            <span>✓ 10 productos esenciales</span>
            <span>✓ Listo para usar</span>
            <span>✓ Empaque reutilizable</span>
          </div>

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

        <aside className="product-purchase" aria-label={`Comprar ${product.name}`}>
          <div className="product-purchase__summary">
            <div>
              <h2>Tu kit</h2>
              <p>{product.name}</p>
            </div>
            <div className="product-purchase__summary-image" aria-hidden="true">
              <img src={product.imageUrl || '/img/kitPersonal.png'} alt="" />
            </div>
          </div>

          <p className="product-purchase__price" aria-live="polite">
            {priceFormatter.format(unitPrice * quantity)}
          </p>
          <p className={`product-purchase__availability ${isOutOfStock ? 'is-out' : ''} ${!hasLiveData ? 'is-pending' : ''}`}>
            {!hasLiveData ? 'Disponibilidad por confirmar' : isOutOfStock ? 'Producto agotado' : `${product.stock} unidades disponibles`}
          </p>
          {error && <p className="product-purchase__connection" role="status">{error}</p>}

          <p className="product-purchase__quantity-label">Selecciona la cantidad</p>

          <div className="quantity-selector" aria-label="Cantidad">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={!canPurchase || quantity <= 1} aria-label="Disminuir cantidad">−</button>
            <output aria-live="polite">{quantity}</output>
            <button type="button" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} disabled={!canPurchase || quantity >= product.stock} aria-label="Aumentar cantidad">+</button>
          </div>

          <button className="product-purchase__cart" type="button" onClick={addToCart} disabled={!canPurchase}>
            <img className="product-purchase__cart-icon" src="/img/iconos/carrito_blanco.png" alt="" aria-hidden="true" />
            {!hasLiveData ? 'Consultando disponibilidad' : isOutOfStock ? 'Producto agotado' : 'Agregar al carrito'}
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
            <span
              className={`product-detail__benefit-icon ${title === 'Ecológicos' || title === 'Seguros' ? 'product-detail__benefit-icon--image' : ''}`}
              aria-hidden="true"
            >
              {title === 'Ecológicos' ? (
                <img src="/img/iconos/icono_flor.png" alt="" />
              ) : title === 'Seguros' ? (
                <img src="/img/iconos/seguro.png" alt="" />
              ) : icon}
            </span>
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
