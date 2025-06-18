'use client';

import React from 'react';
import styles from '../../page.module.css';

const InputField = ({
  label,
  placeholder,
  name,
  type = "text",
  value = "",
  options = [],
  required = false,
  onChange,
  isView = false,
}) => {
  return (
    <div className={styles.formField}>
      <label className={styles.fieldLabel}>
        {label}
        {required && !isView && (
          <span style={{ color: 'red', marginLeft: 4 }}>*</span>
        )}
      </label>

      {isView ? (
        <p className={styles.viewField}>{value || "N/A"}</p>
      ) : type === "select" ? (
        <select
          name={name}
          className={styles.formSelect}
          value={value ?? ""}
          onChange={onChange}
          required={required}
        >
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
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.formInput}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
