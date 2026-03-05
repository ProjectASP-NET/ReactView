import { useState } from 'react'
import SearchBar from './SearchBar'
import FilterButtons from './FilterButtons'

export default function Hero(){
  const [query, setQuery] = useState('')
  return (
    <section className="hero">
      <div className="hero-inner">
        <h2 className="hero-title">Find your perfect vape</h2>
        <SearchBar value={query} onChange={setQuery} />
        <FilterButtons />
      </div>
    </section>
  )
}
