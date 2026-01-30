import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

export const metadata = {
  title: 'Greek Temples - OlimpoHub',
  description: 'Explore the sacred temples and sanctuaries of ancient Greece',
};

async function getTemples() {
  try {
    const response = await fetchAPI('/temples?populate=photo');
    return response.data || [];
  } catch (error) {
    console.log('[v0] Error fetching temples:', error);
    return [];
  }
}

export default async function TemplesPage() {
  const temples = await getTemples();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Sacred Temples
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the magnificent temples and sanctuaries where ancient Greeks 
            honored their gods with prayers, offerings, and sacred rituals.
          </p>
        </div>

        {/* Temples Grid */}
        {temples.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {temples.map((temple) => (
              <Link key={temple.id} href={`/temples/${temple.id}`}>
                <Card className="overflow-hidden h-full hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="relative h-48 bg-muted">
                    {temple.photo ? (
                      <Image
                        src={getStrapiMedia(temple.photo.url) || "/placeholder.svg"}
                        alt={temple.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <MapPin className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {temple.name}
                    </h2>
                    {temple.location && (
                      <p className="mt-2 flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {temple.location}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No temples found. The sanctuaries await discovery...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
