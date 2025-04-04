import React from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const CheckButton = ({ value, onChange, buttonText, onClick, ...props }) => {
    return (
        <div className='check-button-group'>
            <Input  value={value} onChange={onChange} {...props} />
            <Button onClick={onClick}>{buttonText}</Button>
        </div>
    );
};

export default CheckButton;