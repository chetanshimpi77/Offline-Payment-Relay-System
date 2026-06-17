import React from 'react';

// Displays the accounts table (VPA, Name, Balance).
// Props:
//   accounts -> array of { vpa, name, balance }
function Accounts({ accounts }) {
  return (
    <div className="card">
      <h3 className="card-title">Accounts</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>VPA</th>
              <th>Name</th>
              <th>Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.vpa}>
                <td>{acc.vpa}</td>
                <td>{acc.holderName}</td>
                <td>{acc.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="#" className="view-all-link">View All Accounts</a>
    </div>
  );
}

export default Accounts;
