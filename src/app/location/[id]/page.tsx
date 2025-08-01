"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimplifiedTokenCreator } from "@/components/ui/murphy/sim-tm-lf";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import locationsData from "@/data/locations.json";

export default function LocationPage() {
  const params = useParams();
  const { connected } = useWallet();
  const locationId = parseInt(params.id as string);
  
  const location = locationsData.find(loc => loc.id === locationId);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-6">The location you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Locations
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {location.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {location.tokenMetadata.name}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  {location.status}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  Viral Hotspot
                </span>
              </div>
            </div>

            {/* NFT Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                NFT Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Symbol:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Royalty Fee:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.sellerFeeBasisPoints / 100}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mutable:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.isMutable ? "Yes" : "No"}
                  </span>
                </div>
                <div className="pt-3 border-t">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Metadata URI:
                  </span>
                  <p className="text-xs text-blue-600 dark:text-blue-400 break-all mt-1">
                    {location.tokenMetadata.uri}
                  </p>
                </div>
              </div>
            </Card>

            {/* Token Creator */}
            {connected && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Create NFT
                </h2>
                <SimplifiedTokenCreator 
                  className="w-full"
                  tokenMetadata={location.tokenMetadata}
                />
              </Card>
            )}

            {!connected && (
              <Card className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Create NFT
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Connect your wallet to create an NFT for this location.
                </p>
                <Button disabled>
                  Connect Wallet to Continue
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 