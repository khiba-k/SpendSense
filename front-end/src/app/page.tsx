"use client"
import {
  SignIn,
  useUser
} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isSignedIn } = useUser()
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/overview");
    }
  }, [isSignedIn, router])
  return (
    <div className='flex md:row h-screen'>
      <div className='signInBg h-full flex items-center justify-center w-full'><SignIn /></div>
    </div >)
}
