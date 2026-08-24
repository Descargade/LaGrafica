import { useEffect, useState, useCallback, useRef, type FormEvent } from 'react';
import { Route, Switch, Link, useLocation } from 'wouter';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';

import './index.css';

// ===== HOOKS =====

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!ref.current) { ticking = false; return; }
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        ref.current.style.width = `${pct}%`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId.current = requestAnimationFrame(() => {
        if (window.innerWidth <= 768) {
          el.style.transform = '';
          ticking = false;
          return;
        }
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);
  return { ref };
}

function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count };
}

// ===== DATA =====

type Service = { number: string; title: string; copy: string; color: string; icon: string };
type Work = { title: string; client: string; category: string; color: string };
type Product = { name: string; tag: string; description: string; price: string; color: string };

const services: Service[] = [
  { number: '01', title: 'Impresion', copy: 'Impresion digital y offset de alta calidad.', color: '#ff5722', icon: 'CMYK' },
  { number: '02', title: 'Carteleria', copy: 'Carteles, lonas, banners y senialitica.', color: '#1a1a1a', icon: 'A3' },
  { number: '03', title: 'Vinilos & Ploteos', copy: 'Vinilos decorativos, ploteos vehiculares y mas.', color: '#ff6e40', icon: 'CUT' },
  { number: '04', title: 'Stickers', copy: 'Stickers personalizados de todos los tamanos.', color: '#ff5722', icon: 'PEGA' },
  { number: '05', title: 'Diseno Grafico', copy: 'Disenamos tu imagen, creamos tu identidad.', color: '#1a1a1a', icon: 'GRID' },
  { number: '06', title: 'Packaging', copy: 'Cajas, etiquetas y packaging para tu producto.', color: '#ff5722', icon: 'PACK' },
];

const works: Work[] = [
  { title: 'Burger House', client: 'Identidad + vidriera', category: 'Vinilos', color: '#2a1a0a' },
  { title: 'Maderera del Pino', client: 'Sistema de carteleria', category: 'Carteleria', color: '#1a0a0a' },
  { title: 'Energia que conecta', client: 'Campana grafica', category: 'Diseno', color: '#0a1a1a' },
  { title: 'Neri Grafica', client: 'Diseno de marca', category: 'Diseno', color: '#1a1a0a' },
  { title: 'Coffee Fest', client: 'Packaging festival', category: 'Packaging', color: '#2a1a1a' },
  { title: 'Todo entra aca', client: 'Packaging editorial', category: 'Packaging', color: '#0a0a1a' },
];

const products: Product[] = [
  { name: 'Tarjetas personales', tag: 'Para presentarte', description: 'Un buen papel dice mucho antes de que empieces a hablar.', price: 'desde $8.500', color: '#ff5722' },
  { name: 'Volantes', tag: 'Para moverte', description: 'Informacion clara, formato agil y una tirada que rinde.', price: 'desde $9.000', color: '#ff6e40' },
  { name: 'Stickers', tag: 'Mas pedido', description: 'Cortados a medida para que tu marca aparezca donde quieras.', price: 'desde $5.000', color: '#ff5722' },
  { name: 'Banners', tag: 'Gran formato', description: 'Presencia de verdad para eventos, locales y campanas.', price: 'desde $12.000', color: '#1a1a1a' },
];

