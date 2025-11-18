import { useEffect, useState } from 'react'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-semibold text-white">What we do</h2>
      <p className="mt-2 text-slate-300">Three tracks tailored to your stage and stack.</p>

      {loading ? (
        <p className="mt-6 text-slate-400">Loading services...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div key={svc.key} className="rounded-xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-xl font-bold text-cyan-300">{svc.title}</h3>
              <p className="mt-2 text-slate-300">{svc.description}</p>
              <ul className="mt-4 space-y-2 text-slate-300/90 list-disc pl-5">
                {svc.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
