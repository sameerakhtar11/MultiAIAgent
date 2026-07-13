import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user);
const dispatch=useDispatch()

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data))
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      console.log(token);
      await handleLogin(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0f14] text-white">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]"></div>

<SideBar/>
<ChatArea/>
<Artifact/>

      {!userData && (
        <>
          {/* Login Card */}
          <div className="relative z-10 w-[380px] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-3xl font-bold shadow-lg">
                AI
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-center text-3xl font-bold">
              Multi Agent AI
            </h1>

            <p className="mt-3 text-center text-sm text-gray-400">
              Sign in with your Google account to access your AI workspace.
            </p>

            {/* Google Button */}
            <button
              onClick={googleLogin}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-gray-800 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 active:scale-95"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="mx-3 text-xs text-gray-500">
                Secure Authentication
              </span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs leading-5 text-gray-500">
              By continuing, you agree to our{" "}
              <span className="cursor-pointer text-blue-400 hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-blue-400 hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;