import * as helloService from "./services/hello"

export default async function Home() {
  const res: { message: string } = await helloService.show()

  return (
    <main>
      <h1>Home Page</h1>
      {res.message}
    </main>
  )
}
