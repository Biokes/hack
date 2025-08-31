// hooks/useWallet.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setWallet, clearWallet, setUserType } from "../store/walletSlice";
import { useCallback, useEffect } from "react";
import { EIP1193Provider } from "viem";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum: EIP1193Provider | undefined;
  }
}

const adminWallets = [
  "0x6dC4F7e7dC254777B8301eF3f89dD7757740c5f7".toLowerCase(),
];
export function useWallet() {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);
  const router = useRouter();

  const connectWallet = useCallback(async (options?: { redirect?: boolean }) => {
    const { redirect = true } = options || {};
    if (!window.ethereum) {
      toast("Metamask not detected");
      return;
    }

    try {
      const provider = window.ethereum;
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const chainId = await provider.request({ method: "eth_chainId" });



      toast("Wallet connected successfully");
      if (adminWallets.includes(accounts[0])) {
        dispatch(setUserType("admin"));
        if (redirect) router.push("/admin/dashboard");
      } else {
        dispatch(setUserType("user"));
        if (redirect) router.push("/employee/dashboard");
      }
      const address=  accounts[0];
      dispatch(setWallet({ address, chainId }));
      console.log("Connected account:", address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet");
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = window.ethereum;

    const handleAccountsChanged = (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        provider.request({ method: "eth_chainId" }).then((chainId: string) => {
          dispatch(setWallet({ address: newAccounts[0], chainId }));
        });

        dispatch(
          setUserType(adminWallets.includes(newAccounts[0]) ? "admin" : "user")
        );
      } else {
        dispatch(clearWallet());
      }
    };

    const handleChainChanged = (newChainId: string) => {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          dispatch(setWallet({ address: accounts[0], chainId: newChainId }));
        });
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    };
  }, [dispatch]);

  const disconnectWallet = useCallback(() => {
    dispatch(clearWallet());
    console.log("disconnected");
    
  }, [dispatch]);

  const updateUserType = useCallback(
    (type: "admin" | "user") => {
      dispatch(setUserType(type));
    },
    [dispatch]
  );

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    setUserType: updateUserType,
    
  };
}