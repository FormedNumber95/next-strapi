import { redirect } from 'next/navigation';
import { Eye } from 'lucide-react';
import { isAuthenticated, getUser } from '@/lib/auth';
import { QuestForm } from '@/components/oracle/quest-form';
import { QuestList } from '@/components/oracle/quest-list';
import { LogoutButton } from '@/components/oracle/logout-button';

export const metadata = {
  title: 'Oracle - OlimpoHub',
  description: 'Your personal oracle - manage your mythological quests',
};

export default async function OraclePage() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/login');
  }

  const user = await getUser();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Eye className="h-10 w-10 text-primary" />
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                The Oracle
              </h1>
              {user && (
                <p className="text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{user.username}</span>
                </p>
              )}
            </div>
          </div>
          <LogoutButton />
        </div>

        <p className="text-muted-foreground mb-8">
          The Oracle sees all and guides your path. Create and manage your personal quests, 
          challenges bestowed upon mortals by the gods themselves.
        </p>

        {/* Create Quest Form */}
        <div className="mb-12">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Create a New Quest
          </h2>
          <QuestForm />
        </div>

        {/* Quest List */}
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Your Quests
          </h2>
          <QuestList />
        </div>
      </div>
    </div>
  );
}
