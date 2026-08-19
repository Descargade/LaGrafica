import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, Plus, X } from 'lucide-react';

import './index.css';

type Service = {
  number: string;
  title: string;
  copy: string;
  visual: string;
  icon: string;
};

type Work = {
  title: string;
  client: string;
  category: string;
  tone: string;
  mark: string;
  size: string;
};

type Product = {
  name: string;
  tag: string;
  description: string;
  price: string;
  shape: string;
  code: string;
};

const services: Service[] = [
  { number: '01', title: 'Impresión', copy: 'Papeles, tintas y terminaciones que hacen que una pieza se sienta bien.', visual: 'service-paper', icon: 'CMYK' },
  { number: '02', title: 'Cartelería', copy: 'Lo que tu marca necesita para hacerse ver desde lejos y quedarse cerca.', visual: 'service-poster', icon: 'A3' },
  { number: '03', title: 'Vinilos & Ploteos', copy: 'Vitrinas, paredes, vehículos y superficies con una nueva lectura.', visual: 'service-vinyl', icon: 'CUT' },
  { number: '04', title: 'Stickers', copy: 'Series chicas o grandes, mate o brillante. Tu identidad, por todas partes.', visual: 'service-sticker', icon: 'PEGA' },
  { number: '05', title: 'Diseño Gráfico', copy: 'Ordenamos el mensaje y lo convertimos en un sistema que funciona.', visual: 'service-design', icon: 'GRID' },
  { number: '06', title: 'Packaging', copy: 'El primer contacto con tu producto también merece una buena idea.', visual: 'service-pack', icon: 'PACK' },
];

const works: Work[] = [
  { title: 'La esquina que faltaba', client: 'Identidad + vidriera', category: 'Vinilos', tone: 'work-orange', mark: 'LE', size: 'work-large' },
  { title: 'Sábado de feria', client: 'Sistema de cartelería', category: 'Cartelería', tone: 'work-cream', mark: 'SF', size: 'work-small' },
  { title: 'Todo entra acá', client: 'Packaging editorial', category: 'Packaging', tone: 'work-red', mark: 'TE', size: 'work-tall' },
  { title: 'Pegá donde quieras', client: 'Serie de stickers', category: 'Stickers', tone: 'work-peach', mark: 'PQ', size: 'work-small' },
  { title: 'Materia prima', client: 'Papelería institucional', category: 'Impresión', tone: 'work-ink', mark: 'MP', size: 'work-wide' },
  { title: 'Un poco más fuerte', client: 'Campaña gráfica', category: 'Diseño', tone: 'work-red-alt', mark: 'MF', size: 'work-tall' },
];

const products: Product[] = [
  { name: 'Tarjetas personales', tag: 'Para presentarte', description: 'Un buen papel dice mucho antes de que empieces a hablar.', price: 'desde $18.900', shape: 'product-card-sheet', code: '01 / 250 u' },
  { name: 'Volantes', tag: 'Para moverte', description: 'Información clara, formato ágil y una tirada que rinde.', price: 'desde $24.500', shape: 'product-flyer', code: '02 / A5' },
  { name: 'Stickers', tag: 'Más pedido', description: 'Cortados a medida para que tu marca aparezca donde quieras.', price: 'desde $16.800', shape: 'product-sticker', code: '03 / troquel' },
  { name: 'Banners', tag: 'Gran formato', description: 'Presencia de verdad para eventos, locales y campañas.', price: 'desde $39.000', shape: 'product-banner', code: '04 / 80×200' },
];

