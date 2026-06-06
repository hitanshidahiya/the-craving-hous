import { useState } from 'react'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed,
  Settings, LogOut, Eye, EyeOff, ChevronRight,
  TrendingUp, Clock, CheckCircle, Search, Star,
  ChevronDown
} from 'lucide-react'
import { menu as initialMenu, categories, cafeInfo as initialInfo } from '../data'

/* ── mock orders ─────────────────────────────────────────── */
const MOCK_ORDERS = [
  { id:'TCH1A2B3C', name:'Rahul Sharma',  phone:'9876543210', type:'dine-in',  table:2, items:[{emoji:'🍔',name:'Double Paneer Blast',qty:1,price:119},{emoji:'🧋',name:'Choco Frappe',qty:1,price:139}],            total:258, payment:'cash',   status:'pending',   time:'2:34 PM' },
  { id:'TCH4D5E6F', name:'Priya Kaur',    phone:'9812345678', type:'dine-in',  table:4, items:[{emoji:'🍝',name:'Pink Sauce Pasta',qty:2,price:169},{emoji:'🍹',name:'Virgin Mojito',qty:2,price:99}],               total:536, payment:'online',  status:'preparing', time:'2:41 PM' },
  { id:'TCH7G8H9I', name:'Arjun Singh',   phone:'9988776655', type:'takeaway', table:null, items:[{emoji:'🧇',name:'Blueberry Waffle',qty:1,price:169},{emoji:'🥤',name:'Oreo Shake',qty:1,price:129}],             total:298, payment:'cash',   status:'ready',     time:'2:45 PM' },
  { id:'TCH0J1K2L', name:'Sneha Verma',   phone:'9871234560', type:'dine-in',  table:1, items:[{emoji:'🍟',name:'Cheese Loaded Fries',qty:1,price:139},{emoji:'☕',name:'Caramel Latte',qty:1,price:139}],           total:278, payment:'online',  status:'completed', time:'2:20 PM' },
  { id:'TCH3M4N5O', name:'Karan Mehta',   phone:'9845612378', type:'dine-in',  table:3, items:[{emoji:'🌯',name:'Peri Peri Paneer Patty',qty:2,price:139}],                                                         total:278, payment:'cash',   status:'accepted',  time:'2:50 PM' },
  { id:'TCH6P7Q8R', name:'Aisha Khan',    phone:'9867451230', type:'takeaway', table:null, items:[{emoji:'🍔',name:'BlockBuster',qty:1,price:169},{emoji:'🍝',name:'White Sauce Pasta',qty:1,price:159}],            total:328, payment:'online',  status:'pending',   time:'2:55 PM' },
  { id:'TCH9S0T1U', name:'Dev Patel',     phone:'9832165470', type:'dine-in',  table:5, items:[{emoji:'🥤',name:'Special Ferrero Rocher',qty:1,price:189},{emoji:'🧇',name:'Nutella Brownie Pancake',qty:1,price:159}],total:348, payment:'cash',  status:'cancelled', time:'2:10 PM' },
]

const STATUS_CFG = {
  pending:   { label:'Pending',   color:'bg-yellow-100 text-yellow-700 border-yellow-200', dot:'bg-yellow-400' },
  accepted:  { label:'Accepted',  color:'bg-blue-100 text-blue-700 border-blue-200',       dot:'bg-blue-400'   },
  preparing: { label:'Preparing', color:'bg-orange-100 text-orange-700 border-orange-200', dot:'bg-orange-400' },
  ready:     { label:'Ready',     color:'bg-green-100 text-green-700 border-green-200',    dot:'bg-green-500'  },
  completed: { label:'Completed', color:'bg-emerald-100 text-emerald-700 border-emerald-200', dot:'bg-emerald-500' },
  cancelled: { label:'Cancelled', color:'bg-red-100 text-red-600 border-red-200',          dot:'bg-red-400'    },
}

const STATUS_FLOW = { pending:'accepted', accepted:'preparing', preparing:'ready', ready:'completed' }

