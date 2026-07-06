import { useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin, Send, ArrowRight } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <SectionShell id="contact" variant="dark">
      <SectionTitle badge="Contact" title="Get In Touch" highlight="Touch" subtitle="24/7 support via WhatsApp, email, or phone for your Himachal trip." />
      <div className="grid lg:grid-cols-5 gap-5 w-full">
        <GlassCard className="lg:col-span-3 p-5 md:p-6" hover={false} premium>
          <h3 className="font-semibold font-[family-name:var(--font-display)] mb-5">Send a message</h3>
          <form onSubmit={e => { e.preventDefault(); alert('Message sent!') }} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name" className="w-full px-3.5 py-3 rounded-xl border border-[var(--glass-border)] bg-transparent outline-none focus:border-[rgba(232,184,109,0.4)] text-sm" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="Email" className="w-full px-3.5 py-3 rounded-xl border border-[var(--glass-border)] bg-transparent outline-none focus:border-[rgba(232,184,109,0.4)] text-sm" />
            </div>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} placeholder="Tell us about your trip..." className="w-full px-3.5 py-3 rounded-xl border border-[var(--glass-border)] bg-transparent outline-none focus:border-[rgba(232,184,109,0.4)] text-sm resize-none" />
            <Button><Send className="w-4 h-4" /> Send Message</Button>
          </form>
        </GlassCard>
        <div className="lg:col-span-2 space-y-3">
          {[
            { icon: MessageCircle, label: 'WhatsApp', value: '+91 98765 43210' },
            { icon: Mail, label: 'Email', value: 'hello@wanderhive.com' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
          ].map(item => (
            <GlassCard key={item.label} className="p-4 flex items-center gap-3 group" premium>
              <div className="w-10 h-10 rounded-xl bg-[rgba(232,184,109,0.08)] flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{item.label}</p>
                <p className="font-medium text-sm truncate">{item.value}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
            </GlassCard>
          ))}
          <GlassCard className="p-4 text-center" hover={false} premium>
            <MapPin className="w-5 h-5 text-[var(--accent)] mx-auto mb-2" />
            <p className="text-xs text-[var(--text-muted)]">Shimla, Himachal Pradesh</p>
          </GlassCard>
        </div>
      </div>
    </SectionShell>
  )
}
