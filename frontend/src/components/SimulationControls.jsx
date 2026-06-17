import React from 'react';

// Three buttons that trigger simulation actions on the backend.
// Props:
//   onRunGossip   -> called when "Run Gossip" is clicked
//   onFlushBridge -> called when "Flush Bridge (Upload)" is clicked
//   onResetMesh   -> called when "Reset Mesh" is clicked
//   isLoading     -> disables buttons while a request is in progress
function SimulationControls({ onRunGossip, onFlushBridge, onResetMesh, isLoading }) {
  return (
    <div className="card">
      <h3 className="card-title">Simulation Controls</h3>
      <button className="btn btn-success btn-full" onClick={onRunGossip} disabled={isLoading}>
        ⟳ Run Gossip
      </button>
      <button className="btn btn-purple btn-full" onClick={onFlushBridge} disabled={isLoading}>
        ⬆ Flush Bridge (Upload)
      </button>
      <button className="btn btn-warning btn-full" onClick={onResetMesh} disabled={isLoading}>
        ⟲ Reset Mesh
      </button>
    </div>
  );
}

export default SimulationControls;
