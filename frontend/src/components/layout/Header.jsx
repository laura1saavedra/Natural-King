const navigation = [
  { label: 'Inicio', href: '#inicio', page: 'home' },
  { label: 'Productos', href: '#productos', page: 'products' },
]

export default function Header({ currentPage, cartQuantity = 0 }) {
  return (
    <header className="site-header flex min-h-[92px] flex-wrap items-center justify-between gap-x-10 gap-y-3 bg-brand-green px-[clamp(24px,6vw,88px)] py-2 max-[700px]:min-h-0 max-[700px]:gap-x-[18px] max-[700px]:px-[18px] max-[700px]:py-3.5">
      <a
        className="inline-flex shrink-0 flex-col items-center gap-0.5 text-brand-gold no-underline outline-none focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
        href="#inicio"
        aria-label="Natural King, ir al inicio"
      >
        <img
          className="block h-[54px] w-[72px] rounded-[5px] object-contain max-[700px]:h-12 max-[700px]:w-16"
          src="/img/icono.png"
          alt="Natural King"
        />
        <span className="text-xs leading-none font-bold tracking-[0.08em] max-[700px]:text-[11px]">
          NATURALKING
        </span>
      </a>

      <nav
        className="site-header__nav order-3 flex w-full items-center justify-start gap-[clamp(18px,2.4vw,38px)] overflow-x-auto min-[1101px]:order-0 min-[1101px]:w-auto min-[1101px]:justify-center max-[700px]:grid max-[700px]:grid-cols-[repeat(4,max-content)] max-[700px]:gap-x-[18px] max-[700px]:gap-y-[5px] max-[390px]:grid-cols-[repeat(3,max-content)]"
        aria-label="Navegación principal"
      >
        {navigation.map((item) => {
          const isActive = currentPage === item.page

          return (
          <a
            key={item.href}
            className="group relative whitespace-nowrap py-2.5 text-[15px] font-bold text-brand-gold no-underline outline-none max-[700px]:py-1.5 max-[700px]:text-[13px]"
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
            <span
              className={`absolute right-0 bottom-0.5 left-0 h-0.5 origin-center bg-brand-gold transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
              aria-hidden="true"
            />
          </a>
          )
        })}
      </nav>

      <div className="site-header__actions flex shrink-0 items-center gap-4 max-[700px]:gap-2.5">
        <a
          className="site-header__cart relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-gold/45 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-gold max-[700px]:h-10 max-[700px]:w-10"
          href="#carrito"
          aria-label={`Ir al carrito, ${cartQuantity} ${cartQuantity === 1 ? 'producto' : 'productos'}`}
        >
          <img
            className="block h-8 w-8 object-contain max-[700px]:h-7 max-[700px]:w-7"
            src="/img/iconos/carrito.png"
            alt=""
          />
          {cartQuantity > 0 && (
            <span className="absolute -top-1.5 -right-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-brand-gold px-1 text-[11px] font-black text-brand-green">
              {cartQuantity > 99 ? '99+' : cartQuantity}
            </span>
          )}
        </a>

        <a
        className="site-header__contact shrink-0 rounded-full bg-brand-gold px-[31px] py-3.5 text-[15px] font-bold whitespace-nowrap text-brand-green no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-hover focus-visible:-translate-y-0.5 focus-visible:bg-brand-gold-hover focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-gold max-[700px]:px-[18px] max-[700px]:py-3 max-[700px]:text-sm max-[390px]:px-3.5"
        href="#contacto"
      >
        Contáctanos
        </a>
      </div>
    </header>
  )
}
