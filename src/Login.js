import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';

function Login({ onLogin }) {
  const navigate = useNavigate();  // Used for navigation between pages
  const [username, setUsername] = useState('');  // State for username
  const [password, setPassword] = useState('');  // State for password

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message);

      if (data.message === "Login successful") {
        onLogin({ username: data.username });  // Call the onLogin prop with username
        navigate('/movies');  // Redirect to MovieList page after successful login
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <LoginSocialGoogle
              client_id={"843338869291-q188tfcfasg9f8dfohu06ms9qaggqbmj.apps.googleusercontent.com"}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                console.log("Google Login Data: ", data);
                // Handle Google login here
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
