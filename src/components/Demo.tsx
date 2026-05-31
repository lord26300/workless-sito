import { motion } from 'framer-motion'
import { RadialOrbitalTimeline } from './ui/radial-orbital-timeline'
import type { OrbitalNode } from './ui/radial-orbital-timeline'

const automazioni: OrbitalNode[] = [
  {
    id: 1,
    title: 'Raccolta documenti',
    shortLabel: 'Commercialisti',
    description:
      "Il sistema chiede i documenti ai clienti, sollecita chi è in ritardo e si ferma quando arrivano. Zero email scritte a mano.",
    status: 'active',
    videoSrc: '/video/demo1.mp4',
  },
  {
    id: 2,
    title: 'Risposta Lampo ai Lead',
    shortLabel: 'Immobiliare',
    description:
      "Si parte dal gestionale vuoto. Arriva la mail di un cliente interessato a un immobile. Il sistema si avvia: l'intelligenza artificiale legge la richiesta, capisce nome, contatto e immobile, e compila il gestionale da solo. Nello stesso istante partono due email automatiche: una risposta immediata al cliente e un avviso all'agente con tutti i dati pronti per richiamare. Tutto in pochi secondi, senza scrivere una riga a mano.",
    status: 'active',
    videoSrc: '/video/demo2.mp4',
  },
  {
    id: 3,
    title: 'Agenda Automatica',
    shortLabel: 'Studio Medico',
    description:
      "Arriva la richiesta di un cliente con il giorno e l'ora desiderati. Il sistema legge la mail con l'intelligenza artificiale, capisce tutti i dati e controlla l'agenda. Se l'orario è libero, fissa l'appuntamento sul calendario da solo e invia al cliente una mail di conferma con la data e l'ora stabilite. Se invece arriva un altro cliente che vuole prenotarsi in un orario già occupato, il sistema se ne accorge, non crea sovrapposizioni e avvisa in automatico il cliente che quell'orario non è disponibile, invitandolo a sceglierne un altro. Tutto da solo, senza errori e senza doppie prenotazioni.",
    status: 'active',
    videoSrc: '/video/demo3.mp4',
  },
]

export default function Demo() {
  return (
    <section id="demo" className="py-20" style={{ backgroundColor: '#050507' }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Intestazione */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Le nostre automazioni
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Esempi reali di sistemi che lavorano al posto tuo.{' '}
            <span className="text-slate-300">Clicca un nodo per vedere come funziona.</span>
          </p>
          <p className="text-xs max-w-lg mx-auto mt-3" style={{ color: 'rgba(148,130,190,0.55)' }}>
            Queste sono dimostrazioni. Nei progetti reali ogni automazione viene personalizzata e ottimizzata per la specifica attività del cliente.
          </p>
        </motion.div>

        {/* Timeline orbitale */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <RadialOrbitalTimeline nodes={automazioni} />
        </motion.div>

      </div>
    </section>
  )
}
