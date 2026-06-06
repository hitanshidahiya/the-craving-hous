import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ch-brown flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(192,139,58,0.1) 0%,transparent 70%)' }} />

      <div className="relative text-center max-w-md">
        <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover mx-auto mb-6 opacity-60" />
        <p className="font-display text-ch-amber text-8xl font-bold leading-none mb-4">404</p>
        <h1 className="font-display font-bold text-ch-cream text-2xl mb-3">
          Page Not Found
        </h1>
        <p className="text-ch-cream/45 text-sm leading-relaxed mb-8">
          Looks like this page went out for a snack and never came back. Let's get you somewhere good.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="btn-gold">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <Link to="/menu" className="btn-outline">
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  )
}
