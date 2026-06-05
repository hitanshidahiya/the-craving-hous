import { useState } from 'react'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed,
  Settings, LogOut, Eye, EyeOff, ChevronRight,
  TrendingUp, Clock, CheckCircle, XCircle,
  ChevronDown, Search, Filter
} from 'lucide-react'

/* ── mock data ───────────────────────────────────────────── */
const MOCK_ORDERS = [
  { id:'TCH1A2B3C', name:'Rahul Bajwa',  phone:'9876543210', type:'inside',   items:[{emoji:'🍔',name:'Double Paneer Blast',qty:1,price:119},{emoji:'🧋',name:'Choco Frappe',qty:1,price:139}], total:258, payment:'cash',   status:'pending',   time:'2:34 PM' },
  { id:'TCH4D5E6F', name:'Priya Kaur',    phone:'9812345678', type:'outside',  items:[{emoji:'🍝',name:'Pink Sauce Pasta',qty:2,price:169},{emoji:'🍹',name:'Virgin Mojito',qty:2,price:99}],     total:536, payment:'online',  status:'preparing', time:'2:41 PM' },
  { id:'TCH7G8H9I', name:'Arjun Singh',   phone:'9988776655', type:'takeaway', items:[{emoji:'🧇',name:'Blueberry Waffle',qty:1,price:169},{emoji:'🥤',name:'Oreo Shake',qty:1,price:129}],       total:298, payment:'cash',   status:'ready',     time:'2:45 PM' },
  { id:'TCH0J1K2L', name:'Sneha Verma',   phone:'9871234560', type:'inside',   items:[{emoji:'🍟',name:'Cheese Loaded Fries',qty:1,price:139},{emoji:'☕',name:'Caramel Latte',qty:1,price:139}], total:278, payment:'online',  status:'completed', time:'2:20 PM' },
  { id:'TCH3M4N5O', name:'Karan Mehta',   phone:'9845612378', type:'outside',  items:[{emoji:'🌯',name:'Peri Peri Paneer Patty',qty:2,price:139}],                                               total:278, payment:'cash',   status:'accepted',  time:'2:50 PM' },
  { id:'TCH6P7Q8R', name:'Aisha Khan',    phone:'9867451230', type:'takeaway', items:[{emoji:'🍔',name:'BlockBuster',qty:1,price:169},{emoji:'🍝',name:'White Sauce Pasta',qty:1,price:159}],     total:328, payment:'online',  status:'pending',   time:'2:55 PM' },
  { id:'TCH9S0T1U', name:'Dev Patel',     phone:'9832165470', type:'inside',   items:[{emoji:'🥤',name:'Special Ferrero Rocher',qty:1,price:189},{emoji:'🧇',name:'Nutella Brownie Pancake',qty:1,price:159}], total:348, payment:'cash', status:'cancelled', time:'2:10 PM' },
]

const STATUS_CONFIG = {
  pending:   { label:'Pending',   color:'bg-yellow-100 text-yellow-700 border-yellow-200',  dot:'bg-yellow-400' },
  accepted:  { label:'Accepted',  color:'bg-blue-100 text-blue-700 border-blue-200',        dot:'bg-blue-400'   },
  preparing: { label:'Preparing', color:'bg-orange-100 text-orange-700 border-orange-200',  dot:'bg-orange-400' },
  ready:     { label:'Ready',     color:'bg-green-100 text-green-700 border-green-200',     dot:'bg-green-500'  },
  completed: { label:'Completed', color:'bg-ch-sage/15 text-ch-sage border-ch-sage/25',    dot:'bg-ch-sage'    },
  cancelled: { label:'Cancelled', color:'bg-red-100 text-red-600 border-red-200',          dot:'bg-red-400'    },
}

const STATUS_FLOW = {
  pending:   'accepted',
  accepted:  'preparing',
  preparing: 'ready',
  ready:     'completed',
}

