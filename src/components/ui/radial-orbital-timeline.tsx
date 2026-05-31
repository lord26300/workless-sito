import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Parametri facilmente regolabili ──────────────────────────────────────────
const REVOLUTION_SECONDS     = 35    // secondi per un giro completo
const ORBIT_INFLUENCE_RADIUS = 150   // px — zona di rallentamento attorno all'orbita
const MIN_SPEED_FACTOR       = 0.05  // velocità minima (5% = quasi fermo)
const LERP_ALPHA             = 0.06  // smoothing per frame (~0.1 s di risposta a 60 fps)
// ─────────────────────────────────────────────────────────────────────────────

export interface OrbitalNode {
  id: number
  title: string
  shortLabel: string
  description: string
  status: 'active' | 'pending'
  videoSrc?: string
}

interface RadialOrbitalTimelineProps {
  nodes: OrbitalNode[]
  className?: string
}

const CX = 210
const CY = 215
const ORBIT_R = 155

// Angoli di partenza: top (-90°), bottom-right (30°), bottom-left (150°)
const BASE_ANGLES = [-90, 30, 150]

const DEG_PER_MS = 360 / (REVOLUTION_SECONDS * 1000)

/** Posizione di un nodo sull'orbita dato l'angolo base + offset di rotazione corrente */
const toPos = (baseDeg: number, orbitDeg: number) => {
  const rad = ((baseDeg + orbitDeg) * Math.PI) / 180
  return { x: CX + Math.cos(rad) * ORBIT_R, y: CY + Math.sin(rad) * ORBIT_R }
}

