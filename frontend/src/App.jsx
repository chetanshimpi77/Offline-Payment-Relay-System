import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import CreatePayment from './components/CreatePayment.jsx';
import SimulationControls from './components/SimulationControls.jsx';
import ServerInfo from './components/ServerInfo.jsx';
import MeshNetworkState from './components/MeshNetworkState.jsx';
import LastActionResult from './components/LastActionResult.jsx';
import Accounts from './components/Accounts.jsx';
import RecentTransactions from './components/RecentTransactions.jsx';
import * as api from './api/api.js';

// App.jsx is the "parent" component. It:
//  1. Loads all dashboard data when the page first opens (useEffect below)
//  2. Holds that data in state
//  3. Passes data down to each card component as props
//  4. Passes handler functions down so child components can trigger
//     API calls (Create Payment, Run Gossip, etc.) and update the state
function App() {
  // ----- Dashboard state -----
  const [accounts, setAccounts] = useState([]);
  const [meshDevices, setMeshDevices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [serverInfo, setServerInfo] = useState({ idempotencyCacheSize: 0 });
  const [lastAction, setLastAction] = useState(null); // { title, details }
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);;
  // Helper to refresh the "last updated" timestamp shown in Mesh Network State
  function touchLastUpdated() {
    setLastUpdated(new Date().toLocaleTimeString());
  }

  // Load all initial data once when the component first mounts
  useEffect(() => {
    async function loadInitialData() {
      const [accountsData, meshData, txData, serverData] = await Promise.all([
        api.getAccounts(),
        api.getMeshState(),
        api.getTransactions(),
        api.getServerInfo(),
      ]);
      setAccounts(accountsData);
      setMeshDevices(meshData);
      setTransactions(txData);
      setServerInfo(serverData);
      touchLastUpdated();
    }
    loadInitialData();
  }, []);

  // ----- Action handlers (passed down to child components) -----

  // Called when the Create Payment form is submitted
  async function handleCreatePayment(formData) {
    if (formData.senderVpa === formData.receiverVpa || formData.amount <= 0 || !formData.pin || formData.ttl <= 0 || !formData.startDevice) {
      setLastAction({
        title: 'Payment Rejected',
        details: [`Invalid payment details. Please check the form and try again.`],
      });
      return;
    }
    setIsLoading(true);
    try {

      const res = await api.createPayment(formData);
      // Add the new transaction to the TOP of the list

      // setTransactions((prev) => [res.transaction, ...prev]);
      // if (res.meshState) setMeshDevices(res.meshState);
      setLastAction({
        title: 'Payment Created',
        details: [`${formData.senderVpa} → ${formData.receiverVpa}: ₹${formData.amount}`],
      });
      // touchLastUpdated();
    } catch (err) {
      console.error('Create payment failed:', err);
    } finally {
      setIsLoading(false);
    }
  }

  // Called when "Run Gossip" button is clicked
  async function handleRunGossip() {
    setIsLoading(true);
    try {
      const res = await api.runGossip();
      // if (res.meshState) setMeshDevices(res.meshState);
      await api.getMeshState().then((meshData) => setMeshDevices(meshData));

      setLastAction({ title: res.message || 'Gossip completed', details: [] });
      touchLastUpdated();
    } finally {
      setIsLoading(false);
    }
  }

  // Called when "Flush Bridge (Upload)" button is clicked
  async function handleFlushBridge() {
    setIsLoading(true);
    try {
      const res = await api.flushBridge();

      setLastAction({
        title: 'Flush Bridge completed',
        details: [
          `Uploads Attempted: ${res.uploadsAttempted}`,
        ],
      });
      // After flushing, refresh transactions + accounts since balances may have changed
      const [txData, accountsData] = await Promise.all([api.getTransactions(), api.getAccounts()]);
      setTransactions(txData);
      setAccounts(accountsData);
      const data = await api.getServerInfo()
      setServerInfo({ idempotencyCacheSize: data.idempotencyCacheSize});
      touchLastUpdated();
    } finally {
      setIsLoading(false);
    }
  }

  // Called when "Reset Mesh" button is clicked
  async function handleResetMesh() {
    setIsLoading(true);
    try {
      const res = await api.resetMesh();
      // if (res.meshState) setMeshDevices(res.meshState);
      await api.getMeshState().then((meshData) => setMeshDevices(meshData));

      setLastAction({ title: res.message || 'Mesh reset', details: [] });
      touchLastUpdated();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />

      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <div className="column">
          <CreatePayment accounts={accounts} onSubmit={handleCreatePayment} isLoading={isLoading} />
          <SimulationControls
            onRunGossip={handleRunGossip}
            onFlushBridge={handleFlushBridge}
            onResetMesh={handleResetMesh}
            isLoading={isLoading}
          />
          <ServerInfo serverInfo={serverInfo} />
        </div>

        {/* MIDDLE COLUMN */}
        <div className="column">
          <MeshNetworkState devices={meshDevices} lastUpdated={lastUpdated} />
          <LastActionResult result={lastAction} onClose={() => setLastAction(null)} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="column">
          <Accounts accounts={accounts} />
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
