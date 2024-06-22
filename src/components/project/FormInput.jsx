// FormInput.js
import React from 'react';

const FormInput = ({ id, label, type, name, value, onChange, errors, placeholder, options }) => {
  const inputClassName = `shadow appearance-none border ${errors ? 'border-red-500' : 'border-gray-200'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      {type === 'select' ? (
        <select
          className={inputClassName}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={inputClassName}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
    </div>
  );
};

export default FormInput;
