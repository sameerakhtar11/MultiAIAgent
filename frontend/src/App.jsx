import { signInWithPopup } from "@firebase/auth";
import React, { useEffect } from "react";
import { auth,googleProvider } from "../utils/firebase";
import api from "../utils/axios";
import Home from "./pages/Home";
import getCurrentUser from "./features/getCurrentUser";
import { setUserData } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


function App() {
 const {userData}= useSelector(state=>state.user)
 console.log(userData)
const dispatch=useDispatch()

  useEffect(()=>{
const getUser=async()=>{
 const data= await getCurrentUser()
 dispatch(setUserData(data))

}
getUser()
  },[])

  return (
    <>
    <Home/>
    </>
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-gray-700"
    //   onClick={googleLogin}>
    //     Continue with Google
    //   </button>
    // </div>
  );
}

export default App;