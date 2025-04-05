import React from 'react';

const Input = ({ type, value, onChange, placeholder, required, id, className, ...props }) => {
    return (
        <input
            type={type || 'text'}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={className}
            {...props}
        />
    );
};

export default Input;