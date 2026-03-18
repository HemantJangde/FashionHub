import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    login(data); // store user
    alert("Login Successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;