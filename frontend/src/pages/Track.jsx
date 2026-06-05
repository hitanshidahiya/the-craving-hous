import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Clock, ChefHat, Package, PartyPopper, ArrowLeft, Phone } from 'lucide-react'
import { cafeInfo } from '../data'

/* ── status config ───────────────────────────────────────── */
const STATUSES = [
  {
    key:   'received',
    label: 'Order Received',
    sub:   'We got your order and are reviewing it',
    icon:  <Package size={20} />,
    color: 'bg-ch-caramel',
  },
  {
    key:   'accepted',
    label: 'Order Accepted',
    sub:   'Your order has been confirmed',
    icon:  <CheckCircle size={20} />,
    color: 'bg-ch-gold',
  },
  {
    key:   'preparing',
    label: 'Being Prepared',
    sub:   'Our kitchen is working on your order',
    icon:  <ChefHat size={20} />,
    color: 'bg-ch-sage',
  },
  {
    key:   'ready',
    label: 'Ready!',
    sub:   'Your order is ready — heading your way',
    icon:  <Clock size={20} />,
    color: 'bg-ch-brown',
  },
  {
    key:   'completed',
    label: 'Completed',
    sub:   'Enjoy your meal! Come back soon 🌿',
    icon:  <PartyPopper size={20} />,
    color: 'bg-ch-sage',
  },
]

