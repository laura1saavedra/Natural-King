export default function About() {
  return (
    <section
      className="about-section relative grid min-h-[440px] grid-cols-[minmax(300px,1fr)_minmax(320px,0.9fr)] items-center gap-[clamp(24px,4vw,56px)] overflow-hidden bg-[#fbfaf7] px-[clamp(32px,8vw,130px)] py-[clamp(24px,4vw,48px)] text-[#263f32] max-[1100px]:min-h-[420px] max-[1100px]:gap-7 max-[1100px]:px-12 max-[1100px]:py-8 max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-5 max-[700px]:px-6 max-[700px]:py-[30px]"
      id="quienes-somos"
    >
      <div className="absolute -right-[70px] -bottom-[90px] h-[230px] w-[230px] rounded-full border border-[rgba(180,134,52,0.25)]" aria-hidden="true" />

      <div className="about-section__content order-2 max-w-[600px] max-[700px]:order-1 max-[700px]:max-w-none">
        <p className="mb-6 flex items-center gap-3.5 text-xs font-extrabold tracking-[0.12em] text-[#606860] before:h-0.5 before:w-8 before:shrink-0 before:bg-[#b48634]">¿QUIÉNES SOMOS?</p>
        <h2 className="mb-7 max-w-[540px] text-[clamp(38px,4.2vw,66px)] leading-[1.02] font-semibold text-brand-green max-[700px]:mb-[22px] max-[700px]:text-[clamp(36px,11vw,50px)]">Limpieza natural, cuidado total</h2>
        <div className="mt-[clamp(22px,3.5vh,38px)] mb-6 max-w-[480px] space-y-5 text-[clamp(16px,1.4vw,21px)] leading-[1.55] text-[#4d554f]">
          <p>Somos una marca comprometida con el bienestar de las personas y el cuidado del medio ambiente. Nos especializamos en la creación de kits de aseo personal y para el hogar.</p>
          <p>Nuestro propósito es ofrecer una alternativa responsable que combine calidad, comodidad y sostenibilidad, beneficiando a familias, estudiantes, trabajadores, pequeños negocios y hogares con niños o mascotas. Queremos contribuir a una mejor calidad de vida, demostrando que es posible cuidar de las personas y del planeta al mismo tiempo.</p>
        </div>
      </div>

      <div className="about-section__image order-1 relative w-full max-w-[520px] justify-self-end max-[700px]:order-2 max-[700px]:justify-self-center">
        <img className="block aspect-[1/1.1] w-full rounded-[48%_48%_10%_10%/22%_22%_8%_8%] object-cover" src="/img/quien-somos.png" alt="Productos naturales de limpieza en un laboratorio" />
      </div>
    </section>
  )
}
