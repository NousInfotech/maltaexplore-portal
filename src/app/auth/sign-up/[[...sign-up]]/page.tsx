// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Metadata } from 'next';
import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default async function Page() {
  // Removed unused stars variable
  return <SignUpViewPage />;
}
