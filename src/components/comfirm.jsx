import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // If you're using React Router

function PaymentConfirmationPage() {
  const { redirect_status } = useParams(); // Assuming you're using React Router to access URL parameters
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (redirect_status === "succeeded") {
      setMessage("Payment was successful!");
    } else {
      setMessage("Payment failed or was canceled.");
    }
  }, [redirect_status]);

  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>{message}</p>

      {redirect_status === "succeeded" ? (
        <Link to={"/login"}>Go to Login</Link>
      ) : (
        <Link to={"/"}>Try again</Link>
      )}
    </div>
  );
}

export default PaymentConfirmationPage;
