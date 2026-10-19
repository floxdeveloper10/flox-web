import Reveal from './Reveal.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { professionals, whatsappLink } from '../data/site.js'
import './Professionals.css'

// Maqueta de un portafolio hecha solo con CSS (sin imágenes)
function PortfolioMock({ sample }) {
  return (
    <div
      className="pro-mock"
      role="img"
      aria-label={`Ejemplo de portafolio: ${sample.name}, ${sample.role}. Habilidades: ${sample.skills.join(', ')}.`}
    >
      <div className="pro-mock__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="pro-mock__body" aria-hidden="true">
        <span className="pro-mock__avatar">{sample.initials}</span>
        <p className="pro-mock__name">{sample.name}</p>
        <p className="pro-mock__role">{sample.role}</p>
        <ul className="pro-mock__skills">
          {sample.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        {/* Decorativo: no es un botón real */}
        <span className="pro-mock__button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />
          </svg>
          {sample.button}
        </span>
        <span className="pro-mock__lines">
          <span />
          <span />
        </span>
      </div>
    </div>
  )
}

// "Para profesionales": portafolios para quienes trabajan por su cuenta
export default function Professionals() {
  const headingId = `${professionals.id}-titulo`

  return (
    <section id={professionals.id} className="section section--morado pro" aria-labelledby={headingId} data-origen="profesionales">
      <div className="container pro__inner">
        <Reveal className="pro__copy">
          <p className="pro__eyebrow">{professionals.eyebrow}</p>
          <h2 id={headingId} className="pro__title">
            {professionals.title}
          </h2>
          <p className="pro__text">{professionals.text}</p>

          <ul className="pro__chips" aria-label={professionals.includesLabel}>
            {professionals.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a className="btn btn--primary pro__cta" href={whatsappLink(professionals.message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {professionals.cta}
          </a>
        </Reveal>

        <Reveal className="pro__visual" delay={0.15}>
          <PortfolioMock sample={professionals.sample} />
        </Reveal>
      </div>
    </section>
  )
}
