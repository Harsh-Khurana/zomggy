import { useContext } from "react"
import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext"
import Button from "./UI/Button"
import { UserProgressContext } from "../store/UserProgressContext"
import { currencyFormatter } from "../util/formatting"
import CartItem from "./CartItem"

export default function Cart() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + +item.price * item.quantity,
    0,
  )

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? userProgressCtx.onCartClose : undefined}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={userProgressCtx.onCartClose}>
          Close
        </Button>
        <Button onClick={userProgressCtx.onCheckoutOpen}>Go to Checkout</Button>
      </p>
    </Modal>
  )
}
