import Counter from './Counter'

type Props = { cartCount?: number }

export default function Header({cartCount = 0}: Props){
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="brand">Vape Store</h1>
        <Counter count={cartCount} />
      </div>
    </header>
  )
}
