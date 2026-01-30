import Link from 'next/link';
import { Columns3, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Columns3 className="h-20 w-20 text-muted-foreground mb-6" />
      
      <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
        Lost in the Labyrinth
      </h1>
      
      <p className="text-muted-foreground max-w-md mb-2">
        Even Theseus needed Ariadne's thread to find his way. 
        The page you seek has vanished like the morning mist on Mount Olympus.
      </p>
      
      <p className="text-sm text-muted-foreground mb-8">
        Error 404 - Page Not Found
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Olympus
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/gods">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Explore the Gods
          </Link>
        </Button>
      </div>
    </div>
  );
}