type ProductItem = { name: string; tag: string; category: string; description: string; price: string; color: string };
const allProducts: ProductItem[] = [
  { name: 'Tarjetas personales', tag: 'Para presentarte', category: 'Impresion', description: 'Un buen papel dice mucho antes de que empieces a hablar.', price: 'desde $8.500', color: '#ff5722' },
  { name: 'Volantes', tag: 'Para moverte', category: 'Impresion', description: 'Informacion clara, formato agil y una tirada que rinde.', price: 'desde $9.000', color: '#ff6e40' },
  { name: 'Folders corporativos', tag: 'Institucional', category: 'Impresion', description: 'Organiza tus documentos con estilo que represente tu marca.', price: 'desde $15.000', color: '#ff5722' },
  { name: 'Carteleria exterior', tag: 'Gran formato', category: 'Carteleria', description: 'Presencia de verdad para locales, eventos y campanas.', price: 'desde $12.000', color: '#1a1a1a' },
  { name: 'Rotulos luminosos', tag: 'Exterior', category: 'Carteleria', description: 'Tu marca visible dia y noche, con acabado profesional.', price: 'desde $25.000', color: '#1a1a1a' },
  { name: 'Lona impresion', tag: 'Gran formato', category: 'Carteleria', description: 'Gran formato con calidad que resiste intemperie y tiempo.', price: 'desde $8.000', color: '#2a1a1a' },
  { name: 'Stickers vinilo', tag: 'Mas pedido', category: 'Stickers', description: 'Cortados a medida para que tu marca aparezca donde quieras.', price: 'desde $5.000', color: '#ff5722' },
  { name: 'Calcos decorativos', tag: 'Interior', category: 'Stickers', description: 'Transforma paredes, vidrios y superficies con tu identidad.', price: 'desde $7.000', color: '#ff6e40' },
  { name: 'Vinilo microperforado', tag: 'Vidrieras', category: 'Vinilos', description: 'Publicidad en vidrio que no bloquea la luz natural.', price: 'desde $9.500', color: '#0a1a1a' },
  { name: 'Plotter vehicular', tag: 'Movil', category: 'Vinilos', description: 'Transforma tu auto o camioneta en un medio de publicidad 24/7.', price: 'desde $18.000', color: '#1a0a1a' },
  { name: 'Etiquetas adhesivas', tag: 'Produccion', category: 'Impresion', description: 'Etiquetas con corte preciso para productos, envases y mas.', price: 'desde $4.500', color: '#ff5722' },
  { name: 'Packaging boxes', tag: 'Empaque', category: 'Packaging', description: 'Cajas personalizadas que hacen que tu producto destaque.', price: 'desde $20.000', color: '#2a1a0a' },
  { name: 'Banners rollup', tag: 'Eventos', category: 'Carteleria', description: 'Setup rapido, impacto visual. Ideal para ferias y presentaciones.', price: 'desde $14.000', color: '#1a1a1a' },
  { name: 'Diseno de marca', tag: 'Identidad', category: 'Diseno', description: 'Logo, paleta de colores y manial que cuenten tu historia.', price: 'desde $45.000', color: '#0a0a1a' },
];

const categories = ['Todos', 'Impresion', 'Carteleria', 'Vinilos', 'Stickers', 'Diseno', 'Packaging'];
const navLinks = [
  ['Inicio', '#inicio'],
  ['Servicios', '#servicios'],
  ['Trabajos', '#trabajos'],
  ['Productos', '#productos'],
  ['Sobre nosotros', '#nosotros'],
  ['Contacto', '#contacto'],
];

// ===== COMPONENTS =====

function ScrollProgress() {
  const barRef = useScrollProgress();
  return <div className="scroll-progress" ref={barRef} />;
}

function Logo() {
  return (
    <Link to="/" className="brand" data-testid="link-logo">
      <img src="/logo-white.png" alt="La Grafica" className="brand__img" />
    </Link>
  );
}

