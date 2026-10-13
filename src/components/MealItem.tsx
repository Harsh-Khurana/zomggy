import { useContext } from "react"
import { currencyFormatter } from "../util/formatting"
import type { Meal } from "./Meals"
import Button from "./UI/Button"
import { CartContext } from "../store/CartContext"

interface MealItemProps {
  meal: Meal
}

export default function MealItem({ meal }: MealItemProps) {
  const { addItem } = useContext(CartContext)

  function handleAddItemToCart() {
    addItem(meal)
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(+meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  )
}
