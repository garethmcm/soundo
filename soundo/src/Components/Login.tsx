import "../App.css";
import { useState, ChangeEvent } from "react";

interface FormData {
  username: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    setFormData({ ...formData, [changedField]: newValue });
  };

  // logic to send login credentials to back end, was refused by server with 403 error on last attempt

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if(response.ok) {
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login: ', error)
    }
  };

  return (
    <section className="loginSection">
      <h1>Log in</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        id="username"
        name="username"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        id="password"
        name="password"
      />
      <button onClick={handleLogin}> Submit</button>
    </section>
  );
}

export default Login;