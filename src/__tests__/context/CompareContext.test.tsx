import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CompareProvider, useCompare } from '../../context/CompareContext'
import { Product } from '@/types/Mockdata'

const mockProduct1: Product = {
  id: '1',
  name: 'Vape Product',
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
  name: 'Vape Product 2',
  price: 200,
  img: '/test2.jpg',
  InStock: true,
  LikeCount: 0,
  type: 'vape',
  batteryCapacity: 1500,
  maxPower: 60,
  color: 'white',
  TankCapacity: 5,
  CoilResistence: 0.4,
}

const mockProduct3: Product = {
  id: '3',
  name: 'Liquid Product',
  price: 300,
  img: '/test3.jpg',
  InStock: true,
  LikeCount: 0,
  type: 'liquid',
  volume: 30,
  nicotine: 12,
  flavor: ['berry'],
  Icelevel: 50,
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CompareProvider>{children}</CompareProvider>
)

describe('CompareContext', () => {
  it('добавляет товар в сравнение', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe('1')
  })

  it('не добавляет более 4 товаров', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    const products = [
      { ...mockProduct1, id: '1' },
      { ...mockProduct1, id: '2' },
      { ...mockProduct1, id: '3' },
      { ...mockProduct1, id: '4' },
      { ...mockProduct1, id: '5' },
    ]
    
    act(() => {
      products.forEach(p => result.current.addToCompare(p))
    })
    
    expect(result.current.items).toHaveLength(4)
  })

  it('не добавляет товары разных типов', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
      result.current.addToCompare(mockProduct3)
    })
    
    expect(result.current.items).toHaveLength(1)
  })

  it('не добавляет дубликаты', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
      result.current.addToCompare(mockProduct1)
    })
    
    expect(result.current.items).toHaveLength(1)
  })

  it('удаляет товар из сравнения', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
      result.current.removeFromCompare('1')
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('toggle добавляет/удаляет товар', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.toggleCompare(mockProduct1)
    })
    
    expect(result.current.items).toHaveLength(1)
    
    act(() => {
      result.current.toggleCompare(mockProduct1)
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('очищает сравнение', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
      result.current.addToCompare(mockProduct2)
      result.current.clearCompare()
    })
    
    expect(result.current.items).toHaveLength(0)
  })

  it('isInCompare возвращает правильное значение', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
    })
    
    expect(result.current.isInCompare('1')).toBe(true)
    expect(result.current.isInCompare('2')).toBe(false)
  })

  it('count возвращает правильное количество', () => {
    const { result } = renderHook(() => useCompare(), { wrapper })
    
    act(() => {
      result.current.addToCompare(mockProduct1)
      result.current.addToCompare(mockProduct2)
    })
    
    expect(result.current.count).toBe(2)
  })
})
