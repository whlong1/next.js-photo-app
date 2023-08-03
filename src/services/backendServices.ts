import 'server-only'
import { headers } from "next/headers"
import { Video, Greeting } from '@/types/models'
import { VideoSearchParams } from '@/types/props'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const fetchGreetings = async (): Promise<Greeting[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/greetings`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}

export const fetchVideosOnServer = async (searchParams: VideoSearchParams): Promise<Video[]> => {
  try {
    const queryString = Object.keys(searchParams).map((k) => {
      const key = k as keyof typeof searchParams
      return `${key}=${searchParams[key]}`
    }).join("&")

    const res = await fetch(`${BASE_URL}/api/videos?${queryString}`, {
      cache: 'no-store',
      headers: headers(),
    })

    return res.json()
  } catch (error) {
    throw error
  }
}