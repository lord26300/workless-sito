import { motion } from 'framer-motion'
import { SplineScene } from './ui/splite'
import { CpuArchitecture } from './ui/cpu-architecture'
import { AnimatedTitle } from './ui/animated-title'

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: '#050507' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Colonna sinistra */}
        <motion.div
          className="flex flex-col gap-6 z-10"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-300 font-medium tracking-wide">
              Automazioni per studi professionali
            </span>
          </div>

          {/* Titolo */}
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none">
            <AnimatedTitle text="Workless" />
          </h1>

          {/* Sottotitolo */}
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
            Automazioni che fanno il lavoro ripetitivo al posto tuo.{' '}
            <span className="text-slate-300">Il sistema lavora, tu pensi al resto.</span>
          </p>

          {/* Bottoni */}
          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => scrollTo('features')}
              className="px-6 py-3 rounded-lg font-medium text-sm text-[#1a0a2e] cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
              style={{ backgroundColor: '#a78bfa' }}
            >
              Scopri come funziona
            </button>
            <button
              onClick={() => scrollTo('demo')}
              className="px-6 py-3 rounded-lg font-medium text-sm text-white border border-white/20 bg-white/5 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              Guarda la demo
            </button>
          </div>
        </motion.div>

        {/* Colonna destra — scena 3D + circuiti */}
        <motion.div
          className="relative h-[500px] lg:h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Circuiti animati — sfondo decorativo */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.4 }}>
            <CpuArchitecture
              text="WORKFLOW"
              width="100%"
              height="100%"
              className="text-violet-400/60"
            />
          </div>

          {/* Alone viola dietro il robot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Scena Spline */}
          <div className="relative w-full h-full">
            <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
