import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const EMAIL = 'workless.automazioni@gmail.com'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  return (
    <section id="contact" style={{ backgroundColor: '#050507' }} className="py-32">
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-10">

        {/* Titolo e sottotitolo */}
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Parliamone
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
            Raccontaci cosa ti porta via più tempo. Ti mostriamo come automatizzarlo.
          </p>
        </motion.div>

        {/* Blocco contatti */}
        <motion.div
          className="w-full flex flex-col gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/8 bg-white/3 hover:border-[#a78bfa]/40 hover:bg-white/5 transition-all duration-200 group w-full"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
              style={{ backgroundColor: 'rgba(167,139,250,0.12)', color: '#a78bfa' }}
            >
              <Mail size={18} />
            </span>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Email</span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                {EMAIL}
              </span>
            </div>
          </a>

          {/* Placeholder WhatsApp / telefono */}
          {/* <a href="https://wa.me/39..." ... >
                <Phone size={18} /> WhatsApp / Telefono
              </a> */}
        </motion.div>

        {/* Bottone principale */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{ backgroundColor: '#a78bfa', color: '#1a0a2e' }}
          >
            <Mail size={16} />
            Scrivici una email
          </a>
        </motion.div>

      </div>
    </section>
  )
}
