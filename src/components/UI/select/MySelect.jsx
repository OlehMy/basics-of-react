import React from 'react';
import classes from './MySelect.module.css'


function MySelect({ options, defaultValue, value, onChange, defaultName }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={classes.mySelect}
      defaultValue={defaultValue}
    >
      <option disabled value={defaultValue}>{defaultName}</option>
      {options.map(option =>
        <option
          key={option.value}
          value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  );
}

export default MySelect;