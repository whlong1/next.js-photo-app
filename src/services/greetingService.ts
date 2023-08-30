import "server-only"
import { Greeting } from "@/types/models"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const fetchGreetings = async (): Promise<Greeting[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/greetings`, { cache: "no-store" })
    return res.json()
  } catch (error) {
    throw error
  }
}