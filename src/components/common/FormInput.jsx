import React from 'react';

function FormInput({ id, label, type = 'text', value, onChange, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input 
        type={type} 
        id={id} 
        value={value}
        onChange={onChange}
        required={required} 
      />
    </div>
  );
}

export default FormInput;