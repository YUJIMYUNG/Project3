import React from 'react';
import Label from '../components/atoms/Label';
import Input from '../components/atoms/Input';

const FormField = ({ label, id, errorMessage, ...inputProps }) => {
    return (
        <div className='form-field'>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
            {errorMessage && <p className='error-message'> {errorMessage} </p>}
        </div>
    );
};

export default FormField;