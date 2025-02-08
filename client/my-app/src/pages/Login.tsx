import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    console.log("Login component is rendering"); // Debugging check
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/search');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-4">Login</h2>
      <input className="border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
