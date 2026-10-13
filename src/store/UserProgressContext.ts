import { createContext } from "react"

export const UserProgressContext = createContext<{
  progress: "" | "cart" | "checkout"
  onCartOpen: () => void
  onCartClose: () => void
  onCheckoutOpen: () => void
  onCheckoutClose: () => void
}>({
  progress: "",
  onCartOpen: () => {},
  onCartClose: () => {},
  onCheckoutOpen: () => {},
  onCheckoutClose: () => {},
})
