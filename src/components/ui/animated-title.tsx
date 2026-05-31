import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Parametri — ritocca qui ────────────────────────────────────────────────────
const STAGGER_DELAY   = 0.06   // secondi tra una lettera e l'altra
const LETTER_DURATION = 0.45   // durata animazione di ogni lettera (s)
const LETTER_Y        = 22     // distanza di partenza dal basso (px)
const SHIMMER_SPEED   = 5      // durata ciclo gradiente andata+ritorno (s) — più alto = più lento
// ─────────────────────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_DELAY },
  },
}

const letter = {
  hidden: { opacity: 0, y: LETTER_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: LETTER_DURATION,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

interface AnimatedTitleProps {
  text: string
  className?: string
}

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  const letters = text.split('')

  return (
    /*
      Architettura a due livelli:
      - Outer motion.span: controlla il gradiente viola/bianco che scorre (backgroundPosition)
      - Inner motion.span: propaga lo stagger alle singole lettere senza toccarne l'aspetto
      - Letter motion.span: opacity+y animati dal variant, colore trasparente → mostra gradiente del parent
    */
    <motion.span
      className={cn('relative', className)}
      animate={{ backgroundPosition: ['0% center', '100% center'] }}
      transition={{
        duration: SHIMMER_SPEED,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      style={{
        display: 'block',
        background:
          'linear-gradient(90deg, #a78bfa 0%, #c4b5fd 25%, #ddd6fe 45%, #ffffff 50%, #ddd6fe 55%, #c4b5fd 75%, #a78bfa 100%)',
        backgroundSize: '250% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'block' }}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  )
}