/* ── pulsing dot for active step ─────────────────────────── */
function PulseDot() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ch-gold opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-ch-gold" />
    </span>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function Track() {
  const { state }  = useLocation()
  const navigate   = useNavigate()

  /* demo: auto-advance status every few seconds if no backend yet */
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (currentStep >= STATUSES.length - 1) return
    const t = setTimeout(() => setCurrentStep(s => s + 1), 3000)
    return () => clearTimeout(t)
  }, [currentStep])

  /* if no order state (direct URL visit) show placeholder */
  if (!state?.orderId) {
    return (
      <div className="min-h-screen bg-ch-parchment pt-[70px] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-5">🔍</div>
          <h2 className="font-display text-2xl text-ch-brown font-bold mb-2">No order found</h2>
          <p className="text-ch-tan text-sm mb-6">
            Place an order first and we'll track it here for you.
          </p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    )
  }

  const o            = state
  const activeStatus = STATUSES[currentStep]
  const isCompleted  = currentStep === STATUSES.length - 1

  return (
    <div className="min-h-screen bg-ch-parchment pt-[70px]">

      {/* header */}
      <div className="bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-ch-cream/50 hover:text-ch-cream text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-ch-cream text-3xl mb-1">
                Tracking Order
              </h1>
              <p className="text-ch-amber font-display font-bold text-xl tracking-wider">
                {o.orderId}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-ch-cream/50 text-xs uppercase tracking-wider">Customer</p>
              <p className="text-ch-cream font-semibold">{o.name}</p>
              <p className="text-ch-cream/40 text-xs">+91 {o.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── TIMELINE ──────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* current status hero card */}
          <div className={`rounded-[22px] p-6 text-white relative overflow-hidden
            ${isCompleted ? 'bg-ch-sage' : 'bg-ch-brown'}`}>
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)', backgroundSize:'20px 20px' }} />
            <div className="relative flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                ${isCompleted ? 'bg-white/20' : 'bg-ch-cream/10'}`}>
                {isCompleted ? <PartyPopper size={28} /> : <ChefHat size={28} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {!isCompleted && <PulseDot />}
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                    {isCompleted ? 'All done!' : 'Current Status'}
                  </p>
                </div>
                <h2 className="font-display font-bold text-2xl mb-1">{activeStatus.label}</h2>
                <p className="text-white/60 text-sm">{activeStatus.sub}</p>
                {!isCompleted && (
                  <div className="flex items-center gap-1.5 mt-3 bg-white/10 rounded-full px-3 py-1.5 w-fit">
                    <Clock size={12} />
                    <span className="text-xs font-medium">Est. {o.estTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* timeline steps */}
          <div className="bg-ch-ivory rounded-[22px] p-6 border border-ch-brown/8">
            <h3 className="font-display text-ch-brown font-semibold mb-5 text-lg">Order Progress</h3>
            <div className="space-y-0">
              {STATUSES.map((status, i) => {
                const done   = i < currentStep
                const active = i === currentStep
                const future = i > currentStep
                return (
                  <div key={status.key} className="flex gap-4">
                    {/* line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                        transition-all duration-500 z-10
                        ${done   ? 'bg-ch-sage text-white'
                        : active ? 'bg-ch-brown text-ch-cream ring-4 ring-ch-brown/15'
                        :          'bg-ch-parchment text-ch-tan border-2 border-ch-brown/12'}`}>
                        {done ? <CheckCircle size={16} /> : status.icon}
                      </div>
                      {i < STATUSES.length - 1 && (
                        <div className={`w-0.5 h-10 transition-all duration-700
                          ${done ? 'bg-ch-sage' : 'bg-ch-brown/10'}`} />
                      )}
                    </div>

                    {/* text */}
                    <div className="pb-8 last:pb-0 flex-1 pt-1.5">
                      <p className={`font-semibold text-sm transition-colors
                        ${done ? 'text-ch-sage' : active ? 'text-ch-brown' : 'text-ch-tan'}`}>
                        {status.label}
                        {active && (
                          <span className="ml-2 text-[10px] bg-ch-gold/15 text-ch-gold px-2 py-0.5 rounded-full font-semibold">
                            In Progress
                          </span>
                        )}
                      </p>
                      <p className={`text-xs mt-0.5 transition-colors
                        ${future ? 'text-ch-tan/40' : 'text-ch-tan'}`}>
                        {status.sub}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* completed CTA */}
          {isCompleted && (
            <div className="bg-ch-gold/8 border border-ch-gold/20 rounded-[22px] p-6 text-center">
              <p className="font-display text-ch-brown font-bold text-lg mb-1">
                Hope you loved it! 🌿
              </p>
              <p className="text-ch-tan text-sm mb-4">
                Leave us a Google review — it means the world to us.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                  ⭐ Leave a Review
                </a>
                <Link to="/menu" className="btn-outline-dark text-xs">Order Again</Link>
              </div>
            </div>
          )}
        </div>

        {/* ── ORDER DETAILS ─────────────────────────────── */}
        <div className="space-y-4">

          {/* order info */}
          <div className="bg-ch-ivory rounded-[22px] p-5 border border-ch-brown/8">
            <h3 className="font-display text-ch-brown font-semibold mb-4">Order Details</h3>
            <div className="space-y-3">
              {[
                { label:'Order ID',  val: o.orderId,    highlight: true },
                { label:'Sitting',   val: o.orderType === 'inside' ? '🪑 Inside' : o.orderType === 'outside' ? '🌿 Outside' : '🥡 Take Away' },
                { label:'Payment',   val: o.payment === 'cash' ? 'Cash at Counter' : 'Online (Razorpay)' },
                { label:'Amount',    val: `₹${o.total}` },
                { label:'Placed at', val: o.placedAt },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-ch-tan text-xs">{row.label}</span>
                  <span className={`text-xs font-semibold ${row.highlight ? 'text-ch-gold font-bold font-display' : 'text-ch-brown'}`}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* items */}
          <div className="bg-ch-ivory rounded-[22px] p-5 border border-ch-brown/8">
            <h3 className="font-display text-ch-brown font-semibold mb-4">Items Ordered</h3>
            <div className="space-y-2.5">
              {o.items?.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{item.emoji}</span>
                    <p className="text-ch-brown text-xs font-medium truncate">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-ch-tan text-xs">×{item.qty}</span>
                    <span className="text-ch-brown text-xs font-semibold">₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-ch-brown/8 mt-3 pt-3 flex justify-between">
              <span className="text-ch-tan text-xs">Total</span>
              <span className="text-ch-brown font-display font-bold">₹{o.total}</span>
            </div>
          </div>

          {/* contact cafe */}
          <div className="bg-ch-brown rounded-[22px] p-5 text-center">
            <p className="text-ch-cream/60 text-xs mb-1">Need help with your order?</p>
            <p className="text-ch-cream font-semibold text-sm mb-3">Talk to our staff directly</p>
            <a href={cafeInfo.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ch-cream/10 border border-ch-cream/15
                text-ch-cream text-xs font-medium px-4 py-2 rounded-full hover:bg-ch-cream/20 transition-colors">
              <Phone size={12} /> {cafeInfo.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
