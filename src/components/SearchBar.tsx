type Props = {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({value, onChange}: Props){
  return (
    <div className="searchbar">
      <input
        placeholder="Search products..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
