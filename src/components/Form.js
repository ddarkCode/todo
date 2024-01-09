import React from 'react';

import '../css/Form.css';

function Form({ onSubmit, children }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
