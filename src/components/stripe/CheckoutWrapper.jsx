import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function CheckoutWrapper() {
  const stripePromise = loadStripe(
    "pk_live_51PB68OD798xubUzn9Ghk7Wx6fDmfpi8APjCaMxv9yitHpv7MttZYvAV7LWUQRjZj6cg1bX7MpmgZNT7ewmwSirpi00GUiJLqZ8"
  );
  
  const options = {
    mode: "payment",
    amount: 1,
    currency: "usd",
    // passing the client secret obtained from the server
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
