import SearchBar from './SearchBar'
import FilterButtons from './FilterButtons'

type Props = {
  query: string
  setQuery: (v: string) => void
  categories: string[]
  category: string
  setCategory: (c: string) => void
}

export default function Hero({query, setQuery, categories, category, setCategory}: Props){
  return (
    <section className="hero">
      <div className="hero-inner">
        <h2 className="hero-title">Find your perfect vape</h2>
        <SearchBar value={query} onChange={setQuery} />
        <FilterButtons categories={categories} category={category} setCategory={setCategory} />
      </div>
    </section>
  )
}
