import { currencyFormatter } from "../util/formatting"

interface CartItemProps {
  name: string
  price: string
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

export default function CartItem({ name, price, quantity, onDecrease, onIncrease }: CartItemProps) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  )
}
