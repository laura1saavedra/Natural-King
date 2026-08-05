import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Kit de limpieza personal',
    price: 'Kit completo',
    category: 'personal',
    image: '/img/kitPersonal.png',
    href: '#kit-personal',
  },
  {
    id: 2,
    name: 'Kit de limpieza para el hogar',
    price: 'Kit completo',
    category: 'home',
    image: '/img/kit-hogar.png',
  },
]

const benefits = [
  { icon: '⌁', title: 'Ecológicos', description: 'Productos de baja toxicidad que cuidan el planeta.' },
  { icon: '✓', title: 'Seguros', description: 'Fórmulas seguras para tu familia y mascotas.' },
  { icon: '$', title: 'Económicos', description: 'Kits completos que te ahorran tiempo y dinero.' },
  { icon: '◇', title: 'Prácticos', description: 'Todo lo que necesitas en un solo paquete.' },
]

export default function Products() {
  const [lastAdded, setLastAdded] = useState('')

  function addToCart(product) {
    setLastAdded(`${product.name} fue agregado al carrito`)
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

        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <a
                className="product-card__image"
                style={{ backgroundImage: `url(${product.image})` }}
                aria-label={product.name}
                href={product.href || '#productos'}
                onClick={product.href ? undefined : (event) => event.preventDefault()}
              >
                <span className="product-card__image-name">{product.name}</span>
              </a>
              <div className="product-card__info">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => product.href ? (window.location.hash = product.href) : addToCart(product)}
                  aria-label={product.href ? `Ver ${product.name}` : `Agregar ${product.name} al carrito`}
                >
                  <span aria-hidden="true">▰</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="products-status" aria-live="polite">{lastAdded}</p>

      <div className="products-benefits" aria-label="Beneficios de nuestros productos">
        {benefits.map((benefit) => (
          <div className="product-benefit" key={benefit.title}>
            <span className="product-benefit__icon" aria-hidden="true">{benefit.icon}</span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
