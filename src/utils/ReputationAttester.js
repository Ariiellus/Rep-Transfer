import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { fetchTalentScore, fetchTalentCredentials } from "./TalentPassport";

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x51db154ae86a082a66c4affe77dfb04b6d2394b37bf58bc90e139cf9731901bb";
const eas = new EAS(easContractAddress);

export async function createAttestation(signer, recipientAddress) {
    await eas.connect(signer);

    // Fetch Talent data
    const { score: talentScore } = await fetchTalentScore(recipientAddress);
    const { gitcoinScore, worldcoinVerified } = await fetchTalentCredentials(recipientAddress);

    // Get the current date and generate a hash (you can customize this part as needed)
    const currentDate = new Date().toISOString();
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${recipientAddress}-${currentDate}`));

    const schemaEncoder = new SchemaEncoder("uint8 TalentScore,uint8 gitcoinCredential,bool worldcoinCredential,string Date,string Hash");

    // Encode fetched data
    const encodedData = schemaEncoder.encodeData([
        { name: "TalentScore", value: talentScore.toString(), type: "uint8" },
        { name: "gitcoinCredential", value: gitcoinScore ? gitcoinScore.toString() : "0", type: "uint8" },
        { name: "worldcoinCredential", value: worldcoinVerified === "Verified", type: "bool" },
        { name: "Date", value: currentDate, type: "string" },
        { name: "Hash", value: hash, type: "string" },
    ]);

    const tx = await eas.attest({
        schema: schemaUID,
        data: {
            recipient: recipientAddress,
            expirationTime: 0,
            revocable: false,
            data: encodedData,
        },
    });

    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
    return newAttestationUID;
}