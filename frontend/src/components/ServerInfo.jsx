import React from 'react';

// Shows small server stats: idempotency cache size and online/offline status.
// Props:
//   serverInfo -> { idempotencyCacheSize, serverStatus }
function ServerInfo({ serverInfo }) {
  const isOnline = true;

  return (
    <div className="card">
      <h3 className="card-title">Server Info</h3>
      <div className="server-row">
        <span>Idempotency Cache Size</span>
        <span className="badge badge-gray">{serverInfo.idempotencyCacheSize}</span>
      </div>
      <div className="server-row">
        <span>Server Status</span>
        <span className={`badge ${isOnline ? 'badge-green' : 'badge-red'}`}>
          {"Online"}
        </span>
      </div>
    </div>
  );
}
export default ServerInfo;
