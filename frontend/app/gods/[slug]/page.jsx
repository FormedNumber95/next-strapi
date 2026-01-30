import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Shield, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

async function getGod(slug) {
  try {
    const response = await fetchAPI(`/gods?filters[slug][$eq]=${slug}&populate=avatar,myths`);
    return response.data?.[0] || null;
  } catch (error) {
    console.log('[v0] Error fetching god:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const god = await getGod(slug);
  
  if (!god) {
    return { title: 'God Not Found - OlimpoHub' };
  }

  return {
    title: `${god.name} - OlimpoHub`,
    description: god.description?.substring(0, 160) || `Learn about ${god.name}, the Greek god of ${god.domain}`,
  };
}

export default async function GodDetailPage({ params }) {
  const { slug } = await params;
  const god = await getGod(slug);

  if (!god) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/gods">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gods
          </Link>
        </Button>

        {/* God Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative w-full md:w-72 h-72 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            {god.avatar ? (
              <Image
                src={getStrapiMedia(god.avatar.url) || "/placeholder.svg"}
                alt={god.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Shield className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {god.name}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full capitalize">
                <Shield className="mr-2 h-4 w-4" />
                {god.domain}
              </span>
              {god.symbol && (
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">
                  Symbol: {god.symbol}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {god.description && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              About {god.name}
            </h2>
            <div 
              className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: god.description }}
            />
          </div>
        )}

        {/* Related Myths */}
        {god.myths && god.myths.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Related Myths
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {god.myths.map((myth) => (
                <Link key={myth.id} href={`/myths/${myth.slug}`}>
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold text-foreground hover:text-primary transition-colors">
                        {myth.title}
                      </h3>
                      {myth.summary && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {myth.summary}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
