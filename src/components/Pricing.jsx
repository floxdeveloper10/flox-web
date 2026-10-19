import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import MaintenancePlans from './MaintenancePlans.jsx'
import SectionHeading from './SectionHeading.jsx'
import { pricing, whatsappLink } from '../data/site.js'
import './Pricing.css'

export default function Pricing() {
  const headingId = `${pricing.id}-titulo`

  return (
    <section id={pricing.id} className="section section--blanco pricing" data-origen="precios" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} title={pricing.title} />

        <ul className="pricing__grid">
          {pricing.plans.map((plan, i) => (
            <Reveal as="li" key={plan.name} delay={i * 0.1} className={plan.featured ? 'pricing__item--featured' : ''}>
              <article className={`card plan ${plan.featured ? 'plan--featured' : ''}`}>
                {plan.featured && <p className="plan__badge">{pricing.featuredLabel}</p>}
                <h3 className="plan__name">{plan.name}</h3>
                <p className="plan__price">
                  <span className="plan__from">{pricing.from}</span>
                  <span className="plan__amount">S/ {plan.price}</span>
                </p>

                {/* Lista de lo que incluye, o una línea corta (portafolio) */}
                {plan.features ? (
                  <ul className="plan__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" strokeWidth={3} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="plan__summary">{plan.summary}</p>
                )}

                <a
                  className="btn btn--primary plan__cta"
                  href={whatsappLink(plan.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${plan.cta ?? pricing.cta}: ${plan.name}`}
                >
                  {plan.cta ?? pricing.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* App a medida: sin monto, en una franja aparte (amarillo de FLOX Apps) */}
        <Reveal className="pricing__app">
          <div className="pricing__app-head">
            <p className="plan__tag">{pricing.app.tag}</p>
            <h3 className="plan__name">{pricing.app.name}</h3>
            <p className="pricing__app-quote">{pricing.app.quote}</p>
          </div>
          <ul className="pricing__app-features">
            {pricing.app.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" strokeWidth={3} />
                {feature}
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary pricing__app-cta"
            href={whatsappLink(pricing.app.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${pricing.app.cta}: ${pricing.app.name}`}
          >
            {pricing.app.cta}
          </a>
        </Reveal>

        <Reveal className="pricing__quote">
          <p>{pricing.quote.text}</p>
          <Link className="btn btn--primary" to="/cotizar">
            <Icon name="moneda" />
            {pricing.quote.button}
          </Link>
        </Reveal>

        <Reveal className="pricing__notes">
          <p className="pricing__note">{pricing.note}</p>
          <p className="pricing__custom">
            {pricing.custom.before}{' '}
            <a href={whatsappLink(pricing.custom.message)} target="_blank" rel="noopener noreferrer">
              {pricing.custom.link}
            </a>{' '}
            {pricing.custom.after}
          </p>
        </Reveal>

        <MaintenancePlans />
      </div>
    </section>
  )
}
