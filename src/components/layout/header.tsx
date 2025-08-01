"use client"

import { NetworkToggle } from "./network-toggle"
import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Network Toggle */}
        <div className="flex items-center">
          <NetworkToggle />
        </div>
        
        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            ATLAS
          </h1>
        </div>
        
        {/* Right side - Connect Wallet */}
        <div className="flex items-center">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
} 