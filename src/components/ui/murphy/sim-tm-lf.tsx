"use client";

import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// --- Import các thành phần UI cần thiết ---
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "./connect-wallet-button";

// --- Import các thư viện UMI/Metaplex ---
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata, createV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { generateSigner, percentAmount, publicKey as umiPublicKey } from '@metaplex-foundation/umi';

// --- Import Icons và Notifications ---
import { Coins, Loader2, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// --- Định nghĩa kiểu dữ liệu cho kết quả (giống code cũ) ---
interface TMLaunchpadResult {
  mint: string;
  signature: string;
}

// --- Props cho component (giống code cũ) ---
interface SimplifiedTokenCreatorProps {
  className?: string;
  onTokenCreated?: (result: TMLaunchpadResult) => void;
}

// --- DỮ LIỆU NFT MẶC ĐỊNH (đã đổi tên biến) ---
const tokenData = {
  name: "VIRAL PLACE", // Giữ lại tên từ code mới hoặc đổi theo ý bạn
  symbol: "AON",
  // Quan trọng: Thay thế bằng URL hình ảnh của bạn
  uri: "https://arweave.net/uDIb_4M2T5D4FllSCo3bVRaxb4omg1Jsc25BwR6y5oY", 
  sellerFeeBasisPoints: 500, // 5%
  isMutable: true,
};

export function SimplifiedTokenCreator({
  className,
  onTokenCreated,
}: SimplifiedTokenCreatorProps) {
  // --- State Hooks (kết hợp từ hai phiên bản) ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStage, setCurrentStage] = useState<'input' | 'confirming' | 'success' | 'error'>('input');
  const [result, setResult] = useState<TMLaunchpadResult | null>(null);
  const [error, setError] = useState<string>("");

  // --- Wallet Hooks ---
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, connected } = wallet;

  // --- Hàm xử lý chính khi nhấn nút (đã đổi tên) ---
  const handleCreateToken = async () => {
    if (!connected || !publicKey) {
      toast.error("Vui lòng kết nối ví của bạn trước.");
      return;
    }

    setIsSubmitting(true);
    setCurrentStage('confirming');
    setError("");
    setResult(null);
    const toastId = "token-creation";
    toast.loading("Đang khởi tạo giao dịch...", { id: toastId });

    try {
      const umi = createUmi(connection.rpcEndpoint)
        .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata());

      const mint = generateSigner(umi);

      const creators = [{
        address: umiPublicKey(publicKey.toBase58()),
        verified: true,
        share: 100,
      }];

      toast.info("Vui lòng xác nhận giao dịch trong ví của bạn...", { id: toastId });

      const createResult = await createV1(umi, {
        mint: mint,
        name: tokenData.name,
        symbol: tokenData.symbol,
        uri: tokenData.uri,
        sellerFeeBasisPoints: percentAmount(tokenData.sellerFeeBasisPoints / 100),
        creators: creators,
        isMutable: tokenData.isMutable,
        tokenStandard: TokenStandard.NonFungible,
      }).sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' },
      });
      
      // Sử dụng lại kiểu dữ liệu và định dạng signature từ code cũ
      const resultData: TMLaunchpadResult = {
        mint: mint.publicKey,
        signature: Buffer.from(createResult.signature).toString('base64'), 
      };

      setResult(resultData);
      setCurrentStage('success');
      toast.success("Tạo Token thành công!", {
        id: toastId,
        description: `Mint: ${resultData.mint}`,
      });

      // **Gọi callback onTokenCreated nếu có**
      if (onTokenCreated) {
        onTokenCreated(resultData);
      }

    } catch (err: any) {
      console.error("Lỗi khi tạo token:", err);
      const errorMessage = err.message || "Đã xảy ra lỗi không xác định.";
      setError(errorMessage);
      setCurrentStage('error');
      toast.error("Tạo Token thất bại", {
        id: toastId,
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetState = () => {
    setCurrentStage('input');
    setResult(null);
    setError("");
    setIsSubmitting(false);
  }

  // --- Các hàm render giao diện cho từng trạng thái ---

  const renderSuccess = () => (
    <div className="text-center space-y-4">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="font-semibold">Hoàn thành!</h3>
        <p className="text-sm text-muted-foreground">
            NFT của bạn đã được tạo thành công.
        </p>
        <div className="text-left bg-secondary/50 rounded-lg p-3 text-xs break-all">
            <p><strong>Address:</strong> {result?.mint}</p>
        </div>
    </div>
  );
  
  const renderError = () => (
    <div className="text-center space-y-4">
        <X className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="font-semibold">Tạo thất bại</h3>
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
            {error}
        </p>
        <Button onClick={resetState} variant="outline" className="w-full">Thử lại</Button>
    </div>
  );

  const renderConfirming = () => (
    <div className="flex items-center justify-center space-x-2 h-10">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-muted-foreground">Đang xử lý...</span>
    </div>
  );

  const renderInput = () => {
    if (!connected) {
      return <ConnectWalletButton className="w-full" />;
    }

    return (
      <Button
        onClick={handleCreateToken}
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        <Coins className="mr-2 h-4 w-4" />
        Create NFT
      </Button>
    );
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'confirming':
        return renderConfirming();
      case 'success':
        return renderSuccess();
      case 'error':
        return renderError();
      case 'input':
      default:
        return renderInput();
    }
  };

  return (
    <Card className={className}>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}