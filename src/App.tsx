import React, { useEffect, useState } from 'react';
import { User, getUser } from './get-user';
import './App.css';
import CustomInput from './components/custom-input';

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
      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
}

export default App;
