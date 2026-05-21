import { describe, it, expect } from 'vitest'
import { SortLogic } from '../../utility/SortLogic'
import { Product } from '@/types/product.types'

const mockProducts: Product[] = [
  { id: '1', name: 'Product A', price: 100, img: '/a.jpg', InStock: true, LikeCount: 5, type: 'liquid', volume: 30, flavor: ['berry'], nicotine: 12, Icelevel: 50 },
  { id: '2', name: 'Product B', price: 300, img: '/b.jpg', InStock: true, LikeCount: 15, type: 'liquid', volume: 50, flavor: ['fruits'], nicotine: 6, Icelevel: 25 },
  { id: '3', name: 'Product C', price: 200, img: '/c.jpg', InStock: false, LikeCount: 10, type: 'vape', batteryCapacity: 1500, maxPower: 80, color: 'black', TankCapacity: 4, CoilResistence: 0.5 },
]

describe('SortLogic', () => {
  it('сортирует по цене: дешевые первые', () => {
    const result = SortLogic(mockProducts, 'cheap')
    expect(result[0].price).toBe(100)
    expect(result[2].price).toBe(300)
  })

  it('сортирует по цене: дорогие первые', () => {
    const result = SortLogic(mockProducts, 'expensive')
    expect(result[0].price).toBe(300)
    expect(result[2].price).toBe(100)
  })

  it('сортирует по новизне: новые первые (по id)', () => {
    const result = SortLogic(mockProducts, 'new')
    expect(result[0].id).toBe('3')
    expect(result[2].id).toBe('1')
  })

  it('сортирует по новизне: старые первые (по id)', () => {
    const result = SortLogic(mockProducts, 'old')
    expect(result[0].id).toBe('1')
    expect(result[2].id).toBe('3')
  })

  it('сортирует по лайкам: популярные первые', () => {
    const result = SortLogic(mockProducts, 'mliked')
    expect(result[0].LikeCount).toBe(15)
    expect(result[2].LikeCount).toBe(5)
  })

  it('сортирует по лайкам: непопулярные первые', () => {
    const result = SortLogic(mockProducts, 'lliked')
    expect(result[0].LikeCount).toBe(5)
    expect(result[2].LikeCount).toBe(15)
  })

  it('не изменяет оригинальный массив', () => {
    const original = [...mockProducts]
    SortLogic(mockProducts, 'cheap')
    expect(mockProducts).toEqual(original)
  })

  it('по умолчанию сортирует как new (новые первые)', () => {
    const result = SortLogic(mockProducts, 'default')
    expect(result[0].id).toBe('3')
  })
})
