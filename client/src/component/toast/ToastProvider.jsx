import { useState } from "react"
import ToastContext from "./toastService"
import ToastNoti from "./ToastNoti"

export default function ToastProvider({ children }) {
    const [toasts, setToast] = useState([])


    const open = (component, timeout = 3000) => {
        const id = Date.now()
        setToast(toasts => [...toasts, { id, component }])

        setTimeout(() => close(id), timeout)
    }

    const close = (id) =>
        setToast((toasts) => toasts.filter((toasts) => toasts.id !== id))
    return (
        <ToastContext.Provider value={{ open, close }}>
            {children}
            <div className="space-y-5 absolute bottom-4 right-4">
                {
                    toasts.map(({ id, component }) => (
                        <div key={id} className="relative">
                            {component}
                        </div>
                    ))
                }
            </div>
        </ToastContext.Provider>
    )
}