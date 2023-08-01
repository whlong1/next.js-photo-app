import { SignUp } from "@clerk/nextjs"

// Resources on optional catch all routes:
// https://clerk.com/docs/nextjs/signin#embedding-a-sign-in-component
// https://www.youtube.com/watch?v=ZHn726VDoIY&ab_channel=Codevolution
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

//? "The difference between catch-all and optional catch-all segments is that 
//? with optional, the route without the parameter is also matched"

const SignUpPage = () => {
  return <SignUp />
}

export default SignUpPage