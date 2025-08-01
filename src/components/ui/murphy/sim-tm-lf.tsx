"use client";

import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "./connect-wallet-button";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import {
  mplTokenMetadata,
  createFungible,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  generateSigner,
  percentAmount,
  publicKey as umiPublicKey,
} from '@metaplex-foundation/umi';
import { Coins, Loader2, X } from "lucide-react";
import { toast } from "sonner";

// Kiểu dữ liệu cho kết quả
interface TMLaunchpadResult {
  mint: string;
  signature: string;
  tokenType: string;
}

// Props cho component (tùy chọn, để có thể tái sử dụng)
interface SimplifiedTokenCreatorProps {
  className?: string;
  onTokenCreated?: (result: TMLaunchpadResult) => void;
  // Bạn có thể truyền dữ liệu token mặc định qua props nếu muốn
  defaultTokenData?: {
    name: string;
    symbol: string;
    description: string;
    image: string;
    decimals: number;
    supply: number;
    sellerFeeBasisPoints: number;
    isMutable: boolean;
    tokenType?: string;
  }
}

export function SimplifiedTokenCreator({
  className,
  onTokenCreated,
  defaultTokenData
}: SimplifiedTokenCreatorProps) {
  // Dữ liệu token được định nghĩa sẵn.
  // Nếu không được truyền qua props, nó sẽ sử dụng giá trị mặc định này.
  const tokenData = defaultTokenData || {
    name: "My Awesome Token",
    symbol: "MAT",
    description: "A token created with default settings.",
    image: "https://arweave.net/your-image-url", // **QUAN TRỌNG:** Thay đổi URL hình ảnh của bạn!
    decimals: 9,
    supply: 1_000_000,
    sellerFeeBasisPoints: 500, // 5%
    isMutable: true,
    tokenType: 'fungible',
  };

  // State hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStage, setCurrentStage] = useState<'input' | 'confirming' | 'success' | 'error'>('input');
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<TMLaunchpadResult | null>(null);

  // Wallet hooks
  const { publicKey, connected, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();

  // Handler để tạo token
  const handleCreateToken = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first.");
      return;
    }

    try {
      setIsSubmitting(true);
      setCurrentStage('confirming');
      setError("");
      toast.loading("Creating your token...", { id: "token-create" });

      // Create UMI instance
      const umi = createUmi(connection.rpcEndpoint)
        .use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }))
        .use(mplTokenMetadata());

      // Generate mint keypair
      const mint = generateSigner(umi);
      
      // Định nghĩa người tạo (creator) là ví đã kết nối
      const creators = [
        {
          address: umiPublicKey(publicKey.toString()),
          verified: true, // Tự động xác thực vì họ là người ký giao dịch
          share: 100,
        },
      ];

      // Create fungible token
      const createResult = await createFungible(umi, {
        mint,
        name: tokenData.name,
        symbol: tokenData.symbol,
        uri: tokenData.image, // Sử dụng hình ảnh làm URI cho đơn giản
        sellerFeeBasisPoints: percentAmount(tokenData.sellerFeeBasisPoints / 100),
        decimals: tokenData.decimals,
        creators: creators,
        isMutable: tokenData.isMutable,
      }).sendAndConfirm(umi);

      const signature = Buffer.from(createResult.signature).toString('base64');
      
      const resultData: TMLaunchpadResult = {
        mint: mint.publicKey.toString(),
        signature,
        tokenType: tokenData.tokenType || 'fungible',
      };

      setResult(resultData);
      setCurrentStage('success');
      if (onTokenCreated) {
        onTokenCreated(resultData);
      }
      toast.success("Token created successfully!", { id: "token-create" });

    } catch (err: any) {
      console.error("Error creating token:", err);
      const errorMessage = err.message || "An unknown error occurred.";
      setError(errorMessage);
      setCurrentStage('error');
      toast.error("Failed to create token", {
        id: "token-create",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Hàm để reset lại trạng thái
  const reset = () => {
    setCurrentStage('input');
    setError("");
    setResult(null);
  };

  // Các hàm render giao diện cho các trạng thái khác nhau (success, error, confirming)
  const renderSuccess = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Coins className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold">Token Created!</h3>
      <div className="bg-secondary/50 rounded-lg p-4 text-left">
          <p className="text-sm"><strong>Mint Address:</strong></p>
          <p className="text-sm font-mono break-all">{result?.mint}</p>
      </div>
      <Button onClick={reset} className="w-full">Create Another</Button>
    </div>
  );

  const renderError = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <X className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold">Creation Failed</h3>
      <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-left">
        <p className="text-sm break-words">{error}</p>
      </div>
      <Button onClick={reset} className="w-full">Try Again</Button>
    </div>
  );

  const renderConfirming = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h3 className="text-lg font-semibold">Creating Token...</h3>
      <p className="text-sm text-muted-foreground">Please approve the transaction in your wallet.</p>
    </div>
  );
  
  const renderInput = () => (
    <div className="text-center space-y-4">
       <p className="text-muted-foreground">Click the button below to mint your default token.</p>
       {!connected ? (
          <ConnectWalletButton className="w-full" />
        ) : (
          <Button
            onClick={handleCreateToken}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Create Token"
            )}
          </Button>
        )}
    </div>
  );


  // Render nội dung chính dựa trên trạng thái
  const renderContent = () => {
    switch (currentStage) {
      case 'confirming': return renderConfirming();
      case 'success': return renderSuccess();
      case 'error': return renderError();
      case 'input':
      default:
        return renderInput();
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-6 w-6" />
          Simplified Token Creator
        </CardTitle>
        <CardDescription>
          One-click creation for a pre-configured token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}