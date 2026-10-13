import { useActionState, useContext } from "react"
import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext"
import Button from "./UI/Button"
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input"
import useHttp from "../hooks/useHttp"
import ErrorUI from "./UI/Error"

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
}

export default function Checkout() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const { data, error, sendHttpRequest, clearData } = useHttp<{
    message?: string
  } | null>("orders", requestConfig, null)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + +item.price * item.quantity,
    0,
  )

  function checkoutAction(_: void | null, fd: FormData) {
    const customerData = Object.fromEntries(fd.entries())

    sendHttpRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    )
  }

  const [, formAction, isLoading] = useActionState(checkoutAction, null)

  function handleFinish() {
    userProgressCtx.onCheckoutClose()
    cartCtx.clearCart()
    clearData()
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={userProgressCtx.onCheckoutClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  )

  if (isLoading) {
    actions = <span>Sending order ...</span>
  }

  if (!error && data) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={
          userProgressCtx.progress === "checkout" ? userProgressCtx.onCheckoutClose : undefined
        }
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={
        userProgressCtx.progress === "checkout" ? userProgressCtx.onCheckoutClose : undefined
      }
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <ErrorUI title="Failed to create order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}
