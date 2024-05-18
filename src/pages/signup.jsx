import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "../context";
import { toast } from "sonner";
import { useState } from "react";
import { Form } from "../components/form/form";
import { Pricing } from "../components/pricing";
import { IoMdClose } from "react-icons/io";
import CheckoutWrapper from "../components/stripe/CheckoutWrapper";
import StripeApp from "../components/stripe/stripeNew";

const SignIn = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    amount: 0,
  });

  const {
    setLoggedIn,
    loginUser: loginUserContext,
    logoutUser,
    setAuthToken,
  } = useAuthContext();
  const navigate = useNavigate();
  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;
      // The signed-in user info.
      setAuthToken(token);
      setLoggedIn(true);
      loginUserContext(response.user);
      toast.success("Logged in successfully");
      navigate("/overview");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="pt-24 text-center w-screen text-black min-h-[90.1vh]">
      {!showCheckout ? (
        <div>
          <h1 className="mt-4">Welcome to Our Platform</h1>
          {/* <p>Please provide your company email to get started:</p> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-16 gap-8 lg:gap-0">
            <Form />
            <div className="px-8 border-x border-gray-400">
              <h1 className="text-2xl text-left">Schedule a consultation</h1>
              <p className="mt-1 text-left">
                Book Your Session: Seamlessly schedule your consultation
                directly from our header, ensuring prompt access to the
                expertise you need, when you need it. Our intuitive booking
                system simplifies the process, allowing you to focus on what
                truly matters—your growth and success.
              </p>
              <a
                href="https://calendly.com/gnmacroanalystsupport"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-Opurple text-white mt-8 w-full">
                  Schedule a Consultation
                </button>
              </a>
            </div>
            <div>
              <Pricing
                setCheckoutDetails={setCheckoutDetails}
                setShowCheckout={setShowCheckout}
              />
              {/* <CheckoutWrapper /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[500px] mx-auto mb-10">
          <button
            className="w-full mt-2 bg-[#E5E5E5] flex justify-between items-center"
            onClick={() => {
              setShowCheckout(false);
            }}
          >
            Close <IoMdClose />
          </button>
          <p className="font-semibold my-4">Amount : ${checkoutDetails.amount}</p>
          <StripeApp amount={checkoutDetails.amount} />
        </div>
      )}
      <button className="bg-Opurple text-white hidden" onClick={logGoogleUser}>
        Sign In With Google
      </button>
    </div>
  );
};
export default SignIn;
