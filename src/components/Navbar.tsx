export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-semibold text-lg tracking-tight">Workless</span>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Cosa facciamo</a>
          <a href="#demo" className="text-sm text-slate-400 hover:text-white transition-colors">Demo</a>
          <a href="#contact" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">Contatti</a>
        </div>
      </div>
    </nav>
  )
}
