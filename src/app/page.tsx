import * as helloService from "./services/hello"

export default async function Home() {
  const res: { message: string, greetings: [] } = await helloService.show()
  console.log("response:", res)

  return (
    <main>
      <h1>Home Page</h1>
      {res.message}
    </main>
  )
}
