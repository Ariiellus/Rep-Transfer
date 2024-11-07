'use client';
import { useState } from 'react';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { FOOTER_LINK } from 'src/links';
import OnchainkitSvg from 'src/svg/OnchainkitSvg';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import WalletMigration from 'src/components/WalletMigration';
import { fetchPoaps } from 'src/utils/poapTest';

export default function Page() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a
            href={FOOTER_LINK}
            title="Reputation Transfer"
            target="_blank"
            rel="noreferrer"
          >
            <OnchainkitSvg />
          </a>
          <div className="flex items-center gap-3">
            <SignupButton />
            {!isConnected && <LoginButton />}
          </div>
        </div>
      </section>
      
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        {!isConnected ? (
          <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
            <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px] flex items-center justify-center">
              <ConnectWallet />
            </div>
          </div>
        ) : (
          <WalletMigration />
        )}
      </section>

      <section>
        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Export Reputation"
          />
        )}
      </section>

      <Footer />
    </div>
  );
}
