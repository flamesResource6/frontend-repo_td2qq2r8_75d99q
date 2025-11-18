import { useState } from 'react'

export default function CTA() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: 'Web Services', budget: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.detail || 'Failed')
      setStatus('success')
      setForm({ name: '', email: '', company: '', service: 'Web Services', budget: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  const subscribe = async (e) => {
    e.preventDefault()
    const email = prompt('Enter your email to subscribe:')
    if (!email) return
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      alert(data.message || 'Subscribed!')
    } catch (e) {
      alert('Subscription failed')
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to build with Xyber Clan?</h3>
        <p className="mt-2 text-slate-300">Tell us what you need. We’ll get back within 24 hours.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400" name="company" placeholder="Company (optional)" value={form.company} onChange={handleChange} />
          <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white" name="service" value={form.service} onChange={handleChange}>
            <option>Web Services</option>
            <option>Security Audit</option>
            <option>Design</option>
          </select>
          <input className="md:col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400" name="budget" placeholder="Budget range (optional)" value={form.budget} onChange={handleChange} />
          <textarea className="md:col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400" name="message" placeholder="Tell us about your project" rows={4} value={form.message} onChange={handleChange} required />
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <button type="submit" className="inline-flex justify-center rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-900 hover:bg-cyan-400 transition">
              {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
            </button>
            <button onClick={subscribe} className="inline-flex justify-center rounded-lg border border-cyan-400/40 px-5 py-3 text-cyan-300 hover:bg-cyan-400/10 transition">
              Join newsletter
            </button>
            {status === 'success' && <span className="text-green-400 self-center">Sent! We’ll be in touch.</span>}
            {status === 'error' && <span className="text-red-400 self-center">Failed to send. Try again.</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
