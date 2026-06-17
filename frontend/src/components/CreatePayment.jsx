import React, { useState } from 'react';

// Form to create a new UPI payment.
// Props:
//   accounts   -> list of accounts, used to fill the Sender/Receiver dropdowns
//   onSubmit   -> function called with the form data when "Create Payment" is clicked
//   isLoading  -> true while a payment is being submitted (disables the button)
function CreatePayment({ accounts, onSubmit, isLoading }) {
  // Keep all form fields in one state object - simple to read and update
  const [form, setForm] = useState({
    senderVpa: 'chetan@demo',
    receiverVpa: 'durgesh@demo',
    amount: 500,
    pin: '',
    ttl: 5,
    startDevice: 'phone-user',
  });

  // Generic change handler - works for every input because we use the "name" attribute
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // When the form is submitted, send the data up to the parent (App.jsx)
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="card">
      <h3 className="card-title">Create Payment</h3>
      <form onSubmit={handleSubmit}>
        <label className="field-label">Sender VPA</label>
        <select name="senderVpa" value={form.senderVpa} onChange={handleChange} className="input">
          {accounts.map((acc) => (
            <option key={acc.vpa} value={acc.vpa}>{acc.vpa}</option>
          ))}
        </select>

        <label className="field-label">Receiver VPA</label>
        <select name="receiverVpa" value={form.receiverVpa} onChange={handleChange} className="input">
          {accounts.map((acc) => (
            <option key={acc.vpa} value={acc.vpa}>{acc.vpa}</option>
          ))}
        </select>

        <label className="field-label">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="input"
          min="1"
        />

        <label className="field-label">PIN</label>
        <input
          type="password"
          name="pin"
          value={form.pin}
          onChange={handleChange}
          className="input"
          placeholder="****"
        />

        <label className="field-label">TTL</label>
        <input
          type="number"
          name="ttl"
          value={form.ttl}
          onChange={handleChange}
          className="input"
          min="1"
        />

        <label className="field-label">Start Device</label>
        <input
          type="text"
          name="startDevice"
          value={form.startDevice}
          disabled
          className="input"
        />

        <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Payment'}
        </button>
      </form>
    </div>
  );
}

export default CreatePayment;
