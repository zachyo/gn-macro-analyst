import React, { useState } from "react";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { languages } from "../../utils/constants";
import { auth, db } from "../../utils/firebase";
import { Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const formEmptyState = {
  email: "",
  name: "",
  size: undefined,
  lang: "",
  password: ''
};

export const Form = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState(formEmptyState);
  const [isLoading, setIsLoading] = useState(false);

  const { email } = formState;
  const { setLoggedIn, loginUser: loginUserContext } = useAuthContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email format
    if (validateEmail(email)) {
      try {
        // Add a new document with a generated id.
        const docRefCheck = doc(db, "users", email);
        const docSnap = await getDoc(docRefCheck);
        if (docSnap.exists()) {
          toast.error("Email is already in use. Login instead");
          setIsLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, formState.password).then(
          (userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user)
            // ...
          }
        );
        const docRef = await setDoc(doc(db, "users", formState.email), {
          email : formState.email,
          lang : formState.lang,
          name : formState.name,
          size : formState.size,
          subscription: "free",
          trialStartDate: Timestamp.fromDate(new Date()),
        });
        // console.log("Document written with ID: ", docRef.id);
        setLoggedIn(true);
        loginUserContext(formState);
        // console.log(docRef);
        toast.success("Logged in successfully");
        setIsLoading(false);

        // navigate("/overview");
      } catch (error) {
        // Handle form submission error (e.g., display error message)
        console.error("Error submitting form:", error);
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
    }
  };

  const storeUserData = async (
    userId,
    formState,
    subscription,
    trialStartDate
  ) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .set({
        ...formState,
        subscription: subscription,
        trialStartDate: trialStartDate,
      });
  };
  const validateEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className=" px-8">
        <h1 className="text-2xl text-left">Start a Demo</h1>
        <p className="mt-1 text-left">
          Discover the Future of News: Join us at the forefront of innovation as
          we redefine how you consume and interpret news. Our demo is just the
          beginning of your journey towards a more insightful and engaging news
          experience.
        </p>
        <div className="flex gap-5 mt-3 mb-6">
          <div className="flex flex-col flex-1 gap-3 mt-6">
            <label
              htmlFor="email"
              className="text-[#202020] text-left text-[14px]"
            >
              Email
              <span className="text-[red]">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your personal/company email address"
              name="email"
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1 gap-3 mt-6">
            <label
              htmlFor="password"
              className="text-[#202020] text-left text-[14px]"
            >
              Password
              <span className="text-[red]">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3 my-3">
          <label
            htmlFor="name"
            className="text-[#202020] text-left text-[14px]"
          >
            Company name
            <span className="text-[red]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            name="name"
            className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex gap-5 mt-3 mb-6">
          <div className="flex flex-col flex-1 gap-3">
            <label
              htmlFor="size"
              className="text-[#202020] text-left text-[14px]"
            >
              Company size
              <span className="text-[red]">*</span>
            </label>
            <input
              type="number"
              placeholder="0"
              min={0}
              name="size"
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1 gap-3">
            <label htmlFor="languageSelect" className="text-left text-[14px]">
              Select a Language:
            </label>
            <select
              name="lang"
              id="languageSelect"
              required
              onChange={handleInputChange}
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select Language</option>
              {languages.map((language, index) => (
                <option key={index} value={language.value}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-Opurple text-white flex items-center gap-3 justify-center"
        >
          Start Free Demo
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </button>
      </form>
    </div>
  );
};
