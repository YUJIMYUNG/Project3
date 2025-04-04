import React from 'react';
import Label from '../components/atoms/Label';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const DuplicationCheckField = ({ 
    label, 
    value, 
    onChange, 
    onCheck, 
    errorMessageId,
    ...inputProps 
  }) => {
    return (
        <div className="duplication-check-field">
            <Label>{label}</Label>
        <div className="input-check-group">
            <Input value={value} onChange={onChange} {...inputProps} />
            <Button onClick={onCheck}>중복검사</Button>
        </div>
        <p id={errorMessageId} className="error-message"></p>
    </div>
    );
};

export default DuplicationCheckField;