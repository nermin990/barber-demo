/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Scissors, 
  Instagram, 
  Menu,
  X,
  Award,
  Users,
  ShieldCheck,
  CalendarDays,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';

// Reveal Component for scroll animations
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// Booking Modal Component
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Booking Data:', data);
    toast.success('Termin uspešno zatražen! Javićemo Vam se ubrzo.', {
      description: 'Hvala Vam na poverenju.',
      className: 'bg-black border-gold text-white',
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-ink border border-white/10 rounded-sm overflow-hidden premium-shadow"
          >
            <div className="p-8 md:p-12">
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              
              <div className="text-center mb-10">
                <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Rezervacija</span>
                <h2 className="text-3xl md:text-4xl font-serif">Zakažite Svoj Ritual</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ime i Prezime</label>
                    <input 
                      {...register('name', { required: true })}
                      placeholder="Petar Petrović"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:border-gold outline-none transition-all placeholder:text-gray-700"
                    />
                    {errors.name && <span className="text-red-500 text-[10px] uppercase tracking-widest">Obavezno polje</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Telefon</label>
                    <input 
                      {...register('phone', { required: true })}
                      placeholder="+381 60 123 4567"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:border-gold outline-none transition-all placeholder:text-gray-700"
                    />
                    {errors.phone && <span className="text-red-500 text-[10px] uppercase tracking-widest">Obavezno polje</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Usluga</label>
                  <select 
                    {...register('service', { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:border-gold outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-ink">Izaberite uslugu</option>
                    <option value="sisanje" className="bg-ink">Muško šišanje</option>
                    <option value="fade" className="bg-ink">Fade šišanje</option>
                    <option value="brada" className="bg-ink">Sređivanje brade</option>
                    <option value="paket" className="bg-ink">Paket: Šišanje + Brada</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Željeni Datum i Vreme</label>
                  <input 
                    type="datetime-local"
                    {...register('datetime', { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-gold text-black py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? 'Slanje...' : 'Potvrdi Rezervaciju'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SERVICES = [
  {
    title: "Muško šišanje",
    price: "1.500 RSD",
    description: "Klasično ili moderno šišanje uz pranje kose i stilizovanje.",
    icon: <Scissors className="w-6 h-6" />
  },
  {
    title: "Fade šišanje",
    price: "1.800 RSD",
    description: "Precizni prelazi (Skin Fade, Taper) za oštar i moderan izgled.",
    icon: <Award className="w-6 h-6" />
  },
  {
    title: "Sređivanje brade",
    price: "1.000 RSD",
    description: "Oblikovanje brade trimerom i makazama uz konture britvom.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Brijanje (Hot Towel)",
    price: "1.200 RSD",
    description: "Tradicionalno brijanje britvom uz topli peškir i premium ulja.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Paket: Šišanje + Brada",
    price: "2.300 RSD",
    description: "Kompletno osveženje izgleda uz maksimalnu preciznost.",
    icon: <Star className="w-6 h-6" />
  }
];

const REVIEWS = [
  {
    name: "Marko S.",
    text: "Najbolji fade u gradu. Atmosfera je vrhunska, ekipa zna šta radi. Dorćol u svom najboljem izdanju.",
    stars: 5
  },
  {
    name: "Nikola V.",
    text: "Preciznost na prvom mestu. Sređivanje brade je pravi ritual. Svaka preporuka za The Barber Studio.",
    stars: 5
  },
  {
    name: "Stefan D.",
    text: "Moderan studio, vrhunski proizvodi i sjajna kafa. Osećate se kao gospodin od trenutka kada uđete.",
    stars: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "The Barber Studio Dorćol | Premium Berbersko Iskustvo u Beogradu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Vrhunsko muško šišanje i sređivanje brade u srcu Dorćola. Doživite ritual preciznosti i autentičnog stila. Zakažite svoj termin online.');
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] cursor-pointer uppercase" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            THE <span className="text-[#D4AF37]">BARBER</span> STUDIO
          </div>
          
          {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.25em]">
              <button onClick={() => scrollToSection('o-nama')} className="hover:text-gold transition-colors">O nama</button>
              <button onClick={() => scrollToSection('usluge')} className="hover:text-gold transition-colors">Usluge</button>
              <button onClick={() => scrollToSection('cenovnik')} className="hover:text-gold transition-colors">Cenovnik</button>
              <button onClick={() => setIsBookingOpen(true)} className="bg-gold text-black px-8 py-3 rounded-sm hover:bg-white transition-all duration-300">Zakaži</button>
            </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black pt-32 px-10 md:hidden"
          >
            <div className="flex flex-col space-y-10 text-3xl font-serif text-center uppercase tracking-widest">
              <button onClick={() => scrollToSection('o-nama')}>O nama</button>
              <button onClick={() => scrollToSection('usluge')}>Usluge</button>
              <button onClick={() => scrollToSection('cenovnik')}>Cenovnik</button>
              <button onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }} className="text-gold">Zakaži Termin</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1920" 
            alt="Barber Shop Interior" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-6 py-2 mb-8 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase rounded-sm bg-[#D4AF37]/5">
              Premium Berbersko Iskustvo • Dorćol
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-light leading-[1.1] mb-10 tracking-tight">
              Definišite svoj stil. <br />
              <span className="italic font-normal text-[#D4AF37]">Bez kompromisa.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Više od šišanja – ritual preciznosti i muške nege u srcu Beograda. 
              Mesto gde se tradicija susreće sa modernim stilom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto bg-gold text-black px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-2xl shadow-gold/10"
              >
                Zakaži Termin
              </button>
              <a 
                href="https://wa.me/38160000000" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-gold" />
                WhatsApp Upit
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="o-nama" className="py-32 px-6 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">Naša Priča</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Ritual preciznosti <br />i autentičnog stila.</h2>
              <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
                <p>
                  The Barber Studio nije samo mesto za šišanje. To je utočište za modernog muškarca koji ceni kvalitet, 
                  preciznost i vreme posvećeno sebi. Smešteni u srcu Dorćola, donosimo spoj stare škole berberaja i 
                  savremenih tehnika.
                </p>
                <p>
                  Naš tim čine iskusni majstori svog zanata koji svakom klijentu pristupaju sa maksimalnom pažnjom, 
                  koristeći isključivo premium proizvode za negu kose i brade.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10 mt-12">
                <div>
                  <div className="text-4xl font-serif text-gold mb-2">10+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Godina Iskustva</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-gold mb-2">5000+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Zadovoljnih Klijenata</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative aspect-square">
                <div className="absolute -inset-4 border border-gold/20 rounded-sm" />
                <img 
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
                  alt="Barber working" 
                  className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>
      </section>

      {/* Services Section */}
      <section id="usluge" className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Naše Usluge</span>
            <h2 className="text-4xl md:text-5xl font-serif">Vrhunska Usluga</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="p-10 border border-white/5 rounded-sm hover:border-gold/30 transition-all duration-500 bg-black/40 group h-full">
                  <div className="w-14 h-14 border border-gold/20 text-gold rounded-sm flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif mb-3 uppercase tracking-wider">{service.title}</h3>
                  <p className="text-gold font-mono text-sm mb-6">{service.price}</p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { title: "Premium Usluga", desc: "Beskompromisni kvalitet u svakom potezu makaza.", icon: <Award className="w-8 h-8 text-[#D4AF37]" /> },
              { title: "Iskusni Berberi", desc: "Majstori zanata sa višegodišnjim iskustvom.", icon: <Users className="w-8 h-8 text-[#D4AF37]" /> },
              { title: "Vrhunski Proizvodi", desc: "Koristimo samo najbolje svetske brendove za negu.", icon: <Sparkles className="w-8 h-8 text-[#D4AF37]" /> },
              { title: "Lako Zakazivanje", desc: "Vaš termin je samo par klikova daleko.", icon: <CalendarDays className="w-8 h-8 text-[#D4AF37]" /> }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galerija" className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Galerija</span>
              <h2 className="text-4xl md:text-5xl font-serif">Naši Radovi</h2>
            </div>
            <a href="#" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] hover:text-white transition-colors">
              Instagram Portfolio <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[4/5] rounded-sm overflow-hidden group relative"
              >
                <img 
                  src={`https://picsum.photos/seed/barber${i}/800/1000?grayscale`} 
                  alt="Barber Work" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                    <Instagram className="text-white w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="cenovnik" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Cenovnik</span>
            <h2 className="text-4xl md:text-5xl font-serif">Investicija u Vaš Stil</h2>
          </div>

          <div className="space-y-8">
            {[
              { name: "Muško šišanje", price: "1.500 RSD", time: "45 min" },
              { name: "Fade šišanje", price: "1.800 RSD", time: "60 min" },
              { name: "Sređivanje brade", price: "1.000 RSD", time: "30 min" },
              { name: "Brijanje britvom", price: "1.200 RSD", time: "45 min" },
              { name: "Paket: Šišanje + Brada", price: "2.300 RSD", time: "75 min" },
              { name: "Junior šišanje (do 12 god)", price: "1.000 RSD", time: "30 min" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-6 group">
                <div>
                  <h4 className="text-lg uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors mb-1">{item.name}</h4>
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest">{item.time}</span>
                </div>
                <div className="flex-1 border-b border-dotted border-white/10 mx-6 mb-2" />
                <span className="font-mono text-[#D4AF37] text-lg">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="relative">
                <div className="flex mb-6">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xl font-serif italic mb-8 leading-relaxed text-gray-300">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#D4AF37]" />
                  <p className="font-bold text-[10px] uppercase tracking-[0.3em]">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512690196252-741d2fd36ad0?auto=format&fit=crop&q=80&w=1920" 
            alt="Barber tools" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Vreme je za Vaš ritual. <br />Zakažite termin danas.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('kontakt')}
              className="w-full sm:w-auto bg-[#D4AF37] text-black px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
            >
              Rezerviši Odmah
            </button>
            <a 
              href="tel:+381601234567" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4" /> Pozovi Studio
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8">Lokacija</h4>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <p className="text-gray-400 font-light leading-relaxed">
                Cara Dušana 42, Dorćol<br />
                11000 Beograd, Srbija
              </p>
            </div>
            <div className="mt-8 aspect-video bg-white/5 rounded-sm overflow-hidden border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.866584284451!2d20.45712431552033!3d44.82136497909874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab390317921%3A0x889d316474641e4!2sCara%20Du%C5%A1ana%2042%2C%20Beograd!5e0!3m2!1ssr!2srs!4v1648041234567!5m2!1ssr!2srs" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8">Radno Vreme</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-gray-500">Ponedeljak - Petak</span>
                <span>10:00 - 20:00</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-gray-500">Subota</span>
                <span>09:00 - 17:00</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-gray-500">Nedelja</span>
                <span className="text-[#D4AF37]">Neradna</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8">Kontakt</h4>
            <div className="space-y-6">
              <a href="tel:+381601234567" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                  <Phone className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37]" />
                </div>
                <span className="text-lg">+381 60 123 4567</span>
              </a>
              <a href="https://wa.me/381601234567" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                  <MessageCircle className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37]" />
                </div>
                <span className="text-lg">WhatsApp Čet</span>
              </a>
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                  <Instagram className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37]" />
                </div>
                <span className="text-lg">@thebarberstudio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black text-center border-t border-white/5">
        <div className="text-xl font-serif font-bold tracking-[0.3em] mb-8 uppercase">
          THE <span className="text-[#D4AF37]">BARBER</span> STUDIO
        </div>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] mb-4">
          © {new Date().getFullYear()} The Barber Studio Belgrade. Sva prava zadržana.
        </p>
        <div className="flex justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-gray-700">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
        </div>
      </footer>

      {/* Sticky Mobile CTAs */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex gap-3 md:hidden">
        <a 
          href="tel:+381601234567" 
          className="flex-1 bg-white text-black py-4 rounded-sm flex items-center justify-center gap-2 shadow-2xl font-bold text-[10px] uppercase tracking-widest"
        >
          <Phone className="w-4 h-4" /> Pozovi
        </a>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 bg-gold text-black py-4 rounded-sm flex items-center justify-center gap-2 shadow-2xl font-bold text-[10px] uppercase tracking-widest"
        >
          <CalendarDays className="w-4 h-4" /> Zakaži
        </button>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Toaster position="top-center" />
    </div>
  );
}
