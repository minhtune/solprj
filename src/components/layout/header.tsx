"use client"

import { NetworkToggle } from "./network-toggle"
import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">ATLAS</h1>
          <NetworkToggle />
        </div>
        
        <div className="flex items-center gap-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
} 