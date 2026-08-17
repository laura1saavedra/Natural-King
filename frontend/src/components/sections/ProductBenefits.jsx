const benefits = [
  { image: '/img/iconos/icono_flor.png', title: 'Ecológicos', description: 'Productos de baja toxicidad que cuidan el planeta.' },
  { image: '/img/iconos/seguro.png', title: 'Seguros', description: 'Fórmulas seguras para tu familia y mascotas.' },
  { image: '/img/iconos/dinero.png', title: 'Económicos', description: 'Kits completos que te ahorran tiempo y dinero.' },
  { image: '/img/iconos/paquete.png', title: 'Prácticos', description: 'Todo lo que necesitas en un solo paquete.' },
]

export default function ProductBenefits() {
  return (
    <div className="products-benefits" aria-label="Beneficios de nuestros productos">
      {benefits.map((benefit) => (
        <div className="product-benefit" key={benefit.title}>
          <span className="product-benefit__icon product-benefit__icon--image" aria-hidden="true">
            <img src={benefit.image} alt="" />
          </span>
          <div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
