import { redirect } from 'next/navigation';
import { Eye } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Login - OlimpoHub',
  description: 'Sign in to access the Oracle and manage your mythological quests',
};

export default async function LoginPage() {
  // Redirect if already authenticated
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect('/oracle');
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Eye className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Enter the Oracle
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your personal quests and divine revelations
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
