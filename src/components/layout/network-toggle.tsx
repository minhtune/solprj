"use client"

import { useCluster } from "@/components/providers/cluster-provider"
import { Switch } from "@/components/ui/switch"

export function NetworkToggle() {
  const { cluster, setCluster } = useCluster()
  const isMainnet = cluster === "mainnet"

  return (
    <div className="flex items-center gap-2 ml-2">
      <span className="text-xs text-muted-foreground">DEV</span>
      <Switch
        id="network-switch"
        checked={isMainnet}
        onCheckedChange={(checked: boolean) => setCluster(checked ? "mainnet" : "devnet")}
        className="scale-75"
      />
      <span className="text-xs text-muted-foreground">MAIN</span>
    </div>
  )
}