import React from 'react'
import type { Product } from '../Products/BaseBroduct'

export default function ProductCard({product}:{product: Product}){
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="product-meta">
          <span className="price">${product.price}</span>
          <span className="rating">{product.rating}★</span>
        </div>
      </div>
    </article>
  )
}
