import { useAccount } from 'wagmi';
export default function WalletMigration() {
  const { address } = useAccount();

  return (
    <div className="rounded-xl bg-white px-4 py-4">
      <p>Wallet: {address}</p>
      <h2>List of Badges</h2>
      <ul>
        <li>badge #1</li>
        <li>badge #2</li>
        <li>badge #3</li>
        <li>badge #4</li>
      </ul>
      <h3>Input new wallet</h3>
      <input
        type="text"
        placeholder="Enter wallet address"
        className="rounded bg-gray-200 p-2"
      />
    </div>
  );
}