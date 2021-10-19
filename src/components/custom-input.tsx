import React from 'react';
interface CustomInputProps {
    children: React.ReactNode;
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  }
  
export default function CustomInput({children, value, onChange}: CustomInputProps) {
    return (
      <div>
        <label htmlFor='search'>{children}</label>
        <input id='search' type='text' placeholder='example' value={value} onChange={onChange}/>
      </div>
    )
  }