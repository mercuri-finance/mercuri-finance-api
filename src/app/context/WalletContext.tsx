import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

type WalletType = 'metamask' | 'base' | 'phantom' | 'solflare';

type WalletInfo = {
  address: string;
  type: WalletType;
} | null;

type WalletContextType = {
  walletInfo: WalletInfo;
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  network: string | null;
  ensureCorrectNetwork: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load saved session
  useEffect(() => {
    const stored = sessionStorage.getItem('walletInfo');
    const storedNetwork = sessionStorage.getItem('network');
    if (stored) {
      try {
        setWalletInfo(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('walletInfo');
      }
    }
    if (storedNetwork) setNetwork(storedNetwork);
  }, []);

  // Persist session
  useEffect(() => {
    if (walletInfo)
      sessionStorage.setItem('walletInfo', JSON.stringify(walletInfo));
    else sessionStorage.removeItem('walletInfo');
  }, [walletInfo]);

  useEffect(() => {
    if (network) sessionStorage.setItem('network', network);
    else sessionStorage.removeItem('network');
  }, [network]);

  /** Unified connect handler */
  const connect = async (type: WalletType) => {
    setIsConnecting(true);
    try {
      if (type === 'metamask' || type === 'base') {
        await connectEvmWallet(type);
      } else if (type === 'phantom') {
        await connectPhantom();
      } else if (type === 'solflare') {
        await connectSolflare();
      } else {
        throw new Error(`Unsupported wallet type: ${type}`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  /** 🦊 EVM (MetaMask / Base Wallet) — only Base Sepolia allowed */
  const connectEvmWallet = async (type: WalletType) => {
    if (!window.ethereum) throw new Error('EVM wallet not detected');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const net = await provider.getNetwork();

    // If not Base Sepolia (84532), switch automatically
    if (Number(net.chainId) !== 84532) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14a34' }],
        });
        setNetwork('base-sepolia');
      } catch (e) {
        throw new Error(
          'Unable to switch to Base Sepolia — please enable it in your wallet.'
        );
      }
    } else {
      setNetwork('base-sepolia');
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setWalletInfo({ address, type });
  };

  /** 👻 Phantom (Solana) — force Devnet */
  const connectPhantom = async () => {
    if (!window.solana?.isPhantom)
      throw new Error('Phantom wallet not detected');

    const resp = await window.solana.connect();
    const address = resp.publicKey.toString();

    // We can’t programmatically switch cluster — assume Devnet for playground
    setNetwork('solana-devnet');
    setWalletInfo({ address, type: 'phantom' });
  };

  /** 🔥 Solflare (Solana) — force Devnet */
  const connectSolflare = async () => {
    const solflare = window.solflare || window.solflareSolana;
    if (!solflare?.isSolflare) throw new Error('Solflare wallet not detected');

    await solflare.connect();
    const address = solflare.publicKey.toString();

    // Same limitation as Phantom
    setNetwork('solana-devnet');
    setWalletInfo({ address, type: 'solflare' });
  };

  /** Disconnect */
  const disconnect = () => {
    setWalletInfo(null);
    setNetwork(null);
    sessionStorage.removeItem('walletInfo');
    sessionStorage.removeItem('network');
  };

  /** Ensure correct network */
  const ensureCorrectNetwork = async () => {
    if (
      (walletInfo?.type === 'metamask' || walletInfo?.type === 'base') &&
      window.ethereum
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const net = await provider.getNetwork();
      if (Number(net.chainId) !== 84532) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14a34' }],
        });
        setNetwork('base-sepolia');
      }
    }

    if (walletInfo?.type === 'phantom' || walletInfo?.type === 'solflare') {
      // silently assume devnet; we can’t change programmatically
      setNetwork('solana-devnet');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletInfo,
        connect,
        disconnect,
        isConnecting,
        network,
        ensureCorrectNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
};

// global types
declare global {
  interface Window {
    solana?: any;
    solflare?: any;
    solflareSolana?: any;
    ethereum?: import('ethers').Eip1193Provider;
  }
}
