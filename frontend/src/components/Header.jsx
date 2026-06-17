import React from 'react';

// Top navy header bar with app title and a "Get Server Key" button.
// Doesn't need any props - it's just static branding.
function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <span className="header-icon">🔗</span>
        <span>UPI Mesh Network Simulator</span>
      </div>
    </header>
  );
}

export default Header;
