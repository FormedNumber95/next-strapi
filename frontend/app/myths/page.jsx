import { Suspense } from 'react';
import { BookOpen } from 'lucide-react';
import { fetchAPI } from '@/lib/strapi';
import { MythsGrid } from '@/components/myths/myths-grid';
import { MythsFilters } from '@/components/myths/myths-filters';

export const metadata = {
  title: 'Greek Myths - OlimpoHub',
  description: 'Explore ancient Greek myths and legends, from heroic tales to divine interventions',
};

async function getMyths() {
  try {
    const response = await fetchAPI('/myths?populate=cover,god');
    return response.data || [];
  } catch (error) {
    console.log('[v0] Error fetching myths:', error);
    return [];
  }
}

async function getGods() {
  try {
    const response = await fetchAPI('/gods');
    return response.data || [];
  } catch (error) {
    console.log('[v0] Error fetching gods for filter:', error);
    return [];
  }
}

export default async function MythsPage({ searchParams }) {
  const [myths, gods] = await Promise.all([getMyths(), getGods()]);
  const params = await searchParams;
  const searchQuery = params?.search || '';
  const godFilter = params?.god || '';
  const domainFilter = params?.domain || '';

  // Get unique domains from gods
  const domains = [...new Set(gods.map((g) => g.domain).filter(Boolean))];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Ancient Myths
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Journey through timeless tales of heroes, monsters, and gods. 
            Each myth carries the wisdom and wonder of ancient Greece.
          </p>
        </div>

        {/* Filters */}
        <MythsFilters 
          gods={gods} 
          domains={domains}
          currentSearch={searchQuery}
          currentGod={godFilter}
          currentDomain={domainFilter}
        />

        {/* Myths Grid */}
        <Suspense fallback={<MythsGridSkeleton />}>
          <MythsGrid 
            myths={myths} 
            searchQuery={searchQuery}
            godFilter={godFilter}
            domainFilter={domainFilter}
          />
        </Suspense>
      </div>
    </div>
  );
}

function MythsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}
