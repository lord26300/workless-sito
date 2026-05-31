import { motion } from 'framer-motion'
import { Clock, MousePointerClick, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Card {
  icon: LucideIcon
  title: string
  description: string
}

const cards: Card[] = [
  {
    icon: Clock,
    title: 'Risparmi ore ogni settimana',
    description:
      'Le attività ripetitive che fai a mano vengono svolte in automatico. Recuperi tempo da dedicare ai clienti e al lavoro che conta davvero.',
  },
  {
    icon: MousePointerClick,
    title: 'Tutto con un clic',
    description:
      'Niente software complicati da imparare. Il sistema parte da solo e lavora in background, senza che tu debba controllarlo ogni giorno.',
  },
  {
    icon: Settings,
    title: 'Su misura per te',
    description:
      "Analizziamo come lavori e costruiamo l'automazione adatta al tuo studio. Ogni processo ripetitivo può diventare automatico.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Features() {
  return (
    <section id="features" className="py-20" style={{ backgroundColor: '#050507' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Intestazione sezione */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Meno lavoro ripetitivo. Più tempo per ciò che conta.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Automatizziamo le attività che ti rubano ore ogni settimana. Tu fai un clic, il sistema fa il resto.
          </p>
        </motion.div>

        {/* Griglia card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }: Card) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="flex flex-col gap-5 rounded-2xl p-7 cursor-default"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(167, 139, 250, 0.15)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(167, 139, 250, 0.45)'
        el.style.boxShadow = '0 0 28px rgba(167, 139, 250, 0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(167, 139, 250, 0.15)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Icona */}
      <div
        className="w-11 h-11 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: 'rgba(167, 139, 250, 0.12)' }}
      >
        <Icon size={20} style={{ color: '#a78bfa' }} strokeWidth={1.75} />
      </div>

      {/* Testo */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold text-base leading-snug">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
