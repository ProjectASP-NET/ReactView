import './styles/App.css'
import { useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
import About from './components/About'
import { components as mockComponents } from './Products/MockData'

function App() {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('all')
    const [cartCount, setCartCount] = useState(0)

    const categories = useMemo(() => {
        const cats = new Set<string>()
        mockComponents.forEach(c => cats.add(c.category))
        return ['all', ...Array.from(cats)]
    }, [])

    const handleAddToCart = () => setCartCount(c => c + 1)

    return (
        <div className="App">
            <Header cartCount={cartCount} />
            <main className="container">
                <Hero
                    query={query}
                    setQuery={setQuery}
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                />
                <ProductList
                    query={query}
                    category={category}
                    onAddToCart={handleAddToCart}
                />
                <About />
            </main>
            <Footer />
        </div>
    )
}

export default App
