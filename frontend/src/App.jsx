import { useCallback, useEffect, useState } from 'react'
import CartDrawer from './components/cart/CartDrawer.jsx'
import CartPage from './components/cart/CartPage.jsx'
import Checkout from './components/checkout/Checkout.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import About from './components/sections/About.jsx'
import Allies from './components/sections/Allies.jsx'
import Hero from './components/sections/Hero.jsx'
import Objectives from './components/sections/Objectives.jsx'
import Organization from './components/sections/Organization.jsx'
import Purpose from './components/sections/Purpose.jsx'
import Products from './components/sections/Products.jsx'
import ProductDetail from './components/sections/ProductDetail.jsx'
import Values from './components/sections/Values.jsx'

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash || '#inicio')
  const [cartItems, setCartItems] = useState([])
  const [lastAddedProduct, setLastAddedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const currentPage = hash === '#carrito'
    ? 'cart'
    : hash === '#checkout'
      ? 'checkout'
      : (hash === '#kit-personal' || hash === '#kit_personal')
        ? 'personal-detail'
        : (hash === '#kit-hogar' || hash === '#kit_hogar')
          ? 'home-detail'
          : hash === '#productos'
            ? 'products'
            : 'home'
  const currentNavPage = currentPage === 'home' ? 'home' : 'products'

  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const continueShopping = useCallback(() => {
    setIsCartOpen(false)
    window.location.hash = currentPage === 'personal-detail' || currentPage === 'home-detail'
      ? '#checkout'
      : '#productos'
  }, [currentPage])

  const goToCart = useCallback(() => {
    setIsCartOpen(false)
    window.location.hash = '#carrito'
  }, [])

  const addProductToCart = useCallback((product, quantity = 1) => {
    if (!product || product.stock < 1) return

    const requestedQuantity = Math.max(1, Number(quantity) || 1)

    setCartItems((current) => {
      const existingItem = current.find((item) => item.product.id === product.id)

      if (existingItem) {
        return current.map((item) => item.product.id === product.id
          ? { product, quantity: Math.min(product.stock, item.quantity + requestedQuantity) }
          : item)
      }

      return [...current, { product, quantity: Math.min(product.stock, requestedQuantity) }]
    })
    setLastAddedProduct(product)
    setIsCartOpen(true)
  }, [])

  const changeCartQuantity = useCallback((productId, quantity) => {
    setCartItems((current) => current.map((item) => item.product.id === productId
      ? { ...item, quantity: Math.min(item.product.stock, Math.max(1, quantity)) }
      : item))
  }, [])

  const removeCartItem = useCallback((productId) => {
    setCartItems((current) => current.filter((item) => item.product.id !== productId))
  }, [])

  const completeOrder = useCallback(() => {
    setCartItems([])
    setLastAddedProduct(null)
  }, [])

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || '#inicio')

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const targetId = hash.slice(1)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  return (
    <>
      <Header currentPage={currentNavPage} cartQuantity={cartQuantity} />
      <main>
        {currentPage === 'cart' ? (
          <CartPage items={cartItems} onQuantityChange={changeCartQuantity} onRemove={removeCartItem} />
        ) : currentPage === 'checkout' ? (
          <Checkout items={cartItems} onOrderCreated={completeOrder} />
        ) : currentPage === 'personal-detail' ? (
          <ProductDetail kit="personal" onAddToCart={addProductToCart} />
        ) : currentPage === 'home-detail' ? (
          <ProductDetail kit="home" onAddToCart={addProductToCart} />
        ) : currentPage === 'products' ? (
          <Products onAddToCart={addProductToCart} />
        ) : (
          <>
            <Hero />
            <About />
            <Values />
            <Objectives />
            <Purpose />
            <Organization />
            <Allies />
          </>
        )}
      </main>
      {currentPage !== 'checkout' && currentPage !== 'cart' && <Footer />}
      {isCartOpen && (
        <CartDrawer
          items={cartItems}
          lastAddedProduct={lastAddedProduct}
          onAddProduct={addProductToCart}
          onQuantityChange={changeCartQuantity}
          onRemove={removeCartItem}
          onClose={closeCart}
          onGoToCart={goToCart}
          onContinueShopping={continueShopping}
        />
      )}
    </>
  )
}
