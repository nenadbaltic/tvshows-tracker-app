import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createRequestToken, validateWithLogin, createSession, getAccount } from './../api/index';

const Login = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (formData.username === "" || formData.password === "") return;

    try {
      const { data: { request_token } } = await createRequestToken();
      await validateWithLogin({
        username: formData.username,
        password: formData.password,
        request_token: request_token,
      });
      const { data: { session_id } } = await createSession({ request_token });
      const { data: { id, username } } = await getAccount(session_id);

      localStorage.setItem("sessionid", session_id);
      localStorage.setItem("accountid", id);
      localStorage.setItem("username", username);

      setIsAuthenticated(session_id);
      history.push("/");
    } catch (error) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <p>
        Login with your TMDb credentials. You can create an account{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          here
        </a>
      </p>
      <form onSubmit={handleLogin}>
        {error && <p className="login-error">{error}</p>}
        <label>Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
