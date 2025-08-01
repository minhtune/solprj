import { ViralLocationSquares } from "@/components/ui/viral-location-squares";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Viral Location Squares Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            CHECK IN TO ATLAS - LOCATIONS NFT
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
