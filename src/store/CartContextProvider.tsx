import { useReducer, type ReactNode } from "react"
import { CartContext } from "./CartContext"
import type { Meal } from "../components/Meals"

interface CartState {
  items: (Meal & { quantity: number })[]
}

interface CartAddAction {
  type: "ADD_ITEM"
  item: Meal
}

interface CartRemoveAction {
  type: "REMOVE_ITEM"
  id: string
}

interface CartClearAction {
  type: "CLEAR"
}

type CartAction = CartAddAction | CartRemoveAction | CartClearAction

function cartReducer(state: CartState, action: CartAction) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items]

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex]

    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return { ...state, items: updatedItems }
  }
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items]

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex]

    if (updatedItems[existingCartItemIndex].quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1)
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return { ...state, items: updatedItems }
  }
  if (action.type === "CLEAR") {
    return { items: [] }
  }
  return state
}

interface CartContextProviderProps {
  children: ReactNode
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  function addItem(item: Meal) {
    dispatchCartAction({ type: "ADD_ITEM", item })
  }

  function removeItem(id: string) {
    dispatchCartAction({ type: "REMOVE_ITEM", id })
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR" })
  }

  return (
    <CartContext.Provider value={{ items: cart.items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
