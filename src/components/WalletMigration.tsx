import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchTalentCredentials, fetchTalentScore } from 'src/utils/TalentPassport';
import { RecipientProvider } from 'src/utils/RecipientContext';


export default function WalletMigration() {
    const { address, isConnected } = useAccount();
    const [talentScore, setTalentScore] = useState(null);
    const [gitcoinScore, setGitcoinScore] = useState(null);
    const [worldcoinVerified, setWorldcoinVerified] = useState(null);

    useEffect(() => {
        const loadTalentData = async () => {
            if (!address) return;

            console.log("Fetching Talent Data for address:", address);

            try {
                // Fetch talent score
                const { score } = await fetchTalentScore(address);
                setTalentScore(score);

                // Fetch credentials
                const { gitcoinScore, worldcoinVerified } = await fetchTalentCredentials(address);

                // Set Gitcoin and Worldcoin values based on the retrieved credentials
                setGitcoinScore(gitcoinScore);
                setWorldcoinVerified(worldcoinVerified);

            } catch (error) {
                console.error("Failed to fetch Talent Data:", error);
            }
        };

        if (isConnected && address) {
            loadTalentData();
        }
    }, [address, isConnected]);

    return (
        <div className="rounded-xl bg-white px-4 py-4 text-container">
            <p><b>Transfer Onchain Reputation from:</b> {address}</p>
            <br /><br />
            <h2><b>List of Badges</b></h2>
            <ul>
                <li>Talent Score: {talentScore !== null ? talentScore : "Loading..."}</li>
                <li>Gitcoin Passport: {gitcoinScore !== null ? gitcoinScore : "Loading..."}</li>
                <li>World ID: {worldcoinVerified !== null ? worldcoinVerified : "Loading..."}</li>
                <li>Wallet Age: 286 days</li>
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
