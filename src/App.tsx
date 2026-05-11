import { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause, Sparkles } from 'lucide-react';

const galleryPhotos = [
  '/photos/gallery-1.jpeg',
  '/photos/gallery-2.jpeg',
  '/photos/gallery-3.jpeg',
  '/photos/gallery-4.jpeg',
  '/photos/gallery-5.jpeg',
  '/photos/gallery-6.jpeg',
  '/photos/gallery-7.jpeg',
  '/photos/gallery-8.jpeg',
  '/photos/gallery-9.jpeg',
  '/photos/gallery-10.jpeg',
  '/photos/gallery-11.jpeg',
  '/photos/gallery-12.jpeg',
  '/photos/gallery-13.jpeg',
];

const slideshowPhotos = [
  '/photos/slideshow-1.jpeg',
  '/photos/slideshow-2.jpeg',
  '/photos/slideshow-3.jpeg',
  '/photos/slideshow-4.jpeg',
];

const timelineItems = [
  {
    title: 'Where the Journey Began',
    description: 'The moment two souls decided to walk through life together hand in hand.',
    photo: '/photos/timeline-1.jpeg',
  },
  {
    title: 'Building a Beautiful Family',
    description: 'Creating a home filled with laughter, warmth, and the first steps of children.',
    photo: '/photos/timeline-2.jpeg',
  },
  {
    title: 'Adventures Together',
    description: 'Countless adventures, shared smiles, and overcoming challenges together.',
    photo: '/photos/timeline-3.jpeg',
  },
  {
    title: 'Forever Together',
    description: 'A love that keeps growing stronger. Still in love, still together.',
    photo: '/photos/timeline-4.jpeg',
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <img
          src="/photos/hero.jpeg"
          alt="Anniversary hero"
          className="w-full h-full object-cover"
          style={{ height: '120%', marginTop: '-10%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
      </div>

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-rose-300/60" />
          <Sparkles size={18} className="text-rose-300" />
          <div className="h-px w-16 bg-rose-300/60" />
        </div>

        <p
          className="text-rose-300 text-lg tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          Happy Anniversary
        </p>

        <h1
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
        >
          Celebrating Their<br />
          <span className="text-rose-300">21st Anniversary</span><br />
          Together
        </h1>

        <p
          className="text-white/80 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          A celebration of love, togetherness, and the beautiful life you built.
        </p>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/60 hover:text-rose-300 transition-colors cursor-pointer"
            style={{ background: 'none', border: 'none' }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm tracking-widest uppercase" style={{ fontWeight: 300 }}>Scroll to explore</span>
              <div className="w-px h-10 bg-white/30 animate-pulse" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineItems)[number];
  index: number;
}) {
  const { ref, visible } = useIntersection();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex-1 relative overflow-hidden rounded-2xl aspect-[4/3] max-w-md w-full">
        <img
          src={item.photo}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="flex-1 max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
            <span className="text-rose-300 text-sm font-semibold">{index + 1}</span>
          </div>
          <div className="h-px flex-1 bg-rose-400/20" />
        </div>
        <h3
          className="text-3xl text-white mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
        >
          {item.title}
        </h3>
        <p className="text-white/70 text-lg leading-relaxed" style={{ fontWeight: 300 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-rose-400 tracking-[0.3em] uppercase text-sm mb-3" style={{ fontWeight: 300 }}>
            Cherished Moments
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
          >
            The chapters of a beautiful life
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-rose-400/40" />
            <Heart size={14} className="text-rose-400" fill="currentColor" />
            <div className="h-px w-20 bg-rose-400/40" />
          </div>
        </div>

        <div className="space-y-24">
          {timelineItems.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideshowSection() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slideshowPhotos.length);
    }, 3500);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section className="py-16 px-6 bg-black/30">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl aspect-video shadow-2xl">
          {slideshowPhotos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Slideshow ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <button
            onClick={() => setPlaying((p) => !p)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)' }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slideshowPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? '#f43f5e' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, visible } = useIntersection(0.05);

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-400 tracking-[0.3em] uppercase text-sm mb-3" style={{ fontWeight: 300 }}>
            Photo Gallery
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
          >
            A mosaic of our happiest days together
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-rose-400/40" />
            <Heart size={14} className="text-rose-400" fill="currentColor" />
            <div className="h-px w-20 bg-rose-400/40" />
          </div>
        </div>

        <div
          ref={ref}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          {galleryPhotos.map((src, i) => (
            <div
              key={src}
              className="break-inside-avoid overflow-hidden rounded-xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.95)',
                transition: `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`,
              }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MessageSection() {
  const { ref, visible } = useIntersection();

  return (
    <section id="message" className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent to-rose-950/20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-center mb-12">
          <p className="text-rose-400 tracking-[0.3em] uppercase text-sm mb-3" style={{ fontWeight: 300 }}>
            With all our love
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
          >
            A legacy of love
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-rose-400/40" />
            <Heart size={14} className="text-rose-400" fill="currentColor" />
            <div className="h-px w-20 bg-rose-400/40" />
          </div>
        </div>

        <div
          ref={ref}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-14 text-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <p
            className="text-rose-300 text-2xl mb-6"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            Dear Mom and Dad,
          </p>

          <div className="space-y-5 text-white/80 leading-relaxed text-lg" style={{ fontWeight: 300 }}>
            <p>
              Your love is the foundation of my family. Thank you for every sacrifice, every smile, and every beautiful memory you've created for me.
            </p>
            <p>
              The way you look at each other, the way you support one another, and the way you have built this incredible life together is the greatest lesson of love I could ever hope to learn.
            </p>
            <p>
              As you celebrate your togetherness, I want you to know how deeply you are loved and appreciated. You are not just my parents; you are my heroes and my greatest inspiration.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-white/70 text-xl mb-2" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Wishing You Endless{' '}
              <Heart className="inline text-rose-400" size={18} fill="currentColor" />
            </p>
            <p className="text-white/50" style={{ fontWeight: 300 }}>
              May your love continue to shine brighter with every shared moment.{' '}
              <span className="text-rose-300">Forever and always.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 text-center border-t border-white/5">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Heart size={16} className="text-rose-400" fill="currentColor" />
        <span
          className="text-white/40 text-sm tracking-widest uppercase"
          style={{ fontWeight: 300 }}
        >
          Anniversary Tribute
        </span>
        <Heart size={16} className="text-rose-400" fill="currentColor" />
      </div>
      <p className="text-white/25 text-xs tracking-[0.2em] uppercase" style={{ fontWeight: 300 }}>
        Always &amp; Forever
      </p>
      <p className="mt-4 text-white/20 text-xs tracking-widest uppercase" style={{ fontWeight: 300 }}>
        Made with{' '}
        <Heart size={10} className="inline text-rose-400" fill="currentColor" />{' '}
        by Siddhi
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: '#0d0a0e', minHeight: '100vh' }}>
      <HeroSection />
      <TimelineSection />
      <SlideshowSection />
      <GallerySection />
      <MessageSection />
      <Footer />
    </div>
  );
}
