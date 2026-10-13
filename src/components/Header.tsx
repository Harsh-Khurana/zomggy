import { useContext } from "react"
import logoImg from "../assets/logo.jpg"
import Button from "./UI/Button"
import { CartContext } from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext"

export default function Header() {
  const { items } = useContext(CartContext)
  const { onCartOpen } = useContext(UserProgressContext)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="cutlery logo" />
        <h1>Zomggy</h1>
      </div>
      <nav>
        <Button textOnly onClick={onCartOpen}>
          Cart({totalItems})
        </Button>
      </nav>
    </header>
  )
}
