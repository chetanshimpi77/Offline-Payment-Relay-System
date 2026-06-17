import React from 'react';

// Displays the recent transactions table.
// New transactions are added to the TOP of the list by the parent
// (App.jsx) before this list is passed down as a prop - this component
// just renders whatever order it receives.
// Props:
//   transactions -> array of { id, from, to, amount, status, bridge, hops, time }
function RecentTransactions({ transactions }) {
  return (
    <div className="card">
      <h3 className="card-title">Recent Transactions</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Bridge</th>
              <th>Hops</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.senderVpa}</td>
                <td>{tx.receiverVpa}</td>
                <td>{tx.amount.toLocaleString()}</td>
                <td>
                  <span className={`badge ${tx.status === 'SETTLED' ? 'badge-green' : 'badge-red'}`}>
                    {tx.status}
                  </span>
                </td>
                <td>{tx.bridgeNodeId}</td>
                <td>{tx.hopCount}</td>
                <td>{tx.settledAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="#" className="view-all-link">View All Transactions</a>
    </div>
  );
}

export default RecentTransactions;