function Header({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (minimal) {
    return (
      <header className="site-header site-header--scrolled">
        <div className="site-header__inner">
          <Logo />
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px', textDecoration: 'none', transition: 'color .2s', fontFamily: 'var(--app-font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            <ArrowDownRight size={14} style={{ transform: 'rotate(90deg)' }} /> Inicio
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegacion principal">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
          ))}
        </nav>
        <div className="header-ctas">
          <Link to="/productos" className="button button--outline header-cta" data-testid="link-header-products">Ver productos <ArrowUpRight size={15} /></Link>
          <a href="#presupuesto" className="button button--orange header-cta" data-testid="link-header-quote">Pedí tu presupuesto <ArrowUpRight size={15} /></a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((c) => !c)}
          className="menu-button"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          data-testid="button-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Menu movil">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>
        ))}
        <Link to="/productos" onClick={() => setOpen(false)} className="button button--outline" data-testid="link-mobile-products">Ver productos <ArrowUpRight size={15} /></Link>
        <a href="#presupuesto" onClick={() => setOpen(false)} className="button button--orange" data-testid="link-mobile-quote">Pedí tu presupuesto <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  const { ref: parallaxRef } = useParallax(0.15);

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-sparks-layer">
        <div className="hero-spark" style={{ top: '15%', left: '60%' }} />
        <div className="hero-spark" style={{ top: '35%', left: '78%' }} />
        <div className="hero-spark" style={{ top: '55%', left: '55%' }} />
        <div className="hero-spark" style={{ top: '75%', left: '70%' }} />
        <div className="hero-spark" style={{ top: '20%', left: '45%' }} />
      </div>
      <img src="/logo-orange.png" alt="" className="hero-logo-decor" aria-hidden="true" />
      <div className="hero-section__inner">
        <div className="hero-copy">
          <p className="mono-label orange-text hero-copy__eyebrow">Hacemos que tus ideas</p>
          <h1 data-testid="text-hero-title">Cobren <span>vida</span><br />en cada<br />impresion.</h1>
          <p className="hero-copy__description">Soluciones graficas de calidad para potenciar tu marca, tu negocio y tus proyectos.</p>
          <div className="hero-copy__actions">
            <a href="#presupuesto" className="button button--orange" data-testid="link-hero-quote">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Pedí tu presupuesto
            </a>
            <a href="#trabajos" className="button button--outline" data-testid="link-hero-work">Ver trabajos <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> Calidad premium</span>
            <span><Check size={14} /> Atencion personalizada</span>
            <span><Check size={14} /> Entrega a tiempo</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Composicion de piezas graficas">
          <div className="hero-art__cards" ref={parallaxRef}>
            <div className="hero-card hero-card--1">
              <span className="hero-card__label" style={{ color: '#0d0d0d' }}>Impresion</span>
              <div className="hero-card__big-text" style={{ color: '#0d0d0d' }}>Tu Idea<br />En Grande</div>
            </div>
            <div className="hero-card hero-card--2">
              <span className="hero-card__label" style={{ color: '#333' }}>Neri Grafica</span>
              <div className="hero-card__big-text" style={{ color: '#ff5722' }}>Print<br />Objects</div>
            </div>
            <div className="hero-card hero-card--3">
              <span className="hero-card__label">Diseño</span>
              <div className="hero-card__big-text">Hacer<br />Visible</div>
            </div>
            <div className="hero-card hero-card--4">
              <span className="hero-card__label">Packaging</span>
              <div className="hero-card__big-text">Marca<br />Propia</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottomline">
        <span>Buenos Aires - Argentina</span>
        <span className="hero-bottomline__scroll">Scroll para explorar <ArrowDownRight size={15} /></span>
        <span>Desde 2012</span>
      </div>
    </section>
  );
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('revealed'); },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className="section-divider" ref={ref} />;
}

