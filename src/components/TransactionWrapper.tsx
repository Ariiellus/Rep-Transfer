'use client';
import { useAccount, useSigner } from 'wagmi';
import { createAttestation } from 'src/utils/ReputationAttester';
import { TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from '@coinbase/onchainkit/transaction';

export default function TransactionWrapper({ address }: { address: string }) {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();

  const handleTransact = async () => {
    if (!isConnected || !signer) {
      console.error("No wallet connected or signer not available");
      return;
    }

    try {
      const attestationUID = await createAttestation(signer, address);
      console.log("Attestation created with UID:", attestationUID);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  return (
    <div className="flex w-[450px]">
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
      <button
        onClick={handleTransact}
        className="mt-0 mr-auto ml-auto w-[450px] max-w-full bg-[#6366F1] text-white py-2 rounded"
      >
        Transact
      </button>
    </div>
  );
}
