import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import solflare from '../../assets/wallets/solflare.svg';
import phantom from '../../assets/wallets/phantom.svg';
import metamask from '../../assets/wallets/metamask.svg';
import coinbase from '../../assets/wallets/coinbase.svg';
import logo from '../../assets/logo.svg';
import docsIcon from '../../assets/icons/book.svg';
import githubIcon from '../../assets/icons/github.svg';
import searchIcon from '../../assets/icons/search.svg';
import { SearchModal } from '../SearchModal';
import { WalletModal } from '../WalletModal';
import { useWallet } from '@/app/context/WalletContext';

const shortenAddress = (address: string) =>
  address ? `${address.slice(0, 4)}...${address.slice(-2)}` : '';

const NavBar = styled.nav`
  width: 100%;
  height: 64px;
  background: #0a0e12;
  border-bottom: 1px solid #19242e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Logo = styled.img`
  height: 30px;
  cursor: pointer;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #91a2c1;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #e3ffc1;
  }
`;

const MobileIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
  }

  img {
    display: block;
    opacity: 0.75;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 1;
    }
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: #9aaac2;
  background: #0f141a;
  border: 1px solid #1c2733;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 240px;

  &:hover {
    background: #131b24;
    border-color: #2b3a49;
  }

  img {
    width: 15px;
    height: 15px;
    opacity: 0.8;
  }

  span.shortcut {
    background: #1c2733;
    color: #6d7e93;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 6px;
    font-family: monospace;
    user-select: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ConnectContainer = styled.div`
  position: relative; /* needed for dropdown positioning */
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ConnectButton = styled.button<{ connected?: boolean }>`
  background-color: #0f141a;
  color: #aeb9c8;
  border: 1px solid #1e252b;
  min-height: 40px;
  line-height: 24px;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid #c5dca7;
  }
`;

const WalletIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 10px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background: #0f141a;
  border-radius: 8px;

  overflow: hidden;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.7rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  border: 1px solid #1e252b;
  color: #aeb9c8;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #ef4476;
    border: 1px solid #ef4476;
  }
`;

const WALLET_ICONS: Record<string, string> = {
  metamask,
  solflare,
  phantom,
  coinbase,
};

export function Navigation(): JSX.Element {
  const [showSearch, setShowSearch] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { walletInfo, connect, disconnect } = useWallet();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <NavBar>
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showWalletModal && (
        <WalletModal
          onClose={() => setShowWalletModal(false)}
          onConnect={() => setShowWalletModal(false)}
        />
      )}

      <CenterContainer>
        <Logo src={logo} alt="Mercuri Docs" />
      </CenterContainer>

      <RightContainer>
        <SearchButton onClick={() => setShowSearch(true)}>
          <span style={{ gap: 10, display: 'flex' }}>
            <img src={searchIcon} alt="Search" />
            <span>Search...</span>
          </span>
          <span className="shortcut">⌘K</span>
        </SearchButton>
        <NavLinks>
          <NavLink href="https://www.mercuri.finance">Home</NavLink>
          <NavLink href="https://api.mercuri.finance">API</NavLink>
          <NavLink href="https://docs.mercuri.finance/docs/changelog">
            Changelog
          </NavLink>
        </NavLinks>

        <MobileIcons>
          <a
            href="https://docs.mercuri.finance"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={docsIcon} alt="Docs" />
          </a>
          <a
            href="https://github.com/mercuri-finance"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
        </MobileIcons>

        <ConnectContainer ref={dropdownRef}>
          <ConnectButton
            connected={!!walletInfo}
            onClick={() => {
              if (walletInfo) setShowDropdown((p) => !p);
              else setShowWalletModal(true);
            }}
          >
            {walletInfo ? (
              <>
                <WalletIcon
                  src={WALLET_ICONS[walletInfo.type] || metamask}
                  alt={walletInfo.type}
                />
                {shortenAddress(walletInfo.address)}
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}></span>
              </>
            ) : (
              <span>Connect</span>
            )}
          </ConnectButton>

          {showDropdown && (
            <Dropdown>
              <DropdownItem
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
              >
                Disconnect
              </DropdownItem>
            </Dropdown>
          )}
        </ConnectContainer>
      </RightContainer>
    </NavBar>
  );
}
