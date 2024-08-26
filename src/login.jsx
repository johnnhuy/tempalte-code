import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const apiurl = 'https://dummyjson.com/auth/login';

  const handleLogin = () => {
    axios.post(apiurl, { username, password })
      .then((response) => {
        const newToken = response.data.token;
        
       
        if (newToken) {
          Cookies.set('token', newToken);
          setUsername('');
          setPassword('');
          setError('');
          navigate('/home'); 
        } else {
          setError('Token ko tồn tại, đăng nhập thất bại');
        }
      })
      .catch(() => {
        setError('Sai password or username'); 
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div>
      <div>
        <label >Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label >Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
