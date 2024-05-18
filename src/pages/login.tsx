import React, { useState } from 'react'
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { useAuthContext } from '../context';
import { differenceInDays } from 'date-fns';
import { Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { setLoggedIn, loginUser: loginUserContext } = useAuthContext();

    const validateEmail = (email) => {
        // Simple email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        // Validate email format
        if (validateEmail(email)) {
            try {
                const docRef = doc(db, "users", email);
                const docSnap = await getDoc(docRef);
                const difference = differenceInDays(new Date(), new Date(docSnap?.data()?.trialStartDate.seconds * 1000));
                const allow = difference < 32 && docSnap?.data()?.subscription === 'pro' || difference < 8 && docSnap?.data()?.subscription === 'free'
                if (docSnap.exists() && allow) {
                    await signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            // console.log("Document data:", docSnap.data());
                            setLoggedIn(true);
                            loginUserContext(docSnap.data());
                            toast.success("Logged in successfully");
                        }).catch((error) => {
                            toast.error(error.message)
                            setIsLoading(false)
                            return
                        });
                } else if (docSnap.exists() && difference > 8 && docSnap?.data()?.subscription === 'free') {
                    toast.error('Your free demo has expired')
                    setIsLoading(false)

                    return
                } else if (docSnap.exists() && difference > 32 && docSnap?.data()?.subscription === 'pro') {
                    toast.error('Your subscription has expired')
                    setIsLoading(false)

                    return
                }
                else {
                    toast.error('This email has no account with us')
                    setIsLoading(false)

                    return
                }

            } catch (error) {
                // Handle form submission error (e.g., display error message)
                console.error("Error submitting form:", error);
                setIsLoading(false)

            }
        } else {
            toast.error("Please enter a valid email address.");
            setIsLoading(false)

        }
    };
    return (
        <div className="pt-24 text-center w-screen text-black min-h-[90.1vh]">
            <div>
                <h1 className="mt-4">Login to Our Platform</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="w-[400px] mx-auto px-8">
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
                        onChange={e => setEmail(e.target.value)}
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
                        placeholder="Enter your company email address"
                        name="passsword"
                        className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-Opurple text-white mt-4 flex items-center gap-3 justify-center">
                    Login
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                </button>
            </form>
        </div>
    )
}
