import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, X, Star, SlidersHorizontal, ChevronDown, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { menu, categories, menuSections } from '../data'
import toast from 'react-hot-toast'

/* ── gradient map ────────────────────────────────────────── */
const grad = {
  combos: ['#3D1A0A', '#C4956A'],
  burgers: ['#2B1206', '#8B5A2B'],
  pasta: ['#5C2E18', '#C4956A'],
  wraps: ['#1A3A2A', '#6B8F5E'],
  hotdog: ['#4A2A0A', '#C08B3A'],
  'indo-chinese': ['#0A2A1A', '#4A8F6A'],
  sandwiches: ['#3A2A1A', '#8B6A30'],
  'garlic-bread': ['#4A3A0A', '#E0B060'],
  maggi: ['#5C2E18', '#C4956A'],
  fries: ['#3A2A0A', '#E0B060'],
  snacks: ['#2A1A3A', '#6B4A9E'],
  nachos: ['#4A2A0A', '#C08B3A'],
  protein: ['#0A2A0A', '#4A8F4A'],
  frappe: ['#1A0A2A', '#8B5A9E'],
  'iced-coffee': ['#1A0A04', '#5C3020'],
  'hot-coffee': ['#2B1206', '#7B4A2D'],
  'thick-shakes': ['#2A1A3A', '#8B5A9E'],
  mocktails: ['#0A2A1A', '#2A8F5A'],
  chai: ['#4A2A0A', '#C08B3A'],
  'iced-tea': ['#0A2A3A', '#2A7A7A'],
  desserts: ['#3D1A0A', '#C08B3A'],
}

/* ── Real food images from Unsplash (free) ───────────────── */
const foodImages = {
  burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
  frappe: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  frappes: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  'thick-shakes': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
  mocktails: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
  desserts: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80',
  sandwiches: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80',
  combos: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  wraps: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
  hotdog: 'https://images.unsplash.com/photo-1612392062631-94b8b3c00bf4?w=400&q=80',
  'indo-chinese': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80',
  'garlic-bread': 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80',
  maggi: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
  snacks: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80',
  nachos: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
  protein: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&q=80',
  'iced-coffee': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80',
  'hot-coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
  chai: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80',
  'iced-tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
}