export function RadialOrbitalTimeline({ nodes, className }: RadialOrbitalTimelineProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [orbitAngle, setOrbitAngle] = useState(0)

  // Refs — leggibili dalla callback RAF senza chiusure stantie
  const orbitAngleRef  = useRef(0)
  const lastTimeRef    = useRef<number | null>(null)
  const rafRef         = useRef<number | null>(null)
  const selectedIdRef  = useRef<number | null>(null)
  const mousePosRef    = useRef<{ x: number; y: number } | null>(null)
  const speedFactorRef = useRef(1)
  const cardRef        = useRef<HTMLDivElement>(null)

  // Tiene selectedIdRef sincronizzato con lo stato React
  useEffect(() => { selectedIdRef.current = selectedId }, [selectedId])

  // Scroll alla card quando un nodo viene selezionato
  useEffect(() => {
    if (selectedId === null) return
    const timer = setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(timer)
  }, [selectedId])

  // Loop di animazione — avviato una volta, mai riavviato
  useEffect(() => {
    const tick = (now: number) => {
      // Calcola il fattore di velocità target in base a distanza mouse / selezione
      let targetFactor = 1
      if (selectedIdRef.current !== null) {
        targetFactor = MIN_SPEED_FACTOR
      } else if (mousePosRef.current !== null) {
        const { x, y } = mousePosRef.current
        const dist = Math.sqrt((x - CX) ** 2 + (y - CY) ** 2)
        const distFromOrbit = Math.abs(dist - ORBIT_R)
        const t = Math.min(1, distFromOrbit / ORBIT_INFLUENCE_RADIUS)
        targetFactor = MIN_SPEED_FACTOR + (1 - MIN_SPEED_FACTOR) * t
      }

      // Lerp fluido verso il target (nessun salto)
      speedFactorRef.current += (targetFactor - speedFactorRef.current) * LERP_ALPHA

      if (lastTimeRef.current !== null) {
        const dt = now - lastTimeRef.current
        orbitAngleRef.current = (orbitAngleRef.current + DEG_PER_MS * dt * speedFactorRef.current) % 360
        setOrbitAngle(orbitAngleRef.current)
      }
      lastTimeRef.current = now

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, []) // deps vuoti: il loop parte una volta e legge i ref

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleMouseLeave = () => { mousePosRef.current = null }

  const handleSelect = (id: number) => {
    setSelectedId(prev => (prev === id ? null : id))
  }

  // Posizioni correnti calcolate dall'angolo orbitale
  const positions = BASE_ANGLES.map(base => toPos(base, orbitAngle))
  const selected  = nodes.find(n => n.id === selectedId) ?? null

  return (
    <div
      className={cn('flex flex-col items-center gap-8', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Diagramma orbitale ──────────────────────────────────── */}
      <div className="relative" style={{ width: 420, height: 460 }}>

        {/* SVG: anello interno statico + spoke/pallini dinamici */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="420"
          height="460"
          viewBox="0 0 420 460"
          fill="none"
          aria-hidden="true"
        >
          {/* Anello interno statico */}
          <circle
            cx={CX} cy={CY} r={55}
            stroke="rgba(167,139,250,0.08)"
            strokeWidth="1"
          />
          {/* Spoke dinamici — seguono i nodi */}
          {positions.map((pos, i) => (
            <line
              key={`spoke-${i}`}
              x1={CX} y1={CY} x2={pos.x} y2={pos.y}
              stroke="rgba(167,139,250,0.07)"
              strokeWidth="1"
            />
          ))}
          {/* Pallini sull'orbita alla posizione dei nodi */}
          {positions.map((pos, i) => (
            <circle
              key={`dot-${i}`}
              cx={pos.x} cy={pos.y} r="3.5"
              fill="rgba(167,139,250,0.22)"
            />
          ))}
        </svg>

        {/* Orb centrale */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: CX, top: CY, width: 72, height: 72, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-full h-full rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
          />
          <motion.div
            className="w-10 h-10 rounded-full relative"
            style={{ background: 'radial-gradient(circle at 35% 35%, #ddd6fe, #a78bfa 55%, #6366f1)' }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(167,139,250,0.35)',
                '0 0 28px rgba(167,139,250,0.65)',
                '0 0 10px rgba(167,139,250,0.35)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Nodi orbitali
            Il div esterno aggiorna left/top → il nodo si sposta lungo l'orbita.
            Il contenuto (numero + etichetta) NON riceve mai una rotazione,
            quindi resta sempre dritto e leggibile. */}
        {nodes.map((node, i) => {
          const pos        = positions[i]
          const isSelected = selectedId === node.id
          const isActive   = node.status === 'active'

          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  onClick={() => handleSelect(node.id)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #a78bfa, #6366f1)'
                      : 'rgba(167,139,250,0.08)',
                    border: `2px solid ${isSelected ? '#a78bfa' : isActive ? 'rgba(167,139,250,0.5)' : 'rgba(167,139,250,0.2)'}`,
                    boxShadow: isSelected ? '0 0 22px rgba(167,139,250,0.5)' : 'none',
                    color: isSelected ? '#fff' : '#a78bfa',
                    transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  {i + 1}
                  {/* Pallino di stato */}
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#050507]"
                    style={{ backgroundColor: isActive ? '#a78bfa' : '#334155' }}
                  />
                </motion.button>

                {/* Etichetta sempre orizzontale */}
                <span
                  className="text-xs font-medium whitespace-nowrap select-none"
                  style={{ color: isSelected ? '#c4b5fd' : '#64748b' }}
                >
                  {node.shortLabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Card di dettaglio ───────────────────────────────────── */}
      <div ref={cardRef} className="w-full max-w-2xl min-h-[4rem]" style={{ scrollMarginTop: '80px' }}>
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(167,139,250,0.2)',
              }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="text-white font-semibold text-lg">{selected.title}</h3>
                  {selected.status === 'active' ? (
                    <span
                      className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(167,139,250,0.15)',
                        color: '#c4b5fd',
                        border: '1px solid rgba(167,139,250,0.3)',
                      }}
                    >
                      Attiva
                    </span>
                  ) : (
                    <span
                      className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        color: '#64748b',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      In arrivo
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{selected.description}</p>

                {selected.videoSrc ? (
                  <VideoPlayer src={selected.videoSrc} />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-xl py-10 text-sm"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px dashed rgba(167,139,250,0.12)',
                      color: '#475569',
                    }}
                  >
                    Video demo in arrivo
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function VideoPlayer({ src }: { src: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className="flex items-center justify-center rounded-xl py-10 text-sm"
        style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(167,139,250,0.12)',
          color: '#475569',
        }}
      >
        Video in caricamento
      </div>
    )
  }

  return (
    <video
      src={src}
      controls
      onError={() => setHasError(true)}
      className="w-full rounded-xl"
      style={{ maxHeight: 320, backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      Il tuo browser non supporta la riproduzione video.
    </video>
  )
}
