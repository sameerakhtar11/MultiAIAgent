import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
        selectedConversation: null
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        addConversation: (state, action) => {
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        }
    }
})

export const { setConversations, addConversation, setSelectedConversation } = conversationSlice.actions
export default conversationSlice.reducer
