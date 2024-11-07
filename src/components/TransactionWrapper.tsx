'use client';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address } from 'viem';
import { BASE_SEPOLIA_CHAIN_ID, mintABI, mintContractAddress } from '../constants';
import { createAttestation } from '../utils/ReputationAttester';

type TransactionWrapperProps = {
  address: Address;
  recipient: string;
};

export default function TransactionWrapper({ address, recipient }: TransactionWrapperProps) {
  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = async (response: TransactionResponse) => {
    console.log('Transaction successful', response);

    try {
      const attestationUID = await createAttestation(address, recipient);
      console.log("Attestation created with UID:", attestationUID);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  // Define the `contracts` array with the necessary transaction details
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mint',
      args: [address],
    },
  ];

  return (
    <div className="flex w-[450px]">
      <Transaction
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        contracts={contracts} // Pass `contracts` to the `Transaction` component
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
