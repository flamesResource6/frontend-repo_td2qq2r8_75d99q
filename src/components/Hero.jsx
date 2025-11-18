import { useState } from 'react'

const services = [
  { key: 'web', title: 'Web Services', desc: 'Full-stack apps, APIs, and lightning-fast sites.' },
  { key: 'security', title: 'Security Audit', desc: 'Offensive testing and hardening for your stack.' },
  { key: 'design', title: 'Design', desc: 'Bold brand systems and crisp product UI.' },
]

export default function Hero({ onSelect }) {
  const [hovered, setHovered] = useState('web')

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
            Xyber Clan
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-300">
            Web services, security, and design — crafted with a cyber edge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <button
              key={s.key}
              onMouseEnter={() => setHovered(s.key)}
              onFocus={() => setHovered(s.key)}
              onClick={() => onSelect?.(s.key)}
              className={`group relative rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-cyan-400/40 hover:bg-white/10 ${hovered===s.key ? 'ring-2 ring-cyan-400/40' : ''}`}
            >
              <div className="mb-2 text-sm uppercase tracking-wider text-cyan-300/80">{s.title}</div>
              <div className="text-slate-200/90">{s.desc}</div>
              <div className="mt-4 text-cyan-300/80 opacity-0 transition group-hover:opacity-100">Explore →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
