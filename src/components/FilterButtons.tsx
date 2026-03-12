type Props = {
  categories: string[]
  category: string
  setCategory: (c: string) => void
}

export default function FilterButtons({categories, category, setCategory}: Props){
  return (
    <div className="filters">
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter ${category === cat ? 'active' : ''}`}
          onClick={() => setCategory(cat)}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  )
}
