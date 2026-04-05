import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('имеет темную тему по умолчанию', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('dark')
  })

  it('переключает тему с dark на light', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    await act(async () => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('light')
  })

  it('переключает тему обратно с light на dark', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    await act(async () => {
      result.current.toggleTheme()
    })
    await act(async () => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('dark')
  })

  it('сохраняет тему в localStorage', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    await act(async () => {
      result.current.toggleTheme()
    })
    
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('загружает сохраненную тему из localStorage', async () => {
    localStorage.setItem('theme', 'light')
    
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    
    expect(result.current.theme).toBe('light')
  })
})