const categories = ['Todos', 'Impresión', 'Cartelería', 'Vinilos', 'Stickers', 'Diseño', 'Packaging'];
const navLinks = [
  ['Inicio', '#inicio'],
  ['Servicios', '#servicios'],
  ['Trabajos', '#trabajos'],
  ['Productos', '#productos'],
  ['Nosotros', '#nosotros'],
  ['Contacto', '#contacto'],
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${dark ? 'brand--dark' : ''}`} data-testid="link-logo">
      <span className="brand__mark">G</span>
      <span className="brand__name">LA<br />GRÁFICA</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
          ))}
        </nav>
        <a href="#presupuesto" className="button button--orange header-cta" data-testid="link-header-quote">
          Pedí tu presupuesto <ArrowUpRight size={15} />
        </a>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="menu-button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          data-testid="button-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Menú móvil">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>
          ))}
          <a href="#presupuesto" onClick={() => setOpen(false)} className="button button--orange" data-testid="link-mobile-quote">Pedí tu presupuesto <ArrowUpRight size={15} /></a>
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ index, children, dark = false }: { index: string; children: string; dark?: boolean }) {
  return (
    <div className={`section-label ${dark ? 'section-label--dark' : ''}`}>
      <span>{index}</span><i />{children}
    </div>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="Composición editorial de piezas gráficas">
      <div className="hero-art__orbit hero-art__orbit--one" />
      <div className="hero-art__orbit hero-art__orbit--two" />
      <div className="hero-art__cross" />
      <div className="hero-sheet hero-sheet--back"><span>LA GRÁFICA</span><b>PRINT<br />OBJECTS</b></div>
      <div className="hero-sheet hero-sheet--main">
        <div className="hero-sheet__topline"><span>01 — 06</span><span>ESTUDIO VISUAL</span></div>
        <div className="hero-sheet__word">HACER<br /><em>VISIBLE</em></div>
        <div className="hero-sheet__bars"><i /><i /><i /><i /></div>
        <div className="hero-sheet__footer">Diseño · tinta · calle</div>
      </div>
      <div className="hero-tag hero-tag--orange">IDEAS<br />EN SERIO</div>
      <div className="hero-tag hero-tag--cream">PAPEL<br />& FORMA</div>
      <div className="hero-art__caption">Composición 001 /<br />hecha en el taller</div>
      <div className="hero-art__registration">+</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-section__grid" />
      <div className="hero-section__inner">
        <div className="hero-copy">
          <p className="eyebrow hero-copy__eyebrow">Gráfica, impresión & comunicación visual</p>
          <h1 data-testid="text-hero-title">Hacemos que<br />tus ideas<br /><span>se vean.</span></h1>
          <p className="hero-copy__description">Soluciones gráficas de calidad para potenciar tu marca, tu negocio y tus proyectos.</p>
          <div className="hero-copy__actions">
            <a href="#presupuesto" className="button button--orange" data-testid="link-hero-quote">Pedí tu presupuesto <ArrowUpRight size={17} /></a>
            <a href="#trabajos" className="button button--outline-light" data-testid="link-hero-work">Ver trabajos <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> Calidad premium</span>
            <span><Check size={14} /> Atención personalizada</span>
            <span><Check size={14} /> Entrega a tiempo</span>
          </div>
        </div>
        <HeroArtwork />
      </div>
      <div className="hero-bottomline">
        <span>Buenos Aires · Argentina</span>
        <span className="hero-bottomline__scroll">Scroll para explorar <ArrowDownRight size={15} /></span>
        <span>Desde 2012</span>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="section section--cream services-section">
      <div className="container">
        <SectionLabel index="01" dark>Lo que hacemos</SectionLabel>
        <div className="section-intro section-intro--services">
          <div>
            <p className="eyebrow eyebrow--orange">Oficios para ideas con intención</p>
            <h2 data-testid="text-services-title">Servicios<br /><span>que dejan marca.</span></h2>
          </div>
          <p className="section-intro__copy">Desde una pieza puntual hasta un sistema completo: pensamos, producimos y cuidamos cada detalle para que tu marca salga al mundo con claridad.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.number} className="service-card reveal-on-scroll" data-testid={`card-service-${service.number}`}>
              <div className="service-card__head"><span>{service.number}</span><Plus size={17} /></div>
              <div className={`service-card__visual ${service.visual}`} aria-hidden="true"><b>{service.icon}</b></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  const [filter, setFilter] = useState('Todos');
  const filtered = filter === 'Todos' ? works : works.filter((work) => work.category === filter);

  return (
    <section id="trabajos" className="section section--ink works-section">
      <div className="container">
        <SectionLabel index="02">Nuestros trabajos</SectionLabel>
        <div className="section-intro section-intro--works">
          <div>
            <p className="eyebrow eyebrow--orange">Una selección del archivo</p>
            <h2 data-testid="text-works-title">Trabajos<br /><span>recientes.</span></h2>
          </div>
          <div className="work-filters" role="group" aria-label="Filtrar trabajos">
            {categories.map((category) => (
              <button type="button" key={category} onClick={() => setFilter(category)} className={filter === category ? 'is-active' : ''} data-testid={`button-filter-${category.toLowerCase()}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="works-grid">
          {filtered.map((work, index) => (
            <article key={work.title} className={`work-card ${work.tone} ${work.size} reveal-on-scroll`} data-testid={`card-work-${work.mark}`}>
              <div className="work-card__meta"><span>{work.category}</span><span>0{index + 1}</span></div>
              <div className="work-card__shape"><span>{work.mark}</span><i /></div>
              <div className="work-card__copy"><p>{work.client}</p><h3>{work.title}</h3></div>
              <ArrowUpRight className="work-card__arrow" size={20} />
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty-work" data-testid="empty-work">Todavía no hay trabajos en esta categoría.</div>}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="productos" className="section section--cream products-section">
      <div className="container">
        <SectionLabel index="03" dark>Lo más pedido</SectionLabel>
        <div className="section-intro section-intro--products">
          <div>
            <p className="eyebrow eyebrow--orange">Soluciones listas para salir</p>
            <h2 data-testid="text-products-title">Productos<br /><span>destacados.</span></h2>
          </div>
          <p className="section-intro__copy">Formatos probados, combinaciones honestas y la posibilidad de adaptarlos a tu medida.</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <article key={product.name} className="product-card reveal-on-scroll" data-testid={`card-product-${index}`}>
              <div className="product-card__top"><span>{product.tag}</span><small>{product.code}</small></div>
              <div className={`product-card__visual ${product.shape}`} aria-hidden="true"><b>{index === 0 ? 'NOMBRE' : index === 1 ? 'VOLANTE' : index === 2 ? 'PEGÁ' : 'ACÁ'}</b><i /></div>
              <div className="product-card__bottom">
                <div><h3>{product.name}</h3><p>{product.description}</p></div>
                <div className="product-card__price"><span>{product.price}</span><a href="#presupuesto" aria-label={`Consultar por ${product.name}`} data-testid={`link-product-${index}`}><ArrowUpRight size={18} /></a></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type QuoteData = {
  need: string;
  quantity: string;
  size: string;
  material: string;
  print: string;
  details: string;
};

const initialQuote: QuoteData = { need: '', quantity: '', size: '', material: '', print: '', details: '' };

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<QuoteData>(initialQuote);
  const updateField = (field: keyof QuoteData, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const resetForm = () => {
    setForm(initialQuote);
    setSubmitted(false);
  };

  return (
    <section id="presupuesto" className="section section--ink quote-section">
      <div className="container quote-layout">
        <div className="quote-copy">
          <SectionLabel index="04">Presupuesto</SectionLabel>
          <p className="eyebrow eyebrow--orange">Lo hacemos fácil</p>
          <h2 data-testid="text-quote-title">¿Querés un<br />presupuesto<br /><span>rápido?</span></h2>
          <p>Contanos qué necesitás y te respondemos con ideas concretas y números claros. Sin vueltas, sin compromiso.</p>
          <div className="quote-note"><span>24—48 hs</span><small>Tiempo estimado de respuesta</small></div>
        </div>
        <div className="quote-form-wrap">
          {submitted ? (
            <div className="quote-success" data-testid="status-quote-success">
              <div className="quote-success__icon"><Check size={28} /></div>
              <p className="eyebrow eyebrow--orange">Consulta recibida</p>
              <h3>Listo, llegó<br />al taller.</h3>
              <p>Guardamos tu consulta de forma local para esta demo. En un próximo paso podemos conectarla con tu canal de atención.</p>
              <button type="button" className="text-button" onClick={resetForm} data-testid="button-reset-quote">Enviar otra consulta <ArrowUpRight size={15} /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form" data-testid="form-quote">
              <div className="form-field form-field--select">
                <label htmlFor="need">¿Qué necesitás?</label>
                <select id="need" required value={form.need} onChange={(event) => updateField('need', event.target.value)} data-testid="select-need">
                  <option value="">Elegí una opción</option><option>Impresión</option><option>Cartelería</option><option>Vinilos & Ploteos</option><option>Stickers</option><option>Diseño Gráfico</option><option>Packaging</option>
                </select><ChevronDown size={16} />
              </div>
              <div className="form-row">
                <label className="form-field"><span>Cantidad</span><input required value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} placeholder="Ej. 100 unidades" data-testid="input-quantity" /></label>
                <label className="form-field"><span>Medidas</span><input value={form.size} onChange={(event) => updateField('size', event.target.value)} placeholder="Ej. 10 × 15 cm" data-testid="input-size" /></label>
              </div>
              <div className="form-row">
                <label className="form-field"><span>Material</span><input value={form.material} onChange={(event) => updateField('material', event.target.value)} placeholder="Papel, vinilo, lona..." data-testid="input-material" /></label>
                <label className="form-field form-field--select"><span>Impresión</span><select value={form.print} onChange={(event) => updateField('print', event.target.value)} data-testid="select-print"><option value="">A definir</option><option>Digital</option><option>Gran formato</option><option>Serigrafía</option><option>No lo sé todavía</option></select><ChevronDown size={16} /></label>
              </div>
              <label className="form-field"><span>Detalles adicionales</span><textarea required value={form.details} onChange={(event) => updateField('details', event.target.value)} placeholder="Contanos un poco más sobre tu idea..." rows={3} data-testid="textarea-details" /></label>
              <button type="submit" className="button button--orange button--full" data-testid="button-submit-quote">Enviar consulta <ArrowUpRight size={18} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function About() {
  const indicators = [
    ['+10', 'Años de experiencia'],
    ['100%', 'Calidad garantizada'],
    ['01:01', 'Atención personalizada'],
    ['A TIEMPO', 'Entregas a tiempo'],
  ];
  return (
    <section id="nosotros" className="section section--cream about-section">
      <div className="container about-layout">
        <div className="about-intro">
          <SectionLabel index="05" dark>Quiénes somos</SectionLabel>
          <p className="eyebrow eyebrow--orange">Más que impresiones</p>
          <h2 data-testid="text-about-title">Creamos<br /><span>soluciones.</span></h2>
          <p className="about-description">La Gráfica nació entre pruebas de color, entregas a contrarreloj y la obsesión por encontrar el soporte exacto. Somos un estudio chico con una red grande de oficios.</p>
        </div>
        <div className="about-indicators">
          {indicators.map(([value, label], index) => (
            <div className="indicator" key={label} data-testid={`indicator-${index}`}>
              <span className="indicator__number">{value}</span>
              <span className="indicator__dot" />
              <span className="indicator__label">{label}</span>
            </div>
          ))}
          <div className="about-stamp">HECHO<br /><em>ACÁ.</em></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="section section--red contact-section">
      <div className="container">
        <SectionLabel index="06">Contacto</SectionLabel>
        <div className="contact-layout">
          <div>
            <p className="eyebrow eyebrow--cream">Abrimos el taller</p>
            <h2 data-testid="text-contact-title">Hablemos<br />de tu<br /><span>proyecto.</span></h2>
          </div>
          <div className="contact-info">
            <p className="contact-info__intro">Una idea se vuelve real cuando encuentra su forma. La buscamos con vos.</p>
            <div className="contact-info__grid">
              <a href="mailto:hola@lagrafica.com.ar" data-testid="link-contact-email"><small>Email</small>hola@lagrafica.com.ar</a>
              <a href="tel:+541147892011" data-testid="link-contact-phone"><small>Teléfono</small>+54 11 4789 2011</a>
              <a href="#trabajos" data-testid="link-contact-instagram"><small>Instagram</small>@lagrafica.estudio</a>
              <div><small>Encontranos</small>Av. Dorrego 1744<br />CABA, Buenos Aires</div>
            </div>
            <a href="#presupuesto" className="button button--cream" data-testid="link-contact-quote">Hablá con nosotros <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand"><Logo /><h2>Que se<br /><span>note.</span></h2></div>
          <div className="footer-column"><p>Enlaces</p>{navLinks.map(([label, href]) => <a key={href} href={href} data-testid={`link-footer-${label.toLowerCase()}`}>{label}</a>)}</div>
          <div className="footer-column"><p>Contacto</p><a href="mailto:hola@lagrafica.com.ar" data-testid="link-footer-email">hola@lagrafica.com.ar</a><a href="tel:+541147892011" data-testid="link-footer-phone">+54 11 4789 2011</a><a href="#trabajos" data-testid="link-footer-instagram">@lagrafica.estudio</a></div>
          <div className="footer-column"><p>Ubicación</p><span>Av. Dorrego 1744<br />CABA, Buenos Aires</span><span>Lun—Vie · 9 a 18 hs</span></div>
        </div>
        <div className="footer-bottom"><span>© La Gráfica 2024</span><span>Diseño, impresión y calle</span><a href="#inicio" data-testid="link-back-top">Volver arriba <ArrowUpRight size={13} /></a></div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grain site-shell">
      <Header />
      <main><Hero /><Services /><Works /><Products /><QuoteForm /><About /><Contact /></main>
      <Footer />
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;