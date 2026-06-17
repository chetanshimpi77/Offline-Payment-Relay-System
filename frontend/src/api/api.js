
// ------------------------------------------------------------
// GET requests - fetching data to display
// ------------------------------------------------------------

// Get list of all accounts (for the Accounts table)
export async function getAccounts() {
  try {
    const response = await fetch("http://localhost:8080/api/accounts");

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.warn("Using mock accounts:", err.message);
    
  }
}

// Get current mesh network state (the list of devices/phones and packet flow)
export async function getMeshState() {
  try {
    const response = await fetch("http://localhost:8080/api/mesh/state");

    if (!response.ok) {
      throw new Error("Failed to fetch mesh state");
    }

    const data = await response.json();
    return data.devices;

  } catch (err) {
    console.warn('Using mock mesh state (API not reachable):', err.message);
    return mockMeshDevices;
  }
}

// Get recent transactions list (for the Recent Transactions table)
export async function getTransactions() {
  try {
    const response = await fetch("http://localhost:8080/api/transactions");

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.warn('Using mock transactions (API not reachable):', err.message);
    return mockTransactions;
  }
}

// Get server info (idempotency cache size + online/offline status)
export async function getServerInfo() {
  try{
    const response = await fetch("http://localhost:8080/api/mesh/state");
    const data = await response.json();
    return data;
  }catch(error){
    console.warn('Using mock server info (API not reachable):', error.message);
  }
}

// ------------------------------------------------------------
// POST requests - actions that change data
// ------------------------------------------------------------

// Create a new payment. Expects the form data from CreatePayment.jsx
// Returns the newly created transaction + updated mesh state from server.
export async function createPayment(paymentData) {
  try {
    const response = await fetch('http://localhost:8080/api/demo/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Payment request failed');
    }

    return await response.json();

  } catch (err) {
    console.warn('Demo fallback: simulating payment locally:', err.message);
  }
}

// Run the "Gossip" simulation step (devices share packets with each other)
export async function runGossip() {
  try {
    const response = await fetch('http://localhost:8080/api/mesh/gossip', { method: 'POST' });

    return await response.json();
  } catch (err) {
    console.warn('Demo fallback: simulating gossip locally:', err.message);
  }
}

// Flush the bridge node's stored packets up to the server (settles payments)
export async function flushBridge() {
  try {
    const response = await fetch(
      'http://localhost:8080/api/mesh/flush',
      { method: 'POST' }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

  } catch (err) {
    console.warn('Demo fallback:', err.message);

    return {
      message: 'Flush Bridge completed',
      uploadsAttempted: 2,
      settled: 1,
      duplicatesDropped: 1,
    };
  }
}

// Reset the whole mesh simulation back to its starting state
export async function resetMesh() {
  try {
    const response = await fetch('http://localhost:8080/api/mesh/reset', { method: 'POST' });
    return await response.json();
  } catch (err) {
    console.warn('Demo fallback: simulating reset locally:', err.message);
    return { message: 'Mesh reset successfully'};
  }
}
