'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2, ScrollText, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export function QuestList() {
  const router = useRouter();
  const [quests, setQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuests();
  }, []);

  async function fetchQuests() {
    try {
      const response = await fetch('/api/quests');
      const data = await response.json();

      if (response.ok) {
        setQuests(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch quests');
      }
    } catch (err) {
      console.log('[v0] Fetch quests error:', err);
      setError('Failed to load quests');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/quests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuests(quests.filter((q) => q.id !== id));
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete quest');
      }
    } catch (err) {
      console.log('[v0] Delete quest error:', err);
      setError('Failed to delete quest');
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
        {error}
      </div>
    );
  }

  if (quests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ScrollText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            You have no quests yet. Create your first quest above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quests.map((quest) => (
        <Card key={quest.id}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {quest.title}
                </h3>
                {quest.isPublic ? (
                  <Globe className="h-4 w-4 text-muted-foreground" title="Public quest" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" title="Private quest" />
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={difficultyColors[quest.difficulty] || difficultyColors.easy}
                >
                  {quest.difficulty || 'easy'}
                </Badge>
                {quest.reward && (
                  <span className="text-sm text-muted-foreground">
                    Reward: {quest.reward}
                  </span>
                )}
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  disabled={deletingId === quest.id}
                >
                  {deletingId === quest.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Delete quest</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Quest</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{quest.title}"? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(quest.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
