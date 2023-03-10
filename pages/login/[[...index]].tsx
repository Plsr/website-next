import { SignIn } from '@clerk/nextjs'

const SignupPage = () => {
  return <SignIn path="/login" routing="path" />
}

export default SignupPage
