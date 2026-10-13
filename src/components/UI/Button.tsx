import type { ComponentPropsWithoutRef, ReactNode } from "react"

interface CustomProps {
  children: ReactNode
  textOnly?: boolean
  className?: string
}

type ButtonProps = CustomProps & ComponentPropsWithoutRef<"button">

export default function Button({ children, textOnly, className = "", ...props }: ButtonProps) {
  let cssClasses = textOnly ? "text-button" : "button"
  cssClasses += " " + className

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  )
}
