import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, Plus, X } from 'lucide-react';

import './index.css';

type Work = {
  title: string;
  client: string;
  category: string;
  tone: string;
  mark: string;
};

const services = [
  { number: '01', title: 'Impresión', copy: 'La tinta justa, el papel que corresponde. De una tarjeta a una tirada completa.', accent: 'orange', visual: 'ink' },
  { number: '02', title: 'Cartelería', copy: 'Que te vean desde la otra cuadra. Banners, lonas, rígidos y mucho más.', accent: 'cream', visual: 'type' },
  { number: '03', title: 'Vinilos & Ploteos', copy: 'Superficies que hablan. Vitrinas, paredes, vehículos y señalética con carácter.', accent: 'red', visual: 'wave' },
  { number: '04', title: 'Stickers', copy: 'Pequeños, grandes, mate o brillantes: tu marca en cualquier parte.', accent: 'peach', visual: 'dots' },
  { number: '05', title: 'Diseño Gráfico', copy: 'Pensamos el mensaje, ordenamos el ruido y lo hacemos visualmente inolvidable.', accent: 'cream', visual: 'cross' },
  { number: '06', title: 'Packaging', copy: 'El primer contacto también se diseña. Cajas, fajas, etiquetas y bolsas.', accent: 'orange', visual: 'box' },
];

const works: Work[] = [
  { title: 'La esquina que faltaba', client: 'Identidad + vidriera', category: 'Ploteos', tone: 'work-orange', mark: 'LE' },
  { title: 'Sábado de feria', client: 'Sistema de cartelería', category: 'Cartelería', tone: 'work-cream', mark: 'SF' },
  { title: 'Todo entra acá', client: 'Packaging editorial', category: 'Packaging', tone: 'work-red', mark: 'TE' },
  { title: 'Pegá donde quieras', client: 'Serie de stickers', category: 'Stickers', tone: 'work-peach', mark: 'PQ' },
  { title: 'Materia prima', client: 'Papelería institucional', category: 'Impresión', tone: 'work-ink', mark: 'MP' },
  { title: 'Un poco más fuerte', client: 'Campaña gráfica', category: 'Diseño', tone: 'work-red-alt', mark: 'MF' },
];

const products = [
  { name: 'Kit identidad', tag: 'Para empezar', description: 'Tarjetas + stickers + sello visual para que tu negocio salga a la calle.', price: 'desde $28.500', shape: 'product-sun' },
  { name: 'Pack vidriera', tag: 'Más pedido', description: 'Diseño, producción y colocación de vinilo para transformar tu entrada.', price: 'desde $64.000', shape: 'product-window' },
  { name: 'Tirada express', tag: 'En 48 horas', description: 'Lo urgente no tiene por qué verse improvisado. Consultá formatos disponibles.', price: 'a medida', shape: 'product-stack' },
];

