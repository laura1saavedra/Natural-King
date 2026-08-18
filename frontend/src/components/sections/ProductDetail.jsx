import { useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api.js'
import ProductBenefits from './ProductBenefits.jsx'

const personalGalleryImages = [
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

const homeGalleryImages = [
  { src: '/img/kit_hogar/polvo.png', alt: 'Detergente en polvo' },
  { src: '/img/kit_hogar/jabon_ropa.png', alt: 'Jabón para ropa' },
  { src: '/img/kit_hogar/suavizante.png', alt: 'Suavizante' },
  { src: '/img/kit_hogar/cloro.png', alt: 'Cloro' },
  { src: '/img/kit_hogar/desinfectante.png', alt: 'Desinfectante' },
  { src: '/img/kit_hogar/limpiador.png', alt: 'Limpiador multiusos' },
  { src: '/img/kit_hogar/lavaloza.png', alt: 'Lavaloza líquido' },
  { src: '/img/kit_hogar/esponja.png', alt: 'Esponja para lavar' },
  { src: '/img/kit_hogar/paño.png', alt: 'Paño de limpieza' },
  { src: '/img/kit_hogar/bolsas.png', alt: 'Bolsas de basura' },
]

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const kitDetails = {
  personal: {
    hash: 'kit_personal',
    titleId: 'personal-kit-title',
    slug: 'kit-limpieza-personal',
    fallbackImage: '/img/kitPersonal.png',
    initialProduct: {
      id: 'catalog-kit-limpieza-personal',
      name: 'Kit de limpieza personal',
      slug: 'kit-limpieza-personal',
      description: 'Todo lo que necesitas para tu cuidado diario, en un solo kit práctico, seguro y amigable con el medio ambiente.',
      price: 74500,
      stock: 0,
      imageUrl: '/img/kitPersonal.png',
      category: { name: 'Cuidado personal' },
    },
    includedItems: [
      'Jabón para el cuerpo',
      'Alcohol gel antibacterial',
      'Bloqueador solar',
      'Crema humectante',
      'Cepillo de dientes',
      'Crema dental',
      'Hilo dental',
      'Desodorante',
      'Papel higiénico',
      'Toalla pequeña',
    ],
    galleryImages: personalGalleryImages,
    highlights: ['10 productos esenciales', 'Listo para usar', 'Empaque reutilizable'],
    ecoText: 'Fórmulas de baja toxicidad',
    benefits: ['Productos seguros para ti y tu familia', 'Prácticos y listos para usar', 'Cuidado personal responsable'],
  },
  home: {
    hash: 'kit_hogar',
    titleId: 'home-kit-title',
    slug: 'kit-limpieza-hogar',
    fallbackImage: '/img/kit-hogar.png',
    initialProduct: {
      id: 'catalog-kit-limpieza-hogar',
      name: 'Kit de limpieza para el hogar',
      slug: 'kit-limpieza-hogar',
      description: 'Todo lo necesario para mantener tu hogar limpio y fresco, reunido en un kit práctico, completo y listo para usar.',
      price: 61000,
      stock: 0,
      imageUrl: '/img/kit-hogar.png',
      category: { name: 'Limpieza del hogar' },
    },
    includedItems: [
      'Detergente en polvo',
      'Jabón para ropa',
      'Suavizante',
      'Cloro',
      'Desinfectante',
      'Limpiador multiusos',
      'Lavaloza líquido',
      'Esponja para lavar',
      'Paño de limpieza',
      'Bolsas de basura',
    ],
    galleryImages: homeGalleryImages,
    highlights: ['10 productos esenciales', 'Limpieza integral', 'Empaque reutilizable'],
    ecoText: 'Soluciones para cada espacio',
    benefits: ['Todo lo esencial para limpiar tu hogar', 'Prácticos y listos para usar', 'Limpieza completa en un solo kit'],
  },
}

export default function ProductDetail({ kit = 'personal', onAddToCart }) {
  const detail = kitDetails[kit] || kitDetails.personal
  const [product, setProduct] = useState(detail.initialProduct)
  const [hasLiveData, setHasLiveData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let retryTimer

    setProduct(detail.initialProduct)
    setHasLiveData(false)
    setIsLoading(true)
    setQuantity(1)
    setMessage('')
    setSelectedImage(0)

    async function loadProduct() {
      try {
        const data = await api(`/products/slug/${detail.slug}`, { signal: controller.signal })
        setProduct(data)
        setQuantity(1)
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
  }, [detail])

  const galleryImages = useMemo(() => {
    return [
      {
        src: product.imageUrl || detail.fallbackImage,
        alt: `${product.name} completo`,
      },
      ...detail.galleryImages,
    ]
  }, [detail, product])

  function addToCart() {
    if (!hasLiveData) return

    setMessage(`${quantity} kit${quantity > 1 ? 's' : ''} agregado${quantity > 1 ? 's' : ''} al carrito`)
    onAddToCart(product, quantity)
  }

  const unitPrice = Number(product.price)
  const canPurchase = hasLiveData

  return (
    <section className={`product-detail product-detail--${kit}`} id={detail.hash} aria-labelledby={detail.titleId} aria-busy={isLoading}>
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
          <h1 id={detail.titleId}>{product.name}</h1>
          <p className="product-detail__intro">{product.description}</p>

          <div className="product-detail__highlights" aria-label="Características principales">
            {detail.highlights.map((highlight) => <span key={highlight}>✓ {highlight}</span>)}
          </div>

          <div className="product-contents">
            <h2>
              <span className="product-contents__heading-icon" aria-hidden="true">
                <img src="/img/iconos/lista.png" alt="" />
              </span>
              Incluye:
            </h2>
            <ul>
              {detail.includedItems.map((name) => (
                <li key={name}>
                  <span className="product-contents__item">
                    <span className="product-contents__product-icon" aria-hidden="true">
                      <img src="/img/iconos/producto.png" alt="" />
                    </span>
                    {name}
                  </span>
                  <span>1 unidad</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-detail__eco">
            <span>
              <img className="product-detail__eco-icon" src="/img/iconos/icono_flor.png" alt="" aria-hidden="true" />
              {detail.ecoText}
            </span>
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
              <img src={product.imageUrl || detail.fallbackImage} alt="" />
            </div>
          </div>

          <p className="product-purchase__price" aria-live="polite">
            {priceFormatter.format(unitPrice * quantity)}
          </p>
          <p className={`product-purchase__availability ${!hasLiveData ? 'is-pending' : ''}`}>
            {!hasLiveData ? 'Disponibilidad por confirmar' : 'Unidades disponibles sin límite'}
          </p>
          {error && <p className="product-purchase__connection" role="status">{error}</p>}

          <p className="product-purchase__quantity-label">Selecciona la cantidad</p>

          <div className="quantity-selector" aria-label="Cantidad">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={!canPurchase || quantity <= 1} aria-label="Disminuir cantidad">−</button>
            <output aria-live="polite">{quantity}</output>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} disabled={!canPurchase} aria-label="Aumentar cantidad">+</button>
          </div>

          <button className="product-purchase__cart" type="button" onClick={addToCart} disabled={!canPurchase}>
            <img className="product-purchase__cart-icon" src="/img/iconos/carrito_blanco.png" alt="" aria-hidden="true" />
            {!hasLiveData ? 'Consultando disponibilidad' : 'Agregar al carrito'}
          </button>

          <p className="product-purchase__status" aria-live="polite">{message}</p>

          <div className="product-purchase__benefits">
            <h3>
              <img className="product-purchase__benefits-icon" src="/img/iconos/icono_flor.png" alt="" aria-hidden="true" />
              Beneficios
            </h3>
            {detail.benefits.map((benefit) => <p key={benefit}>✓ {benefit}</p>)}
          </div>

          <div className="product-purchase__shipping">
            <img className="product-purchase__shipping-icon" src="/img/iconos/camion.png" alt="" aria-hidden="true" />
            <div>
              <h3>Envíos a todo el país</h3>
              <p>Recibe tu kit en la puerta de tu hogar.</p>
            </div>
          </div>
        </aside>
      </div>

      <ProductBenefits />
    </section>
  )
}
