'use client';

import React from 'react';
import styles from '../../page.module.css';

const InputField = ({ label, placeholder, name, type = "text", value = "", options = [], onChange }) => {
  return (
    <div className={styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      {type === "select" ? (
        <select name={name} className={styles.formSelect} value={value} onChange={onChange}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.formInput}
        />
      )}
    </div>
  );
};

export default InputField;
