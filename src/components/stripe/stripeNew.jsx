import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { db } from "../../utils/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

const CheckoutForm = ({ amount, email }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const validateEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (elements == null) {
      setIsLoading(false);
      return;
    }
    if (validateEmail(email)) {
      setIsLoading(false);
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_STRIPE_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        amount: amount * 100,
        currency: "usd",
        "automatic_payment_methods[enabled]": true,
      }),
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://gnmacroanalyst-gnappllc.web.app/login",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {

      const docRef = doc(db, "users", email);
      await updateDoc(docRef, {
        subscription: "pro",
        trialStartDate: Timestamp.fromDate(new Date()),
      });

      toast.success("Payment was successfull");
      setIsLoading(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="w-full bg-Opurple text-white flex items-center gap-3 justify-center mt-5"
      >
        Pay
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_live_51PB68OD798xubUzn9Ghk7Wx6fDmfpi8APjCaMxv9yitHpv7MttZYvAV7LWUQRjZj6cg1bX7MpmgZNT7ewmwSirpi00GUiJLqZ8"
);

const StripeApp = ({ amount }) => {
  const [email, setEmail] = useState(null);

  const newAmount = Math.round(amount * 100);
  const options = {
    mode: "payment",
    amount: newAmount,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <div className="">
      <div className="flex flex-col flex-1 gap-3 mt-6 mb-3">
        <label htmlFor="email" className="text-[#202020] text-left text-[14px]">
          Email
          <span className="text-[red]">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your company email address"
          name="email"
          className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} email={email} />
      </Elements>
    </div>
  );
};

export default StripeApp;
