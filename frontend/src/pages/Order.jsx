import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { cafeInfo } from '../data'
import { CheckCircle, ChevronRight, ArrowLeft, Star, Utensils, ShoppingBag, CreditCard, Banknote, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

/* ── helpers ─────────────────────────────────────────────── */
const generateOrderId = () =>
  'TCH' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()

const estimatedTime = (items) => {
  const count = items.reduce((s, i) => s + i.qty, 0)
  if (count <= 2) return '10–15 mins'
  if (count <= 5) return '15–20 mins'
  return '20–30 mins'
}
/* ── INPUT component ─────────────────────────────────── */
const Input = ({ label, value, onChange, placeholder, type = 'text', error, prefix }) => (
  <div>
    <label className="block text-ch-brown text-xs font-semibold uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <div className={`flex items-center bg-ch-ivory border rounded-xl overflow-hidden transition-all
        ${error ? 'border-red-400' : 'border-ch-brown/12 focus-within:border-ch-gold/50 focus-within:shadow-[0_0_0_3px_rgba(192,139,58,0.08)]'}`}>
      {prefix && (
        <span className="px-3 py-3 bg-ch-parchment text-ch-tan text-sm border-r border-ch-brown/10 font-medium">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50"
      />
    </div>
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
)
/* ── Step indicator ──────────────────────────────────────── */
function StepBar({ current }) {
  const steps = ['Order Type', 'Your Info', 'Payment', 'Confirmed']
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done ? 'bg-ch-sage text-white'
                  : active ? 'bg-ch-brown text-ch-cream ring-4 ring-ch-brown/15'
                    : 'bg-ch-ivory text-ch-tan border border-ch-brown/15'}`}>
                {done ? <CheckCircle size={16} /> : idx}
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap hidden sm:block
                ${active ? 'text-ch-brown' : done ? 'text-ch-sage' : 'text-ch-tan'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 sm:w-20 h-px mx-1 mb-4 sm:mb-0 transition-colors
                ${current > idx ? 'bg-ch-sage' : 'bg-ch-brown/12'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Order Summary sidebar ───────────────────────────────── */
function OrderSummary({ items, subtotal, discount, total, coupon }) {
  return (
    <div className="bg-ch-ivory rounded-[20px] border border-ch-brown/8 overflow-hidden sticky top-28">
      <div className="bg-ch-brown px-5 py-4">
        <h3 className="font-display text-ch-cream font-semibold">Order Summary</h3>
        <p className="text-ch-cream/50 text-xs mt-0.5">{items.reduce((s, i) => s + i.qty, 0)} items</p>
      </div>
      <div className="px-5 py-4 space-y-3 max-h-56 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-lg flex-shrink-0">{item.emoji}</span>
              <div className="min-w-0">
                <p className="text-ch-brown text-xs font-medium truncate">{item.name}</p>
                <p className="text-ch-tan text-[10px]">x{item.qty}</p>
              </div>
            </div>
            <span className="text-ch-brown text-xs font-semibold flex-shrink-0">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-ch-brown/8 px-5 py-4 space-y-2">
        <div className="flex justify-between text-xs text-ch-tan">
          <span>Subtotal</span><span>₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs text-ch-sage font-medium">
            <span>Discount ({coupon?.code})</span><span>−₹{discount}</span>
          </div>
        )}
        {cafeInfo.gstEnabled && (
          <div className="flex justify-between text-xs text-ch-tan">
            <span>GST ({cafeInfo.gstRate}%)</span>
            <span>₹{Math.round((subtotal - discount) * cafeInfo.gstRate / 100)}</span>
          </div>
        )}
        <div className="flex justify-between font-display font-bold text-ch-brown text-base pt-1 border-t border-ch-brown/8">
          <span>Total</span><span>₹{total}</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function Order() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const {
    items, clearCart,
    orderType, setOrderType,
    tableNumber, setTableNumber,
    subtotal, discount, total,
    coupon, specialInstructions,
  } = useCart()

  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [payment, setPayment] = useState('')
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState({})

  /* pre-select order type from URL param */
  useEffect(() => {
    const t = params.get('type')
    if (t === 'dine-in') setOrderType('dine-in')
    if (t === 'takeaway') setOrderType('takeaway')
  }, [params])

  /* redirect if cart empty (except on confirmation) */
  useEffect(() => {
    if (items.length === 0 && step < 4) navigate('/menu')
  }, [items, step, navigate])

  /* ── step validators ──────────────────────────────────── */
  const validateStep1 = () => {
    if (!orderType) { toast.error('Please select Dine In or Take Away'); return false }
    if (orderType === 'dine-in' && !tableNumber) {
      toast.error('Please enter your table number'); return false
    }
    return true
  }

  const validateStep2 = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit mobile number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep3 = () => {
    if (!payment) { toast.error('Please select a payment method'); return false }
    return true
  }

  /* ── place order ──────────────────────────────────────── */
  const placeOrder = () => {
    if (!validateStep3()) return
    const id = generateOrderId()
    setOrderId(id)
    setStep(4)
    setTimeout(() => clearCart(), 500)
    toast.success('Order placed successfully! 🎉')
  }

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2)
    if (step === 2 && validateStep2()) setStep(3)
    if (step === 3) placeOrder()
  }

  const back = () => { if (step > 1 && step < 4) setStep(s => s - 1) }



  return (
    <div className="min-h-screen bg-ch-parchment pt-[70px]">

      {/* header */}
      <div className="bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-10 text-center">
          <h1 className="font-display font-bold text-ch-cream text-4xl mb-1">
            Place Your <em className="text-ch-amber not-italic">Order</em>
          </h1>
          <p className="text-ch-cream/40 text-sm">Quick & easy — done in under a minute</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN FORM ───────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* STEP 1 — Order Type */}
            {step === 1 && (
              <div className="bg-ch-ivory rounded-[22px] p-7 border border-ch-brown/8">
                <h2 className="font-display text-ch-brown text-2xl font-bold mb-1">How would you like to order?</h2>
                <p className="text-ch-tan text-sm mb-7">Choose your dining preference</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                  {/* Dine In */}
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`relative p-6 rounded-[18px] border-2 text-left transition-all duration-200
                      ${orderType === 'dine-in'
                        ? 'border-ch-brown bg-ch-brown text-ch-cream shadow-[0_8px_24px_rgba(43,18,6,0.2)]'
                        : 'border-ch-brown/15 bg-ch-parchment hover:border-ch-brown/35 hover:shadow-md'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
                      ${orderType === 'dine-in' ? 'bg-ch-cream/15' : 'bg-ch-ivory'}`}>
                      🍽️
                    </div>
                    <p className={`font-display font-bold text-lg mb-1
                      ${orderType === 'dine-in' ? 'text-ch-cream' : 'text-ch-brown'}`}>
                      Dine In
                    </p>
                    <p className={`text-xs leading-relaxed
                      ${orderType === 'dine-in' ? 'text-ch-cream/60' : 'text-ch-tan'}`}>
                      Eat at the cafe — we'll serve it to your table
                    </p>
                    {orderType === 'dine-in' && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle size={20} className="text-ch-gold" />
                      </div>
                    )}
                  </button>

                  {/* Take Away */}
                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`relative p-6 rounded-[18px] border-2 text-left transition-all duration-200
                      ${orderType === 'takeaway'
                        ? 'border-ch-brown bg-ch-brown text-ch-cream shadow-[0_8px_24px_rgba(43,18,6,0.2)]'
                        : 'border-ch-brown/15 bg-ch-parchment hover:border-ch-brown/35 hover:shadow-md'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
                      ${orderType === 'takeaway' ? 'bg-ch-cream/15' : 'bg-ch-ivory'}`}>
                      🥡
                    </div>
                    <p className={`font-display font-bold text-lg mb-1
                      ${orderType === 'takeaway' ? 'text-ch-cream' : 'text-ch-brown'}`}>
                      Take Away
                    </p>
                    <p className={`text-xs leading-relaxed
                      ${orderType === 'takeaway' ? 'text-ch-cream/60' : 'text-ch-tan'}`}>
                      Collect your order at the counter
                    </p>
                    {orderType === 'takeaway' && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle size={20} className="text-ch-gold" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Table number (dine-in only) */}
                {orderType === 'dine-in' && (
                  <div className="bg-ch-parchment rounded-[14px] p-5 border border-ch-brown/10">
                    <p className="text-ch-brown text-sm font-semibold mb-3 flex items-center gap-2">
                      <Utensils size={20} /> Table Number
                    </p>
                    <div className="flex gap-5 flex-wrap">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => setTableNumber(n)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
                            ${tableNumber === n
                              ? 'bg-ch-brown text-ch-cream shadow-md'
                              : 'bg-ch-ivory border border-ch-brown/15 text-ch-caramel hover:border-ch-brown/35'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {tableNumber && (
                      <p className="text-ch-sage text-xs mt-3 flex items-center gap-1.5">
                        <CheckCircle size={12} /> Table {tableNumber} selected
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 — Customer Info */}
            {step === 2 && (
              <div className="bg-ch-ivory rounded-[22px] p-7 border border-ch-brown/8">
                <h2 className="font-display text-ch-brown text-2xl font-bold mb-1">Your Details</h2>
                <p className="text-ch-tan text-sm mb-7">So we know who to call when your order's ready</p>
                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Rahul Bajwa"
                    error={errors.name}
                  />
                  <Input
                    label="Mobile Number"
                    value={phone}
                    onChange={v => setPhone(v.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    type="tel"
                    prefix="+91"
                    error={errors.phone}
                  />
                  {specialInstructions && (
                    <div className="bg-ch-parchment rounded-[14px] p-4 border border-ch-brown/10">
                      <p className="text-ch-tan text-xs uppercase tracking-wider font-semibold mb-1">Special Instructions</p>
                      <p className="text-ch-brown text-sm">{specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === 3 && (
              <div className="bg-ch-ivory rounded-[22px] p-7 border border-ch-brown/8">
                <h2 className="font-display text-ch-brown text-2xl font-bold mb-1">Payment Method</h2>
                <p className="text-ch-tan text-sm mb-7">Choose how you'd like to pay</p>
                <div className="space-y-4">

                  {/* Cash */}
                  <button
                    onClick={() => setPayment('cash')}
                    className={`w-full flex items-center gap-4 p-5 rounded-[18px] border-2 text-left transition-all
                      ${payment === 'cash'
                        ? 'border-ch-brown bg-ch-brown/5'
                        : 'border-ch-brown/12 hover:border-ch-brown/30 bg-ch-parchment'}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                      ${payment === 'cash' ? 'bg-ch-brown text-ch-cream' : 'bg-ch-ivory border border-ch-brown/12'}`}>
                      <Banknote size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-ch-brown text-sm">Cash at Counter</p>
                      <p className="text-ch-tan text-xs mt-0.5">Pay when you collect / at the table</p>
                    </div>
                    {payment === 'cash' && <CheckCircle size={18} className="text-ch-brown flex-shrink-0" />}
                  </button>

                  {/* Online */}
                  <button
                    onClick={() => setPayment('online')}
                    className={`w-full flex items-center gap-4 p-5 rounded-[18px] border-2 text-left transition-all
                      ${payment === 'online'
                        ? 'border-ch-gold bg-ch-gold/5'
                        : 'border-ch-brown/12 hover:border-ch-brown/30 bg-ch-parchment'}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                      ${payment === 'online' ? 'bg-ch-gold text-ch-brown' : 'bg-ch-ivory border border-ch-brown/12'}`}>
                      <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-ch-brown text-sm">Pay Online</p>
                      <p className="text-ch-tan text-xs mt-0.5">UPI · Cards · Net Banking via Razorpay</p>
                    </div>
                    {payment === 'online' && <CheckCircle size={18} className="text-ch-gold flex-shrink-0" />}
                  </button>
                </div>

                {/* Order recap */}
                <div className="mt-6 bg-ch-parchment rounded-[14px] p-4 border border-ch-brown/10 space-y-2">
                  <div className="flex justify-between text-xs text-ch-tan">
                    <span>Order type</span>
                    <span className="text-ch-brown font-medium capitalize">
                      {orderType === 'dine-in' ? `Dine In · Table ${tableNumber}` : 'Take Away'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-ch-tan">
                    <span>Name</span>
                    <span className="text-ch-brown font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-ch-tan">
                    <span>Phone</span>
                    <span className="text-ch-brown font-medium">+91 {phone}</span>
                  </div>
                  <div className="flex justify-between text-xs text-ch-tan border-t border-ch-brown/8 pt-2">
                    <span>Est. time</span>
                    <span className="text-ch-brown font-medium">{estimatedTime(items)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Confirmation */}
            {step === 4 && (
              <div className="bg-ch-ivory rounded-[22px] p-8 border border-ch-brown/8 text-center">
                {/* success animation */}
                <div className="w-20 h-20 bg-ch-sage/15 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={40} className="text-ch-sage" />
                </div>
                <h2 className="font-display text-ch-brown text-3xl font-bold mb-2">Order Placed! 🎉</h2>
                <p className="text-ch-tan text-sm mb-6">
                  {orderType === 'dine-in'
                    ? `We'll bring it to Table ${tableNumber} shortly`
                    : 'Collect your order at the counter when ready'}
                </p>

                {/* Order ID */}
                <div className="bg-ch-brown rounded-[16px] p-5 mb-6 inline-block w-full max-w-xs mx-auto">
                  <p className="text-ch-cream/50 text-xs uppercase tracking-wider mb-1">Order ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-display font-bold text-ch-amber text-2xl tracking-wider">{orderId}</span>
                    <button
                      onClick={() => { navigator.clipboard.writeText(orderId); toast.success('Copied!') }}
                      className="text-ch-cream/40 hover:text-ch-cream transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-ch-parchment rounded-[14px] p-5 text-left space-y-3 mb-6">
                  {[
                    { label: 'Customer', val: name },
                    { label: 'Phone', val: `+91 ${phone}` },
                    { label: 'Order Type', val: orderType === 'dine-in' ? `Dine In · Table ${tableNumber}` : 'Take Away' },
                    { label: 'Payment', val: payment === 'cash' ? 'Cash at Counter' : 'Online Payment' },
                    { label: 'Amount', val: `₹${total}` },
                    { label: 'Est. Time', val: estimatedTime(items) },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-ch-tan">{row.label}</span>
                      <span className="text-ch-brown font-semibold">{row.val}</span>
                    </div>
                  ))}
                </div>

                {/* rating prompt */}
                <div className="bg-ch-gold/8 border border-ch-gold/20 rounded-[14px] p-4 mb-6">
                  <p className="text-ch-brown text-xs font-medium mb-2">Enjoying the vibes? 🌿</p>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={20} className="text-ch-gold fill-ch-gold cursor-pointer hover:scale-110 transition-transform" />
                    ))}
                  </div>
                  <p className="text-ch-tan text-[10px] mt-1.5">
                    Leave us a{' '}
                    <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="text-ch-gold underline underline-offset-2">Google Review</a>
                    {' '}— it means the world to us!
                  </p>
                </div>

                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => navigate('/track', { state: { orderId, name, orderType, tableNumber, items: [], payment, total } })}
                    className="btn-primary"
                  >
                    Track Order <ChevronRight size={14} />
                  </button>
                  <button onClick={() => navigate('/menu')} className="btn-outline-dark">
                    Order More
                  </button>
                </div>
              </div>
            )}

            {/* ── NAV BUTTONS ─────────────────────────────── */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-5">
                <button
                  onClick={step === 1 ? () => navigate('/menu') : back}
                  className="flex items-center gap-2 text-ch-caramel text-sm font-medium hover:text-ch-brown transition-colors"
                >
                  <ArrowLeft size={15} />
                  {step === 1 ? 'Back to Menu' : 'Back'}
                </button>
                <button onClick={next} className="btn-primary">
                  {step === 3
                    ? payment === 'online' ? 'Pay ₹' + total : 'Place Order'
                    : 'Continue'}
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <div className="hidden lg:block">
            {step < 4 && (
              <OrderSummary
                items={items}
                subtotal={subtotal}
                discount={discount}
                total={total}
                coupon={coupon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
