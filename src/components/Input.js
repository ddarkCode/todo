import React from 'react';

import '../css/Input.css';

export default function Input({ type, name, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
