import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import type { BaseProduct } from '../Products/BaseBroduct'
import { components as mockComponents } from '../Products/MockData'

type Props = {
	query?: string
	category?: string
	onAddToCart?: () => void
}

export default function ProductList({ query = '', category = 'all', onAddToCart }: Props) {
	const [items, setItems] = useState<BaseProduct[]>(mockComponents)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const urlSearch = useMemo(() => new URLSearchParams(window.location.search), [])
	const urlQuery = (urlSearch.get('query') || urlSearch.get('q') || '').toString()
	const urlCategory = (urlSearch.get('category') || '').toString()
	const urlCategoryFromPath = useMemo(() => {
		const parts = window.location.pathname.split('/').filter(Boolean)
		const idx = parts.findIndex(p => p === 'category')
		if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
		if (parts.length === 1) return parts[0]
		return ''
	}, [])

	const effectiveQuery = query || urlQuery
	const effectiveCategory = category || urlCategory || urlCategoryFromPath || 'all'

	useEffect(() => {
		const controller = new AbortController()
		let mounted = true

		async function load() {
			setLoading(true)
			setError(null)
			try {
				const res = await fetch('https://fakestoreapi.com/products', { signal: controller.signal })
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const data = await res.json()

				const mapped: BaseProduct[] = (Array.isArray(data) ? data : []).map((it: any, idx: number) => ({
					id: Number(it.id) || 0,
					name: (it.title ?? it.name ?? `No name ${idx}`).toString(),
					description: (it.description ?? '').toString(),
					price: Number(it.price) || 0,
					image: it.image ?? '',
					rating: typeof it.rating === 'object' ? Number(it.rating?.rate ?? 0) : Number(it.rating ?? 0) || 0,
					category: String(it.category ?? 'uncategorized')
				}))
				const normalized = mapped.map(m => {
					const rawId = Number(m.id) || 0
					const stableId = rawId > 0 ? rawId + 10000 : 100000 + Math.floor(Math.random() * 900000)
					return { ...m, id: stableId }
				})
				const existingNames = new Set(mockComponents.map(m => m.name.toLowerCase()))
				const toAdd = normalized.filter(n => !existingNames.has(n.name.toLowerCase()))
				const merged = [...mockComponents, ...toAdd]

				if (mounted) setItems(merged)
			} catch (e: any) {
				if (e?.name === 'AbortError') return
				setError(String(e?.message ?? e))
				if (mounted) setItems(mockComponents)
			} finally {
				if (mounted) setLoading(false)
			}
		}

		load()
		return () => {
			mounted = false
			controller.abort()
		}
	}, [])

	const filtered = useMemo(() => {
		const q = (effectiveQuery || '').toLowerCase()
		const cat = (effectiveCategory || 'all').toLowerCase()
		return items.filter(i => {
			const matchCategory = cat === 'all' || cat === '' || i.category.toLowerCase() === cat
			const matchQuery = !q || i.name.toLowerCase().includes(q)
			return matchCategory && matchQuery
		})
	}, [items, effectiveQuery, effectiveCategory])

	if (loading) return <section className="product-list">Загрузка...</section>
	if (error) return <section className="product-list">Ошибка: {error}</section>

	return (
		<section className="product-list">
			{filtered.length === 0 ? (
				<div className="empty">Ничего не найдено</div>
			) : (
				<div className="grid">
					{filtered.map(p => (
						<ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
					))}
				</div>
			)}
		</section>
	)
}