/* ════════════════════════════════════════════════════════════
   LOGIN
════════════════════════════════════════════════════════════ */
function Login({ onLogin }) {
  const [pass, setPass]     = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handle = () => {
    if (!pass) { setError('Enter the admin password'); return }
    setLoading(true)
    setTimeout(() => {
      if (pass === 'admin123') { onLogin() }
      else { setError('Incorrect password'); setLoading(false) }
    }, 700)
  }

  return (
    <div className="min-h-screen bg-ch-brown flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(192,139,58,0.1) 0%,transparent 70%)' }} />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-ch-gold/20 border border-ch-gold/30 flex items-center justify-center mx-auto mb-4 text-3xl">🔐</div>
          <h1 className="font-display font-bold text-ch-cream text-2xl">Admin Panel</h1>
          <p className="text-ch-cream/40 text-sm mt-1">The Craving Hous</p>
        </div>
        <div className="bg-ch-parchment rounded-[22px] p-7 border border-ch-brown/20 shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
          <label className="block text-ch-brown text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
          <div className={`flex items-center bg-ch-ivory border rounded-xl overflow-hidden mb-1 transition-all
            ${error ? 'border-red-400' : 'border-ch-brown/12 focus-within:border-ch-gold/50 focus-within:shadow-[0_0_0_3px_rgba(192,139,58,0.08)]'}`}>
            <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={e => { setPass(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handle()}
              placeholder="Enter admin password"
              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50"
            />
            <button onClick={() => setShow(p => !p)} className="px-3 text-ch-tan hover:text-ch-brown transition-colors">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <p className="text-ch-tan/50 text-[10px] mb-5">Demo password: admin123</p>
          <button onClick={handle} disabled={loading}
            className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Logging in…' : 'Login'} {!loading && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SHARED COMPONENTS
════════════════════════════════════════════════════════════ */
function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="bg-ch-ivory rounded-[18px] p-5 border border-ch-brown/8">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accent}`}>{icon}</div>
      <p className="font-display font-bold text-ch-brown text-2xl leading-none mb-1">{value}</p>
      <p className="text-ch-brown text-sm font-medium">{label}</p>
      {sub && <p className="text-ch-tan text-xs mt-0.5">{sub}</p>}
    </div>
  )
}

function OrderRow({ order, onStatus, onExpand, expanded }) {
  const cfg  = STATUS_CFG[order.status]
  const next = STATUS_FLOW[order.status]
  return (
    <div className="bg-ch-ivory rounded-[16px] border border-ch-brown/8 overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-ch-brown text-sm">{order.id}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
          <p className="text-ch-tan text-xs mt-0.5">
            {order.name} · {order.type === 'dine-in' ? `🍽️ Table ${order.table}` : '🥡 Take Away'} · {order.time}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-display font-bold text-ch-brown text-sm">₹{order.total}</p>
          <p className="text-ch-tan text-[10px]">{order.payment === 'cash' ? 'Cash' : 'Online'}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {next && (
            <button onClick={() => onStatus(order.id, next)}
              className="text-[11px] font-semibold bg-ch-brown text-ch-cream px-3 py-1.5 rounded-full hover:bg-ch-mocha transition-colors whitespace-nowrap">
              → {STATUS_CFG[next].label}
            </button>
          )}
          {order.status === 'pending' && (
            <button onClick={() => onStatus(order.id, 'cancelled')}
              className="text-[11px] font-semibold bg-red-50 text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors">
              Cancel
            </button>
          )}
          <button onClick={() => onExpand(order.id)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ch-parchment transition-colors">
            <ChevronDown size={14} className={`text-ch-tan transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-ch-brown/8 px-4 py-3 bg-ch-parchment/60">
          <p className="text-ch-tan text-[10px] uppercase tracking-wider font-semibold mb-2">Items</p>
          <div className="space-y-1.5">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-ch-brown">{item.emoji} {item.name} <span className="text-ch-tan">×{item.qty}</span></span>
                <span className="text-ch-brown font-semibold">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ch-brown mt-2 pt-2 border-t border-ch-brown/8">📞 +91 {order.phone}</p>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   TABS
════════════════════════════════════════════════════════════ */
function DashboardTab({ orders, onStatus, onTab }) {
  const [expanded, setExpanded] = useState(null)
  const revenue   = orders.filter(o => o.status === 'completed').reduce((s,o) => s+o.total, 0)
  const pending   = orders.filter(o => o.status === 'pending').length
  const completed = orders.filter(o => o.status === 'completed').length

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={18} className="text-ch-gold" />}     label="Today's Revenue" value={`₹${revenue}`}    sub="Completed orders"     accent="bg-ch-gold/15"   />
        <StatCard icon={<ShoppingBag size={18} className="text-ch-brown" />}   label="Total Orders"    value={orders.length}    sub="All orders today"     accent="bg-ch-brown/10"  />
        <StatCard icon={<Clock size={18} className="text-orange-500" />}       label="Pending"         value={pending}          sub="Awaiting acceptance"  accent="bg-orange-50"    />
        <StatCard icon={<CheckCircle size={18} className="text-emerald-500" />}label="Completed"       value={completed}        sub="Successfully served"  accent="bg-emerald-50"   />
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-ch-brown text-lg">Recent Orders</h2>
          <button onClick={() => onTab('orders')} className="text-ch-gold text-xs font-semibold hover:text-ch-caramel flex items-center gap-1 transition-colors">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {orders.slice(0,4).map(o => (
            <OrderRow key={o.id} order={o} onStatus={onStatus}
              onExpand={id => setExpanded(expanded === id ? null : id)}
              expanded={expanded === o.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

function OrdersTab({ orders, onStatus }) {
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = orders.filter(o => {
    const ms = filter === 'all' || o.status === filter
    const mq = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.name.toLowerCase().includes(search.toLowerCase())
    return ms && mq
  })

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-ch-ivory border border-ch-brown/10 rounded-xl px-4 py-2.5 focus-within:border-ch-gold/50 transition-all">
          <Search size={14} className="text-ch-tan flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or order ID…"
            className="flex-1 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','pending','accepted','preparing','ready','completed','cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize
                ${filter === s ? 'bg-ch-brown text-ch-cream' : 'bg-ch-ivory border border-ch-brown/10 text-ch-caramel hover:border-ch-brown/25'}`}>
              {s === 'all' ? 'All' : STATUS_CFG[s]?.label}
              <span className="ml-1 opacity-50">({s === 'all' ? orders.length : orders.filter(o=>o.status===s).length})</span>
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">📭</div>
          <p className="font-display text-ch-brown font-semibold text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(o => (
            <OrderRow key={o.id} order={o} onStatus={onStatus}
              onExpand={id => setExpanded(expanded === id ? null : id)}
              expanded={expanded === o.id} />
          ))}
        </div>
      )}
    </div>
  )
}

function MenuTab() {
  const [items,  setItems]  = useState(initialMenu)
  const [search, setSearch] = useState('')
  const [cat,    setCat]    = useState('all')

  const filtered = items.filter(i =>
    (cat === 'all' || i.cat === cat) &&
    (!search || i.name.toLowerCase().includes(search.toLowerCase()))
  )
  const toggle = (id, field) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: !i[field] } : i))

  const presentCats = ['all', ...new Set(items.map(i => i.cat))]

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-ch-ivory border border-ch-brown/10 rounded-xl px-4 py-2.5 focus-within:border-ch-gold/50 transition-all">
          <Search size={14} className="text-ch-tan flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items…"
            className="flex-1 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="bg-ch-ivory border border-ch-brown/10 rounded-xl px-4 py-2.5 text-sm text-ch-brown outline-none focus:border-ch-gold/50 cursor-pointer">
          {presentCats.map(c => {
            const info = categories.find(x => x.id === c)
            return <option key={c} value={c}>{c === 'all' ? 'All Categories' : `${info?.emoji} ${info?.label}`}</option>
          })}
        </select>
      </div>

      {/* stats */}
      <div className="flex gap-3 flex-wrap text-xs">
        {[
          { label:'Total',       val:items.length,                              c:'text-ch-brown' },
          { label:'Available',   val:items.filter(i=>i.avail!==false).length,   c:'text-emerald-600' },
          { label:'Hidden',      val:items.filter(i=>i.avail===false).length,   c:'text-red-500' },
          { label:'Best Sellers',val:items.filter(i=>i.best).length,            c:'text-ch-gold' },
        ].map(s => (
          <div key={s.label} className="bg-ch-ivory border border-ch-brown/8 rounded-xl px-4 py-2.5">
            <span className={`font-display font-bold text-base ${s.c}`}>{s.val}</span>
            <span className="text-ch-tan ml-1.5">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="text-ch-tan text-sm">Showing <span className="font-semibold text-ch-brown">{filtered.length}</span> items</p>

      <div className="space-y-2">
        {filtered.map(item => {
          const hidden = item.avail === false
          return (
            <div key={item.id}
              className={`flex items-center gap-3 bg-ch-ivory rounded-[14px] px-4 py-3 border transition-all
                ${hidden ? 'border-red-200 opacity-55' : 'border-ch-brown/8'}`}>
              <span className="text-xl flex-shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${hidden ? 'line-through text-ch-tan' : 'text-ch-brown'}`}>{item.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-ch-gold font-semibold text-xs">₹{item.price}</span>
                  <span className="text-ch-tan text-[10px]">· {item.cat}</span>
                  {item.best && <span className="text-[9px] bg-ch-gold/15 text-ch-gold px-1.5 py-0.5 rounded-full font-semibold">⭐ Best</span>}
                  {hidden && <span className="text-[9px] bg-red-50 text-red-400 px-1.5 py-0.5 rounded-full font-semibold">Hidden</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggle(item.id, 'best')} title={item.best ? 'Remove Best Seller' : 'Mark Best Seller'}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${item.best ? 'bg-ch-gold/20 text-ch-gold hover:bg-ch-gold/30' : 'bg-ch-parchment text-ch-tan/40 hover:text-ch-gold hover:bg-ch-gold/10'}`}>
                  <Star size={13} className={item.best ? 'fill-ch-gold' : ''} />
                </button>
                <button onClick={() => toggle(item.id, 'avail')} title={hidden ? 'Show Item' : 'Hide Item'}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${hidden ? 'bg-red-50 text-red-400 hover:bg-red-100' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'}`}>
                  {hidden ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SettingsTab() {
  const [cafeOpen, setCafeOpen] = useState(initialInfo.isOpen)
  const [gstOn,    setGstOn]    = useState(initialInfo.gstEnabled)
  const [gstRate,  setGstRate]  = useState(initialInfo.gstRate)
  const [saved,    setSaved]    = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const Toggle = ({ on, onToggle, label, desc, onColor='bg-ch-sage', offColor='bg-red-300' }) => (
    <div className="flex items-center justify-between gap-4 bg-ch-ivory rounded-[16px] p-5 border border-ch-brown/8">
      <div>
        <p className="font-semibold text-ch-brown text-sm">{label}</p>
        <p className="text-ch-tan text-xs mt-0.5">{desc}</p>
      </div>
      <button onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${on ? onColor : offColor}`}>
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on ? 'left-6' : 'left-0.5'}`} />
      </button>
    </div>
  )

  return (
    <div className="space-y-4 max-w-lg">
      <Toggle on={cafeOpen} onToggle={() => setCafeOpen(p=>!p)}
        label="Cafe is Open"
        desc={cafeOpen ? 'Customers can place orders right now' : 'Orders paused — cafe is closed'} />
      <Toggle on={gstOn} onToggle={() => setGstOn(p=>!p)}
        label="Charge GST" desc="Show GST breakdown on customer bills"
        onColor="bg-ch-sage" offColor="bg-ch-tan/30" />
      {gstOn && (
        <div className="bg-ch-ivory rounded-[16px] p-5 border border-ch-brown/8">
          <label className="block text-ch-brown text-xs font-semibold uppercase tracking-wider mb-3">GST Rate</label>
          <div className="flex gap-3">
            {[5,12,18].map(r => (
              <button key={r} onClick={() => setGstRate(r)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all
                  ${gstRate===r ? 'bg-ch-brown text-ch-cream' : 'bg-ch-parchment border border-ch-brown/12 text-ch-caramel hover:border-ch-brown/30'}`}>
                {r}%
              </button>
            ))}
          </div>
          <p className="text-ch-tan text-xs mt-2">5% applies to most restaurants in India</p>
        </div>
      )}
      <div className="bg-ch-ivory rounded-[16px] p-5 border border-ch-brown/8">
        <p className="font-semibold text-ch-brown text-sm mb-4">Cafe Info</p>
        {[
          { label:'Name',     val:initialInfo.name             },
          { label:'Address',  val:initialInfo.address          },
          { label:'Instagram',val:initialInfo.instagramHandle  },
          { label:'Rating',   val:`${initialInfo.rating} ⭐ (${initialInfo.reviewCount} reviews)` },
        ].map(row => (
          <div key={row.label} className="flex justify-between text-sm mb-2.5 last:mb-0">
            <span className="text-ch-tan">{row.label}</span>
            <span className="text-ch-brown font-medium text-right max-w-[200px] truncate">{row.val}</span>
          </div>
        ))}
        <p className="text-ch-tan/40 text-xs mt-3">Edit <code className="bg-ch-parchment px-1 rounded">src/data/index.js</code> to update</p>
      </div>
      <button onClick={save}
        className={`btn-primary w-full justify-center py-3.5 transition-all ${saved ? 'bg-ch-sage pointer-events-none' : ''}`}>
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN ADMIN
════════════════════════════════════════════════════════════ */
const NAV = [
  { id:'dashboard', label:'Dashboard',     icon:<LayoutDashboard size={17}/> },
  { id:'orders',    label:'Orders',        icon:<ShoppingBag size={17}/>     },
  { id:'menu',      label:'Menu',          icon:<UtensilsCrossed size={17}/> },
  { id:'settings',  label:'Cafe Settings', icon:<Settings size={17}/>        },
]

export default function Admin() {
  const [loggedIn,  setLoggedIn]  = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders,    setOrders]    = useState(MOCK_ORDERS)
  const [sideOpen,  setSideOpen]  = useState(false)

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  const changeStatus = (id, status) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))

  const pendingCount = orders.filter(o => o.status === 'pending').length

  return (
    <div className="min-h-screen bg-ch-parchment flex">

      {/* overlay */}
      {sideOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-ch-brown z-40 flex flex-col transition-transform duration-300
        ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="px-6 py-6 border-b border-ch-cream/8">
          <p className="font-display font-bold text-ch-cream text-base">The Craving Hous</p>
          <p className="text-ch-cream/40 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSideOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeTab === item.id ? 'bg-ch-cream/12 text-ch-cream' : 'text-ch-cream/45 hover:bg-ch-cream/6 hover:text-ch-cream/70'}`}>
              {item.icon} {item.label}
              {item.id === 'orders' && pendingCount > 0 && (
                <span className="ml-auto w-4 h-4 bg-yellow-400 text-yellow-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-6">
          <button onClick={() => setLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-ch-parchment/95 backdrop-blur-xl border-b border-ch-brown/8 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSideOpen(true)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ch-brown/8 transition-colors">
              <LayoutDashboard size={18} className="text-ch-brown" />
            </button>
            <div>
              <h1 className="font-display font-semibold text-ch-brown text-lg capitalize">{activeTab}</h1>
              <p className="text-ch-tan text-xs hidden sm:block">
                {new Date().toLocaleDateString('en-IN',{ weekday:'long', day:'numeric', month:'long' })}
              </p>
            </div>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              {pendingCount} pending
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <DashboardTab orders={orders} onStatus={changeStatus} onTab={setActiveTab} />}
          {activeTab === 'orders'    && <OrdersTab    orders={orders} onStatus={changeStatus} />}
          {activeTab === 'menu'      && <MenuTab />}
          {activeTab === 'settings'  && <SettingsTab />}
        </main>
      </div>
    </div>
  )
}
