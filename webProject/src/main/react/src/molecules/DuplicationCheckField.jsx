import React from 'react';
import Label from '../components/atoms/Label';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const DuplicationCheckField = ({ 
    label, 
    value, 
    onChange, 
    onCheck, 
    errorMessage, 
    type, 
    placeholder, 
    className,
    id,
    labelClassName,
    buttonClassName,
    errorClassName
  }) => {
    return (
        <div className="space-y-2">
        {label && (
            <Label 
                htmlFor={id} 
                className={labelClassName || "block text-sm font-medium text-gray-700"}
            >
                {label}
            </Label>
        )}
        <div className="flex items-center space-x-2">
            <Input
                id={id}
                type={type || 'text'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className || "flex-grow appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
            />
            <Button 
                type="button"
                onClick={onCheck}
                className={buttonClassName || "inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
            >
                중복 확인
            </Button>
        </div>
        {errorMessage && (
            <p 
                className={errorClassName || "mt-1 text-xs text-red-500"}
            >
                {errorMessage}
            </p>
        )}
    </div>
    );
};

export default DuplicationCheckField;