/* ── FoodCard ────────────────────────────────────────────── */
function FoodCard({ item }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const colors = grad[item.cat] || ['#2B1206', '#7B4A2D']
  const imgSrc = foodImages[item.cat]

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
    toast(`${item.name} added to cart!`, {
      icon: item.emoji,
      style: {
        background: '#2B1206',
        color: '#EDD9B0',
        borderRadius: '12px',
        fontSize: '13px',
        border: '1px solid rgba(192,139,58,0.2)',
      },
    })
  }

  return (
    <div className="group bg-ch-ivory rounded-[18px] overflow-hidden border border-ch-brown/6
      hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(43,18,6,0.10)] transition-all duration-300 flex flex-col">

      {/* image top */}
      <div
        className="relative h-36 flex flex-col items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: `linear-gradient(145deg, ${colors[0]} 0%, ${colors[1]} 100%)` }}
      >
        {/* dot texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,#EDD9B0 1px,transparent 0)', backgroundSize: '16px 16px' }} />

        {/* real food photo */}
        {imgSrc && !imgFailed ? (
          <img
            src={imgSrc}
            alt={item.name}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          /* fallback emoji */
          <span className="text-[3.2rem] drop-shadow-lg group-hover:scale-110 transition-transform duration-500 leading-none relative z-10">
            {item.emoji}
          </span>
        )}

        {/* price pill */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full z-10">
          ₹{item.price}
        </div>

        {/* badge */}
        {item.best && (
          <span className="absolute top-2.5 left-2.5 bg-ch-brown/80 backdrop-blur-sm text-ch-cream
            text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider z-10">⭐ Best Seller</span>
        )}
        {!item.best && item.hot && (
          <span className="absolute top-2.5 left-2.5 bg-ch-gold/80 backdrop-blur-sm text-ch-brown
            text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider z-10">🔥 Trending</span>
        )}
      </div>

      {/* body */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ch-brown text-[13px] leading-snug mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-ch-tan text-[11px] leading-relaxed line-clamp-2 flex-1 mb-3">
          {item.desc}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Star size={9} className="text-ch-gold fill-ch-gold" />
            <span className="text-[10px] text-ch-gold font-semibold">{item.rating}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
              transition-all duration-200
              ${added
                ? 'bg-ch-sage text-white scale-95'
                : 'bg-ch-brown text-ch-cream hover:bg-ch-gold hover:text-ch-brown hover:shadow-[0_4px_12px_rgba(192,139,58,0.35)]'
              }`}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function Menu() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [showSort, setShowSort] = useState(false)
  const { totalItems, totalPrice, setIsOpen } = useCart()
  const catBarRef = useRef(null)

  /* filtered + sorted */
  const filtered = useMemo(() => {
    let items = menu
    if (activeCat !== 'all') items = items.filter(i => i.cat === activeCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        i.cat.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'bestseller') items = [...items].sort((a, b) => (b.best ? 1 : 0) - (a.best ? 1 : 0))
    return items
  }, [search, activeCat, sortBy])

  const showSections = activeCat === 'all' && !search.trim() && sortBy === 'default'

  useEffect(() => {
    const bar = catBarRef.current
    if (!bar) return
    const active = bar.querySelector('[data-active="true"]')
    if (active) {
      const barLeft = bar.getBoundingClientRect().left
      const activeLeft = active.getBoundingClientRect().left
      bar.scrollLeft += activeLeft - barLeft - bar.clientWidth / 2 + active.clientWidth / 2
    }
  }, [activeCat])

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'bestseller', label: 'Best Sellers First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
  ]

  return (
    <div className="min-h-screen bg-ch-parchment pt-[70px]">

      {/* ── PAGE HEADER ───────────────────────────────────── */}
      <div className="bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(192,139,58,0.12) 0%,transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-10 text-center">
          <p className="text-ch-gold text-xs font-semibold tracking-[0.16em] uppercase mb-2
            flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-ch-gold" />Crave · Eat · Repeat<span className="w-5 h-px bg-ch-gold" />
          </p>
          <h1 className="font-display font-bold text-ch-cream text-4xl sm:text-5xl mb-2">
            Our <em className="text-ch-amber not-italic">Menu</em>
          </h1>
          <p className="text-ch-cream/40 text-sm">{menu.length}+ items · Starting ₹30</p>
        </div>
      </div>

      {/* ── STICKY CONTROLS ───────────────────────────────── */}
      <div className="sticky top-[70px] z-30 bg-ch-parchment/95 backdrop-blur-xl
        border-b border-ch-brown/8 shadow-[0_2px_12px_rgba(43,18,6,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-3 space-y-3">

          {/* search + sort */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 bg-ch-ivory border border-ch-brown/10 rounded-xl
              px-4 py-2.5 focus-within:border-ch-gold/50 focus-within:shadow-[0_0_0_3px_rgba(192,139,58,0.08)] transition-all">
              <Search size={14} className="text-ch-tan flex-shrink-0" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveCat('all') }}
                placeholder="Search burgers, pasta, frappe…"
                className="flex-1 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50"
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X size={13} className="text-ch-tan hover:text-ch-brown transition-colors" />
                </button>
              )}
            </div>

            {/* sort */}
            <div className="relative">
              <button
                onClick={() => setShowSort(p => !p)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
                  ${sortBy !== 'default'
                    ? 'bg-ch-brown text-ch-cream border-ch-brown'
                    : 'bg-ch-ivory border-ch-brown/10 text-ch-caramel hover:border-ch-brown/25 hover:text-ch-brown'}`}
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">
                  {sortBy === 'default' ? 'Sort' : sortOptions.find(s => s.value === sortBy)?.label}
                </span>
                <ChevronDown size={12} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              {showSort && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                  <div className="absolute right-0 top-full mt-1.5 bg-ch-ivory border border-ch-brown/10
                    rounded-xl shadow-[0_8px_24px_rgba(43,18,6,0.12)] overflow-hidden z-50 min-w-[190px]">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                          ${sortBy === opt.value
                            ? 'bg-ch-brown text-ch-cream'
                            : 'text-ch-caramel hover:bg-ch-cream-light hover:text-ch-brown'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* category pills */}
          <div ref={catBarRef}
            className="flex gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                data-active={activeCat === cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                  text-xs font-semibold transition-all duration-200 whitespace-nowrap
                  ${activeCat === cat.id
                    ? 'bg-ch-brown text-ch-cream shadow-[0_2px_8px_rgba(43,18,6,0.2)]'
                    : 'bg-ch-ivory text-ch-caramel border border-ch-brown/10 hover:border-ch-brown/25 hover:text-ch-brown'}`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* filter summary */}
        {(search || activeCat !== 'all' || sortBy !== 'default') && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-ch-tan text-sm">
              <span className="font-semibold text-ch-brown">{filtered.length}</span> item{filtered.length !== 1 ? 's' : ''}
              {search && <> for "<span className="text-ch-brown font-medium">{search}</span>"</>}
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCat('all'); setSortBy('default') }}
              className="text-xs text-ch-tan hover:text-ch-brown transition-colors flex items-center gap-1"
            >
              <X size={11} /> Clear all
            </button>
          </div>
        )}

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-6xl">🔍</div>
            <h3 className="font-display text-2xl text-ch-brown font-semibold">Nothing found</h3>
            <p className="text-ch-tan text-sm max-w-xs">
              We couldn't find "<span className="font-medium">{search}</span>" on the menu.
            </p>
            <button onClick={() => { setSearch(''); setActiveCat('all') }} className="btn-primary mt-2">
              View All Items
            </button>
          </div>
        )}

        {/* SECTION VIEW */}
        {showSections && filtered.length > 0 && (
          <div className="space-y-16">
            {menuSections.map(section => {
              const sectionItems = menu.filter(i => section.cats.includes(i.cat))
              if (!sectionItems.length) return null
              return (
                <div key={section.id}>
                  <div className="flex items-center gap-4 mb-7">
                    <h2 className="font-display font-bold text-ch-brown text-2xl whitespace-nowrap">
                      {section.label}
                    </h2>
                    <div className="flex-1 h-px bg-ch-brown/8" />
                    <span className="text-ch-tan text-xs font-medium flex-shrink-0">
                      {sectionItems.length} items
                    </span>
                  </div>

                  {section.cats.map(catId => {
                    const catItems = sectionItems.filter(i => i.cat === catId)
                    if (!catItems.length) return null
                    const catInfo = categories.find(c => c.id === catId)
                    return (
                      <div key={catId} className="mb-10 last:mb-0">
                        {section.cats.length > 1 && (
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-base">{catInfo?.emoji}</span>
                            <h3 className="font-display font-semibold text-ch-caramel text-base">
                              {catInfo?.label}
                            </h3>
                            <div className="flex-1 h-px bg-ch-brown/6" />
                          </div>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {catItems.map(item => <FoodCard key={item.id} item={item} />)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}

        {/* FLAT VIEW */}
        {!showSections && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        )}

        <p className="text-center text-ch-tan/40 text-xs mt-12">
          * Add Coke to any order @ ₹29 · All prices inclusive
        </p>
      </div>

      {/* ── FLOATING CART BUTTON ──────────────────────────── */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-ch-brown text-ch-cream pl-4 pr-5 py-3.5
              rounded-full shadow-[0_8px_32px_rgba(43,18,6,0.35)] hover:bg-ch-mocha
              transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-ch-gold text-ch-brown text-[9px]
                font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-semibold text-sm">View Cart</span>
            <span className="text-ch-cream/50 text-xs">·</span>
            <span className="text-ch-amber text-sm font-bold">₹{totalPrice}</span>
          </button>
        </div>
      )}
    </div>
  )
}