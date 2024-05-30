import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { cart, refetch } = useCart();
    const { user } = useAuth();
    const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
    const navigate = useNavigate();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [totalPrice, axiosSecure])

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)

        if (!stripe || !elements) {
            setLoading(false)
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            setLoading(false)
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setLoading(false)
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('paymentMethoed', paymentMethod)
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (error) {
            console.log('confirmError', confirmError)
        }
        else {
            console.log('paymentIntent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', transactionId)
                setTransactionId(paymentIntent.id)
                // toast.success('payment succeeded')

                // save the payment in database
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                try {
                    const { data } = await axiosSecure.post('/payments', payment)
                    if (data.paymentResult.insertedId) {
                        refetch()
                        setLoading(false)
                        Swal.fire({
                            icon: "success",
                            title: `payment is added to the payments`,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        navigate('/dashboard/paymentHistory')
                    }
                }
                catch (err) {
                    toast.error(err.message);
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-[70%] mx-auto space-y-5">
                <CardElement
                    className="border p-5"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-end">
                    <button disabled={!stripe || !clientSecret} type="submit" className="btn btn-primary px-10 text-xl">
                        {loading ? <TbFidgetSpinner className='animate-spin text-xl m-auto' /> : 'Pay'}
                    </button>
                </div>
            </form>
            <p className="text-sm text-red-500 text-center mt-5">{error}</p>
        </div>
    );
};

export default CheckoutForm;