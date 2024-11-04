'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function chatWithGemini(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const chat = model.startChat()
    const result = await chat.sendMessage(message)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error in Gemini chat:', error)
    return 'Sorry, I encountered an error. Please try again.'
  }
}