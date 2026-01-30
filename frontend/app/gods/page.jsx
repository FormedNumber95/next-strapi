import Link from 'next/link';
import Image from 'next/image';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

export const metadata = {
  title: 'Greek Gods - OlimpoHub',
  description: 'Explore the Olympian gods and goddesses of ancient Greek mythology',
};

async function getGods() {
  try {
    const response = await fetchAPI('/gods?populate=avatar');
    return response.data || [];
  } catch (error) {
    console.log('[v0] Error fetching gods:', error);
    return [];
  }
}

export default async function GodsPage() {
  const gods = await getGods();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            The Greek Gods
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful deities who ruled from Mount Olympus, 
            each commanding their own domain over the mortal and divine realms.
          </p>
        </div>

        {/* Gods Grid */}
        {gods.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gods.map((god) => (
              <Link key={god.id} href={`/gods/${god.slug}`}>
                <Card className="overflow-hidden h-full hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="relative h-48 bg-muted">
                    {god.avatar ? (
                      <Image
                        src={getStrapiMedia(god.avatar.url) || "/placeholder.svg"}
                        alt={god.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Shield className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {god.name}
                    </h2>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                      {god.domain}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No gods found. The Olympians are resting...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
