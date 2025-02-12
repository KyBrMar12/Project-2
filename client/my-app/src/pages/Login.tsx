import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/img/loginbg.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/search");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-[#664229] p-9 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
