import "../App.css";
import "../Login.css";
import axios from "axios";
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const user = {
  //     username: formData.username,
  //     password: formData.password,
  //   };

  //   try {
  //     const response = await axios.post("http://localhot:8000/token/", user, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     console.log("Login successful!", response.data);
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

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
      <button> Submit</button>
    </section>
  );
}

export default Login;
