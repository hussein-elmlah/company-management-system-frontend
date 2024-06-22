import React from 'react';

const FormInput = ({ id, label, type, name, value, onChange, errors, placeholder, options }) => {
  return (
    <div className="col-md-6 mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-select ${errors ? 'is-invalid' : ''}`}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${errors ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${errors ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
      )}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

export default FormInput;
