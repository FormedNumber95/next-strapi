import Link from 'next/link';
import { Columns3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Columns3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">OlimpoHub</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              href="/gods"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Gods
            </Link>
            <Link
              href="/myths"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Myths
            </Link>
            <Link
              href="/temples"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Temples
            </Link>
            <Link
              href="/oracle"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Oracle
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Exploring the myths and legends of ancient Greece
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            OlimpoHub - A journey through Mount Olympus
          </p>
        </div>
      </div>
    </footer>
  );
}
