import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { cafeInfo } from '../../data'
import toast from 'react-hot-toast'

export default function CartDrawer() {
  const {
    items, removeItem, updateQty,
    isOpen, setIsOpen,
    subtotal, discount, taxAmount, total,
    coupon, setCoupon,
    specialInstructions, setSpecialInstructions,
  } = useCart()

  const [couponInput, setCouponInput] = useState('')
  const navigate = useNavigate()

  if (!isOpen) return null

  const applyCoupon = () => {
    const found = cafeInfo.coupons.find(c => c.code === couponInput.trim().toUpperCase())
    if (found) {
      setCoupon(found)
      toast.success(found.label, { icon: '🎉' })
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const handleCheckout = () => {
    if (!items.length) { toast.error('Your cart is empty!'); return }
    setIsOpen(false)
    navigate('/order')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ch-charcoal/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-ch-parchment z-50 flex flex-col"
        style={{ animation: 'slideInRight 0.3s cubic-bezier(0.32,0.72,0,1) forwards' }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ch-brown/8">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-ch-brown" />
            <h2 className="font-display text-xl font-semibold text-ch-brown">Your Cart</h2>
            {items.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-ch-gold text-ch-brown text-[10px] font-bold flex items-center justify-center">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ch-brown/8 transition-colors"
          >
            <X size={16} className="text-ch-caramel" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-ch-ivory flex items-center justify-center text-4xl">🛒</div>
              <div>
                <p className="font-display text-xl text-ch-brown font-semibold mb-1">Empty cart</p>
                <p className="text-ch-tan text-sm">Add items from the menu to get started</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); navigate('/menu') }}
                className="btn-primary mt-2"
              >
                Browse Menu <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-ch-ivory rounded-2xl p-3.5 border border-ch-brown/6">
                {/* Emoji thumbnail */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ch-brown to-ch-caramel flex items-center justify-center text-2xl flex-shrink-0">
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ch-brown text-sm leading-tight truncate">{item.name}</p>
                  <p className="text-ch-gold font-semibold text-sm mt-0.5">₹{item.price * item.qty}</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-full border border-ch-brown/20 flex items-center justify-center
                      hover:bg-ch-brown hover:text-ch-cream hover:border-ch-brown transition-all"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="w-5 text-center font-semibold text-ch-brown text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-full bg-ch-brown text-ch-cream flex items-center justify-center
                      hover:bg-ch-mocha transition-all"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => { removeItem(item.id); toast('Removed from cart') }}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-ch-tan hover:text-red-400 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer panel */}
        {items.length > 0 && (
          <div className="border-t border-ch-brown/8 px-6 py-5 space-y-4 bg-ch-ivory">
            {/* Special instructions */}
            <textarea
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="Any special instructions? (optional)"
              rows={2}
              className="w-full text-xs bg-ch-parchment border border-ch-brown/12 rounded-xl px-4 py-3
                resize-none outline-none focus:border-ch-gold/50 placeholder:text-ch-tan/60 text-ch-brown"
            />

            {/* Coupon */}
            {!coupon ? (
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-ch-parchment border border-ch-brown/12 rounded-xl px-3">
                  <Tag size={13} className="text-ch-tan flex-shrink-0" />
                  <input
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                    placeholder="Coupon code"
                    className="flex-1 text-xs py-2.5 bg-transparent outline-none placeholder:text-ch-tan/60 text-ch-brown"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-ch-sage text-white text-xs font-semibold rounded-xl hover:bg-ch-sage/80 transition-colors"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-ch-sage/10 border border-ch-sage/25 rounded-xl px-4 py-2.5">
                <span className="text-ch-sage text-xs font-semibold flex items-center gap-1.5">
                  <Tag size={11} /> {coupon.label}
                </span>
                <button onClick={() => setCoupon(null)} className="text-ch-tan text-xs hover:text-ch-brown transition-colors">
                  Remove
                </button>
              </div>
            )}

            {/* Bill summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-ch-tan">
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-ch-sage font-medium">
                  <span>Discount</span><span>−₹{discount}</span>
                </div>
              )}
              {cafeInfo.gstEnabled && (
                <div className="flex justify-between text-xs text-ch-tan">
                  <span>GST ({cafeInfo.gstRate}%)</span><span>₹{taxAmount}</span>
                </div>
              )}
              <div className="flex justify-between font-display font-bold text-ch-brown text-base pt-2 border-t border-ch-brown/10">
                <span>Total</span><span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary justify-center py-4 rounded-2xl text-sm tracking-wide"
            >
              Proceed to Order <ArrowRight size={15} />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
