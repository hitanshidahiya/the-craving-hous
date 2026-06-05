import { createContext, useContext, useState } from 'react'
import { cafeInfo } from '../data'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]                     = useState([])
  const [isOpen, setIsOpen]                   = useState(false)
  const [orderType, setOrderType]             = useState(null)
  const [tableNumber, setTableNumber]         = useState(null)
  const [coupon, setCoupon]                   = useState(null)
  const [specialInstructions, setSpecialInstructions] = useState('')

  const addItem = (item) =>
    setItems(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => { setItems([]); setCoupon(null); setSpecialInstructions('') }

  const subtotal   = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount   = coupon ? Math.round(subtotal * coupon.percent / 100) : 0
  const taxAmount  = cafeInfo.gstEnabled ? Math.round((subtotal - discount) * cafeInfo.gstRate / 100) : 0
  const total      = subtotal - discount + taxAmount
  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      isOpen, setIsOpen,
      orderType, setOrderType,
      tableNumber, setTableNumber,
      coupon, setCoupon,
      specialInstructions, setSpecialInstructions,
      subtotal, discount, taxAmount, total, totalItems,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
