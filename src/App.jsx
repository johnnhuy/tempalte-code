import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function App() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); 
  const apiurl = 'https://dummyjson.com/auth/login';

  const handleLogin = () => {
    axios.post( apiurl, { username, password })
      .then((response) => {
        console.log(response);
        const newToken = response.data.token;
        Cookies.set('token', newToken);
        setToken(newToken);
        console.log('setToken', newToken);
        setUsername('');
        setPassword('');
        setError('');
      })
      .catch(() => {
        
        setError('sai password or user name'); 
        setUsername('');
        setPassword('');
      });
  };

  useEffect(() => {
    console.log('token :', token) 
    if (token !== null && token !== undefined) {
      navigate('/home'); 
    }
  }, [token,navigate]); 

  return (
    <>
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {token && <p>Token: {token}</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
