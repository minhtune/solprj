"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card } from "./card";
import { SimplifiedTokenCreator } from "./murphy/sim-tm-lf";
import Image from "next/image";
import locationsData from "../../data/locations.json";

interface ViralLocationSquaresProps {
  className?: string;
}

export function ViralLocationSquares({ className }: ViralLocationSquaresProps) {
  const { connected } = useWallet();

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl w-full">
        {locationsData.map((location) => (
          <div key={location.id} className="flex flex-col items-center">
            <Card className="w-full aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-2 border-blue-200 dark:border-blue-800 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              <div className="text-center relative z-10">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                <h3 className="font-semibold text-sm md:text-base text-white drop-shadow-lg">
                  {location.name}
                </h3>
                <p className="text-xs text-gray-200 mt-1 drop-shadow-lg">
                  Viral Hotspot
                </p>
              </div>
            </Card>
            {/* Only show the token creator when wallet is connected */}
            {connected && (
              <div className="w-full">
                <SimplifiedTokenCreator 
                  className="w-full"
                  tokenMetadata={location.tokenMetadata}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 