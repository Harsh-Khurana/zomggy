import { createContext } from "react"
import type { Meal } from "../components/Meals"

export const CartContext = createContext<{
  items: (Meal & { quantity: number })[]
  addItem: (item: Meal) => void
  removeItem: (id: string) => void
  clearCart: () => void
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
})
