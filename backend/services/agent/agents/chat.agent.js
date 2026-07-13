import { getModel } from "../config/llmModels"


export const chatAgent=async(state)=>{
    const llm=await getModel("chat")
    const systemPrompt="You are MultiAgentAI,an intelligent AI assistant."
    const response=await llm.invoke([
        {
            "role":"system",
            "content":systemPrompt
        },
        {
            "role":"human",
            "content":state.prompt
        }
    ])

    return{
        ...state,
        aiResponse:aiResponse.content
    }
}
