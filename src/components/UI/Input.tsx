import type { ComponentPropsWithoutRef } from "react"

interface CustomProps {
  label: string
  id: string
}

type InputProps = CustomProps & ComponentPropsWithoutRef<"input">

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  )
}
