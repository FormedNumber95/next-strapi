import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

async function getMyth(slug) {
  try {
    const response = await fetchAPI(`/myths?filters[slug][$eq]=${slug}&populate=cover,god.avatar`);
    return response.data?.[0] || null;
  } catch (error) {
    console.log('[v0] Error fetching myth:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const myth = await getMyth(slug);
  
  if (!myth) {
    return { title: 'Myth Not Found - OlimpoHub' };
  }

  return {
    title: `${myth.title} - OlimpoHub`,
    description: myth.summary || `Read the ancient Greek myth: ${myth.title}`,
  };
}

export default async function MythDetailPage({ params }) {
  const { slug } = await params;
  const myth = await getMyth(slug);

  if (!myth) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/myths">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Myths
          </Link>
        </Button>

        {/* Cover Image */}
        {myth.cover && (
          <div className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden mb-8">
            <Image
              src={getStrapiMedia(myth.cover.url) || "/placeholder.svg"}
              alt={myth.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Myth Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            {myth.title}
          </h1>
          
          {myth.summary && (
            <p className="text-lg text-muted-foreground italic">
              {myth.summary}
            </p>
          )}
        </div>

        {/* Related God */}
        {myth.god && (
          <Card className="mb-8">
            <CardContent className="p-4">
              <Link href={`/gods/${myth.god.slug}`} className="flex items-center gap-4 group">
                <div className="relative w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                  {myth.god.avatar ? (
                    <Image
                      src={getStrapiMedia(myth.god.avatar.url) || "/placeholder.svg"}
                      alt={myth.god.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Shield className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Related God</p>
                  <p className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {myth.god.name}
                  </p>
                  {myth.god.domain && (
                    <span className="text-xs text-primary capitalize">
                      God of {myth.god.domain}
                    </span>
                  )}
                </div>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {myth.content && (
          <div className="prose prose-neutral max-w-none">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: myth.content }}
            />
          </div>
        )}

        {!myth.content && (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              The full content of this myth is being transcribed from ancient scrolls...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
