const allies = [
  {
    name: 'Casalimpia',
    logo: '/img/aliado-casalimpia.png',
  },
  {
    name: 'Inversiones y Amenidades Lunamar S.A.S.',
    logo: '/img/aliado-lunamar.png',
  },
]

export default function Allies() {
  return (
    <section className="allies-section" aria-labelledby="allies-title">
      <div className="allies-container">
        <header className="allies-heading">
          <p>NUESTROS ALIADOS</p>
          <h2 id="allies-title">Alianzas que impulsan nuestro propósito</h2>
        </header>

        <div className="allies-list">
          {allies.map((ally) => (
            <article className="ally" key={ally.name}>
              <img src={ally.logo} alt={`Logo de ${ally.name}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
