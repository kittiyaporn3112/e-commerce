import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import '../../../src/stripe.css'
import { saveOrder } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { useToast } from '../toast/toastService'
import ToastSuccess from '../toast/ToastSuccess'
import ToastWarning from '../toast/ToastWarning'
import { useNavigate } from 'react-router-dom'


export default function CheckoutForm() {
    const token = useEcomStore((state) => state.token)
    const clearCart = useEcomStore((state) => state.clearCart)
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        console.log('payload', payload)
        if (payload.error) {
            setMessage(payload.error.message);
            console.log("error");
        }
        else if (payload.paymentIntent.status === 'succeeded') {
            console.log('ready to save order')
            //create order
            saveOrder(token, payload)
                .then((res) => {
                    console.log(res)
                    toast.open(<ToastSuccess message='ชำระเงินสำเร็จ' />)
                    clearCart()
                    navigate('/user/history')
                })
                .catch((err) => console.log(err))
        }
        else {
            console.log('something w0rng')
            toast.open(<ToastWarning message='ชำระเงินไม่สำเร็จ' />)
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className="stripe-button"
                disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div className="mt-5" id="payment-message">{message}</div>}
        </form>
    );
}