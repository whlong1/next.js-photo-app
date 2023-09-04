// Hooks
import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"

// Documentation:
// https://react.dev/reference/react/useTransition

export const useMutationTransition = (transitionClassNames: string) => {
  const [isMutating, setIsMutating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleTransition = async (mutation: () => Promise<void>) => {
    try {
      setIsMutating(true)
      await mutation()
      startTransition(() => {
        router.refresh()
      })
      setIsMutating(false)
    } catch (error) {
      console.log(error)
    }
  }

  const transitionStyle = isMutating || isPending ? transitionClassNames : ""

  return { handleTransition, transitionStyle }
}
