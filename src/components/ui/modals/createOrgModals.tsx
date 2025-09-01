"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import contractAbi from "@/abi/index.json";
import { useWallet } from "@/hooks/useWallet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateOrgModal({ open, onOpenChange }: Props) {
  const { connectWallet} = useWallet();
  const router = useRouter();

  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"connect" | "create">("connect");

  const handleConnect = async () => {
    try {
      // connect but avoid redirect so we can continue in the modal flow
      await connectWallet({ redirect: false });
      setStep("create");
    } catch (err) {
      console.error("Wallet connect failed:", err);
    }
  };

  const handleCreateOrganisation = async () => {
    if (!window || !window.ethereum) {
      alert("No ethereum provider available");
      return;
    }
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();

      const contractAddress = "0x9f078c3B5c1F6c34e14DB9Bce07F62653282eb11"; // factory address in repo
      const contract = new ethers.Contract(contractAddress, contractAbi.abi || contractAbi, signer);

      // ABI for Factory.createOrganisation expects (address _tokenAddress, string _name, string _symbol)
      // Use a placeholder token address (zero address) or update to a real token if available.
      const tokenAddress = "0x0000000000000000000000000000000000000000";
      const symbol = orgName ? orgName.slice(0, 4).toUpperCase() : "ORG";

      const tx = await contract.createOrganisation(tokenAddress, orgName, symbol);
      await tx.wait();

      onOpenChange(false);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Error creating organisation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "connect" ? "Connect Wallet" : "Create Organisation"}
          </DialogTitle>
        </DialogHeader>

        {step === "connect" && (
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Please connect your wallet to continue.
            </p>
            <Button onClick={handleConnect}>Connect Wallet</Button>
          </div>
        )}

        {step === "create" && (
          <div className="flex flex-col gap-4">
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organisation Name"
            />
            <Button onClick={handleCreateOrganisation} disabled={loading || !orgName}>
              {loading ? "Creating..." : "Create Organisation"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
