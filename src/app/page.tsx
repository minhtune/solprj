"use client";

import { ViralLocationSquares } from "@/components/ui/viral-location-squares";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

export default function Home() {
  const trendingLocationsRef = useRef<HTMLElement>(null);

  const scrollToTrendingLocations = () => {
    trendingLocationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/Image/images1089892_1.jpg)' }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium bg-white/90 text-gray-900 hover:bg-white">
            🗺️ Revolutionary Travel Technology
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            ATLAS
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            Transform every location visit into a unique digital asset. 
            <span className="font-semibold text-blue-200"> Proof of Experience</span> meets the future of travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              onClick={scrollToTrendingLocations}
            >
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/30 rounded-full blur-xl opacity-60 z-5"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-xl opacity-60 z-5"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Beyond Simple Check-ins
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ATLAS revolutionizes how we experience and value our travels through blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Digital Assets */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎨</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Unique Digital Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Instead of a simple check-in action on social media, ATLAS turns each experience of visiting a specific location into owning a unique digital asset (NFT). Every location becomes a collectible piece of your travel story.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2: Proof of Experience */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏆</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Proof of Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  The project creates a "Proof of Experience" model, where the value of the NFT is directly linked to the rarity and exclusivity of the real-world location, thereby creating a valuable and tradable digital travel journal.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3: New Economy */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-green-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💎</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  New Economy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  ATLAS is not just building a check-in application; we are creating a new economy for the experiential tourism industry, where every step taken by users is transformed into a valuable, scarce, and tradable digital asset.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Verified by Your Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Every step taken by users is transformed into a valuable, scarce, and tradable digital asset, verified by their own journey. Join the future of experiential tourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
              Connect Wallet
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              Explore Locations
            </Button>
          </div>
        </div>
      </section>

      {/* Viral Location Squares Section */}
      <section ref={trendingLocationsRef} className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Locations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most trending and viral hotspots across the network. 
            Each location represents a unique opportunity for engagement and growth.
          </p>
        </div>
        <ViralLocationSquares className="flex-1" />
      </section>
    </div>
  );
}
