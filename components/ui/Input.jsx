import React from 'react';
import './Input.css';

export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    id,
    required = false,
    disabled = false,
    icon,
    ...props
}) => {
    return (
        <div className="input-wrapper">
            {icon && <span className="input-icon">{icon}</span>}
            <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            required={required}
            disabled={disabled}
            className={`input ${icon ? 'input-with-icon' : ''}`}
            {...props} />
        </div>
    );
};