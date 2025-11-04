import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useLocation } from 'react-router-dom';
import { Button } from '../Button';
import { Label } from '../Label';
import { Input } from '../Input/styles';
import { ResponseModal } from '../ResponseModal';
import { PAGE_HEADINGS } from '../PageNav/pageHeadings';
import { WalletSelector } from '../WalletSelector';
import { useWallet } from '@/app/context/WalletContext';
import { Spinner } from '../Spinner';
import { DocsList } from '../DocsCard';
import { Connection, Transaction, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import {
  getAssociatedTokenAddress,
  createApproveCheckedInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

const FACILITATOR = '2kQPdFFffYhskzSKX9uBYuDSWEuSphgJrVmcrofvVnMk';
const USDC_MINT = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';

/** 🔑 Approves the facilitator as delegate for this wallet’s USDC ATA */
export async function ensureSolanaDelegateApproved(solanaWallet: any) {
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );
  const facilitator = new PublicKey(FACILITATOR);
  const asset = new PublicKey(USDC_MINT);
  const owner = new PublicKey(solanaWallet.publicKey.toString());

  const ata = await getAssociatedTokenAddress(
    asset,
    owner,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // Approve 1 USDC worth (6 decimals)
  const approveAmount = BigInt(1_000_000);

  const ix = createApproveCheckedInstruction(
    ata,
    asset,
    facilitator,
    owner,
    approveAmount,
    6
  );

  const tx = new Transaction().add(ix);
  tx.feePayer = owner;

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;

  const signedTx = await solanaWallet.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signedTx.serialize());
  await connection.confirmTransaction(sig, 'confirmed');

  console.log('Facilitator delegate approved:', sig);
}

const API_BASE = import.meta.env.VITE_FACILITATOR_URL;

const USDC_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const TOKEN_NAME = 'USD Coin';
const TOKEN_VERSION = '2';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 2rem 5rem 2rem;
  background: #0d1218;
  border-left: 1px solid #1a2230;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  padding-bottom: 2rem;
`;

const ErrorText = styled.span`
  color: #ef4476;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const StyledInput = styled(Input)<{ $error?: boolean; readOnly?: boolean }>`
  border: 1px solid ${({ $error }) => ($error ? '#ef4476' : '#1e252b')};
  background: ${({ readOnly }) => (readOnly ? '#161b22' : 'transparent')};
  color: ${({ readOnly }) => (readOnly ? '#6d7f93a6' : '#a5afc0')};
  &:focus {
    border-color: ${({ $error, readOnly }) =>
      $error ? '#ef4476' : readOnly ? '#1e252b' : '#e3ffc1'};
  }
`;

const StyledButton = styled(Button)<{
  $success?: boolean;
  disabled?: boolean;
}>`
  ${({ $success }) =>
    $success &&
    `
    border-color: #7de3c3 !important;
    color: #7de3c3 !important;
    cursor: default !important;
    pointer-events: none; /* Prevents any further clicks */
    opacity: 0.9;

    &:hover {
      background: none;
    }
  `}
`;

export const RequestPanel = () => {
  const location = useLocation();
  const headings = PAGE_HEADINGS[location.pathname] || '';
  const [to, setTo] = useState('');
  const [paymentHeader, setPaymentHeader] = useState('');
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signingLoading, setSigningLoading] = useState(false);
  const [sendingLoading, setSendingLoading] = useState(false);
  const [signStatus, setSignStatus] = useState<
    'idle' | 'signing' | 'success' | 'error'
  >('idle');
  const [sendStatus, setSendStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const { walletInfo, network, ensureCorrectNetwork } = useWallet();

  // Predefined values
  const scheme = 'exact';
  const asset =
    network === 'solana-devnet'
      ? USDC_MINT // ✅ Solana mint address
      : USDC_ADDRESS; // ✅ EVM (Base Sepolia)
  const description = 'USDC verification test';
  const maxAmountRequired = '1000';
  const maxTimeoutSeconds = 300;
  const value = '0.0001';
  const from = walletInfo?.address || '';

  const validateToAddress = (): boolean => {
    if (!to.trim()) {
      setErrors({ to: 'Recipient address is required' });
      return false;
    }

    if (network?.startsWith('base')) {
      // 🟢 EVM validation
      if (!ethers.isAddress(to.trim())) {
        setErrors({ to: 'Invalid Ethereum address' });
        return false;
      }
    } else if (network === 'solana-devnet') {
      // 🟣 Solana validation
      try {
        new PublicKey(to.trim()); // throws if invalid
      } catch {
        setErrors({ to: 'Invalid Solana address' });
        return false;
      }
    } else {
      setErrors({ to: 'Unsupported network' });
      return false;
    }

    setErrors({});
    return true;
  };

  /** ✍️ Sign authorization to generate payment header */
  /** ✍️ Sign authorization to generate payment header */
  const signAuthorization = async () => {
    if (!validateToAddress()) return;

    await ensureCorrectNetwork();

    try {
      setSignStatus('signing');
      setSigningLoading(true);

      const isEvm = network?.startsWith('base');

      if (isEvm) {
        // 🧩 EVM logic (Base Sepolia)
        if (!window.ethereum) throw new Error('EVM wallet not available');

        const provider = new ethers.BrowserProvider(window.ethereum);

        // Make sure we're on Base Sepolia (chainId 84532 / 0x14a34)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14a34' }],
        });

        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        const activeAccount = accounts?.[0]?.toLowerCase();
        const connectedAccount = walletInfo.address?.toLowerCase();

        if (activeAccount !== connectedAccount) {
          // Ask for permissions if needed
          await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          });

          const newAccounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          const newActive = newAccounts?.[0]?.toLowerCase();

          if (newActive !== connectedAccount) {
            throw new Error(
              `Please switch to the right account before signing.`
            );
          }
        }

        const signer = await provider.getSigner();
        const fromAddr = await signer.getAddress();
        const net = await provider.getNetwork();

        // Standard EIP-712 signing setup
        const valueUnits = ethers.parseUnits(value, 6);
        const validAfter = 0;
        const validBefore = Math.floor(Date.now() / 1000) + 3600;
        const nonce = ethers.hexlify(ethers.randomBytes(32));

        const domain = {
          name: TOKEN_NAME,
          version: TOKEN_VERSION,
          chainId: Number(net.chainId),
          verifyingContract: USDC_ADDRESS,
        };

        const types = {
          TransferWithAuthorization: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'validAfter', type: 'uint256' },
            { name: 'validBefore', type: 'uint256' },
            { name: 'nonce', type: 'bytes32' },
          ],
        };

        const message = {
          from: fromAddr,
          to,
          value: valueUnits,
          validAfter,
          validBefore,
          nonce,
        };

        const signature = await signer.signTypedData(domain, types, message);

        const payload = {
          from: fromAddr,
          to,
          value: valueUnits.toString(),
          validAfter,
          validBefore,
          nonce,
          signature,
          asset: USDC_ADDRESS,
        };

        const header = btoa(
          JSON.stringify({
            x402Version: 1,
            scheme,
            network,
            payload,
          })
        );

        setPaymentHeader(header);
        setSignStatus('success');
      } else if (network === 'solana-devnet') {
        // ✅ Solana Devnet logic (supports Phantom & Solflare)
        const solanaWallet =
          (window.solana?.isPhantom && window.solana) ||
          (window.solflare?.isSolflare && window.solflare) ||
          (window.solflareSolana?.isSolflare && window.solflareSolana);

        if (!solanaWallet) throw new Error('No compatible Solana wallet found');

        if (!solanaWallet.isConnected && solanaWallet.connect) {
          await solanaWallet.connect();
        }

        // ✅ New step — delegate approval
        if (headings === 'settle') {
          await ensureSolanaDelegateApproved(solanaWallet);
        }

        const publicKey = solanaWallet.publicKey?.toString();
        if (!publicKey) throw new Error('Unable to fetch Solana public key');

        const validAfter = 0;
        const validBefore = Math.floor(Date.now() / 1000) + 3600;
        const nonce = ethers.hexlify(ethers.randomBytes(32));

        const messageObj = {
          x402Version: 1,
          scheme,
          network,
          payload: {
            from: publicKey,
            to,
            asset: USDC_MINT,
            value,
            validAfter,
            validBefore,
            nonce,
          },
        };

        const message = JSON.stringify(messageObj);
        const encodedMsg = new TextEncoder().encode(message);

        // 🟣 Signing (Phantom / Solflare)
        if (!solanaWallet.signMessage) {
          throw new Error('This wallet does not support message signing');
        }

        const signed = await solanaWallet.signMessage(encodedMsg, 'utf8');
        const signature = bs58.encode(signed.signature);

        const payload = { ...messageObj.payload, signature };
        const header = btoa(JSON.stringify({ ...messageObj, payload }));

        setPaymentHeader(header);
        setSignStatus('success');
      } else {
        throw new Error('Unsupported network selected');
      }
    } catch (err: any) {
      setSignStatus('error');
      setErrors({ to: err.message });
    } finally {
      setSigningLoading(false);
    }
  };

  /** 🧾 Handle API request */
  const handleSend = async () => {
    try {
      setSendingLoading(true);

      let url = '';
      let options: RequestInit = {};

      if (headings === 'supported') {
        url = `${API_BASE}/v2/x402/supported`;
        options = { method: 'GET' };
      } else if (headings === 'discover') {
        url = `${API_BASE}/v2/x402/discover`;
        options = { method: 'GET' };
      } else if (headings === 'funding') {
        url = `${API_BASE}/funding`;
        options = { method: 'GET' };
      } else if (headings === 'verify' || headings === 'settle') {
        if (!validateToAddress()) return;
        if (signStatus !== 'success' || !paymentHeader) return;

        url = `${API_BASE}/v2/x402/${headings}`;
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X402-Version': '1',
          },
          body: JSON.stringify({
            x402Version: 1,
            paymentHeader,
            paymentRequirements: {
              scheme,
              network,
              payTo: to,
              asset,
              description,
              mimeType: 'application/json',
              maxAmountRequired,
              maxTimeoutSeconds,
            },
          }),
        };
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      setShowModal(true);
      setSendStatus('success');
    } catch (err: any) {
      setResponse(JSON.stringify({ error: err.message }, null, 2));
      setShowModal(true);
      setSendStatus('error');
    } finally {
      setSendingLoading(false);
    }
  };

  useEffect(() => {
    // Reset all state when switching between playground routes
    setTo('');
    setPaymentHeader('');
    setResponse('');
    setErrors({});
    setSignStatus('idle');
    setSendStatus('idle');
    setSigningLoading(false);
    setSendingLoading(false);
    setShowModal(false);
  }, [headings]);

  /** Helper to show dynamic button text */
  const getSignButtonText = () => {
    switch (signStatus) {
      case 'signing':
        return 'Signing...';
      case 'success':
        return 'Signed';
      case 'error':
        return 'Failed to Sign';
      default:
        return 'Sign';
    }
  };

  const getSendButtonText = () => {
    switch (sendStatus) {
      case 'sending':
        return 'Sending...';
      case 'success':
        return headings === 'verify' ? 'verify' : 'Settle';
      case 'error':
        return 'Failed';
      default:
        return headings === 'verify' ? 'Verify' : 'Settle';
    }
  };

  /** Reset signature if recipient changes */
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
    if (errors.to) setErrors({});
    if (signStatus === 'success') {
      setSignStatus('idle');
      setPaymentHeader('');
      setSendStatus('idle');
    }
  };

  return (
    <Wrapper>
      <ScrollArea>
        {/* 🧭 Show API Playground only for certain pages */}
        {['supported', 'discover', 'funding', 'verify', 'settle'].includes(
          headings
        ) ? (
          <>
            {headings === 'supported' && (
              <FormGroup>
                <h3>Try It Out</h3>
                <br />
                <Button variant="secondary" onClick={handleSend}>
                  Fetch Supported Kinds
                </Button>
              </FormGroup>
            )}

            {headings === 'funding' && (
              <FormGroup>
                <h3>Try It Out</h3>
                <br />
                <Button variant="secondary" onClick={handleSend}>
                  Fetch Funding Addresses
                </Button>
              </FormGroup>
            )}

            {headings === 'discover' && (
              <FormGroup>
                <h3>Try It Out</h3>
                <br />
                <Button variant="secondary" onClick={handleSend}>
                  Discover Facilitator Info
                </Button>
              </FormGroup>
            )}

            {(headings === 'verify' || headings === 'settle') && (
              <FormGroup>
                {!from ? (
                  <>
                    <h3>Select a Wallet</h3>
                    <WalletSelector />
                  </>
                ) : (
                  <>
                    <h3>Try It Out</h3>
                    <Label>Network</Label>

                    <StyledInput value={network || '—'} readOnly />

                    <Label>From</Label>
                    <StyledInput value={from} readOnly />

                    <Label>To</Label>
                    <StyledInput
                      placeholder="Recipient 0x..."
                      value={to}
                      onChange={handleToChange}
                      $error={!!errors.to}
                    />
                    {errors.to && <ErrorText>{errors.to}</ErrorText>}

                    <Label>Value</Label>
                    <StyledInput value={value} readOnly />

                    <Label>Scheme</Label>
                    <StyledInput value={scheme} readOnly />

                    <Label>Asset</Label>
                    <StyledInput value={asset} readOnly />

                    <Label>Description</Label>
                    <StyledInput value={description} readOnly />

                    <Label>Max Amount Required</Label>
                    <StyledInput value={maxAmountRequired} readOnly />

                    <Label>Max Timeout Seconds</Label>
                    <StyledInput
                      value={maxTimeoutSeconds.toString()}
                      readOnly
                    />

                    <br />
                    <br />
                    <div style={{ display: 'grid', gap: 20 }}>
                      <div style={{ display: 'grid', gap: 20 }}>
                        <StyledButton
                          variant="secondary"
                          onClick={signAuthorization}
                          disabled={signingLoading || signStatus === 'success'}
                          $success={signStatus === 'success'}
                        >
                          {signingLoading ? (
                            <>
                              <Spinner /> Signing...
                            </>
                          ) : (
                            getSignButtonText()
                          )}
                        </StyledButton>

                        <Button
                          onClick={handleSend}
                          disabled={
                            sendingLoading ||
                            signStatus !== 'success' || // 👈 disable until signed
                            !paymentHeader || // 👈 just extra safety
                            !to // 👈 also make sure "to" field isn’t empty
                          }
                        >
                          {sendingLoading ? (
                            <>
                              <Spinner />
                              {headings === 'verify'
                                ? 'Verifying...'
                                : 'Settling...'}
                            </>
                          ) : (
                            getSendButtonText()
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </FormGroup>
            )}
          </>
        ) : (
          <>
            <h3>Documentation Overview</h3>
            <p style={{ color: '#aeb9c8', lineHeight: 1.6 }}>
              Explore key sections of the X402 protocol documentation below.
            </p>
            <br />
            <DocsList
              title="Introduction"
              items={[
                {
                  title: 'What is X402',
                  desc: 'Understand the origin and purpose of HTTP 402.',
                  to: '/docs/what-is-x402',
                },
                {
                  title: 'Setup Guide',
                  desc: 'Step-by-step guide to integrating and testing X402 with your app.',
                  to: '/docs/setup-guide',
                },
              ]}
            />
            <br />
            <br />
            <DocsList
              title="Core Concepts"
              items={[
                {
                  title: 'HTTP 402 Explained',
                  desc: 'Detailed explanation of HTTP 402 and its new usage model.',
                  to: '/docs/http-402-explained',
                },
              ]}
            />
            <br />
            <br />
            <DocsList
              title="Integration Guides"
              items={[
                {
                  title: 'Using the Facilitator Service',
                  desc: 'Learn how to interact with the Facilitator API.',
                  to: '/docs/facilitator-guide',
                },
              ]}
            />
            <br />
          </>
        )}
      </ScrollArea>

      {showModal && response && (
        <ResponseModal
          response={response}
          onClose={() => setShowModal(false)}
        />
      )}
    </Wrapper>
  );
};
