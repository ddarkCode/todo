import React from 'react';

import '../css/AuthButton.css';

function AuthButton({ text }) {
  return (
    <div className="auth-button-container">
      <button type="submit" className="auth-button">
        {text}
      </button>
    </div>
  );
}

export default AuthButton;
