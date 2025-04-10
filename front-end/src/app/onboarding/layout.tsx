import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const sessionClaims = (await auth()).sessionClaims as { metadata?: { onboardingComplete?: boolean } };
  if (sessionClaims?.metadata?.onboardingComplete === true) {
    redirect('/overview')
  }

  return <>{children}</>
}