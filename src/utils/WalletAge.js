const axios = require('axios');

// Configura la dirección de la wallet y tu API Key de Etherscan
const walletAddress = '0x0e88AC34917a6BF5E36bFdc2C6C658E58078A1e6';
const apiKey = '5KHW5BWX4G4DW9TGW1AHUNBW5N8QG8AT45';

// URL para consultar el historial de transacciones de la wallet
const url = https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey};
async function getWalletAge() {
  
  try {
    const response = await axios.get(url);
    const transactions = response.data.result;

    if (transactions.length === 0) {
      console.log("No se encontraron transacciones para esta wallet.");
      return;
    }

    // Encuentra la primera transacción
    const firstTransaction = transactions[0];
    const firstTransactionTime = new Date(firstTransaction.timeStamp * 1000);

    // Calcula la diferencia en años
    const currentTime = new Date();
    const ageInMilliseconds = currentTime - firstTransactionTime;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 );

    return ageInYears;
  } catch (error) {
    console.error("Error al obtener la información de la wallet:", error);
  }
}

getWalletAge();