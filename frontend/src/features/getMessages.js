import React from "react";
import api from "../../utils/axios";

async function getMessages(id) {
    try {
        const { data } = await api(`/api/chat/get-messages/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

export default getMessages;