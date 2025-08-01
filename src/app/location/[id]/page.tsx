"use client";

import React, { useState } from "react";
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
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const location = locationsData.find(loc => loc.id === locationId);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-8 px-4">
      {/* Success Message Overlay */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-xl max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Check-in Successful!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You have successfully checked in at {location.name}. You can now create your NFT.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-white/80 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Locations
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Image Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2">
            <Card className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 66vw"
                />
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
            </Card>
            {/* Destination Bar */}
            <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-center shadow-md">
              <div className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-lg font-semibold">
                  {location.destination}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section - Takes up 1/3 of the space */}
          <div className="space-y-6">
            {/* Location Info */}
            <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {location.name}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                {location.tokenMetadata.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                  {location.status}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  Viral Hotspot
                </span>
              </div>
            </Card>

            {/* NFT Details */}
            <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                NFT Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Symbol:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.symbol}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Royalty Fee:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.sellerFeeBasisPoints / 100}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mutable:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {location.tokenMetadata.isMutable ? "Yes" : "No"}
                  </span>
                </div>
                <div className="pt-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                    Metadata URI:
                  </span>
                  <p className="text-xs text-blue-600 dark:text-blue-400 break-all bg-blue-50 dark:bg-blue-950/50 p-2 rounded">
                    {location.tokenMetadata.uri}
                  </p>
                </div>
              </div>
            </Card>

            {/* Check-in Section */}
            <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                CHECK IN - GET NFT
              </h2>
              
              {!isCheckedIn ? (
                <div className="text-center">
                  <Button 
                    onClick={handleCheckIn}
                    className="w-full max-w-xs bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Check In Now
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Check in to unlock NFT creation for this location
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Checked In Successfully!</span>
                  </div>
                  
                  {connected ? (
                    <div className="flex justify-center">
                      <SimplifiedTokenCreator 
                        className="w-full max-w-xs"
                        tokenMetadata={location.tokenMetadata}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Connect your wallet to create an NFT for this location.
                      </p>
                      <Button disabled className="w-full max-w-xs">
                        Connect Wallet to Continue
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 