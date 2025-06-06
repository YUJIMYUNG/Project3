import React from 'react';

const Button = ({ children, onClick, type, className, disabled, ...props }) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
      </button>
    );
};

export default Button;