/* ── Login ───────────────────────────────────────────────── */
function Login({ onLogin }) {
  const [pass,    setPass]    = useState('')
  const [show,    setShow]    = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!pass) { setError('Enter the admin password'); return }
    setLoading(true)
    setTimeout(() => {
      if (pass === 'admin123') {
        onLogin()
      } else {
        setError('Incorrect password')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-ch-brown flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(192,139,58,0.1) 0%,transparent 70%)' }} />

      <div className="relative w-full max-w-sm">
        {/* logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-ch-gold/20 border border-ch-gold/30
            flex items-center justify-center mx-auto mb-4 text-3xl">
            🔐
          </div>
          <h1 className="font-display font-bold text-ch-cream text-2xl">Admin Panel</h1>
          <p className="text-ch-cream/40 text-sm mt-1">The Craving Hous</p>
        </div>

        {/* card */}
        <div className="bg-ch-parchment rounded-[22px] p-7 border border-ch-brown/20 shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
          <label className="block text-ch-brown text-xs font-semibold uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className={`flex items-center bg-ch-ivory border rounded-xl overflow-hidden transition-all mb-1
            ${error ? 'border-red-400' : 'border-ch-brown/12 focus-within:border-ch-gold/50 focus-within:shadow-[0_0_0_3px_rgba(192,139,58,0.08)]'}`}>
            <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={e => { setPass(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50"
            />
            <button onClick={() => setShow(p => !p)}
              className="px-3 text-ch-tan hover:text-ch-brown transition-colors">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <p className="text-ch-tan/50 text-[10px] mb-5">Demo password: admin123</p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Login to Admin'}
            {!loading && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className={`bg-ch-ivory rounded-[18px] p-5 border border-ch-brown/8 relative overflow-hidden`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
        {icon}
      </div>
      <p className="font-display font-bold text-ch-brown text-2xl leading-none mb-1">{value}</p>
      <p className="text-ch-brown text-sm font-medium">{label}</p>
      {sub && <p className="text-ch-tan text-xs mt-0.5">{sub}</p>}
    </div>
  )
}

/* ── Order row ───────────────────────────────────────────── */
function OrderRow({ order, onStatusChange, onExpand, expanded }) {
  const cfg  = STATUS_CONFIG[order.status]
  const next = STATUS_FLOW[order.status]

  return (
    <div className="bg-ch-ivory rounded-[16px] border border-ch-brown/8 overflow-hidden">
      {/* main row */}
      <div className="flex items-center gap-3 p-4">
        {/* order id + name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-ch-brown text-sm">{order.id}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
          <p className="text-ch-tan text-xs mt-0.5">
            {order.name} · {order.type === 'inside' ? '🪑 Inside' : order.type === 'outside' ? '🌿 Outside' : '🥡 Take Away'} · {order.time}
          </p>
        </div>

        {/* total */}
        <div className="text-right flex-shrink-0">
          <p className="font-display font-bold text-ch-brown text-sm">₹{order.total}</p>
          <p className="text-ch-tan text-[10px]">{order.payment === 'cash' ? 'Cash' : 'Online'}</p>
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {next && (
            <button
              onClick={() => onStatusChange(order.id, next)}
              className="text-[11px] font-semibold bg-ch-brown text-ch-cream px-3 py-1.5 rounded-full
                hover:bg-ch-mocha transition-colors whitespace-nowrap"
            >
              → {STATUS_CONFIG[next].label}
            </button>
          )}
          {order.status === 'pending' && (
            <button
              onClick={() => onStatusChange(order.id, 'cancelled')}
              className="text-[11px] font-semibold bg-red-50 text-red-500 border border-red-200 px-3 py-1.5
                rounded-full hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onExpand(order.id)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ch-parchment transition-colors"
          >
            <ChevronDown size={14} className={`text-ch-tan transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* expanded items */}
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
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-ch-brown/8">
            <span className="text-[10px] text-ch-tan">📞</span>
            <span className="text-xs text-ch-brown font-medium">+91 {order.phone}</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sidebar nav ─────────────────────────────────────────── */
const NAV = [
  { id:'dashboard', label:'Dashboard',      icon:<LayoutDashboard size={17} /> },
  { id:'orders',    label:'Orders',         icon:<ShoppingBag size={17} />     },
  { id:'menu',      label:'Menu',           icon:<UtensilsCrossed size={17} /> },
  { id:'settings',  label:'Cafe Settings',  icon:<Settings size={17} />        },
]

/* ══════════════════════════════════════════════════════════ */
export default function Admin() {
  const [loggedIn,  setLoggedIn]  = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders,    setOrders]    = useState(MOCK_ORDERS)
  const [filterStatus, setFilter] = useState('all')
  const [search,    setSearch]    = useState('')
  const [expanded,  setExpanded]  = useState(null)
  const [sideOpen,  setSideOpen]  = useState(false)

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  /* ── stats ─────────────────────────────────────────────── */
  const todayRevenue  = orders.filter(o => o.status === 'completed').reduce((s,o) => s+o.total, 0)
  const totalOrders   = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'completed').length

  /* ── order actions ──────────────────────────────────────── */
  const changeStatus = (id, status) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))

  /* ── filtered orders ────────────────────────────────────── */
  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="min-h-screen bg-ch-parchment flex">

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <>
        {/* mobile overlay */}
        {sideOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSideOpen(false)} />
        )}
        <aside className={`fixed top-0 left-0 h-full w-60 bg-ch-brown z-40 flex flex-col transition-transform duration-300
          ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>

          {/* logo */}
          <div className="px-6 py-6 border-b border-ch-cream/8">
            <p className="font-display font-bold text-ch-cream text-base">The Craving Hous</p>
            <p className="text-ch-cream/40 text-xs mt-0.5">Admin Panel</p>
          </div>

          {/* nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSideOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeTab === item.id
                    ? 'bg-ch-cream/12 text-ch-cream'
                    : 'text-ch-cream/45 hover:bg-ch-cream/6 hover:text-ch-cream/70'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* logout */}
          <div className="px-3 pb-6">
            <button
              onClick={() => setLoggedIn(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
                text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut size={17} /> Logout
            </button>
          </div>
        </aside>
      </>

      {/* ── MAIN ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* topbar */}
        <header className="bg-ch-parchment/95 backdrop-blur-xl border-b border-ch-brown/8
          px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSideOpen(true)} className="lg:hidden w-8 h-8 flex items-center justify-center
              rounded-lg hover:bg-ch-brown/8 transition-colors">
              <LayoutDashboard size={18} className="text-ch-brown" />
            </button>
            <div>
              <h1 className="font-display font-semibold text-ch-brown text-lg capitalize">{activeTab}</h1>
              <p className="text-ch-tan text-xs hidden sm:block">
                {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pendingOrders > 0 && (
              <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200
                text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                {pendingOrders} pending
              </div>
            )}
          </div>
        </header>

        {/* content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* ── DASHBOARD ─────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-5xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<TrendingUp size={18} className="text-ch-gold" />}
                  label="Today's Revenue"
                  value={`₹${todayRevenue}`}
                  sub="From completed orders"
                  accent="bg-ch-gold/15"
                />
                <StatCard
                  icon={<ShoppingBag size={18} className="text-ch-brown" />}
                  label="Total Orders"
                  value={totalOrders}
                  sub="All time today"
                  accent="bg-ch-brown/10"
                />
                <StatCard
                  icon={<Clock size={18} className="text-orange-500" />}
                  label="Pending"
                  value={pendingOrders}
                  sub="Awaiting acceptance"
                  accent="bg-orange-50"
                />
                <StatCard
                  icon={<CheckCircle size={18} className="text-ch-sage" />}
                  label="Completed"
                  value={completedOrders}
                  sub="Successfully served"
                  accent="bg-ch-sage/15"
                />
              </div>

              {/* recent orders preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-ch-brown text-lg">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')}
                    className="text-ch-gold text-xs font-semibold hover:text-ch-caramel transition-colors flex items-center gap-1">
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0,4).map(order => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onStatusChange={changeStatus}
                      onExpand={id => setExpanded(expanded === id ? null : id)}
                      expanded={expanded === order.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ────────────────────────────────── */}
          {activeTab === 'orders' && (
            <div className="space-y-5 max-w-4xl">
              {/* filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 bg-ch-ivory border border-ch-brown/10
                  rounded-xl px-4 py-2.5 focus-within:border-ch-gold/50 transition-all">
                  <Search size={14} className="text-ch-tan flex-shrink-0" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or order ID…"
                    className="flex-1 text-sm bg-transparent outline-none text-ch-brown placeholder:text-ch-tan/50"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all','pending','accepted','preparing','ready','completed','cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilter(s)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize
                        ${filterStatus === s
                          ? 'bg-ch-brown text-ch-cream'
                          : 'bg-ch-ivory border border-ch-brown/10 text-ch-caramel hover:border-ch-brown/25'}`}
                    >
                      {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label}
                      {s !== 'all' && (
                        <span className="ml-1 opacity-60">
                          ({orders.filter(o => o.status === s).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* order list */}
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="font-display text-ch-brown font-semibold text-lg">No orders found</p>
                  <p className="text-ch-tan text-sm">Try a different filter</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map(order => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onStatusChange={changeStatus}
                      onExpand={id => setExpanded(expanded === id ? null : id)}
                      expanded={expanded === order.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MENU + SETTINGS placeholders (Part B) ── */}
          {(activeTab === 'menu' || activeTab === 'settings') && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-5xl mb-3">🚧</div>
                <p className="font-display text-ch-brown font-semibold text-xl">Coming in Part B</p>
                <p className="text-ch-tan text-sm mt-1">Menu management & Cafe settings</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
