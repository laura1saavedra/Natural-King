import { useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import ProductBenefits from './ProductBenefits.jsx'

const initialProducts = [
  {
    id: 'catalog-kit-limpieza-personal',
    slug: 'kit-limpieza-personal',
    name: 'Kit de limpieza personal',
    price: 74500,
    stock: 0,
    imageUrl: '/img/kitPersonal.png',
    isCatalogPreview: true,
  },
  {
    id: 'catalog-kit-limpieza-hogar',
    slug: 'kit-limpieza-hogar',
    name: 'Kit de limpieza para el hogar',
    price: 61000,
    stock: 0,
    imageUrl: '/img/kit-hogar.png',
    isCatalogPreview: true,
  },
]

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function getProductHref(product) {
  if (product.slug === 'kit-limpieza-personal') return '#kit_personal'
  if (product.slug === 'kit-limpieza-hogar') return '#kit_hogar'
  return null
}

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastAdded, setLastAdded] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    api('/products', { signal: controller.signal })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.filter((product) => product.slug !== 'kit-viaje-esencial'))
        }
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError('Mostrando el catálogo. La disponibilidad se actualizará cuando la API esté conectada.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  function addToCart(product) {
    if (product.isCatalogPreview) return
    setLastAdded(`${product.name} fue agregado al carrito`)
    onAddToCart(product, 1)
  }

  return (
    <section className="products-section" id="productos" aria-labelledby="products-title">
      <div className="products-curve" aria-hidden="true" />

      <div className="products-container">
        <header className="products-heading">
          <span className="products-heading__leaf" aria-hidden="true">❧</span>
          <h2 id="products-title">Nuestros productos</h2>
          <p>Productos de limpieza efectivos, seguros y amigables con el medio ambiente.</p>
        </header>

        {isLoading && <p className="products-status" role="status">Actualizando disponibilidad...</p>}
        {error && <p className="products-status" role="status">{error}</p>}

        <div className="products-grid">
          {products.map((product) => {
            const href = getProductHref(product)
            const canAddToCart = !product.isCatalogPreview && product.stock > 0

            return (
              <article className="product-card" key={product.id}>
                <a
                  className="product-card__image"
                  style={{ backgroundImage: `url(${product.imageUrl || '/img/icono.png'})` }}
                  aria-label={product.name}
                  href={href || '#productos'}
                  onClick={href ? undefined : (event) => event.preventDefault()}
                >
                  <span className="product-card__image-name">{product.name}</span>
                </a>
                <div className="product-card__info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{priceFormatter.format(Number(product.price))}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => href ? (window.location.hash = href) : addToCart(product)}
                    disabled={!href && !canAddToCart}
                    aria-label={href ? `Ver ${product.name}` : canAddToCart ? `Agregar ${product.name} al carrito` : `${product.name} sin disponibilidad confirmada`}
                  >
                    <span aria-hidden="true">▰</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <p className="products-status" aria-live="polite">{lastAdded}</p>

      <ProductBenefits />
    </section>
  )
}