function Services() {
  return (
    <section id="servicios" className="section section--dark services-section">
      <div className="container">
        <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Lo que hacemos</div>
        <div className="services-header">
          <h2 className="section-title" data-testid="text-services-title">Servicios<br /><span>que dejan marca.</span></h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.number} className="service-card reveal-on-scroll" data-testid={`card-service-${service.number}`}>
              <div className="service-card__img" style={{ background: `linear-gradient(135deg, ${service.color}22, ${service.color}44)` }} />
              <div className="service-card__icon">{service.icon}</div>
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
  const filtered = filter === 'Todos' ? works : works.filter((w) => w.category === filter);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = filtersRef.current;
    if (!el) return;
    setHasOverflow(el.scrollWidth > el.clientWidth);
    const onResize = () => setHasOverflow(el.scrollWidth > el.clientWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.works-grid .reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="trabajos" className="section section--dark works-section">
      <img src="/isotipo-white.png" alt="" className="works-decor" aria-hidden="true" />
      <div className="container">
        <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Nuestros trabajos</div>
        <div className="works-header">
          <h2 className="section-title" data-testid="text-works-title">Trabajos<br /><span>recientes.</span></h2>
          <div className={`work-filters ${hasOverflow ? 'work-filters--has-overflow' : ''}`} role="group" aria-label="Filtrar trabajos">
            <div className="work-filters__scroll" ref={filtersRef}>
              {categories.map((cat) => (
                <button type="button" key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'is-active' : ''} data-testid={`button-filter-${cat.toLowerCase()}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="works-grid">
          {filtered.map((work) => (
            <article key={work.title} className="work-card reveal-on-scroll" data-testid={`card-work-${work.title}`}>
              <div className="work-card__placeholder" style={{ background: work.color }}>{work.title.charAt(0)}</div>
              <div className="work-card__overlay">
                <span className="work-card__category">{work.category}</span>
                <h3>{work.title}</h3>
                <p>{work.client}</p>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="work-empty" data-testid="empty-work">Todavia no hay trabajos en esta categoria.</div>}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="productos" className="section section--cream products-section">
      <div className="container">
        <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Destacados</div>
        <div className="products-header">
          <h2 className="section-title" data-testid="text-products-title">Productos<br /><span>que mas elegis.</span></h2>
          <Link to="/productos" className="button" style={{ background: '#ff5722', color: '#0d0d0d' }}>Ver todos los productos <ArrowUpRight size={15} /></Link>
        </div>
        <p className="products-subtitle">Los productos mas solicitados por nuestros clientes.</p>
        <div className="products-grid">
          {products.map((product, index) => (
            <article key={product.name} className="product-card reveal-on-scroll" data-testid={`card-product-${index}`}>
              <div className="product-card__placeholder" style={{ background: `${product.color}15` }}>
                <span style={{ color: `${product.color}30`, fontSize: '36px' }}>{product.name.charAt(0)}</span>
              </div>
              <div className="product-card__body">
                <span className="product-card__tag">{product.tag}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-card__footer">
                <span className="product-card__price">{product.price}</span>
                <a href="#presupuesto" style={{ display: 'grid', placeItems: 'center', width: '42px', height: '42px', borderRadius: '50%', background: '#ff5722', color: '#0d0d0d', textDecoration: 'none', transition: 'transform .25s ease' }} data-testid={`link-product-${index}`}>
                  <ArrowUpRight size={18} />
                </a>
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
  printType: string;
  details: string;
};

const initialQuote: QuoteData = { need: '', quantity: '', size: '', material: '', printType: '', details: '' };

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<QuoteData>(initialQuote);
  const updateField = useCallback((field: keyof QuoteData, value: string) => {
    setForm((c) => ({ ...c, [field]: value }));
  }, []);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      'Hola, quiero un presupuesto desde la web.',
      '',
      `Necesito: ${form.need || '-'}`,
      `Cantidad: ${form.quantity || '-'}`,
      `Medidas: ${form.size || '-'}`,
      `Material: ${form.material || '-'}`,
      `Impresion: ${form.printType || '-'}`,
      `Detalles: ${form.details || '-'}`,
    ];
    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/5492622419096?text=${msg}`, '_blank');
    setSubmitted(true);
  };
  const resetForm = () => { setForm(initialQuote); setSubmitted(false); };

  return (
    <section id="presupuesto" className="section section--dark quote-section">
      <img src="/isotipo-white.png" alt="" className="quote-decor" aria-hidden="true" />
      <div className="container quote-layout">
        <div className="quote-copy">
          <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Presupuesto</div>
          <h2 className="section-title" data-testid="text-quote-title">Queres un<br />presupuesto<br /><span>rapido?</span></h2>
          <p>Completa los datos de tu proyecto y te enviamos la informacion por WhatsApp.</p>
          <a href="#presupuesto" className="button button--orange" style={{ marginTop: '24px' }}>Calcular presupuesto <ArrowUpRight size={15} /></a>
          <div className="quote-note" style={{ marginTop: '32px' }}>
            <span>24-48 hs</span>
            <small>Tiempo estimado de respuesta</small>
          </div>
        </div>
        <div>
          <div className="quote-form-card">
            {submitted ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }} data-testid="status-quote-success">
                <div style={{ width: '56px', height: '56px', margin: '0 auto 24px', display: 'grid', placeItems: 'center', background: '#ff5722', borderRadius: '50%' }}><Check size={28} color="#0d0d0d" /></div>
                <p className="mono-label orange-text">Consulta recibida</p>
                <h3 style={{ margin: '12px 0 0', fontFamily: "'Archivo Black', sans-serif", fontSize: '2rem', letterSpacing: '-.06em', textTransform: 'uppercase' }}>Listo, llego<br />al taller.</h3>
                <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>Guardamos tu consulta. En un proximo paso podemos conectarla con tu canal de atencion.</p>
                <button type="button" onClick={resetForm} style={{ marginTop: '24px', padding: '0', border: '0', borderBottom: '1px solid var(--text-primary)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'var(--app-font-mono)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase' }} data-testid="button-reset-quote">Enviar otra consulta <ArrowUpRight size={15} style={{ display: 'inline' }} /></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-form" data-testid="form-quote">
                <div className="form-field form-field--select">
                  <label htmlFor="need">1. Que necesitas?</label>
                  <select id="need" required value={form.need} onChange={(e) => updateField('need', e.target.value)} data-testid="select-need">
                    <option value="">Selecciona una opcion</option>
                    <option>Impresion</option><option>Carteleria</option><option>Vinilos & Ploteos</option><option>Stickers</option><option>Diseno Grafico</option><option>Packaging</option>
                  </select><ChevronDown size={16} />
                </div>
                <div className="form-row">
                  <label className="form-field"><span>2. Cantidad</span><input required value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder="Ej. 100, 500, 1000" data-testid="input-quantity" /></label>
                  <label className="form-field"><span>3. Medidas</span><input value={form.size} onChange={(e) => updateField('size', e.target.value)} placeholder="Ej. 10x15 cm" data-testid="input-size" /></label>
                </div>
                <div className="form-row">
                  <label className="form-field"><span>4. Material</span><input value={form.material} onChange={(e) => updateField('material', e.target.value)} placeholder="Papel, vinilo, lona..." data-testid="input-material" /></label>
                  <label className="form-field form-field--select"><span>5. Impresion</span><select value={form.printType} onChange={(e) => updateField('printType', e.target.value)} data-testid="select-print"><option value="">Selecciona una opcion</option><option>Digital</option><option>Gran formato</option><option>Serigrafia</option><option>No lo se todavía</option></select><ChevronDown size={16} /></label>
                </div>
                <label className="form-field"><span>6. Detalles adicionales</span><textarea required value={form.details} onChange={(e) => updateField('details', e.target.value)} placeholder="Contanos mas sobre tu proyecto..." rows={3} data-testid="textarea-details" /></label>
                <button type="submit" className="button button--orange button--full" data-testid="button-submit-quote">Enviar consulta <ArrowUpRight size={18} /></button>
              </form>
            )}
          </div>
          <div className="quote-whatsapp">
            <div className="quote-whatsapp__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <strong>Enviar por WhatsApp</strong>
              <p>Te enviaremos un mensaje con el detalle de tu presupuesto.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const counter1 = useCounter(10, 1200);
  const counter2 = useCounter(100, 1400);
  const stats = [
    { ref: counter1.ref, value: `+${counter1.count}`, label: 'Anos de experiencia', icon: <Clock size={22} /> },
    { ref: counter2.ref, value: `${counter2.count}%`, label: 'Calidad garantizada', icon: <Check size={22} /> },
    { value: '01:01', label: 'Atencion personalizada', icon: <Mail size={22} /> },
    { value: 'A TIEMPO', label: 'Entregas a tiempo', icon: <Send size={22} /> },
  ];
  return (
    <section id="nosotros" className="section section--cream about-section">
      <div className="container about-layout">
        <div>
          <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Sobre nosotros</div>
          <h2 className="section-title" data-testid="text-about-title">Mas que impresiones,<br /><span>creamos soluciones.</span></h2>
          <p className="about-description">Somos un equipo apasionado por la grafica. Combinamos tecnologia, creatividad y compromiso para ofrecerte siempre el mejor resultado.</p>
          <a href="#contacto" className="button" style={{ marginTop: '28px', background: '#ff5722', color: '#0d0d0d' }}>Conoce mas sobre nosotros <ArrowUpRight size={15} /></a>
        </div>
        <div className="about-stats">
          {stats.map((stat, i) => (
            <div className="stat-card reveal-on-scroll" key={stat.label} ref={stat.ref} data-testid={`stat-${i}`}>
              <div className="stat-card__icon">{stat.icon}</div>
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="section section--dark contact-section">
      <div className="container contact-layout">
        <div>
          <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Pasa a saludar</div>
          <h2 className="section-title" data-testid="text-contact-title">Estamos<br /><span>aca.</span></h2>
          <p className="contact-description">Las Heras & Chile, M5569 Eugenio Bustos, Mendoza. Atendemos con mate, muestras de papel y tiempo para pensar.</p>
          <div className="contact-info__grid">
            <a href="mailto:servicioslagrafica@gmail.com" className="contact-info__item" data-testid="link-contact-email">
              <span className="contact-info__icon"><Mail size={18} /></span>
              SERVICIOSLAGRAFICA@GMAIL.COM
            </a>
            <a href="tel:+5492622419096" className="contact-info__item" data-testid="link-contact-phone">
              <span className="contact-info__icon"><Phone size={18} /></span>
              +54 9 2622 419096
            </a>
            <div className="contact-info__item">
              <span className="contact-info__icon"><Clock size={18} /></span>
              LUN A VIE - 10 A 18 H
            </div>
            <a href="https://instagram.com/lagraficaeugeniobustos" className="contact-info__item" data-testid="link-contact-instagram" target="_blank" rel="noopener noreferrer">
              <span className="contact-info__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </span>
              @LAGRAFICA.EUGENIOBUSTOS
            </a>
          </div>
        </div>
        <a href="https://maps.google.com/?q=Las+Heras+Chile+M5569+Eugenio+Bustos+Mendoza+Argentina" target="_blank" rel="noopener noreferrer" className="contact-map" style={{textDecoration:'none'}} data-testid="link-map">
          <div className="contact-map__grid" />
          <div className="contact-map__lines" />
          <div className="contact-map__pin">
            <div className="contact-map__pin-dot">
              <MapPin size={16} />
            </div>
          </div>
          <div className="contact-map__label">
            Las Heras & Chile, M5569<br />Eugenio Bustos, Mendoza
          </div>
          <span className="contact-map__hint"><ExternalLink size={12} /> Abrir en Maps</span>
        </a>
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
          <div className="footer-column"><p>Contacto</p><a href="mailto:servicioslagrafica@gmail.com" data-testid="link-footer-email">servicioslagrafica@gmail.com</a><a href="tel:+5492622419096" data-testid="link-footer-phone">+54 9 2622 419096</a><a href="https://instagram.com/lagraficaeugeniobustos" data-testid="link-footer-instagram">@lagraficaeugeniobustos</a></div>
          <div className="footer-column"><p>Ubicacion</p><span>Las Heras & Chile, M5569<br />Eugenio Bustos, Mendoza</span><span>Lun-Vie - 10 a 18 hs</span></div>
        </div>
        <div className="footer-bottom"><span>&copy; La Grafica 2024</span><span>Diseno, impresion y calle</span><a href="#inicio" data-testid="link-back-top">Volver arriba <ArrowUpRight size={13} /></a></div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="https://wa.me/5492622419096"
      className={`whatsapp-fab ${visible ? 'whatsapp-fab--visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <div className="whatsapp-fab__pulse" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  );
}

function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Works />
        <SectionDivider />
        <Products />
        <SectionDivider />
        <QuoteForm />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function Productos() {
  const [filter, setFilter] = useState('Todos');
  const productCategories = ['Todos', 'Impresion', 'Carteleria', 'Vinilos', 'Stickers', 'Diseno', 'Packaging'];
  const filtered = filter === 'Todos' ? allProducts : allProducts.filter((p) => p.category === filter);
  const [location] = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  useEffect(() => {
    const cards = document.querySelectorAll('.products-page-grid .reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  const openWhatsApp = (productName: string) => {
    const msg = encodeURIComponent(`Hola, me interesa saber el precio de: ${productName}`);
    window.open(`https://wa.me/5492622419096?text=${msg}`, '_blank');
  };

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Header minimal />
      <main>
        <section className="section products-page-hero">
          <img src="/isotipo-white.png" alt="" className="products-hero-decor" aria-hidden="true" />
          <div className="container">
            <div className="mono-label orange-text" style={{ marginBottom: '12px' }}>Nuestros productos</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Todos los<br /><span>productos.</span></h2>
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.5', maxWidth: '480px' }}>Explora nuestra linea completa de productos graficos. Cada uno pensado para potenciar tu marca.</p>
          </div>
        </section>
        <section className="section products-page-section">
          <div className="container">
            <div className="products-page-filters" role="group" aria-label="Filtrar productos">
              {productCategories.map((cat) => (
                <button type="button" key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'is-active' : ''}>{cat}</button>
              ))}
            </div>
            <div className="products-page-grid">
              {filtered.map((product, index) => (
                <article key={product.name} className="product-page-card reveal-on-scroll" style={{ transitionDelay: `${(index % 4) * 0.08}s` }}>
                  <div className="product-page-card__placeholder" style={{ background: `${product.color}12` }}>
                    <img src="/isotipo-white.png" alt="" className="product-page-card__watermark" aria-hidden="true" />
                  </div>
                  <div className="product-page-card__body">
                    <span className="product-page-card__tag">{product.tag}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-page-card__footer">
                    <span className="product-page-card__price">{product.price}</span>
                    <button type="button" className="product-page-card__cta" onClick={() => openWhatsApp(product.name)} aria-label={`Consultar ${product.name} por WhatsApp`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && <div className="work-empty">No hay productos en esta categoria.</div>}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/productos" component={Productos} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
