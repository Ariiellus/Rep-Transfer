import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x51db154ae86a082a66c4affe77dfb04b6d2394b37bf58bc90e139cf9731901bb";
const eas = new EAS(easContractAddress);

export async function createAttestation(signer, recipientAddress) {
    await eas.connect(signer);

    const schemaEncoder = new SchemaEncoder("uint8 TalentScore,uint8 GitcoinPassport,bool WorldID,string Date,string Hash");
    const encodedData = schemaEncoder.encodeData([
        { name: "TalentScore", value: "0", type: "uint8" },
        { name: "GitcoinPassport", value: "0", type: "uint8" },
        { name: "WorldID", value: false, type: "bool" },
        { name: "Date", value: "", type: "string" },
        { name: "Hash", value: "", type: "string" },
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
