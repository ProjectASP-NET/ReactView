import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../../context/CartContext'
import { Product } from '@/types/product.types'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 100,
  img: '/test.jpg',
  InStock: true,
  LikeCount: 0,
  type: 'vape',
  batteryCapacity: 1000,
  maxPower: 40,
  color: 'black',
  TankCapacity: 4,
  CoilResistence: 0.5,
}

const mockProduct2: Product = {
  id: '2',
  name: 'Test Product 2',
  price: 200,
  img: '/test2.jpg',
  InStock: true,
  LikeCount: 0,
  type: 'liquid',
  volume: 30,
  nicotine: 12,
  flavor: ['berry'],
  Icelevel: 50,
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  it('добавляет товар в корзину', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.id).toBe('1')
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('увеличивает количество при добавлении того же товара', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('удаляет товар из корзины', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.removeFromCart('1')
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('обновляет количество товара', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.updateQuantity('1', 5)
    })
    
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('удаляет товар при обновлении количества <= 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.updateQuantity('1', 0)
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('очищает корзину', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct2)
      result.current.clearCart()
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('правильно вычисляет totalItems', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct2)
    })
    
    expect(result.current.totalItems).toBe(3)
  })

  it('правильно вычисляет totalPrice', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct)
      result.current.addToCart(mockProduct2)
    })
    
    expect(result.current.totalPrice).toBe(400)
  })
})
