import Counter from './Counter'

export default function Header(){
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="brand">Vape Store</h1>
        <Counter />
      </div>
    </header>
  )
}
