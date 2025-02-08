import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  console.log("Register component is rendering"); // Debugging check

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("Register button clicked"); // Debugging check

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (response.ok) {
      navigate('/login');
    } else {
    console.error("Registration failed"); // Debugging check
      alert('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-4">Register</h2>
      <input
        className="border p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mt-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mt-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
  
};

export default Register;
