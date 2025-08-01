"use client";

import React from "react";
import { Card } from "./card";
import Image from "next/image";
import Link from "next/link";
import locationsData from "../../data/locations.json";

interface ViralLocationSquaresProps {
  className?: string;
}

export function ViralLocationSquares({ className }: ViralLocationSquaresProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl w-full">
        {locationsData.map((location) => (
          <div key={location.id} className="flex flex-col">
            <Link href={`/location/${location.id}`} className="block">
              <Card className="w-full aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden">
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
            </Link>
            {/* Destination Bar */}
            <div className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3 text-center shadow-md">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-xs font-medium">
                  {location.destination}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 