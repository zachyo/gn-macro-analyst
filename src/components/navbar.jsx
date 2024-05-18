import React from "react";
import { useAuthContext } from "../context";
import logo from "../assets/A6E531F8-11B7-412F-B5AD-E859E9B97DEC.png";
import { signInWithGooglePopup, signOutOfGoogle } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate()
  const { loggedIn, setLoggedIn, setAuthToken, loginUser : loginUserContext, logoutUser } = useAuthContext();
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
      console.log(response.user);
      toast.success("Logged in successfully");
      navigate("/overview");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logOutGoogleUser = async () => {
    try {
      // const response = await signOutOfGoogle();
      // console.log(response);
      logoutUser();
      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="text-white bg-black py-4 px-5 lg:px-12 fixed w-full z-10 flex justify-between items-center">
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="news logo"
          className="h-9 lg:h-14 w-9 lg:w-14 rounded-lg"
        />
        <h2 className="text-xl lg:text-2xl text-left">GN Macro Analyst</h2>
      </div>
      {!loggedIn ? (
        <button
          className="text-Opurple bg-white text-xs lg:text-[1em]"
          onClick={() => navigate("/login")}
        >
          Login to your account
        </button>
      ) : (
        <button
          className="text-Opurple bg-white text-xs lg:text-[1em]"
          onClick={logOutGoogleUser}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};
