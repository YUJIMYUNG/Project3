import React from 'react';
import Label from '../components/atoms/Label';
import Input from '../components/atoms/Input';

const FormField = ({ label, id, errorMessage, className, ...inputProps }) => {
    return (
        <div className='spave-y-1'>
            <Label htmlFor={id} className="block text-l font-medium text-gray-700">{label}</Label>
            <Input id={id} className={className} {...inputProps} />
            {errorMessage && <p className="mt-1 textl-l text-red-600"> {errorMessage} </p>}
        </div>
    );
};

export default FormField;