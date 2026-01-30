import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Columns3, BookOpen, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';

async function getFeaturedGod() {
  try {
    const response = await fetchAPI('/gods?populate=avatar&pagination[limit]=1');
    return response.data?.[0] || null;
  } catch (error) {
    console.log('[v0] Error fetching featured god:', error);
    return null;
  }
}

export default async function HomePage() {
  const featuredGod = await getFeaturedGod();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Columns3 className="h-16 w-16 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Welcome to OlimpoHub
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Embark on a journey through the ancient world of Greek mythology. 
              Discover powerful gods, legendary myths, and sacred temples that 
              shaped Western civilization.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/gods">
                  Explore Gods
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/myths">
                  Read Myths
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
            Discover the Ancient World
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="font-serif text-xl">Greek Gods</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Meet the Olympian gods and goddesses who ruled from Mount Olympus, 
                  each with their unique powers and domains.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="font-serif text-xl">Ancient Myths</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Explore timeless tales of heroes, monsters, and divine interventions 
                  that have captivated humanity for millennia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="font-serif text-xl">Sacred Temples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Visit the magnificent temples and sanctuaries where ancient Greeks 
                  worshipped their divine patrons.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured God Section */}
      {featuredGod && (
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
              Featured God
            </h2>
            <Card className="overflow-hidden max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row">
                {featuredGod.avatar && (
                  <div className="relative w-full md:w-64 h-64 md:h-auto bg-muted">
                    <Image
                      src={getStrapiMedia(featuredGod.avatar.url) || "/placeholder.svg"}
                      alt={featuredGod.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {featuredGod.name}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                    {featuredGod.domain}
                  </span>
                  {featuredGod.symbol && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      <strong>Symbol:</strong> {featuredGod.symbol}
                    </p>
                  )}
                  <Button asChild className="mt-4 bg-transparent" variant="outline">
                    <Link href={`/gods/${featuredGod.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
            Begin Your Quest
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Sign in to access the Oracle and create your own mythological quests.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/login">
              Enter the Oracle
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
