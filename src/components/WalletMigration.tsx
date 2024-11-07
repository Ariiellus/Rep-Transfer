import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchPoaps } from 'src/utils/poapTest';

export default function WalletMigration() {
    const { address, isConnected } = useAccount();
    const [poaps, setPoaps] = useState(null);

    useEffect(() => {
        const loadPoaps = async () => {
            if (!isConnected || !address) return;
            
            console.log("Calling fetchPoaps with address:", address); // Debug log

            try {
                const poapData = await fetchPoaps(address);
                console.log("Fetched POAPs data:", poapData); // Debug log
                setPoaps(poapData);
            } catch (error) {
                console.error("Failed to fetch POAPs:", error);
            }
        };

        loadPoaps();
    }, [address, isConnected]);

    return (
        <div className="rounded-xl bg-white px-4 py-4 text-container">
            <p><b>Transfer Onchain Reputation from:</b> {address}</p>
            <br /><br />
            <h2><b>List of Badges</b></h2>
            <ul>
                <li>Talent Score:</li>
                <li>Gitcoin Passport:</li>
                <li>World ID:</li>
                <li>Wallet Age:</li>
                <li>POAPs:</li>
                {poaps ? (
                    <ul>
                        {poaps.map((poap, index) => (
                            <li key={index}>{poap}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading POAPs...</p>
                )}
            </ul>
            <br /><br />
            <h3><b>Destination Address:</b></h3>
            <input
                type="text"
                placeholder="Enter new address"
                className="rounded bg-gray-200 p-2"
            />
        </div>
    );
}
