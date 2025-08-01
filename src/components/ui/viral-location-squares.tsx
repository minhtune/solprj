import React from "react";
import { Card } from "./card";
import { SimplifiedTokenCreator } from "./murphy/sim-tm-lf";

interface ViralLocationSquaresProps {
  className?: string;
}

const locations = [
  { id: 1, name: "Downtown", status: "active" },
  { id: 2, name: "Beachfront", status: "active" },
  { id: 3, name: "Mountain View", status: "active" },
  { id: 4, name: "City Center", status: "active" },
  { id: 5, name: "Riverside", status: "active" },
  { id: 6, name: "Park District", status: "active" },
  { id: 7, name: "Harbor Bay", status: "active" },
  { id: 8, name: "Skyline", status: "active" },
];

export function ViralLocationSquares({ className }: ViralLocationSquaresProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {locations.map((location) => (
          <div key={location.id} className="flex flex-col items-center">
            <Card className="w-full aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-2 border-blue-200 dark:border-blue-800 mb-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200">
                  {location.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Viral Hotspot
                </p>
              </div>
            </Card>
            <div className="w-full">
              <SimplifiedTokenCreator 
                className="w-full"
                defaultTokenData={{
                  name: `${location.name} Token`,
                  symbol: location.name.substring(0, 3).toUpperCase(),
                  description: `Token for ${location.name} viral location`,
                  image: "https://arweave.net/your-image-url",
                  decimals: 9,
                  supply: 1_000_000,
                  sellerFeeBasisPoints: 500,
                  isMutable: true,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 