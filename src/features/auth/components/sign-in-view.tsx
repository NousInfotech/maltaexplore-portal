'use client';
import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function SignInViewPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard/overview');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard/overview');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-muted flex h-screen items-center justify-center'>
      <form
        onSubmit={handleSignIn}
        className='flex w-96 flex-col gap-4 rounded-xl p-8 shadow-lg'
      >
        <h2 className='mb-2 text-center text-2xl font-bold'>
          Sign in to your account
        </h2>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24'>
            <g>
              <path
                fill='#4285F4'
                d='M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.719-1.609-3.938-2.602-6.656-2.602-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.648z'
              />
              <path
                fill='#34A853'
                d='M3.545 7.548l3.086 2.266c.844-1.609 2.406-2.789 4.164-2.789 1.18 0 2.242.406 3.078 1.203l2.32-2.266c-1.406-1.312-3.203-2.109-5.398-2.109-3.672 0-6.75 2.477-7.867 5.844z'
              />
              <path
                fill='#FBBC05'
                d='M12 22c2.438 0 4.484-.797 5.977-2.172l-2.797-2.289c-.781.547-1.781.867-3.18.867-2.75 0-5.078-1.859-5.914-4.406l-3.086 2.391c1.672 3.328 5.203 5.609 9 5.609z'
              />
              <path
                fill='#EA4335'
                d='M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.719-1.609-3.938-2.602-6.656-2.602-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.648z'
              />
            </g>
          </svg>
          Sign in with Google
        </Button>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='text-muted-foreground bg-white px-2'>or</span>
          </div>
        </div>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          disabled={loading}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          disabled={loading}
        />
        {error && (
          <div className='text-center text-sm text-red-500'>{error}</div>
        )}
        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
