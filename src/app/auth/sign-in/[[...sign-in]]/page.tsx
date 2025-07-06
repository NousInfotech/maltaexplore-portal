import SignInViewPage from '@/features/auth/components/sign-in-view';

interface PageProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Page({ isDark, onToggleTheme }: PageProps) {
  return <SignInViewPage isDark={isDark} onToggleTheme={onToggleTheme} />;
}
