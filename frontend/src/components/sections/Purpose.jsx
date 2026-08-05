import { purposes } from '../../data/purposes.js'

export default function Purpose() {
  return (
    <section className="purpose-section grid grid-cols-2 bg-[#fbfaf6] px-[clamp(32px,7vw,110px)] py-[clamp(58px,7vw,96px)] text-[#26322d] max-[1100px]:px-12 max-[700px]:grid-cols-1 max-[700px]:px-6 max-[700px]:pt-[46px] max-[700px]:pb-[54px]" aria-label="Misión y visión">
      {purposes.map((purpose, index) => (
        <article
          className={`purpose-card min-w-0 scroll-mt-[110px] ${index === 0 ? 'pr-[clamp(34px,5vw,78px)] max-[700px]:px-0 max-[700px]:pb-[42px]' : 'border-l border-[#d9d8d0] pl-[clamp(34px,5vw,78px)] max-[700px]:border-t max-[700px]:border-l-0 max-[700px]:px-0 max-[700px]:pt-[42px]'}`}
          id={purpose.id}
          key={purpose.id}
        >
          <p className="mb-5 flex items-center gap-4 text-xs font-extrabold tracking-[.12em] text-[#555c57] before:h-0.5 before:w-[31px] before:shrink-0 before:bg-[#b48634]">{purpose.eyebrow}</p>
          <h2 className="font-serif-brand mb-[clamp(26px,3vw,42px)] text-[clamp(34px,3.5vw,54px)] leading-[1.08] font-normal text-brand-green max-[700px]:mb-[26px]">{purpose.title}</h2>
          <div className="grid grid-cols-[clamp(130px,13vw,178px)_minmax(0,1fr)] items-center gap-[clamp(24px,3vw,42px)] max-[1100px]:grid-cols-[120px_1fr] max-[1100px]:gap-6 max-[700px]:grid-cols-[112px_1fr] max-[700px]:gap-[22px] max-[460px]:grid-cols-1">
            <img className="block aspect-square w-full rounded-full object-contain max-[460px]:w-[126px]" src={purpose.image} alt="" aria-hidden="true" />
            <p className="text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#505650]">{purpose.text}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
