import { SignUp } from '@clerk/nextjs'

const SignupPage = () => {
  return <SignUp path="/signup" routing="path" signInUrl="/sign-in" />
}

export default SignupPage
