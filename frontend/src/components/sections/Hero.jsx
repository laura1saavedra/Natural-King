export default function Hero() {
  return (
    <section
      className="home-hero relative isolate grid h-[min(calc(82svh-92px),720px)] min-h-[540px] grid-cols-[minmax(420px,0.9fr)_minmax(0,1.1fr)] items-stretch overflow-hidden bg-brand-cream text-brand-green max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] max-[700px]:grid-cols-1"
      id="inicio"
    >
      <div className="absolute -bottom-[120px] -left-[90px] -z-10 h-[300px] w-[260px] -rotate-[18deg] rounded-[45%_55%_48%_0] bg-brand-sage" aria-hidden="true" />

      <div className="home-hero__content z-10 self-center px-[clamp(36px,6vw,96px)] py-[clamp(24px,3.5vh,42px)] max-[1100px]:px-9 max-[1100px]:py-12 max-[700px]:px-6 max-[700px]:pt-[34px] max-[700px]:pb-[26px] max-[700px]:text-center">
        <div className="inline-flex flex-col items-center gap-[clamp(10px,1.2vw,16px)] max-[700px]:mx-auto max-[700px]:flex max-[700px]:w-max">
          <h1 className="order-2 m-0 text-center text-[clamp(24px,2.5vw,38px)] leading-none font-extrabold tracking-[0.1em] text-[#b48634] max-[700px]:text-[clamp(25px,8vw,34px)]">NATURALKING</h1>
          <img className="order-1 block h-[clamp(82px,7.5vw,118px)] w-[clamp(100px,9vw,140px)] object-contain max-[700px]:h-[clamp(82px,27vw,108px)] max-[700px]:w-[clamp(100px,32vw,130px)]" src="/img/icono.png" alt="" aria-hidden="true" />
        </div>

        <p className="mt-5 mb-0 text-[clamp(14px,1.35vw,20px)] font-bold tracking-[0.15em] text-[#b48634]">LIMPIEZA NATURAL, CUIDADO TOTAL</p>
        <p className="mt-[clamp(22px,3.5vh,38px)] mb-6 max-w-[480px] text-[clamp(16px,1.4vw,21px)] leading-[1.55] text-[#4d554f] max-[700px]:mx-auto max-[700px]:mt-[26px] max-[700px]:mb-[22px]">
          Creamos soluciones de aseo personal pensadas para cuidar de ti, estés donde estés.
        </p>
        <a className="inline-flex min-w-[180px] items-center justify-between gap-[34px] rounded-full bg-brand-green px-[22px] py-[13px] font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light focus-visible:-translate-y-0.5 focus-visible:bg-brand-green-light max-[700px]:mx-auto" href="#productos">
          Conoce más <span aria-hidden="true">❯</span>
        </a>
      </div>

      <div className="home-hero__media m-[clamp(20px,3vw,44px)_clamp(28px,4vw,64px)_clamp(20px,3vw,44px)_0] min-h-0 min-w-0 self-center overflow-hidden rounded-[clamp(32px,4vw,60px)] bg-brand-cream aspect-3/2 max-[1100px]:m-[24px_32px_24px_0] max-[1100px]:rounded-[44px] max-[700px]:m-[0_18px_20px] max-[700px]:rounded-[34px]">
        <img className="block h-full w-full object-contain object-center max-[700px]:object-[center_45%]" src="/img/kit-aseo.png" alt="Kit de aseo personal Natural King" />
      </div>
    </section>
  )
}
