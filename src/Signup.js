import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignup.css';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message);
      if (data.message === "Signup successful") {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleGoogleSignup = async (data) => {
    try {
      const response = await fetch('http://localhost/backend/google_auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: data.tokenId })
      });

      const result = await response.json();
      alert(result.message);
      if (result.message === "Signup successful") {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container custom-container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-16">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Signup</h3>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              </form>
              <div className="mt-3">
                <LoginSocialGoogle
                  client_id={"80251864896-9bm2n7fhiu4ep9gssvu9dnarqehr9i68.apps.googleusercontent.com"}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ provider, data }) => {
                    handleGoogleSignup(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <button className="btn btn-primary btn-block">
                    Sign Up with Google
                  </button>
                </LoginSocialGoogle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
