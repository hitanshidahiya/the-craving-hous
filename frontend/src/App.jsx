import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/layout/CartDrawer'
import Home     from './pages/Home'
import Menu     from './pages/Menu'
import Order    from './pages/Order'
import Track    from './pages/Track'
import Admin    from './pages/Admin'
import NotFound from './pages/NotFound'

/* ── Fix 4: scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin — no navbar/footer */}
          <Route path="/admin" element={<Admin />} />

          {/* Public pages — with navbar/footer */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <CartDrawer />
              <main className="flex-1">
                <Routes>
                  <Route path="/"      element={<Home />}     />
                  <Route path="/menu"  element={<Menu />}     />
                  <Route path="/order" element={<Order />}    />
                  <Route path="/track" element={<Track />}    />
                  <Route path="*"      element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#2B1206', color: '#EDD9B0',
              borderRadius: '12px', fontSize: '13px',
              border: '1px solid rgba(192,139,58,0.2)',
            },
            success: { iconTheme: { primary:'#C08B3A', secondary:'#2B1206' } },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  )
}