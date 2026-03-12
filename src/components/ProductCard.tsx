import { useState } from 'react'
import type { BaseProduct } from '../Products/BaseBroduct'

export default function ProductCard({product, onAddToCart}:{product: BaseProduct, onAddToCart?: ()=>void}){
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  function toggleLike(){
    setLikes(prev => (liked ? Math.max(0, prev - 1) : prev + 1))
    setLiked(prev => !prev)
  }

  return (
    <article className="product-card" title={product.name}>
      <div className="product-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">{product.rating}★</span>
        </div>
        <div className="product-actions">
          <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            aria-pressed={liked}
            onClick={toggleLike}
            title={liked ? 'Удалить лайк' : 'Поставить лайк'}
          >
            <span className="heart" aria-hidden>♥</span>
            <span className="count">{likes}</span>
          </button>

          <button className="add-btn" onClick={() => onAddToCart && onAddToCart()}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </article>
  )
}
