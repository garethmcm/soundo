import "../App.css";
import "../Register.css";
import { useState, ChangeEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    setFormData({ ...formData, [changedField]: newValue });
  };

  return (
    <section className="registerSection">
      <h1>Register</h1>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        id="firstName"
        name="firstName"
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        id="lastName"
        name="lastName"
      />
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
    </section>
  );
}

export default Register;
