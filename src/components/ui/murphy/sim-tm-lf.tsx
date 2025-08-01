"use client";

import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "./connect-wallet-button";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import {
  mplTokenMetadata,
  createFungible,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  generateSigner,
  percentAmount,
  publicKey as umiPublicKey,
} from '@metaplex-foundation/umi';
import { Loader2, X, CheckCircle2 } from "lucide-react"; // Đã thêm CheckCircle2
import { toast } from "sonner";

// Kiểu dữ liệu cho kết quả
interface TMLaunchpadResult {
  mint: string;
  signature: string;
}

// Props cho component
interface SimplifiedTokenCreatorProps {
  className?: string;
  onTokenCreated?: (result: TMLaunchpadResult) => void;
}

export function SimplifiedTokenCreator({
  className,
  onTokenCreated,
}: SimplifiedTokenCreatorProps) {
  // Dữ liệu token được định nghĩa sẵn.
  const tokenData = {
    name: "VIRAL PLACE",
    symbol: "MAT",
    uri: "https://arweave.net/your-metadata-file-url", 
    decimals: 0,
    supply: 1,
    sellerFeeBasisPoints: 500, // 5%
    isMutable: true,
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
      toast.loading("Preparing your token...", { id: "token-create" });

      const umi = createUmi(connection.rpcEndpoint)
        .use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }))
        .use(mplTokenMetadata());

      const mint = generateSigner(umi);
      
      const creators = [{
        address: umiPublicKey(publicKey.toString()),
        verified: true,
        share: 100,
      }];

      const createResult = await createFungible(umi, {
        mint,
        name: tokenData.name,
        symbol: tokenData.symbol,
        uri: tokenData.uri,
        sellerFeeBasisPoints: percentAmount(tokenData.sellerFeeBasisPoints / 100),
        decimals: tokenData.decimals,
        creators: creators,
        isMutable: tokenData.isMutable,
      }).sendAndConfirm(umi);

      const signature = Buffer.from(createResult.signature).toString('base64');
      
      const resultData: TMLaunchpadResult = {
        mint: mint.publicKey.toString(),
        signature,
      };

      setResult(resultData);
      setCurrentStage('success'); // Chuyển sang trạng thái thành công
      if (onTokenCreated) {
        onTokenCreated(resultData);
      }
      toast.success("Token received!", { id: "token-create" });

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
  
  // Reset chỉ khi có lỗi
  const resetOnError = () => {
    setCurrentStage('input');
    setError("");
  };

  // --- Các hàm render giao diện cho từng trạng thái ---

  // Trạng thái THÀNH CÔNG: Hiển thị thông báo tĩnh
  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center text-center p-4 bg-green-50 border border-green-200 rounded-lg">
      <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
      <p className="text-xs font-mono break-all mt-2 bg-gray-100 p-2 rounded w-full">{result?.mint}</p>
    </div>
  );

  // Trạng thái LỖI: Cho phép thử lại
  const renderError = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
       <X className="h-8 w-8 text-red-500" />
       <p className="text-destructive text-sm">Creation failed. Please try again.</p>
       <Button onClick={resetOnError} variant="outline">
          Try Again
       </Button>
    </div>
  );
  
  // Trạng thái ĐANG CHỜ: Hiển thị spinner
  const renderConfirming = () => (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-muted-foreground">Processing...</span>
    </div>
  );
  
  // Trạng thái BAN ĐẦU: Hiển thị nút kết nối ví hoặc nút tạo token
  const renderInput = () => {
    if (!connected) {
      return <ConnectWalletButton className="w-full" />;
    }
    return (
      <Button
        onClick={handleCreateToken}
        className="w-full"
        disabled={isSubmitting}
      >
        Create Token
      </Button>
    );
  };

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
    <div className={className}>
      {renderContent()}
    </div>
  );
}