import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#features', label: 'Cosa facciamo' },
  { href: '#demo',     label: 'Demo' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-semibold text-lg tracking-tight">Workless</span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">
            Contatti
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <a href="#contact" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">
            Contatti
          </a>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="text-white p-1"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-md">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
