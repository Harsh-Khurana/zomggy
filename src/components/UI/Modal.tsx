import { useEffect, useRef, type ReactNode } from "react"

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose?: () => void
  className?: string
}

export default function Modal({ children, open, onClose, className = "" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = dialogRef.current

    if (open) {
      modal?.showModal()
    }

    return () => modal?.close()
  }, [open])

  return (
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>
  )
}
