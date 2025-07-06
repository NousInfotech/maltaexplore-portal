import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};
interface PageProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Page({ isDark, onToggleTheme }: PageProps) {
  return <SignUpViewPage isDark={isDark} onToggleTheme={onToggleTheme} />;
}
