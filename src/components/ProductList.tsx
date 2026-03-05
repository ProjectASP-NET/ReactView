import React from 'react'
import ProductCard from './ProductCard'
import { components } from '../Products/MockData'

export default function ProductList(){
  return (
    <section className="product-list">
      <div className="grid">
        {components.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
