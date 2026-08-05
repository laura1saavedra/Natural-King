import { values } from '../../data/values.js'

export default function Values() {
  return (
    <section className="overflow-hidden bg-brand-green px-[clamp(24px,5vw,76px)] pt-[clamp(44px,5vw,68px)] pb-[clamp(48px,5vw,72px)] text-[#f7f3e8] max-[700px]:px-6 max-[700px]:pt-[42px] max-[700px]:pb-12" id="valores">
      <div className="mx-auto mb-[clamp(30px,3vw,42px)] text-center max-[700px]:mb-7">
        <p className="mb-4 flex items-center justify-center gap-[13px] text-xs font-extrabold tracking-[0.15em] text-white/75 before:h-0.5 before:w-7 before:bg-[#c19a4c]">NUESTROS VALORES</p>
        <h2 className="font-serif-brand text-[clamp(38px,4vw,58px)] font-normal text-[#fffdf6]">Lo que nos guía</h2>
      </div>

      <div className="mx-auto grid max-w-[1420px] grid-cols-6 max-[1100px]:grid-cols-3 max-[1100px]:gap-y-[54px] max-[700px]:max-w-[420px] max-[700px]:grid-cols-1 max-[700px]:gap-0">
        {values.map((value, index) => (
          <article
            className={`relative min-w-0 px-[clamp(14px,1.5vw,24px)] text-center max-[700px]:px-3 max-[700px]:py-6 ${index === 0 ? 'max-[700px]:pt-0' : 'before:absolute before:top-[42px] before:bottom-[3px] before:left-0 before:w-px before:bg-[rgba(245,239,220,.42)] max-[700px]:before:top-0 max-[700px]:before:right-[18%] max-[700px]:before:bottom-auto max-[700px]:before:left-[18%] max-[700px]:before:h-px max-[700px]:before:w-auto'} ${index === 3 ? 'max-[1100px]:before:hidden max-[700px]:before:block' : ''}`}
            key={value.title}
          >
            <span className="font-serif-brand mx-auto mb-[18px] grid h-16 w-16 place-items-center text-[51px] leading-none font-normal text-[#d7c9a4]" aria-hidden="true">{value.icon}</span>
            <h3 className="mb-3.5 min-h-[2.4em] text-[clamp(13px,1.05vw,16px)] leading-[1.2] font-bold tracking-[0.055em] text-[#fffdf7] uppercase max-[700px]:min-h-0">{value.title}</h3>
            <p className="mx-auto text-[clamp(14px,1.08vw,17px)] leading-[1.55] text-white/80 max-[700px]:max-w-80">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
