import styled from 'styled-components';
import { useState } from 'react';
import solflare from '../../assets/wallets/solflare.svg';
import phantom from '../../assets/wallets/phantom.svg';
import metamask from '../../assets/wallets/metamask.svg';
import coinbase from '../../assets/wallets/coinbase.svg';
import { useWallet } from '@/app/context/WalletContext';

const WalletGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 2fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const WalletCard = styled.div<{ disabled?: boolean }>`
  background: #0e1217;
  border: 1px solid #1e252b;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: all 0.25s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  box-sizing: border-box;

  &:hover {
    border-color: ${({ disabled }) => (disabled ? '#1e252b' : '#e3ffc1')};
    background: ${({ disabled }) => (disabled ? '#0e1217' : '#10161d')};
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-3px)')};
  }
`;

const WalletIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
`;

const WalletName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #d1d5db;
  text-align: center;
`;

const wallets = [
  { id: 'metamask', name: 'MetaMask', icon: metamask, type: 'evm' },
  { id: 'base', name: 'Base Wallet', icon: coinbase, type: 'evm' },
  { id: 'phantom', name: 'Phantom', icon: phantom, type: 'solana' },
  { id: 'solflare', name: 'Solflare', icon: solflare, type: 'solana' },
];

export const WalletSelector = ({
  onConnected,
}: {
  onConnected?: () => void;
}) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const { connect } = useWallet();

  const handleClick = async (walletId: string) => {
    try {
      setConnecting(walletId);
      await connect(walletId as any);
      if (onConnected) onConnected(); // ✅ close modal after successful connect
    } catch (err: any) {
      alert(err.message);
    } finally {
      setConnecting(null);
    }
  };

  return (
    <WalletGrid>
      {wallets.map((wallet) => (
        <WalletCard
          key={wallet.id}
          onClick={() => handleClick(wallet.id)}
          disabled={connecting === wallet.id}
        >
          <WalletIcon src={wallet.icon} alt={wallet.name} />
          <WalletName>
            {connecting === wallet.id ? `Connecting...` : wallet.name}
          </WalletName>
        </WalletCard>
      ))}
    </WalletGrid>
  );
};

// Add global typings for wallets
declare global {
  interface Window {
    solana?: any;
    solflare?: any;
    solflareSolana?: any;
    ethereum?: import('ethers').Eip1193Provider;
  }
}
