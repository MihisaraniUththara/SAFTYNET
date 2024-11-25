import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("If the email address is registered, a reset link has been sent.");
    } catch (error) {
      // Ensure the error object is properly typed
      if (error instanceof Error) {
        const errorCode = (error as any).code; // Access error code

        switch (errorCode) {
          case 'auth/invalid-email':
            toast.error("The email address is not valid.");
            break;
          case 'auth/user-not-found':
            toast.error("No account found with this email address.");
            break;
          default:
            toast.error("Could not send reset password email. Please try again later.");
            break;
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }

  return (
    <>
    <Header/>
    <section>
      <h1 className="text-3xl text-center mt-3 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://img.freepik.com/free-photo/member-log-membership-username-password-concept_53876-120613.jpg?t=st=1725516608~exp=1725520208~hmac=d0105bb92181fc7cb393a632ed2a3205ce8b69252af2a9e5e33f2a757913ae22&w=1380"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <label className="block text-gray-800 mb-2 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="eg: user@gmail.com"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send reset password
            </button>
          </form>
        </div>
      </div>
    </section>
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-10">
    <p className="text-gray-400">&copy; {new Date().getFullYear()} SafetyNet. All rights reserved.</p>
    </footer>
    </>
  );
}
