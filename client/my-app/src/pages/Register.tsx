import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/img/loginbg.webp";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-[#664229] p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
