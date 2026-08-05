export default function Objectives() {
  return (
    <section className="objectives-section relative grid min-h-[540px] grid-cols-[minmax(320px,.92fr)_minmax(380px,1.08fr)] items-center gap-[clamp(32px,5vw,76px)] overflow-hidden bg-brand-cream px-[clamp(32px,8vw,132px)] py-[clamp(46px,5vw,72px)] text-brand-green max-[1100px]:min-h-[500px] max-[1100px]:gap-8 max-[1100px]:px-12 max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-[30px] max-[700px]:px-6 max-[700px]:pt-11 max-[700px]:pb-[50px]" id="objetivos">
      <div className="absolute -top-[150px] -left-[130px] h-[360px] w-[360px] rounded-full border border-[rgba(180,134,52,.22)]" aria-hidden="true" />

      <div className="objectives-section__content relative z-10 max-w-[620px] max-[700px]:max-w-none">
        <p className="mb-5 flex items-center gap-3.5 text-xs font-extrabold tracking-[.14em] text-[#687068] before:h-0.5 before:w-8 before:shrink-0 before:bg-[#b48634]">NUESTRO PROPÓSITO</p>
        <h2 className="font-serif-brand mb-5 text-[clamp(46px,5vw,72px)] leading-none font-normal text-brand-green max-[700px]:mb-6">Objetivo</h2>
        <p className="border-l-2 border-[#c19a4c] pl-6 text-[clamp(15px,1.2vw,18px)] leading-[1.75] text-[#4d554f] max-[700px]:pl-[18px] max-[700px]:leading-[1.65]">
          Fortalecer su posicionamiento como distribuidor confiable de kits con productos de limpieza y cuidado personal naturales, ampliar su portafolio con alternativas ecológicas certificadas, establecer alianzas estratégicas con proveedores responsables, garantizar procesos logísticos eficientes y sostenibles, incrementar la satisfacción del cliente mediante un servicio transparente y de calidad, promover la educación sobre el uso de productos de bajo impacto químico, expandir su presencia comercial a nivel regional y nacional, y mantener una mejora continua en procesos, tecnología y prácticas ambientales que favorezcan el crecimiento integral y sostenible de la empresa.
        </p>
        <div className="mt-[22px] flex w-max max-w-full items-center gap-3.5 rounded-full bg-brand-green py-[13px] pr-5 pl-[13px] text-white max-[700px]:mt-[26px]">
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-brand-gold font-black text-brand-green" aria-hidden="true">✓</span>
          <p className="text-[11px] tracking-[.04em] text-white/70">
            <strong className="mb-0.5 block text-[13px] tracking-[.04em] text-white uppercase">Crecimiento sostenible</strong>
            Compromiso que transforma
          </p>
        </div>
      </div>

      <div className="objectives-section__media relative z-0 w-full max-w-[680px] justify-self-center rounded-[48%_48%_12%_12%/20%_20%_8%_8%] bg-[#e2e8dc] p-[clamp(24px,3vw,42px)] after:absolute after:-right-[18px] after:-bottom-[18px] after:-z-10 after:h-[48%] after:w-[46%] after:rounded-br-[48px] after:bg-[#c3d0ba] max-[700px]:max-w-[540px] max-[700px]:p-[22px]">
        <span className="absolute top-7 right-7 z-10 rounded-full bg-white/80 px-[13px] py-2.5 text-[10px] font-extrabold tracking-[.1em] text-brand-green max-[700px]:top-[18px] max-[700px]:right-[18px]">CUIDADO PARA TU HOGAR</span>
        <img className="block aspect-4/3 w-full object-contain" src="/img/kit-hogar.png" alt="Kit Natural King para el cuidado del hogar" />
      </div>
    </section>
  )
}
