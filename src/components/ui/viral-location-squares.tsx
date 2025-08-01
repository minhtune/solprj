import React from "react";
import { Card } from "./card";
import { SimplifiedTokenCreator } from "./murphy/sim-tm-lf";
import Image from "next/image";

interface ViralLocationSquaresProps {
  className?: string;
}

const locations = [
  { id: 1, name: "Downtown", status: "active", image: "/Image/Pic00001.png" },
  { id: 2, name: "Beachfront", status: "active", image: "/Image/Pic00002.png" },
  { id: 3, name: "Mountain View", status: "active", image: "/Image/Pic00003.png" },
  { id: 4, name: "City Center", status: "active", image: "/Image/Pic00004.png" },
  { id: 5, name: "Riverside", status: "active", image: "/Image/Pic00005.png" },
  { id: 6, name: "Park District", status: "active", image: "/Image/Pic00006.png" },
  { id: 7, name: "Harbor Bay", status: "active", image: "/Image/Pic00007.png" },
  { id: 8, name: "Skyline", status: "active", image: "/Image/Pic00008.png" },
];

export function ViralLocationSquares({ className }: ViralLocationSquaresProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl w-full">
        {locations.map((location) => (
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
            <div className="w-full">
              <SimplifiedTokenCreator 
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 