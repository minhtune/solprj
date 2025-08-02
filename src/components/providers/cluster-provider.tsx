"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Cluster = "mainnet" | "devnet";

interface ClusterContextType {
  cluster: Cluster;
  setCluster: (cluster: Cluster) => void;
  isMainnet: boolean;
}

const ClusterContext = createContext<ClusterContextType | undefined>(undefined);

interface ClusterProviderProps {
  children: ReactNode;
  defaultCluster?: Cluster;
}

export function ClusterProvider({ children, defaultCluster = "mainnet" }: ClusterProviderProps) {
  const [cluster, setCluster] = useState<Cluster>(defaultCluster);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration-safe initialization from localStorage
  useEffect(() => {
    const savedCluster = window.localStorage.getItem("NEXT_PUBLIC_CLUSTER") as Cluster;
    if (savedCluster && (savedCluster === "mainnet" || savedCluster === "devnet")) {
      setCluster(savedCluster);
    }
    setIsHydrated(true);
  }, []);

  // Update environment variable when cluster changes
  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem("NEXT_PUBLIC_CLUSTER", cluster);
      
      // Update the global environment variable for components that read it
      (window as any).NEXT_PUBLIC_CLUSTER = cluster;
      
      // Dispatch a custom event to notify components of cluster change
      window.dispatchEvent(new CustomEvent("clusterChanged", { detail: { cluster } }));
    }
  }, [cluster, isHydrated]);

  const value: ClusterContextType = {
    cluster,
    setCluster,
    isMainnet: cluster === "mainnet",
  };

  return (
    <ClusterContext.Provider value={value}>
      {children}
    </ClusterContext.Provider>
  );
}

export function useCluster() {
  const context = useContext(ClusterContext);
  if (context === undefined) {
    throw new Error("useCluster must be used within a ClusterProvider");
  }
  return context;
}

// Helper function to get current cluster from environment
export function getCurrentCluster(): Cluster {
  // Fallback to environment variable or default
  const envCluster = process.env.NEXT_PUBLIC_CLUSTER;
  if (envCluster === "mainnet" || envCluster === "devnet") {
    return envCluster;
  }
  
  return "mainnet";
} 
