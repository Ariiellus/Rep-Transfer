require('dotenv').config();
const axios = require('axios');

// Method 1: Fetch Talent Score and Basic Info
async function fetchTalentScore(address) {
  const config = {
    method: 'get',
    url: `https://api.talentprotocol.com/api/v2/passports/${address}`,
    headers: { 
      'x-api-key': process.env.NEXT_PUBLIC_TALENT_API,
    },
    maxBodyLength: Infinity
  };

  try {
    const response = await axios.request(config);
    const { score } = response.data.passport;

    console.log("Fetched Talent Score:", { score });
    return { score };
  } catch (error) {
    console.error("Error fetching talent score:", error.response ? error.response.data : error.message);
    throw error;
  }
}

// Method 2: Fetch Gitcoin and Worldcoin Credentials Combined
async function fetchTalentCredentials(address) {
  const config = {
    method: 'get',
    url: `https://api.talentprotocol.com/api/v2/passport_credentials?passport_id=${address}`,
    headers: { 
      'x-api-key': process.env.NEXT_PUBLIC_TALENT_API, 
      'Content-Type': 'application/json',
    },
    maxBodyLength: Infinity
  };

  try {
    const response = await axios.request(config);
    console.log("Full Response Data:", response.data); // Log full response for debugging

    const credentials = response.data.passport_credentials;

    const gitcoinCredential = credentials.find(credential => credential.type === "gitcoin") || null;
    const worldcoinCredential = credentials.find(credential => credential.type === "worldcoin") || null;

    if (gitcoinCredential) {
      var gitcoinScore = gitcoinCredential.value;
    } else {
      var gitcoinScore = "No Gitcoin Detected";
    }

    if (worldcoinCredential) {
      var worldcoinVerified = worldcoinCredential.value;
    } else {
      var worldcoinVerified = "No Verified";
    }

    console.log("Fetched Credentials:", { gitcoinCredential, worldcoinCredential });
    return { gitcoinScore, worldcoinVerified };
  } catch (error) {
    console.error("Error fetching passport credentials:", error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { fetchTalentScore, fetchTalentCredentials };
