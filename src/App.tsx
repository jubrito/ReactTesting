import React, { useEffect, useState } from 'react';
import { User, getUser } from './get-user';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserFromMocketApi = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUserFromMocketApi();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
}

interface CustomInputProps {
  children: React.ReactNode;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function CustomInput({children, value, onChange}: CustomInputProps) {
  return (
    <div>
      <label htmlFor='search'>{children}</label>
      <input id='search' type='text' placeholder='example' value={value} onChange={onChange}/>
    </div>
  )
}

export default App;
