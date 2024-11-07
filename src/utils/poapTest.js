import axios from 'axios';

export async function fetchPoaps(address) {
    console.log("Fetching POAPs for address:", address); // Debug log
    try {
        const response = await axios.get('http://159.223.228.122/poaps?wallet=0x6D465d2081b799770d0Ce7E755d8dB1665903fFB');
        console.log("POAPs response data:", response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error("Error fetching POAPs:", error);
        throw error;
    }
}
