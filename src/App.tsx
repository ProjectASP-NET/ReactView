import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
function App() {
    return (
        <div className="App">
            <Header />
            <main className="container">
                <Hero />
                <ProductList />
            </main>
            <Footer />
        </div>
    )
}

export default App
