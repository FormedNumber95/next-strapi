import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getStrapiMedia } from '@/lib/strapi';

export function MythsGrid({ myths, searchQuery, godFilter, domainFilter }) {
  // Filter myths based on search and filters
  const filteredMyths = myths.filter((myth) => {
    // Search filter
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      const matchesTitle = myth.title?.toLowerCase().includes(search);
      const matchesSummary = myth.summary?.toLowerCase().includes(search);
      if (!matchesTitle && !matchesSummary) return false;
    }

    // God filter
    if (godFilter && myth.god?.slug !== godFilter) {
      return false;
    }

    // Domain filter
    if (domainFilter && myth.god?.domain !== domainFilter) {
      return false;
    }

    return true;
  });

  if (filteredMyths.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          {myths.length === 0 
            ? 'No myths found. The stories remain unwritten...'
            : 'No myths match your search criteria.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredMyths.map((myth) => (
        <Link key={myth.id} href={`/myths/${myth.slug}`}>
          <Card className="overflow-hidden h-full hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="relative h-40 bg-muted">
              {myth.cover ? (
                <Image
                  src={getStrapiMedia(myth.cover.url) || "/placeholder.svg"}
                  alt={myth.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h2 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {myth.title}
              </h2>
              {myth.god && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {myth.god.name}
                </span>
              )}
              {myth.summary && (
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {myth.summary}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
