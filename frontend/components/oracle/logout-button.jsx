'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      router.push('/login');
      router.refresh();
    } catch (err) {
      console.log('[v0] Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Leaving...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </>
      )}
    </Button>
  );
}
