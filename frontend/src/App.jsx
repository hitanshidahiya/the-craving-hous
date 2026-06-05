import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/layout/CartDrawer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'

const Placeholder = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="font-display text-3xl text-ch-brown font-semibold mb-2">{title}</h1>
      <p className="text-ch-tan text-sm">Coming soon — being built next!</p>
    </div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <Routes>
              <Route path="/"      element={<Home />} />
              <Route path="/menu"  element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/track" element={<Placeholder title="Order Tracking" />} />
              <Route path="/admin" element={<Placeholder title="Admin Panel" />} />
              <Route path="*"      element={<Placeholder title="404 — Not Found" />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#2B1206', color: '#EDD9B0',
              borderRadius: '12px', fontSize: '13px',
              border: '1px solid rgba(192,139,58,0.2)',
            },
            success: { iconTheme: { primary: '#C08B3A', secondary: '#2B1206' } },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  )
}
