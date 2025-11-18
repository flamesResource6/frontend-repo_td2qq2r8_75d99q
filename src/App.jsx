import { useState } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import CTA from './components/CTA'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-tight text-cyan-300">Xyber Clan</a>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="/test" className="hover:text-white">System check</a>
            <a href="#contact" className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onSelect={setSelected} />
        <div id="services"><Services selected={selected} /></div>
        <div id="contact"><CTA /></div>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-slate-400">
        © {new Date().getFullYear()} Xyber Clan. All rights reserved.
      </footer>
    </div>
  )
}

export default App
