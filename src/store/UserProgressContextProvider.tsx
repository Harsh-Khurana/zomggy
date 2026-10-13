import { useState, type ReactNode } from "react"
import { UserProgressContext } from "./UserProgressContext"

interface UserProgressContextProviderProps {
  children: ReactNode
}

export default function UserProgressContextProvider({
  children,
}: UserProgressContextProviderProps) {
  const [userProgress, setUserProgress] = useState<"" | "cart" | "checkout">("")

  function onCartOpen() {
    setUserProgress("cart")
  }

  function onCartClose() {
    setUserProgress("")
  }

  function onCheckoutOpen() {
    setUserProgress("checkout")
  }

  function onCheckoutClose() {
    setUserProgress("")
  }

  return (
    <UserProgressContext.Provider
      value={{ progress: userProgress, onCartClose, onCartOpen, onCheckoutClose, onCheckoutOpen }}
    >
      {children}
    </UserProgressContext.Provider>
  )
}
