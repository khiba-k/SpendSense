import {
  SignIn
} from '@clerk/nextjs'
export default function Home() {
  return (
    <div>This is the Home Page
      <SignIn />
    </div>)
}
