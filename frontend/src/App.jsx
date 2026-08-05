import { useCallback, useEffect, useState } from 'react'
import CartDrawer from './components/cart/CartDrawer.jsx'
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
  const [cartQuantity, setCartQuantity] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const currentPage = hash === '#kit-personal' ? 'personal-detail' : hash === '#productos' ? 'products' : 'home'
  const currentNavPage = currentPage === 'home' ? 'home' : 'products'

  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addPersonalKitToCart = useCallback((quantity) => {
    setCartQuantity((current) => current + quantity)
    setIsCartOpen(true)
  }, [])

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
      <Header currentPage={currentNavPage} />
      <main>
        {currentPage === 'personal-detail' ? (
          <ProductDetail onAddToCart={addPersonalKitToCart} />
        ) : currentPage === 'products' ? (
          <Products />
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
      <Footer />
      {isCartOpen && (
        <CartDrawer
          quantity={cartQuantity}
          onQuantityChange={setCartQuantity}
          onClose={closeCart}
        />
      )}
    </>
  )
}
