import React from 'react';

// Shows the chain of phones in the mesh network, and how packets hop
// from the sender -> relay devices -> bridge node (which has internet).
// Props:
//   devices     -> array of { id, role, packets, packetIds, hasInternet }
//   lastUpdated -> time string shown in the card header
function MeshNetworkState({ devices, lastUpdated }) {
  // Pick an icon + color based on the device's role in the mesh
  function getDeviceStyle(role) {
    if (role === 'sender') return { icon: '📱', color: 'icon-blue' };
    if (role === 'bridge') return { icon: '📱', color: 'icon-orange' };
    return { icon: '📱', color: 'icon-green' }; // relay / regular device
  }

  return (
    <div className="card">
      <div className="card-header-row">
        <h3 className="card-title">Mesh Network State</h3>
        <span className="muted-text">🕒 Last updated: {lastUpdated}</span>
      </div>

      <div className="device-chain">
        {devices.map((device, index) => {
          const { icon, color } = getDeviceStyle(device.deviceId);
          const isBridge = device.deviceId === 'phone-bridge';
          return (
            <div className="device-row" key={device.deviceId}>
              {/* Dotted connector line between devices */}
              {index !== 0 && <div className="connector-line" />}

              <div className={`device-icon ${color}`}>{icon}</div>

              <div className="device-info">
                <div className="device-name-row">
                  <strong>{device.deviceId}</strong>
                  <span className={`tag ${isBridge ? 'tag-purple' : 'tag-blue'}`}>
                    {isBridge ? 'Bridge Node' : 'Regular Device'}
                  </span>
                </div>
                <div className="muted-text">Packet IDs: {device.packetIds.join(', ')}</div>
              </div>

              <div className="device-right">
                <div>Packets: {device.packetCount}</div>
                <span className={`badge ${device.hasInternet ? 'badge-green' : 'badge-red'}`}>
                  {device.hasInternet ? 'Has Internet' : 'No Internet'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="info-banner">
        ℹ️ Packet flows from sender → regular devices → bridge node
      </div>
    </div>
  );
}

export default MeshNetworkState;