const categories = ['Todos', 'Cartelería', 'Ploteos', 'Stickers', 'Packaging', 'Impresión', 'Diseño'];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`flex items-center gap-2.5 ${light ? 'text-[#1a1a1a]' : 'text-[#fff7ed]'}`} data-testid="link-logo">
      <span className="grid h-9 w-9 place-items-center bg-[#ff6b00] font-display text-xl leading-none text-[#1a1a1a]">G</span>
      <span className="font-display text-[17px] leading-[.85] tracking-[-.06em]">LA<br />GRÁFICA</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Inicio', '#inicio'], ['Servicios', '#servicios'], ['Trabajos', '#trabajos'], ['Productos', '#productos'], ['Nosotros', '#nosotros']];
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-5 py-5 md:px-10 md:py-7">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => <a key={href} href={href} className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#fff7ed]/65 transition-colors hover:text-[#ff6b00]" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
          <a href="#contacto" className="border border-[#fff7ed]/35 px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#fff7ed] transition-colors hover:border-[#ff6b00] hover:bg-[#ff6b00] hover:text-[#1a1a1a]" data-testid="link-nav-contacto">Pedir presupuesto</a>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center border border-[#fff7ed]/35 text-[#fff7ed] md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} data-testid="button-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-4 max-w-[1360px] border border-[#fff7ed]/20 bg-[#1a1a1a] p-5 md:hidden" aria-label="Menú móvil">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-[#fff7ed]/10 py-4 font-mono-custom text-[11px] uppercase tracking-[.16em] text-[#fff7ed]" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>)}
          <a href="#contacto" onClick={() => setOpen(false)} className="mt-5 block bg-[#ff6b00] px-4 py-3 text-center font-mono-custom text-[11px] uppercase tracking-[.12em] text-[#1a1a1a]" data-testid="link-mobile-contacto">Pedir presupuesto</a>
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ index, children, light = false }: { index: string; children: string; light?: boolean }) {
  return <div className={`mb-7 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.2em] ${light ? 'text-[#1a1a1a]/55' : 'text-[#fff7ed]/55'}`}><span className="text-[#ff6b00]">{index}</span><span className="h-px w-8 bg-current opacity-50" />{children}</div>;
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-[720px] overflow-hidden bg-[#1a1a1a] px-5 pb-20 pt-36 md:min-h-[820px] md:px-10 md:pt-44">
      <div className="grid-paper absolute inset-0 opacity-20" />
      <div className="absolute -right-32 top-32 h-[520px] w-[520px] rounded-full border border-[#ff6b00]/25 md:right-[4%] md:top-36" />
      <div className="absolute -right-12 top-48 h-[350px] w-[350px] rounded-full border border-[#ff3d00]/20 md:right-[11%]" />
      <div className="relative mx-auto max-w-[1360px]">
        <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.3em] text-[#ff6b00]" data-testid="text-hero-kicker">Estudio de gráfica · Buenos Aires · 2012—2024</p>
        <h1 className="reveal reveal-delay-1 mt-5 max-w-[940px] font-display text-[clamp(4.2rem,12vw,11.5rem)] uppercase leading-[.79] tracking-[-.085em] text-[#fff7ed]" data-testid="text-hero-title">
          Hacemos<br /><span className="text-[#ff6b00]">visible</span><br />lo que hacés.
        </h1>
        <div className="reveal reveal-delay-2 mt-10 flex max-w-[490px] items-end justify-between gap-5 md:ml-[38%] md:mt-12">
          <p className="text-balance text-base leading-relaxed text-[#fff7ed]/65 md:text-lg">Gráfica, impresión y comunicación visual para ideas que merecen ocupar espacio.</p>
          <a href="#contacto" className="group grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#ff3d00] text-[#fff7ed] transition-transform hover:scale-110" aria-label="Ir a pedir presupuesto" data-testid="link-hero-contacto"><ArrowDownRight className="transition-transform group-hover:rotate-45" size={25} /></a>
        </div>
        <div className="sticker-drift absolute right-[7%] top-[64%] hidden rotate-[-8deg] bg-[#ffd9b3] px-5 py-3 text-center text-[#1a1a1a] shadow-[6px_6px_0_#ff3d00] md:block">
          <span className="font-display text-2xl uppercase leading-[.9]">Tu idea<br />sale a la calle.</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden border-t border-[#fff7ed]/15 py-3 text-[#fff7ed]/40">
        <div className="marquee-track flex min-w-max gap-14 font-mono-custom text-[10px] uppercase tracking-[.25em]"><span>Imprimimos con criterio</span><span>Diseñamos para durar</span><span>Producimos en Buenos Aires</span><span>Imprimimos con criterio</span><span>Diseñamos para durar</span><span>Producimos en Buenos Aires</span></div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="bg-[#fff7ed] px-5 py-20 text-[#1a1a1a] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionLabel index="01" light>Lo que hacemos</SectionLabel>
        <div className="mb-14 grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] uppercase leading-[.82] tracking-[-.08em]">Ideas con<br /><span className="text-[#ff6b00]">cuerpo.</span></h2>
          <p className="max-w-md text-base leading-relaxed text-[#1a1a1a]/65 md:pb-2 md:text-lg">No hacemos piezas aisladas. Construimos sistemas que se reconocen, se tocan y se recuerdan.</p>
        </div>
        <div className="grid border-l border-t border-[#1a1a1a]/20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.number} className="group reveal-on-scroll min-h-[258px] border-b border-r border-[#1a1a1a]/20 p-5 transition-colors hover:bg-[#ffd9b3] md:p-7" data-testid={`card-service-${service.number}`}>
              <div className="flex items-start justify-between"><span className="font-mono-custom text-[11px] text-[#ff6b00]">{service.number}</span><Plus size={17} className="transition-transform group-hover:rotate-90" /></div>
              <div className={`mt-7 mb-5 h-14 w-20 ${service.visual} visual-${service.accent}`} aria-hidden="true"><span>{service.visual === 'type' ? 'A3' : service.visual === 'box' ? 'pack' : ''}</span></div>
              <h3 className="font-display text-2xl uppercase tracking-[-.04em]">{service.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#1a1a1a]/60">{service.copy}</p>
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
    <section id="trabajos" className="bg-[#1a1a1a] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionLabel index="02">Selección de trabajos</SectionLabel>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-[clamp(3.6rem,8vw,8rem)] uppercase leading-[.82] tracking-[-.08em] text-[#fff7ed]">Lo que<br /><span className="text-[#ff6b00]">dejamos.</span></h2>
          <div className="flex max-w-xl flex-wrap gap-2" role="group" aria-label="Filtrar trabajos">
            {categories.map((category) => <button type="button" key={category} onClick={() => setFilter(category)} className={`border px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.09em] transition-colors ${filter === category ? 'border-[#ff6b00] bg-[#ff6b00] text-[#1a1a1a]' : 'border-[#fff7ed]/25 text-[#fff7ed]/65 hover:border-[#ff6b00] hover:text-[#ff6b00]'}`} data-testid={`button-filter-${category.toLowerCase()}`}>{category}</button>)}
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((work, index) => (
            <article key={work.title} className={`group reveal-on-scroll relative min-h-[280px] overflow-hidden p-6 ${work.tone} ${index === 1 ? 'md:translate-y-10' : ''}`} data-testid={`card-work-${work.mark}`}>
              <div className="absolute right-5 top-5 font-mono-custom text-[10px] uppercase tracking-[.14em] opacity-70">{work.category}</div>
              <div className="work-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[8rem] uppercase leading-none transition-transform duration-500 group-hover:scale-110">{work.mark}</div>
              <div className="relative z-10 mt-auto flex h-full flex-col justify-end"><p className="font-mono-custom text-[10px] uppercase tracking-[.12em] opacity-70">{work.client}</p><h3 className="mt-2 max-w-[240px] font-display text-3xl uppercase leading-[.86] tracking-[-.055em]">{work.title}</h3></div>
              <ArrowUpRight className="absolute bottom-5 right-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={21} />
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="border border-[#fff7ed]/15 py-16 text-center text-[#fff7ed]/50">Todavía no hay trabajos en esta categoría.</div>}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="productos" className="bg-[#ff6b00] px-5 py-20 text-[#1a1a1a] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionLabel index="03" light>Para resolverlo hoy</SectionLabel>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] uppercase leading-[.82] tracking-[-.08em]">Atajos<br />con onda.</h2><p className="max-w-sm text-base leading-relaxed text-[#1a1a1a]/65">Combinaciones pensadas para los pedidos que recibimos todas las semanas.</p></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.name} className={`reveal-on-scroll relative flex min-h-[430px] flex-col justify-between border border-[#1a1a1a]/30 p-6 ${index === 1 ? 'bg-[#fff7ed]' : 'bg-[#ffd9b3]'}`} data-testid={`card-product-${index}`}>
              <div className="flex items-start justify-between"><span className="border border-[#1a1a1a]/35 px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.13em]">{product.tag}</span><span className="font-mono-custom text-[10px]">0{index + 1}</span></div>
              <div className={`mx-auto my-8 h-36 w-44 ${product.shape}`} aria-hidden="true"><span>{index === 0 ? 'LG' : index === 1 ? 'ABRÍ' : '48H'}</span></div>
              <div><h3 className="font-display text-3xl uppercase leading-none tracking-[-.05em]">{product.name}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-[#1a1a1a]/65">{product.description}</p><div className="mt-6 flex items-center justify-between border-t border-[#1a1a1a]/20 pt-4"><span className="font-mono-custom text-[11px] uppercase">{product.price}</span><a href="#contacto" className="group flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.1em]" data-testid={`link-product-${index}`}>Consultar <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="bg-[#fff7ed] px-5 py-20 text-[#1a1a1a] md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-24">
        <div><SectionLabel index="04" light>El taller</SectionLabel><div className="about-poster reveal-on-scroll grid aspect-[4/5] max-w-sm place-items-center bg-[#1a1a1a] p-8 text-[#fff7ed]"><div className="border border-[#ff6b00] p-5 text-center"><div className="font-mono-custom text-[10px] uppercase tracking-[.25em] text-[#ff6b00]">Desde 2012</div><div className="mt-5 font-display text-7xl uppercase leading-[.75] tracking-[-.09em]">Hecho<br /><span className="text-[#ff6b00]">acá.</span></div><div className="mt-8 h-10 border-y border-[#fff7ed]/30 py-2 font-mono-custom text-[9px] uppercase tracking-[.2em]">Diseño · Tinta · Calle</div></div></div></div>
        <div className="md:pt-16"><h2 className="font-display text-[clamp(3.6rem,7vw,7rem)] uppercase leading-[.82] tracking-[-.08em]">Somos de<br /><span className="text-[#ff6b00]">hacer.</span></h2><div className="mt-10 grid gap-8 text-base leading-relaxed text-[#1a1a1a]/70 md:grid-cols-2"><p>La Gráfica nació entre pruebas de color, entregas a contrarreloj y la obsesión por encontrar el soporte exacto. Somos un estudio chico con una red grande de oficios.</p><p>Trabajamos cerca. Preguntamos, proponemos y producimos. Porque una buena idea no termina en la pantalla: empieza cuando alguien la ve, la toca y la lleva consigo.</p></div><div className="mt-12 grid grid-cols-3 border-y border-[#1a1a1a]/20 py-5"><div><div className="font-display text-4xl tracking-[-.08em]">12</div><div className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#1a1a1a]/55">años de oficio</div></div><div><div className="font-display text-4xl tracking-[-.08em]">870</div><div className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#1a1a1a]/55">ideas impresas</div></div><div><div className="font-display text-4xl tracking-[-.08em]">01</div><div className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#1a1a1a]/55">taller propio</div></div></div></div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [need, setNeed] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <section id="contacto" className="bg-[#ffd9b3] px-5 py-20 text-[#1a1a1a] md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-14 md:grid-cols-[.85fr_1.15fr] md:gap-24">
        <div><SectionLabel index="05" light>Presupuesto</SectionLabel><h2 className="font-display text-[clamp(3.5rem,7.5vw,7.7rem)] uppercase leading-[.8] tracking-[-.08em]">Contanos<br /><span className="text-[#ff3d00]">qué pinta.</span></h2><p className="mt-8 max-w-sm text-base leading-relaxed text-[#1a1a1a]/65">Cuanto más nos cuentes, mejor podemos ayudarte. Te respondemos con ideas y números claros.</p><div className="mt-12 border-l-2 border-[#ff6b00] pl-4 font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.1em] text-[#1a1a1a]/60">Sin compromiso<br />Respuesta en 24—48 hs</div></div>
        <div className="border border-[#1a1a1a]/25 bg-[#fff7ed] p-5 md:p-9">
          {submitted ? (
            <div className="flex min-h-[490px] flex-col items-start justify-center"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#ff6b00]"><Check size={28} /></div><h3 className="mt-7 font-display text-4xl uppercase leading-none tracking-[-.06em]">Listo, llegó<br />al taller.</h3><p className="mt-5 max-w-sm text-sm leading-relaxed text-[#1a1a1a]/65">Recibimos tu consulta de manera local. En breve te escribimos para darle forma.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 border-b border-[#1a1a1a] pb-1 font-mono-custom text-[10px] uppercase tracking-[.12em]" data-testid="button-new-quote">Enviar otra consulta</button></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-quote">
              <div><label htmlFor="need" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">¿Qué necesitás?</label><select id="need" required value={need} onChange={(event) => setNeed(event.target.value)} className="w-full appearance-none border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none focus:border-[#ff6b00]" data-testid="select-need"><option value="">Elegí una opción</option><option>Impresión</option><option>Cartelería</option><option>Vinilos & Ploteos</option><option>Stickers</option><option>Diseño Gráfico</option><option>Packaging</option></select></div>
              <div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="quantity" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">Cantidad</label><input id="quantity" type="text" placeholder="Ej. 100 unidades" className="w-full border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#1a1a1a]/35 focus:border-[#ff6b00]" data-testid="input-quantity" /></div><div><label htmlFor="size" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">Medidas</label><input id="size" type="text" placeholder="Ej. 10 × 15 cm" className="w-full border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#1a1a1a]/35 focus:border-[#ff6b00]" data-testid="input-size" /></div></div>
              <div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="material" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">Material</label><input id="material" type="text" placeholder="Papel, vinilo, lona..." className="w-full border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#1a1a1a]/35 focus:border-[#ff6b00]" data-testid="input-material" /></div><div><label htmlFor="print" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">Tipo de impresión</label><select id="print" defaultValue="" className="w-full appearance-none border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none focus:border-[#ff6b00]" data-testid="select-print"><option value="">A definir</option><option>Digital</option><option>Gran formato</option><option>Serigrafía</option><option>No lo sé todavía</option></select></div></div>
              <div><label htmlFor="details" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.14em]">Detalles adicionales</label><textarea id="details" rows={3} placeholder="Contanos un poco más sobre tu idea..." className="w-full resize-none border-b border-[#1a1a1a]/30 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#1a1a1a]/35 focus:border-[#ff6b00]" data-testid="textarea-details" /></div>
              <button type="submit" className="group mt-2 flex w-full items-center justify-between bg-[#ff3d00] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#fff7ed] transition-colors hover:bg-[#1a1a1a]" data-testid="button-submit-quote"><span>Enviar consulta</span><ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-5 pb-7 pt-16 text-[#fff7ed] md:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 border-b border-[#fff7ed]/15 pb-14 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><Logo /><h2 className="mt-12 max-w-xl font-display text-[clamp(3rem,6vw,6rem)] uppercase leading-[.8] tracking-[-.08em]">Que se<br /><span className="text-[#ff6b00]">note.</span></h2></div><div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#fff7ed]/45">Encontranos</p><a href="mailto:hola@lagrafica.com.ar" className="block text-base text-[#fff7ed]/80 hover:text-[#ff6b00]" data-testid="link-email">hola@lagrafica.com.ar</a><a href="tel:+541147892011" className="mt-2 block text-base text-[#fff7ed]/80 hover:text-[#ff6b00]" data-testid="link-phone">+54 11 4789 2011</a><p className="mt-7 max-w-[170px] text-sm leading-relaxed text-[#fff7ed]/55">Av. Dorrego 1744<br />CABA, Buenos Aires</p></div><div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#fff7ed]/45">Seguí la tinta</p><a href="#trabajos" className="block text-base text-[#fff7ed]/80 hover:text-[#ff6b00]" data-testid="link-instagram">Instagram</a><a href="#contacto" className="mt-2 block text-base text-[#fff7ed]/80 hover:text-[#ff6b00]" data-testid="link-contacto-footer">Presupuestos</a><p className="mt-7 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#fff7ed]/45">Lun—Vie · 9 a 18 hs</p></div></div>
        <div className="flex flex-col justify-between gap-3 pt-6 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#fff7ed]/35 sm:flex-row"><span>© La Gráfica 2024</span><span>Diseño, impresión y calle</span><a href="#inicio" className="text-[#ff6b00]" data-testid="link-back-top">Volver arriba ↑</a></div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <div className="grain min-h-[100dvh] bg-[#1a1a1a]"><Header /><main><Hero /><Services /><Works /><Products /><About /><QuoteForm /></main><Footer /></div>;
}

function Router() {
  return <Home />;
}

function App() {
  return <Router />;
}

export default App;