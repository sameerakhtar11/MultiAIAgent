import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const conversationSlice=createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        selectedConversation:null
    },
    reducers:{
       setConversation:(state,action)=>{
        state.conversations=action.payload
       },
       addConversation:(state,action)=>{
        state.conversations.unshift(action.payload)
       },
        selectConversation:(state,action)=>{
        state.selectedConversation=action.payload
       }
    }
})

export const{setConversation,addConversation,selectConversation}=conversationSlice.actions
export default conversationSlice.reducer
