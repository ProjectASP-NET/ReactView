import { describe, it, expect } from 'vitest'
import { PAGES } from '../../config/pages.config'

describe('pages.config', () => {
  it('имеет правильный HOME', () => {
    expect(PAGES.HOME).toBe('/')
  })

  it('имеет правильный CATALOG', () => {
    expect(PAGES.CATALOG).toBe('/catalog')
  })

  it('имеет правильный CART', () => {
    expect(PAGES.CART).toBe('/cart')
  })

  it('имеет правильный MATCHER', () => {
    expect(PAGES.MATCHER).toBe('/matcher')
  })

  it('имеет правильный ABOUT', () => {
    expect(PAGES.ABOUT).toBe('/about')
  })

  it('имеет правильный AUTH', () => {
    expect(PAGES.AUTH).toBe('/auth')
  })

  describe('getProduct', () => {
    it('возвращает правильный путь для товара', () => {
      expect(PAGES.getProduct('123')).toBe('/catalog/123')
    })
  })

  describe('getCatalog', () => {
    it('возвращает базовый путь каталога без параметров', () => {
      expect(PAGES.getCatalog()).toBe('/catalog')
    })

    it('возвращает путь каталога с параметром сортировки', () => {
      expect(PAGES.getCatalog('cheap')).toBe('/catalog?sort=cheap')
    })
  })
})
