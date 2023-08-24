import 'server-only'
import { headers } from "next/headers"
import { Video, Greeting } from '@/types/models'
import { SearchParams } from '@/types/params'
import { createQueryString } from '@/lib/helpers'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const fetchGreetings = async (): Promise<Greeting[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/greetings`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}

export const fetchVideosOnServer = async (searchParams: SearchParams): Promise<Video[]> => {
  try {
    const queryString = createQueryString(searchParams)
    const res = await fetch(`${BASE_URL}/api/videos?${queryString}`, {
      cache: 'no-store',
      headers: headers(),
    })
    return res.json()
  } catch (error) {
    throw error
  }
}