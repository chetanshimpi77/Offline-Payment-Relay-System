import React from 'react';

// Shows the result of the last action (e.g. "Flush Bridge completed")
// in a green success box with a list of detail lines.
// Props:
//   result  -> { title, details: [string, ...] } or null if nothing happened yet
//   onClose -> called when the user clicks the "x" to dismiss the box
function LastActionResult({ result, onClose }) {
  if (!result) {
    return (
      <div className="card">
        <h3 className="card-title">Last Action Result</h3>
        <p className="muted-text">No actions performed yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title">Last Action Result</h3>
      <div className="result-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="result-title">
          {result.title.toLowerCase().includes('rejected')
            ? `❌ ${result.title}`
            : `✅ ${result.title}`}
        </div>

        <ul className="result-list">
          {result.details.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LastActionResult;
